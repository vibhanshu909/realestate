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

const repeater = {
    quantity: { type: Number, min: 0},
    cost: { type: Number, min: 0.00}
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
        quantity: { type: Number, required: true, min: 0},
        cost: { type: Number, required: true, min: 0.00}
    },
},
{
    timestamps: true
});
//
// SiteEntrySchema.pre('save', function(next){
//     const { site } = this.poulate('site');
//     let cost = 0;
//     site.entries.forEach(e => Object.values(e).forEach(f => cost += f.cost));
//     cost += Object.values()
//     return next();
// });

export const Site = mongoose.model("Site", SiteSchema);
export const SiteEntry = mongoose.model("SiteEntries", SiteEntrySchema);
