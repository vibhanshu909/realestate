import { mongoose } from '../config/main';

var Schema = mongoose.Schema;

export const TYPE = {
  CREDIT: 1,
  DEBIT: 0,
};

const StockItemTransactionSchema = Schema({
  stockItem: {
    type: Schema.Types.ObjectId,
    ref: 'StockItem'
  },
  quantity: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(TYPE),
    default: TYPE.DEBIT
  },
  supplier: {
    type: Schema.Types.ObjectId,
    ref: 'StockSupplier'
  }
},
  {
    timestamps: true
  });

const StockItemTransaction = mongoose.model("StockItemTransaction", StockItemTransactionSchema);
export default StockItemTransaction;
