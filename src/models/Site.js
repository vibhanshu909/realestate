import { mongoose } from '../config/main';
import { Users } from '../connectors/users';
import { Sites } from '../connectors/sites';
import { SiteEntries } from '../connectors/siteEntries';
import DeletedSite from './Deleted/Site';
import SiteTotal from './SiteTotal';

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
  total: [{
    type: Schema.Types.ObjectId,
    ref: 'SiteTotal'
  }]
}, {
    timestamps: true
  });

SiteSchema.methods.reEval = async function () {
  const site = await Site.populate(this, 'entries');
  let managerSpentAmount = 0;
  site.entries.forEach(e => managerSpentAmount += e.managerSpentAmount);
  return this.update({ $set: { total: { managerSpentAmount }, $position: 0 } }, { new: true });
}

async function totalHook(_) {
  console.log("total Hook")  
  if (this.total && this.total.length) {    
    return;
  }
  else {    
    const siteTotal = await SiteTotal.create({
      site: this.id,
      manager: this.manager      
    });
    console.log(siteTotal);
    this.update({
      $push: {
        total: {
          $each: [siteTotal],
          $position: 0
        },
      }
    })
    // this.total.push(siteTotal);
  }
  console.log(this);
  return await this.save();
}

// save
SiteSchema.post('save', totalHook);

SiteSchema.post('save', async function () {
  console.log("Site post save");
  return (await Users.find({ id: this.manager })).reEval();
});

async function updateUser() {
  const user = await Users.find({ id: this.manager });
  const i = user.sites.findIndex(s => String(s) === String(this.id));
  if (i > -1) {
  }
  else {
    user.sites.push(this);
  }
  return await user.save();
}
SiteSchema.post('save', updateUser);

SiteSchema.pre('findOneAndUpdate', async function () {
  const { $set, $setOnInsert, ...rest } = this._update;
  const site = await Sites.find({ id: rest.id });
  if (String(rest.manager) === String(site.manager)) {
    return;
  }
  const user = await Users.find({ id: site.manager });
  user.sites.pull(site);
  await user.save();
  return user.reEval();
});

SiteSchema.post('findOneAndUpdate', async function () {
  const user = await Users.find({ id: this._update.manager });
  const i = user.sites.findIndex(s => String(s) === String(this._update.id));
  if (i > -1) {
  }
  else {
    user.sites.push(this._update.id);
  }
  await user.save();
  return (await Users.find({ id: this._update.manager })).reEval();
});

SiteSchema.pre('remove', async function () {
  const { __v, ...data } = this.toObject();
  await DeletedSite.create(data);
});

SiteSchema.post('remove', async function (doc) {
  await SiteEntries.remove({ ids: doc.entries });
  let user = await Users.find({ id: doc.manager });
  if (user) {
    await user.reEval();
    user.sites.pull(doc.id);
    await user.save();
  }
});

export const Site = mongoose.model("Site", SiteSchema);
