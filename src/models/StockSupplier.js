import { mongoose } from '../config/main';

var Schema = mongoose.Schema;

export const SchemaObject = {
  name: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },  
  contact: {
    type: Number,
    default: 0,
    max: 9999999999,
  },
  transaction: [{
    type: Schema.Types.ObjectId,
    ref: 'StockItemTransaction'
  }]
};

const StockSupplierSchema = Schema(SchemaObject, {
  timestamps: true
});

export const StockSupplier = mongoose.model("StockSupplier", StockSupplierSchema);
