import { mongoose } from '../config/main';
import bcrypt from 'bcrypt';
import DeletedUser from './Deleted/User';

var Schema = mongoose.Schema;

export const ROLES = {
  ADMIN: 1,
  MANAGER: 0,
};

export const SchemaObject = {
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
  contact: {
    type: Number,
    default: 0,
    max: 9999999999,
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
  history: [{
    amount: Number,
    createdAt: {
      type: Date,
      default: () => new Date(new Date().toDateString())
    }
  }],
  sites: [{
    type: Schema.Types.ObjectId,
    ref: "Site"
  }]
};
const UserSchema = Schema(SchemaObject, {
  timestamps: true
});

export async function getHash(str) {
  try {
    const result = await bcrypt.hash(str, await bcrypt.genSalt(10));
    return result;
  }
  catch (err) {
    throw err;
  }
}

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    user.password = await getHash(user.password);
    next();
  }
  else {
    return next();
  }
});

UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.balance = this.totalReceivedAmount;
    this.history.push({ amount: this.totalReceivedAmount });
  }
  return next();
});

UserSchema.pre('save', async function (next) {
  const { spent, balance } = await reEval(this);
  this.spent = spent;
  this.balance = balance;
  return next();
});

UserSchema.pre('remove', async function () {
  console.log(this.toObject());
  const { __v, ...data } = this.toObject();
  await DeletedUser.create(data);
});

UserSchema.post('remove', async function (doc) {
  const { Sites } = await import('../connectors/sites');
  if(doc.sites && doc.sites.length){
    try {
      await Sites.remove({ ids: doc.sites });    
    } catch (error) {
    }
  }
});

UserSchema.methods.isAdmin = function () {
  return this.role === String(ROLES.ADMIN)
};

UserSchema.methods.isManager = function () {
  return this.role === String(ROLES.MANAGER)
};

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.changePassword = async function ({ currentPassword, newPassword }) {
  if (!currentPassword || !newPassword) throw new Error("Empty password");
  const cmp = await bcrypt.compare(currentPassword, this.password);
  if (cmp) {
    return this.update({
      password: await getHash(newPassword)
    });
  }
  throw new Error("Password does not match");
};

UserSchema.methods.resetPassword = async function ({ newPassword }) {
  if (!newPassword) throw new Error("Empty password");
  return this.update({
    password: await getHash(newPassword)
  });
};

UserSchema.methods.credit = async function (amount) {
  if (amount === 0) {
    return this;
  }
  return this.update({
    totalReceivedAmount: this.totalReceivedAmount + amount,
    balance: this.balance + amount,
    $push: {
      history: {
        $each: [{
          amount
        }],
        $position: 0
      },
    }
  }, { new: true });
}

async function reEval(doc) {
  const user = await User.populate(doc, 'sites');
  let managerSpentAmount = 0;
  user.sites.forEach(e => managerSpentAmount += e.managerSpentAmount);
  return { spent: managerSpentAmount, balance: doc.totalReceivedAmount - managerSpentAmount };
}

UserSchema.methods.reEval = async function () {
  return this.update(await reEval(this));
}

export const User = mongoose.model("User", UserSchema);
