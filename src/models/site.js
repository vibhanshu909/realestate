import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

var Schema = mongoose.Schema;

const SiteSchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    entries: [{ type: Schema.Types.ObjectId, ref: 'SiteEntries' }],
    cost: {
        type: Number,
        min: 0,
        default: 0,
    }
},
{
    timestamps: true
});

SiteSchema.pre('save', async function(next){
    let total = 0;
    const { cost, entries } = await this.populate('entries').toObject();    
    entries.forEach(e => total += e.total);
    console.log("total..........................", total);
    this.cost = total;
    return next();
});

const repeater = {
    quantity: { type: Number, required: true, min: 0},
    cost: { type: Number, required: true, min: 0.00}
}

const SiteEntrySchema = Schema({
    mistri: repeater,
    labour: repeater,
    eit: repeater,
    morang: repeater,
    githi: repeater,
    cement: repeater,
    saria: repeater,
    dust: repeater,
    other: {
        quantity: { type: String, required: true},
        cost: { type: Number, required: true, min: 0.00}
    },
    total: { type: Number, default: 0, min: 0.00}
},
{
    timestamps: true
});
SiteEntrySchema.index({createdAt: 1})
//
SiteEntrySchema.pre('save', function(next){
    let total = 0;
    const { _id, createdAt, updatedAt, total: _, _v, ...rest } = this.toObject();
    console.log(rest);
    Object.values(rest).forEach(e => total += e.cost);
    console.log("total..........................", total);
    this.total = total;
    return next();
});

export const Site = mongoose.model("Site", SiteSchema);
export const SiteEntry = mongoose.model("SiteEntries", SiteEntrySchema);
