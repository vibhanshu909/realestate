import mongoose from "../config/db";
import DeletedProperty from "./Deleted/Property";

var Schema = mongoose.Schema;

const PropertySchema = Schema(
  {
    name: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    buyer: {
      type: String
    },
    buyerNumber: {
      type: Number
    },
    totalReceivedAmount: {
      type: Number,
      default: 0
    },
    balance: {
      type: Number,
      default: 0
    },
    nextDueDate: {
      type: Date,
      validate: {
        validator: function(val) {
          console.log("val =", val);
          if (val === " " || val === null) {
            return true;
          }
          return Date.now() <= new Date(val);
        },
        message: props => `${props.value} must be in future`
      }
    },
    note: String,
    history: [
      {
        amount: Number,
        balance: {
          type: Number
        },
        note: {
          type: String,
          default: ""
        },
        createdAt: {
          type: Date,
          default: () => new Date(new Date().toDateString())
        }
      }
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

PropertySchema.pre("save", async function(next) {
  if (this.isNew) {
    this.balance = this.price - this.totalReceivedAmount;
    this.history.push({ amount: this.totalReceivedAmount });
  }
  return next();
});

PropertySchema.pre("remove", async function() {
  const { __v, ...data } = this.toObject();
  await DeletedProperty.create(data);
});
// update
// PropertySchema.pre('update', async function (doc) {
//     if(this.balance !== 0 ){
//         if(this.nextDueDate < new Date())
//     }
//     let total = 0;
//     const site = await Site.populate(this, 'entries');
//     const { entries } = site.toObject();
//     entries.forEach(e => total += e.total);
//     this.cost = total;
// });

PropertySchema.methods.credit = async function(params) {
  const { amount, nextDueDate, note } = params;
  if (amount === 0) {
    return this;
  }
  return Property.findByIdAndUpdate(
    this.id,
    {
      totalReceivedAmount: this.totalReceivedAmount + amount,
      balance: this.balance - amount,
      nextDueDate,
      $push: {
        history: {
          $each: [
            {
              amount,
              balance: this.balance - amount,
              note
            }
          ],
          $position: 0
        }
      }
    },
    { new: true, runValidators: true }
  );
  // this.update({
  //   totalReceivedAmount: this.totalReceivedAmount + amount,
  //   balance: this.balance - amount,
  //   $push: {
  //     history: {
  //       $each: [{
  //         amount
  //       }],
  //       $position: 0
  //     },
  //   }
  // }, { new: true, runValidators: true });
};

// PropertySchema.methods.reEval = async function () {
//     const user = await User.populate(this, 'sites');
//     let managerSpentAmount = 0;
//     user.sites.forEach(e => managerSpentAmount += e.managerSpentAmount);
//     return this.update({ spent: managerSpentAmount, balance: this.totalReceivedAmount - managerSpentAmount });
// }

const Property = mongoose.model("Property", PropertySchema);
export default Property;
