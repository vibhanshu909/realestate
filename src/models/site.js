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
    let user = await Users.find({ id: doc.manager });
    await user.reEval();
    user.sites.pull(doc.id);
    user.save();
});

SiteSchema.methods.toClient = function(){
    var obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;

    return obj;
}

export const Site = mongoose.model("Site", SiteSchema);
