import db from 'mongoose';

const config = {
    secret: "+4qqu4ot3c61((zq!f@!*#60j2eb%(_(s#f+h-!xs+48o*#sgf7o>v`(KHN'>T|w83Z2v]MT_#g?<o~)LEJ,ADu]sQXps&=",
    database: 'mongodb://developer_codemitter:dejVOjrJJG2JUzCb@realestatecluster-shard-00-00-c1pfm.mongodb.net:27017,realestatecluster-shard-00-01-c1pfm.mongodb.net:27017,realestatecluster-shard-00-02-c1pfm.mongodb.net:27017/realestate_testing?ssl=true&replicaSet=RealEstateCluster-shard-0&authSource=admin',    
};

// mongoose.Promise = global.Promise;
// Connecting to the database
db.connect(config.database, { useNewUrlParser: true })
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
