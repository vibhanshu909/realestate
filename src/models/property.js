import { mongoose } from '../config/main';

var Schema = mongoose.Schema;

const PropertySchema = Schema({
    name: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    soldTo: {
        type: String,
        required: true
    },
    totalReceivedAmount: {
        type: Number,
        default: 0,
    },
    balance: {
        type: Number,
        default: 0
    },
    nextDueDate: {
        type: Date,
        required: true
    },
    history: [{
        amount: Number,
        createdAt: {
            type: Date,
            default: new Date(new Date().toDateString())
        }
    }],
},
    {
        timestamps: true
    });

// PropertySchema.pre('save', function (next) {
//     const user = this;
//     if (user.isModified("password") || user.isNew) {
//         return bcrypt.genSalt(10, function (err, salt) {
//             if (err) {
//                 return next(err);
//             }
//             bcrypt.hash(user.password, salt, function (err, hash) {
//                 user.password = hash;
//                 return next();
//             });
//         });
//     }
//     else {
//         return next();
//     }
// });

PropertySchema.pre('save', async function (next) {
    if (this.isNew) {
        this.balance = this.price - this.totalReceivedAmount;
        this.history.push({ amount: this.totalReceivedAmount });
    }
    return next();
});

// update
// PropertySchema.pre('update', async function (doc) {
//     if(this.balance !== 0 ){
//         if(this.nextDueDate < new Date())
//     }
//     let total = 0;
//     const site = await Site.populate(this, 'entries');
//     const { entries } = site.toObject();
//     entries.forEach(e => total += e.total);
//     this.cost = total;
// });

PropertySchema.methods.credit = async function (amount) {
    if (amount === 0) {
        return this;
    }
    return this.update({
        totalReceivedAmount: this.totalReceivedAmount + amount,
        balance: this.balance - amount,
        $push: {
            history: {
                $each: [{
                    amount
                }],
                $position: 0
            },
        }
    });
}

// PropertySchema.methods.reEval = async function () {
//     const user = await User.populate(this, 'sites');
//     let managerSpentAmount = 0;
//     user.sites.forEach(e => managerSpentAmount += e.managerSpentAmount);
//     return this.update({ spent: managerSpentAmount, balance: this.totalReceivedAmount - managerSpentAmount });
// }

const Property = mongoose.model("Property", PropertySchema);
export default Property;
