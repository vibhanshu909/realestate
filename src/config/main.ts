// @ts-expect-error TS(7016): Could not find a declaration file for module 'mong... Remove this comment to see the full error message
import db from 'mongoose';

const database = process.env.ENV === "testing" ? "realestate_testing" : "realestate";
const config = {
    secret: "+4qqu4ot3c61((zq!f@!*#60j2eb%(_(s#f+h-!xs+48o*#sgf7o>v`(KHN'>T|w83Z2v]MT_#g?<o~)LEJ,ADu]sQXps&=",
    database: 'mongodb://developer_codemitter:dejVOjrJJG2JUzCb@realestatecluster-shard-00-00-c1pfm.mongodb.net:27017,realestatecluster-shard-00-01-c1pfm.mongodb.net:27017,realestatecluster-shard-00-02-c1pfm.mongodb.net:27017/realestate_production?ssl=true&replicaSet=RealEstateCluster-shard-0&authSource=admin',
};

// mongoose.Promise = global.Promise;
// Connecting to the database
db.connect(config.database, { useNewUrlParser: true })
    .then(() => {
        console.log("Successfully connected to the database", database);
    }).catch((err: $TSFixMe) => {
        console.log('Could not connect to the database. Exiting now...');
        process.exit();
    });
db.set('debug', true);
export const mongoose = db;
export const ObjectId = mongoose.Schema.Types.ObjectId;
export default config;
