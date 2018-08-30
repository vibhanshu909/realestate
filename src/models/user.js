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

    lastCreditAmount: {
        type: Number,
        default: 0,
        min: 0
    },

    totalReceivedAmount: {
        type: Number,
        default: 0,
        min: 0
    },

    spentAmount: {
        type: Number,
        default: 0,
        min: 0
    },

    remainingAmount: {
        type: Number,
        default: 0,
        min: 0
    },

    sites: [{
        type: Schema.Types.ObjectId,
        ref: "Site"
    }]
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
    else{
        return next();
    }
});

UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified("lastCreditAmount")) {
        console.log("user object....", user.toObject());
        user.totalReceivedAmount += user.lastCreditAmount;
        user.remainingAmount += user.lastCreditAmount;
        if (user.totalReceivedAmount !== user.remainingAmount + user.spentAmount) {
            throw new Error("Amount Mismatch");
        }
        return next();
    }
    else if(user.isModified("spentAmount")){
        console.log("user object....", user.toObject());
        user.remainingAmount -= user.spentAmount;
        if (user.totalReceivedAmount !== user.remainingAmount + user.spentAmount) {
            throw new Error("Amount Mismatch");
        }
        return next();
    }
    else{
        return next();
    }
});



UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
