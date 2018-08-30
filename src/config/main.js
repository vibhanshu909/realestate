import db from 'mongoose';

const config = {
    secret: "+4qqu4ot3c61((zq!f@!*#60j2eb%(_(s#f+h-!xs+48o*#sgf7o>v`(KHN'>T|w83Z2v]MT_#g?<o~)LEJ,ADu]sQXps&=",
    database: 'mongodb://localhost:27017/realestate',
};

// mongoose.Promise = global.Promise;
// Connecting to the database
db.connect(config.database)
.then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
db.set('debug', true);
console.log("congig/main");
export const mongoose = db;
export default config;
