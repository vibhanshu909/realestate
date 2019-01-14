import db from 'mongoose';

const database = process.env.ENV === "testing" ? "realestate_testing" : "realestate";
const config = {
    secret: "+4qqu4ot3c61((zq!f@!*#60j2eb%(_(s#f+h-!xs+48o*#sgf7o>v`(KHN'>T|w83Z2v]MT_#g?<o~)LEJ,ADu]sQXps&=",
    database: `mongodb://mongo:27017/${database}`,
};

// mongoose.Promise = global.Promise;
// Connecting to the database
db.connect(config.database, { useNewUrlParser: true })
    .then(() => {
        console.log("Successfully connected to the database", database);
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...');
        process.exit();
    });
// db.set('debug', true);
export const mongoose = db;
export const ObjectId = mongoose.Schema.Types.ObjectId;
export default config;
