import express from 'express';
import cron from 'node-cron';
import logger from 'morgan';
import cors from 'cors';
import graphqlConfig from './config/graphql';
import propertyTask from './tasks/property';
import { createConn } from './config/db';

const PORT = process.env.PORT;

(async function () {
  const conn = await createConn()
  // Initialize the app
  const app = express();

  app.use(logger('dev'));

  const whitelist = ['https://kka.easylucknow.com'].concat(process.env.NODE_ENV === 'development' ? ['*'] : [])
  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.includes('*') || whitelist.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error(`${origin} not allowed by CORS`))
      }
    },
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "authorization"]
  }

  app.use(cors(corsOptions));

  graphqlConfig(app);

  app.disable('x-powered-by');

  const staticFolder = "build/";
  app.use(express.static(staticFolder));
  app.use('*', express.static(staticFolder));

  cron.schedule("0 6 * * *", async function () {
    console.log("running task 06:00 AM");
    propertyTask();
  });
  const server = app.listen(PORT, () => {
    console.log(`CORS-enabled web server listening on port ${server.address().port} [${app.env}]`);
    console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
  })
})()