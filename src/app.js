import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import graphqlConfig from './config/graphql';

// Initialize the app
const app = express();

app.use(logger('dev'));

var whitelist = ['http://kka.easylucknow.com', 'https://kka.easylucknow.com']
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
// app.use('/*', static);

export default app;
