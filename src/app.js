import express from 'express';
import cron from 'node-cron';
import logger from 'morgan';
import cors from 'cors';
import graphqlConfig from './config/graphql';
import propertyTask from './tasks/property';

// Initialize the app
const app = express();

app.use(logger('dev'));

var whitelist = ['*', 'https://kka.easylucknow.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes('*') || whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "authorization"]
}

app.use(cors(corsOptions));

graphqlConfig(app);

const staticFolder = "build/";

app.disable('x-powered-by');
app.use(express.static(staticFolder));
app.use('*', express.static(staticFolder));

cron.schedule("0 6 * * *", async function () {
  console.log("running task 06:00 AM");
  propertyTask();
});
export default app;
