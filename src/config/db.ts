// @ts-expect-error TS(7016): Could not find a declaration file for module 'mong... Remove this comment to see the full error message
import mongoose from 'mongoose';

export const createConn = async () => {
    // mongoose.Promise = global.Promise;
    // Connecting to the database
    console.log(process.env.MONGODB_URI)
    const db = await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    console.log("Successfully connected to the database", process.env.MONGODB_URI);
    db.set('debug', true);
    return db
}
export const ObjectId = mongoose.Schema.Types.ObjectId;
export default mongoose;
