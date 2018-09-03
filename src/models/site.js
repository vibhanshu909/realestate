import { mongoose } from '../config/main';
import { Users } from '../connectors/users';

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
    managerSpentAmount: {
        type: Number,
        min: 0,
        default: 0,
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

SiteSchema.post('save', async function (doc) {
    console.log("Site post save...");
    let total = 0;
    const site = (await (await Site.populate(this, 'entries')).populate('manager'));
    const { entries } = site.toObject();
    entries.forEach(e => total += e.total);
    this.cost = total;
    (await Users.find({ id: this.manager })).debit(site.managerSpentAmount);
    console.log("Done...");
});

SiteSchema.post('remove', async function (doc) {
    console.log("Site Removed...");    
    let user = await Users.find({ id: doc.manager });
    user.sites.pull(doc.id);
    user.save();    
});

const repeater = {
    quantity: { type: Number, required: true, min: 0 },
    cost: { type: Number, required: true, min: 0.00 },
    paid: { type: Boolean, default: false }
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
        quantity: { type: String, required: true },
        cost: { type: Number, required: true, min: 0.00 },
        paid: { type: Boolean, default: false }
    },
    total: { type: Number, default: 0, min: 0.00 }
},
    {
        timestamps: true
    });
SiteEntrySchema.index({ createdAt: 1 })
//
SiteEntrySchema.pre('save', function (next) {
    let total = 0;
    const { _id, createdAt, updatedAt, total: _, _v, ...rest } = this.toObject();
    Object.values(rest).forEach(e => total += e.cost);
    this.total = total;
    return next();
});

export const Site = mongoose.model("Site", SiteSchema);
export const SiteEntry = mongoose.model("SiteEntries", SiteEntrySchema);
