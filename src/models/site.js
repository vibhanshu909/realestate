import { mongoose } from '../config/main';
import { Users } from '../connectors/users';
import { SiteEntries } from '../connectors/siteEntries';
import { Sites } from '../connectors/sites';

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
    let cost = 0, managerSpentAmount =0;
    const site = await Site.populate(this, 'entries');
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
        const {_id, total: t, other, other2, managerSpentAmount: msa, site, createdAt, updatedAt, __v, ...data} = e;
        cost += t;
        managerSpentAmount += msa;
        newTotal.other += other.cost;
        newTotal.other2 += other2.cost;
        Object.keys(data).map(x => {            
            newTotal[x].quantity += e[x].quantity;
            newTotal[x].cost += e[x].cost;
        })
    });    
    this.total = newTotal;
    this.cost = cost;
    this.managerSpentAmount = managerSpentAmount;
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
    await SiteEntries.remove({ids: doc.entries});
    let user = await Users.find({ id: doc.manager });
    if(user){
        await user.reEval();
        user.sites.pull(doc.id);
        await user.save();
    }
});

SiteSchema.methods.toClient = function(){
    var obj = this.toObject();
    //Rename fields
    obj.id = obj._id;
    // delete obj._id;

    return obj;
}

export const Site = mongoose.model("Site", SiteSchema);
