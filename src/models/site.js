import { mongoose } from '../config/main';
import { Users } from '../connectors/users';

var Schema = mongoose.Schema;

const totalRepeater = {
    type: Number,
    min: 0,
    default: 0,
};

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
    },
    total: {
        mistri: totalRepeater,
        labour: totalRepeater,
        eit: totalRepeater,
        morang: totalRepeater,
        baalu: totalRepeater,
        githi: totalRepeater,
        cement: totalRepeater,
        saria: totalRepeater,
        dust: totalRepeater,
        other: totalRepeater,
        other2: totalRepeater
    }
},
    {
        timestamps: true
    });

SiteSchema.methods.reEval = async function () {
    const site = await Site.populate(this, 'entries');
    let managerSpentAmount = 0;
    site.entries.forEach(e => managerSpentAmount += e.managerSpentAmount);
    this.update({ managerSpentAmount });
}
async function totalHook(_) {
    let total = 0;
    const site = await Site.populate(this, 'entries');
    const { entries } = site.toObject();
    const newTotal = {
        mistri: 0,
        labour: 0,
        eit: 0,
        morang: 0,
        baalu: 0,
        githi: 0,
        cement: 0,
        saria: 0,
        dust: 0,
        other: 0,
        other2: 0,
    };
    entries.forEach(e => {
        total += e.total;
        Object.keys(e).map(x => {            
            newTotal[x] += e[x].cost;
        })
    });
    this.total = newTotal;
    this.cost = total;
}

// save
SiteSchema.pre('save', totalHook);

SiteSchema.post('save', async function () {
    return (await Users.find({ id: this.manager })).reEval();
});

// update
SiteSchema.pre('update', totalHook);

SiteSchema.post('update', async function () {
    return (await Users.find({ id: this.manager })).reEval();
});

SiteSchema.post('remove', async function (doc) {
    console.log("Site Removed...");
    let user = await Users.find({ id: doc.manager });
    await user.reEval();
    user.sites.pull(doc.id);
    user.save();
});

const repeater = {
    quantity: { type: Number, default: 0, min: 0 },
    cost: { type: Number, default: 0, min: 0.00 },
    paid: { type: Boolean, default: false }
}

const SiteEntrySchema = Schema({
    mistri: repeater,
    labour: repeater,
    eit: repeater,
    morang: repeater,
    baalu: repeater,
    githi: repeater,
    cement: repeater,
    saria: repeater,
    dust: repeater,
    other: {
        quantity: { type: String, default: "N/A" },
        cost: { type: Number, default: 0, min: 0.00 },
        paid: { type: Boolean, default: false }
    },
    other2: {
        quantity: { type: String, default: "N/A" },
        cost: { type: Number, default: 0, min: 0.00 },
        paid: { type: Boolean, default: false }
    },
    total: { type: Number, default: 0, min: 0.00 },
    managerSpentAmount: { type: Number, default: 0, min: 0.00 }
},
    {
        timestamps: true
    });
SiteEntrySchema.index({ createdAt: 1 })

SiteEntrySchema.pre('save', function (next) {
    console.log("Entry pre save...");
    let total = 0;
    let managerSpentAmount = 0;
    const { _id, createdAt, updatedAt, total: _, managerSpentAmount: __, _v, ...rest } = this.toObject();
    Object.values(rest).forEach(e => {
        total += e.cost;
        managerSpentAmount += e.paid ? e.cost : 0;
    });
    this.total = total;
    this.managerSpentAmount = managerSpentAmount;
    console.log("Done...", total);
    return next();
});

SiteEntrySchema.pre('findOneAndUpdate', function (next) {
    console.log("Entry pre findOneAndUpdate...");
    let total = 0;
    let managerSpentAmount = 0;
    // console.log(this._update);
    const { $set, $setOnInsert, ...rest } = this._update;
    // console.log(rest);
    Object.values(rest).forEach(e => {
        total += e.cost;
        managerSpentAmount += e.paid ? e.cost : 0;
    });
    this._update.total = total;
    this._update.managerSpentAmount = managerSpentAmount;
    console.log("Done...", total);
    console.log("Done...", managerSpentAmount);
    return next();
});

export const Site = mongoose.model("Site", SiteSchema);
export const SiteEntry = mongoose.model("SiteEntries", SiteEntrySchema);
