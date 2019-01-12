import mongoose from '../../config/db';

var Schema = mongoose.Schema;

const SchemaObject = {
  name: {
    type: String,
    lowercase: true,    
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
  buyer: {
    type: String,
  },
  buyerNumber: {
    type: Number,
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
  },
  note: String,
  history: [{
    amount: Number,
    createdAt: {
      type: Date,
      default: () => new Date(new Date().toDateString())
    }
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "DeletedUser"
  },
  deletedAt: {
    type: Date,
    default: Date.now
  }
}
const PropertySchema = Schema(SchemaObject, {
  timestamps: true
});

const DeletedProperty = mongoose.model("DeletedProperty", PropertySchema);
export default DeletedProperty;
