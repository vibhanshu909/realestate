import { mongoose } from '../config/main';

const Schema = mongoose.Schema;

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
    site: { type: Schema.Types.ObjectId, ref: 'Site' },
    managerSpentAmount: { type: Number, default: 0, min: 0.00 }
},
    {
        timestamps: true
    });
SiteEntrySchema.index({ createdAt: 1 })

SiteEntrySchema.pre('save', function (next) {    
    let total = 0;
    let managerSpentAmount = 0;
    const { _id, site, createdAt, updatedAt, total: _, managerSpentAmount: __, _v, ...rest } = this.toObject();
    Object.values(rest).forEach(e => {
        total += e.cost;
        managerSpentAmount += e.paid ? e.cost : 0;
    });
    this.total = total;
    this.managerSpentAmount = managerSpentAmount;    
    return next();
});

SiteEntrySchema.pre('findOneAndUpdate', function (next) {    
    let total = 0;
    let managerSpentAmount = 0;    
    const { $set, $setOnInsert, ...rest } = this._update;    
    Object.values(rest).forEach(e => {
        total += e.cost;
        managerSpentAmount += e.paid ? e.cost : 0;
    });
    this._update.total = total;
    this._update.managerSpentAmount = managerSpentAmount;    
    return next();
});

SiteEntrySchema.methods.toClient = function(){
    var obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;

    return obj;
}

export const SiteEntry = mongoose.model("SiteEntries", SiteEntrySchema);