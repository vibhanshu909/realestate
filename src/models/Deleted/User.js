import mongoose from '../../config/db';
// import { SchemaObject } from '../User';

var Schema = mongoose.Schema;

export const ROLES = {
  ADMIN: 1,
  MANAGER: 0,
};

export const SchemaObject = {
  username: {
    type: String,
    lowercase: true,    
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
    ref: "DeletedSite"
  }],
  deletedAt: {
    type: Date,
    default: Date.now
  }
};

const UserSchema = Schema(SchemaObject, {
  timestamps: true
});

const User = mongoose.model("DeletedUser", UserSchema);
export default User;
