import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';
import jwt from 'jsonwebtoken';

import config from './main';
import { User } from '../models/User';

import Users from '../connectors/users';
import Sites from '../connectors/sites';
import SiteEntries from '../connectors/siteEntries';
import Properties from '../connectors/properties';
import StockItems from '../connectors/stocks';
import StockSuppliers from '../connectors/stockSuppliers';
import Activities from '../connectors/activities';
import Metrics from '../connectors/metric';

export default function (app) {
  const typeDefs = `        
  scalar JSON
  type Status {
    status: Boolean!
  }

  ${Users.typeDefs}
  ${Sites.typeDefs}
  ${SiteEntries.typeDefs}
  ${Properties.typeDefs}
  ${StockItems.typeDefs}
  ${StockSuppliers.typeDefs}
  ${Activities.typeDefs}
  ${Metrics.typeDefs}

  # the schema allows the following query:
  type Query {
    ${Users.QuerySchema}
    ${Sites.QuerySchema}
    ${SiteEntries.QuerySchema}
    ${Properties.QuerySchema}
    ${StockItems.QuerySchema}
    ${StockSuppliers.QuerySchema}
    ${Activities.QuerySchema}
    ${Metrics.QuerySchema}
  }

  # this schema allows the following mutation:
  type Mutation {
    ${Users.MutationSchema}
    ${Sites.MutationSchema}
    ${SiteEntries.MutationSchema}
    ${Properties.MutationSchema}
    ${StockItems.MutationSchema}
    ${StockSuppliers.MutationSchema}
    ${Activities.MutationSchema}
    ${Metrics.MutationSchema}
  }
`;
  const resolvers = Object.assign({}, {
    Query: Object.assign({},
      Users.RootQuery,
      Sites.RootQuery,
      SiteEntries.RootQuery,
      Properties.RootQuery,
      StockItems.RootQuery,
      StockSuppliers.RootQuery,
      Activities.RootQuery,
      Metrics.RootQuery,
    ),
    Mutation: Object.assign({},
      Users.RootMutation,
      Sites.RootMutation,
      SiteEntries.RootMutation,
      Properties.RootMutation,
      StockItems.RootMutation,
      StockSuppliers.RootMutation,
      Activities.RootMutation,
      Metrics.RootMutation,
    ),
    JSON: GraphQLJSON,
  },
    Users.TypeResolvers,
    Sites.TypeResolvers,
    SiteEntries.TypeResolvers,
    Properties.TypeResolvers,
    StockItems.TypeResolvers,
    StockSuppliers.TypeResolvers,
    Activities.TypeResolvers,
    Metrics.TypeResolvers,
  );

  // Put together a schema
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    // schemaDirectives: Object.assign({}, Users.SchemaDirectives)
  });
  // The GraphQL endpoint
  app.use('/graphql', bodyParser.json(), graphqlExpress(async (req) => {
    const context = {
      user: req.user || null,
      expired: false,
    };
    // console.log(req.headers);
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      try {
        const obj = await jwt.verify(token, config.secret, {
          maxAge: "1y"
        });
        context.user = await User.findOne({ _id: obj.id });
      } catch (e) {
        context.expired = true;
      }
    }
    else {
      req.user = null;
    }
    // var waitTill = new Date(new Date().getTime() + 2 * 1000);
    // while(waitTill > new Date()){}

    return {
      schema,
      context
      // tracing: true,
      // cacheControl: true
    }
  }));

  // GraphiQL, a visual editor for queries
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}
