import { mongoose } from '../../config/main';

var Schema = mongoose.Schema;

const totalRepeater = {
  quantity: {
    type: Number,
    min: 0,
    default: 0,
  },
  cost: {
    type: Number,
    min: 0,
    default: 0,
  }
};

const SchemaObject = {
  name: {
    type: String,    
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
    other: {
      type: Number,
      min: 0,
      default: 0
    },
    other2: {
      type: Number,
      min: 0,
      default: 0
    }
  },  
  deletedAt: {
    type: Date,
    default: Date.now
  }
}

const SiteSchema = Schema(SchemaObject, {
  timestamps: true
});

const DeletedSite = mongoose.model("DeletedSite", SiteSchema);
export default DeletedSite;
