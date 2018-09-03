import { mongoose } from '../config/main';

var Schema = mongoose.Schema;

export const TYPE = {
    CREDIT: 1,
    DEBIT: 0,
};

const TransactionSchema = Schema({
    amount: {
        type: Number,
        default: 0
    },
    type: {
        type: String,
        required: true,
        enum: Object.values(ROLES),
        default: TYPE.DEBIT
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: ""
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Site',
        default: ""
    }
},
    {
        timestamps: true
    });

TransactionSchema.methods.credit = function(amount, from = "ADMIN"){
    return this.update({}, {$set: {amount, type: TYPE.CREDIT, from}});
}

TransactionSchema.methods.debit = function(amount, to){
    return this.update({}, {$set: {amount, type: TYPE.DEBIT, to}});
}

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
