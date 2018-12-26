import { mongoose } from '../config/main';
import { TYPE } from './StockItemTransaction';

var Schema = mongoose.Schema;

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
  initValue: Number,
  available: {
    type: Number,
    required: true,
  },
  transaction: [{
    type: Schema.Types.ObjectId,
    ref: 'StockItemTransaction'
  }]
},
  {
    timestamps: true
  });

StockItemSchema.pre('save', function (next) {
  if (this.isNew) {
    this.initValue = this.available;
  }
  return next();
});

StockItemSchema.methods.reEval = async function () {
  console.log("Stock Item reEval");
  const item = (await StockItem.populate(this, 'transaction')).toObject();
  const { transaction } = item;
  let available = item.initValue;
  for (let i = 0; i < transaction.length; i++) {
    const t = transaction[i];
    if (t.type === String(TYPE.DEBIT)) {
      available -= t.quantity;
    }
    else if (t.type === String(TYPE.CREDIT)) {
      available += t.quantity;
    }
    else {
      throw new Error("Unknown Transaction TYPE");
    }
  }
  return this.update({
    available
  }, { new: true });
};
export const StockItem = mongoose.model("StockItem", StockItemSchema);
