import db from 'mongoose';

const config = {
    secret: "+4qqu4ot3c61((zq!f@!*#60j2eb%(_(s#f+h-!xs+48o*#sgf7o>v`(KHN'>T|w83Z2v]MT_#g?<o~)LEJ,ADu]sQXps&=",
    database: 'mongodb://localhost:27017/realestate',
    // database: "mongodb://vibhanshu:vibhanshu@testing-pr3rm.mongodb.net/real_estate"
    // database: "mongodb://vibhanshu:vibhanshu@testing-shard-00-00-pr3rm.mongodb.net:27017,testing-shard-00-01-pr3rm.mongodb.net:27017,testing-shard-00-02-pr3rm.mongodb.net:27017/test?ssl=true&replicaSet=testing-shard-0&authSource=admin"
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
// db.set('debug', true);
console.log("congig/main");
export const mongoose = db;
export default config;
