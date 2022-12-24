import { mongoose } from '../config/main';

var Schema = mongoose.Schema;

export const TYPE = {
    CREDIT: 1,
    DEBIT: 0,
};

const AccountSchema = Schema({
    totalReceivedAmount: {
        type: Number,
        default: 0
    },
    spent: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    },
    histroy: {
        type: Schema.Types.ObjectId,
        ref: "Transaction"
    }
},
    {
        timestamps: true
    });


AccountSchema.methods.credit = async function (amount: $TSFixMe) {
    await this.histroy.credit(amount);
    return this.update({}, { $set: { totalReceivedAmount: this.totalReceivedAmount + amount, balance: this.balance + amount } });
}

AccountSchema.methods.debit = async function (amount: $TSFixMe, to: $TSFixMe) {
    await this.histroy.debit(amount, to);
    return this.update({}, { $set: { spent: this.spent - amount, balance: this.balance - amount } });
}

const Account = mongoose.model("Account", AccountSchema);
export default Account;
