import { mongoose } from '../config/main';
import { Users } from '../connectors/users';
import { Sites } from '../connectors/sites';
import { SiteEntries } from '../connectors/siteEntries';
import DeletedSite from './Deleted/Site';

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

const SiteTotalSchema = Schema({
  site: {
    type: Schema.Types.ObjectId,
    ref: 'Site',
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
  cost: {
    type: Number,
    min: 0,
    default: 0,
  },
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
  {
    timestamps: true
  });

async function totalHook(_) {
  console.log("siteTotal total Hook")
  let cost = 0, managerSpentAmount = 0;
  const total = await SiteTotal.populate(this, {
    path: 'site',
    populate: {
      path: 'entries'
    }
  });
  const { site } = total;
  const { entries } = site.toObject();
  const newTotal = {
    mistri: {
      quantity: 0,
      cost: 0
    },
    labour: {
      quantity: 0,
      cost: 0
    },
    eit: {
      quantity: 0,
      cost: 0
    },
    morang: {
      quantity: 0,
      cost: 0
    },
    baalu: {
      quantity: 0,
      cost: 0
    },
    githi: {
      quantity: 0,
      cost: 0
    },
    cement: {
      quantity: 0,
      cost: 0
    },
    saria: {
      quantity: 0,
      cost: 0
    },
    dust: {
      quantity: 0,
      cost: 0
    },
    other: 0,
    other2: 0,
  };
  entries.forEach(e => {
    console.log("each");
    const { _id, total: t, by: b, other, other2, managerSpentAmount: msa, site, createdAt, updatedAt, __v, ...data } = e;
    cost += t;
    managerSpentAmount += msa;
    newTotal.other += other.cost;
    newTotal.other2 += other2.cost;
    Object.keys(data).map(x => {
      newTotal[x].quantity += e[x].quantity;
      newTotal[x].cost += e[x].cost;
    })
  });
  return await this.update({
    cost,
    managerSpentAmount,
    ...newTotal
  }, { new: true });
}

SiteTotalSchema.pre('save', totalHook);
const SiteTotal = mongoose.model("SiteTotal", SiteTotalSchema);
export default SiteTotal;
