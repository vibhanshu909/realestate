import mongoose from '../../config/db';

var Schema = mongoose.Schema;

const repeater = {
  quantity: { type: Number, default: 0, min: 0 },
  cost: { type: Number, default: 0, min: 0.00 },
  paid: { type: Boolean, default: false }
}

const SchemaObject = {
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
  site: { type: Schema.Types.ObjectId, ref: 'DeletedSite' },
  managerSpentAmount: { type: Number, default: 0, min: 0.00 },
  deletedAt: {
    type: Date,
    default: Date.now
  }
};

const SiteEntrySchema = Schema(SchemaObject, {
  timestamps: true
});

const DeletedSiteEntry = mongoose.model("DeletedSiteEntry", SiteEntrySchema);
export default DeletedSiteEntry;
