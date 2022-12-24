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
        // @ts-expect-error TS(2550): Property 'values' does not exist on type 'ObjectCo... Remove this comment to see the full error message
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

TransactionSchema.methods.credit = function(amount: $TSFixMe, from = "ADMIN"){
    return this.update({}, {$set: {amount, type: TYPE.CREDIT, from}});
}

TransactionSchema.methods.debit = function(amount: $TSFixMe, to: $TSFixMe){
    return this.update({}, {$set: {amount, type: TYPE.DEBIT, to}});
}

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
