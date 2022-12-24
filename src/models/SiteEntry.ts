import mongoose from '../config/db';
import DeletedSiteEntry from './Deleted/SiteEntry';

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
  managerSpentAmount: { type: Number, default: 0, min: 0.00 },
  note: {
    type: String,
    default: ''
  }
},
  {
    timestamps: true
  });
SiteEntrySchema.index({ createdAt: 1 })

function getTotal(entry: $TSFixMe) {
  let total = 0;
  let managerSpentAmount = 0;
  for (const e in entry) {
    total += entry[e].cost;
    managerSpentAmount += entry[e].paid ? entry[e].cost : 0;
  }
  return { total, managerSpentAmount };
}
SiteEntrySchema.pre('save', function(this: $TSFixMe, next: $TSFixMe) {
  const { _id, site, note, createdAt, updatedAt, total: _, managerSpentAmount: __, _v, __v, ...rest } = this.toObject();
  const {
    total,
    managerSpentAmount,
  } = getTotal(rest);
  this.total = total;
  this.managerSpentAmount = managerSpentAmount;
  return next();
});

SiteEntrySchema.pre('findOneAndUpdate', function(this: $TSFixMe, next: $TSFixMe) {
  const { $set, $setOnInsert, ...rest } = this._update;
  const {
    total,
    managerSpentAmount,
  } = getTotal(rest);
  this._update.total = total;
  this._update.managerSpentAmount = managerSpentAmount;
  return next();
});

SiteEntrySchema.pre('remove', async function(this: $TSFixMe) {
  const { __v, ...data } = this.toObject();
  await DeletedSiteEntry.create(data);
});

SiteEntrySchema.methods.toClient = function () {
  var obj = this.toObject();
  //Rename fields
  obj.id = obj._id;
  // delete obj._id;

  return obj;
}

export const SiteEntry = mongoose.model("SiteEntries", SiteEntrySchema);