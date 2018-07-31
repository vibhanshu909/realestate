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
    entries: [{ type: Schema.Types.ObjectId, ref: 'SiteEntries' }]
},
{
    timestamps: true
});
const repeater = {
    quantity: { type: Number, required: true, min: 0},
    cost: { type: Number, required: true, min: 0.00}
}

const SiteEntrySchema = Schema({
    mistri: {
        quantity: { type: Number, required: true, min: 0},
        cost: { type: Number, required: true, min: 0.00}
    },
    labour: {
        quantity: { type: Number, required: true, min: 0},
        cost: { type: Number, required: true, min: 0.00}
    },
    eit: {
        quantity: { type: Number, required: true, min: 0},
        cost: { type: Number, required: true, min: 0.00}
    },
    morang: {
        quantity: { type: Number, required: true, min: 0},
        cost: { type: Number, required: true, min: 0.00}
    },
    githi: {
        quantity: { type: Number, required: true, min: 0},
        cost: { type: Number, required: true, min: 0.00}
    },
    cement: {
        quantity: { type: Number, required: true, min: 0},
        cost: { type: Number, required: true, min: 0.00}
    },
    saria: {
        quantity: { type: Number, required: true, min: 0},
        cost: { type: Number, required: true, min: 0.00}
    },
    dust: {
        quantity: { type: Number, required: true, min: 0},
        cost: { type: Number, required: true, min: 0.00}
    },
    other: {
        quantity: { type: Number, required: true, min: 0},
        cost: { type: Number, required: true, min: 0.00}
    },
},
{
    timestamps: true
});

export const Site = mongoose.model("Site", SiteSchema);
export const SiteEntry = mongoose.model("SiteEntries", SiteEntrySchema);
