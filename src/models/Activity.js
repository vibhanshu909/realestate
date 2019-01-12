import mongoose from '../config/db';

var Schema = mongoose.Schema;

// export const OPERATION = {
//   CREATE: 0,
//   UPDATE: 1,
//   DELETE: 2,  
// };

const ActivitySchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  activity: {
    type: String,
    required: true,
  },
  arguments: Object,
  result: {
    type: Object,
    required: true,
  }
},
  {
    timestamps: true
  });

const Activity = mongoose.model("Activity", ActivitySchema);
export default Activity;
