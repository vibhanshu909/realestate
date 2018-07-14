import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

var Schema = mongoose.Schema;

export const ROLES = {
    CLIENT: 0,
    MANAGER: 1,
    ADMIN: 2,
    SUPERADMIN: 3,
};
const UserSchema = Schema({
    email: {
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
        default: ROLES.CLIENT
    }
},
{
    timestamps: true
});

UserSchema.pre('save', function(next){
    const user = this;
    if(user.isModified("password") || user.isNew){
        bcrypt.genSalt(10, function(err, salt){
            if(err){
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash){
                user.password = hash;
                return next();
            });
        });
    }
    else{
        return next();
    }
});

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
