// @ts-expect-error TS(7016): Could not find a declaration file for module 'cors... Remove this comment to see the full error message
import cors from "cors";
import express from "express";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'morg... Remove this comment to see the full error message
import logger from "morgan";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'node... Remove this comment to see the full error message
import cron from "node-cron";
import { createConn } from "./config/db";
import graphqlConfig from "./config/graphql";
import propertyTask from "./tasks/property";

const PORT = process.env.PORT;

(async function() {
  const conn = await createConn();
  // Initialize the app
  const app = express();

  app.use(logger("dev"));

  // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
  const whitelist = JSON.parse(process.env.WHITELIST_DOMAINS).concat(
    process.env.NODE_ENV === "development" ? ["*"] : []
  );
  const corsOptions = {
    origin: function(origin: $TSFixMe, callback: $TSFixMe) {
      if (!origin || whitelist.includes("*") || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`${origin} not allowed by CORS`));
      }
    },
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "authorization"]
  };

  app.use(cors(corsOptions));

  graphqlConfig(app);

  app.disable("x-powered-by");

  const staticFolder = "frontend/";
  app.use(express.static(staticFolder));
  app.use("*", express.static(staticFolder));

  cron.schedule("0 6 * * *", async function() {
    console.log("running task 06:00 AM");
    propertyTask();
  });
  const server = app.listen(PORT, () => {
    console.log(
      // @ts-expect-error TS(2339): Property 'port' does not exist on type 'string | A... Remove this comment to see the full error message
      `CORS-enabled web server listening on port ${server.address().port} [${
        // @ts-expect-error TS(2339): Property 'env' does not exist on type 'Express'.
        app.env
      }]`
    );
    console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
  });
})();
