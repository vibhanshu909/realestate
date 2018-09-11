import { mongoose } from '../config/main';
import bcrypt from 'bcrypt';

var Schema = mongoose.Schema;

export const ROLES = {
    ADMIN: 1,
    MANAGER: 0,
};

const UserSchema = Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(ROLES),
        default: ROLES.MANAGER
    },
    totalReceivedAmount: {
        type: Number,
        default: 0,
    },
    spent: {
        type: Number,
        default: 0,
        min: 0
    },
    balance: {
        type: Number,
        default: 0
    },    
    // account: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Account",        
    // },    
    sites: [{
        type: Schema.Types.ObjectId,
        ref: "Site"
    }],

},
    {
        timestamps: true
    });

UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified("password") || user.isNew) {
        return bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                user.password = hash;
                return next();
            });
        });
    }
    else {
        return next();
    }
});

UserSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.balance = this.totalReceivedAmount;
    }
    return next();
});


UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};
UserSchema.methods.credit = async function (amount) {
    return this.update({ totalReceivedAmount: this.totalReceivedAmount + amount, balance: this.balance + amount });
}

UserSchema.methods.reEval = async function () {
    const user = await User.populate(this, 'sites');
    let managerSpentAmount = 0;
    user.sites.forEach(e => managerSpentAmount += e.managerSpentAmount);
    return this.update({ spent: managerSpentAmount, balance: this.totalReceivedAmount - managerSpentAmount });
}

const User = mongoose.model("User", UserSchema);
export default User;
