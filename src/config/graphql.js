import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';
import GraphQLJSON from 'graphql-type-json';
import jwt from 'jsonwebtoken';
import Activities from '../connectors/activities';
import Metrics from '../connectors/metric';
import Properties from '../connectors/properties';
import SiteEntries from '../connectors/siteEntries';
import Sites from '../connectors/sites';
import Users from '../connectors/users';
import { User } from '../models/User';

export async function verifyToken(token) {
  let user, expired
  try {
    const obj = await jwt.verify(token, process.env.SECRET, {
      maxAge: "1y"
    });
    user = await User.findOne({ _id: obj.id });
  } catch (e) {
    expired = true;
  }
  return { user: user || null, expired: expired || false }
}
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
        ${Activities.typeDefs}
        ${Metrics.typeDefs}

        # the schema allows the following query:
        type Query {
            ${Users.QuerySchema}
            ${Sites.QuerySchema}
            ${SiteEntries.QuerySchema}
            ${Properties.QuerySchema}
            ${Activities.QuerySchema}
            ${Metrics.QuerySchema}
        }

        # this schema allows the following mutation:
        type Mutation {
            ${Users.MutationSchema}
            ${Sites.MutationSchema}
            ${SiteEntries.MutationSchema}
            ${Properties.MutationSchema}
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
      Activities.RootQuery,
      Metrics.RootQuery,
    ),
    Mutation: Object.assign({},
      Users.RootMutation,
      Sites.RootMutation,
      SiteEntries.RootMutation,
      Properties.RootMutation,
      Activities.RootMutation,
      Metrics.RootMutation,
    ),
    JSON: GraphQLJSON,
  },
    Users.TypeResolvers,
    Sites.TypeResolvers,
    SiteEntries.TypeResolvers,
    Properties.TypeResolvers,
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
    let context = {
      req,
      user: req.user || null,
      expired: false,
    };
    console.log(req.headers);
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      console.log(token)
      context = {
        ...context,
        ...await verifyToken(token)
      }
      console.log(context)
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
