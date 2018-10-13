import { mongoose } from '../config/main';

var Schema = mongoose.Schema;

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
