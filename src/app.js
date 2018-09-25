import express from 'express';
import cron from 'node-cron';
import request from 'request';
import logger from 'morgan';
import cors from 'cors';
import graphqlConfig from './config/graphql';
import { getDefaultSettings } from 'http2';

// Initialize the app
const app = express();

app.use(logger('dev'));

var whitelist = ['https://kka.easylucknow.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) !== -1) {
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
const options = {
  maxage: '1h',
  index: "index.html",
  // setHeaders: function (res, path, stat) {
  //   res.set('Content-Encoding', 'gzip');
  // }
};

app.use('/', express.static(staticFolder, options));
app.use('/*', express.static(staticFolder, options));

cron.schedule("* 6 * * *", async function () {
  console.log("running a task every minute");
  let { Properties } = await import("./connectors/properties");
  let result = await Properties.all({
    query: {
      nextDueDate: new Date((function () {
        const now = new Date();
        const y = now.getFullYear();
        const m = now.getMonth() + 1;
        const d = now.getDate();
        return y + "-" +
          (m < 10 ? "0" + m : m) + "-" +
          (d < 10 ? "0" + d : d);
      })())
    }
  });
  console.log(result);
  const userid = "9984432113";
  const password = "@Iamvsquare909";
  const apiKey = "vsquakm8ZxrJGnPeQbHvMq9o";
  result.forEach(e => {
    const to = "8574684716";
    const msg = `
    Payment is due from ${e.buyer} of ${e.name}.
    Price: ${e.price}
    Total Received Amount: ${e.totalReceivedAmount}
    Balance: ${e.price - e.totalReceivedAmount}
    `;
  
    request(`https://smsapi.engineeringtgr.com/send/?Mobile=${userid}&Password=${password}&Message=${msg}&To=${to}&Key=${apiKey}`,
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body) // Print the google web page.
        }
      }
    );
  })
});
export default app;
