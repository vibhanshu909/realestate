import mongoose from '../config/db';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'bcry... Remove this comment to see the full error message
import bcrypt from 'bcryptjs';
import DeletedUser from './Deleted/User';

var Schema = mongoose.Schema;

export const ROLES = {
  ADMIN: 1,
  MANAGER: 0,
};

export const TRANSACTION_TYPE = {
  DEBIT: 'DEBIT',
  CREDIT: 'CREDIT',
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
    // @ts-expect-error TS(2550): Property 'values' does not exist on type 'ObjectCo... Remove this comment to see the full error message
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
    type: {
      type: String,
      required: true,
      // @ts-expect-error TS(2550): Property 'values' does not exist on type 'ObjectCo... Remove this comment to see the full error message
      enum: Object.values(TRANSACTION_TYPE),
      default: TRANSACTION_TYPE.CREDIT
    },
    balance: {
      type: Number
    },
    note: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Date,
      default: () => new Date(new Date().toDateString())
    }
  }],
  sites: [{
    type: Schema.Types.ObjectId,
    ref: "Site"
  }],
  stockPermission: {
    type: Boolean,
    default: false,
  }
};
const UserSchema = Schema(SchemaObject, {
  timestamps: true
});

export async function getHash(str: $TSFixMe) {
  try {
    const result = await bcrypt.hash(str, await bcrypt.genSalt(10));
    return result;
  }
  catch (err) {
    throw err;
  }
}

UserSchema.pre('save', async function(this: $TSFixMe, next: $TSFixMe) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    user.password = await getHash(user.password);
    next();
  }
  else {
    return next();
  }
});

UserSchema.pre('save', async function(this: $TSFixMe, next: $TSFixMe) {
  if (this.isNew) {
    this.balance = this.totalReceivedAmount;
    this.history.push({ amount: this.totalReceivedAmount });
  }
  return next();
});

UserSchema.pre('save', async function(this: $TSFixMe, next: $TSFixMe) {
  const { spent, balance } = await reEval(this);
  this.spent = spent;
  this.balance = balance;
  return next();
});

UserSchema.pre('remove', async function(this: $TSFixMe) {
  console.log(this.toObject());
  const { __v, ...data } = this.toObject();
  await DeletedUser.create(data);
});

UserSchema.post('remove', async function (doc: $TSFixMe) {
  const { Sites } = await import('../connectors/sites');
  if (doc.sites && doc.sites.length) {
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

UserSchema.methods.comparePassword = function (password: $TSFixMe) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.changePassword = async function ({
  currentPassword,
  newPassword
}: $TSFixMe) {
  if (!currentPassword || !newPassword) throw new Error("Empty password");
  const cmp = await bcrypt.compare(currentPassword, this.password);
  if (cmp) {
    return this.update({
      password: await getHash(newPassword)
    });
  }
  throw new Error("Password does not match");
};

UserSchema.methods.resetPassword = async function ({
  newPassword
}: $TSFixMe) {
  if (!newPassword) throw new Error("Empty password");
  return this.update({
    password: await getHash(newPassword)
  });
};

UserSchema.methods.credit = async function (args: $TSFixMe) {
  const { amount, note = '' } = args
  if (amount === 0) {
    return this;
  }
  return this.update({
    totalReceivedAmount: this.totalReceivedAmount + amount,
    balance: this.balance + amount,
    $push: {
      history: {
        $each: [{
          ...args,
          note,
          type: 'CREDIT',
          balance: this.balance + amount,
        }],
        $position: 0
      },
    }
  }, { new: true });
}

UserSchema.methods.debit = async function (args: $TSFixMe) {
  const { amount, note = '' } = args
  if (amount === 0) {
    return this;
  }
  return this.update({
    // totalReceivedAmount: this.totalReceivedAmount - amount,
    balance: this.balance - amount,
    spent: this.spent + amount,
    $push: {
      history: {
        $each: [{
          ...args,
          note,
          type: 'DEBIT',
          balance: this.balance - amount
        }],
        $position: 0
      },
    }
  }, { new: true });
}

async function reEval(doc: $TSFixMe) {
  const user = await User.populate(doc, 'sites');
  let managerSpentAmount = 0;
  user.sites.forEach((e: $TSFixMe) => managerSpentAmount += e.managerSpentAmount);
  return { spent: managerSpentAmount, balance: doc.totalReceivedAmount - managerSpentAmount };
}

UserSchema.methods.reEval = async function () {
  return this.update(await reEval(this));
}

export const User = mongoose.model("User", UserSchema);
