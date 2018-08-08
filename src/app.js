import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import graphqlConfig from './config/graphql';

// Initialize the app
const app = express();

app.use(logger('dev'));

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "authorization"]
}

app.use(cors(corsOptions));

graphqlConfig(app);

export default app;
