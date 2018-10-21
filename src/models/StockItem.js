import { mongoose } from '../config/main';

var Schema = mongoose.Schema;

export const TYPE = {
  CREDIT: 1,
  DEBIT: 0,
};

const StockItemSchema = Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  unit: {
    type: String,
    required: true,
  },
  available: {
    type: Number,
    required: true,
    unique: true,
  },
  transaction: [{
    type: Schema.Types.ObjectId,
    ref: 'StockItemTransaction'
  }]
},
  {
    timestamps: true
  });

const StockItem = mongoose.model("StockItem", StockItemSchema);
export default StockItem;
