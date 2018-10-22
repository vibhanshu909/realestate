import { mongoose } from '../config/main';
import { StockItems } from '../connectors/stocks';
import { StockSuppliers } from '../connectors/stockSuppliers';

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

StockItemTransactionSchema.post('save', async function () {
  const stockItem = await StockItems.find({id: this.stockItem});
  const supplier = await StockSuppliers.find({id: this.supplier});
  stockItem.transaction.push(this);
  await stockItem.save();
  supplier.transaction.push(this);
  await supplier.save();
});

export const StockItemTransaction = mongoose.model("StockItemTransaction", StockItemTransactionSchema);
