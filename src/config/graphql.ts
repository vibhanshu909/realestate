import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import bodyParser from "body-parser";
import { makeExecutableSchema } from "graphql-tools";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'grap... Remove this comment to see the full error message
import GraphQLJSON from "graphql-type-json";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'json... Remove this comment to see the full error message
import jwt from "jsonwebtoken";
import Activities from "../connectors/activities";
import Metrics from "../connectors/metric";
import Properties from "../connectors/properties";
import SiteEntries from "../connectors/siteEntries";
import Sites from "../connectors/sites";
import Users from "../connectors/users";
import { User } from "../models/User";

export async function verifyToken(token: $TSFixMe) {
  let user, expired;
  try {
    const obj = await jwt.verify(token, process.env.SECRET, {
      maxAge: "1y"
    });
    user = await User.findOne({ _id: obj.id });
  } catch (e) {
    expired = true;
  }
  return { user: user || null, expired: expired || false };
}

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
const resolvers = Object.assign(
  {},
  {
    Query: Object.assign(
      {},
      Users.RootQuery,
      Sites.RootQuery,
      SiteEntries.RootQuery,
      Properties.RootQuery,
      Activities.RootQuery,
      Metrics.RootQuery
    ),
    Mutation: Object.assign(
      {},
      Users.RootMutation,
      Sites.RootMutation,
      SiteEntries.RootMutation,
      Properties.RootMutation,
      Activities.RootMutation,
      Metrics.RootMutation
    ),
    JSON: GraphQLJSON
  },
  Users.TypeResolvers,
  Sites.TypeResolvers,
  SiteEntries.TypeResolvers,
  Properties.TypeResolvers,
  Activities.TypeResolvers,
  Metrics.TypeResolvers
);

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
  // schemaDirectives: Object.assign({}, Users.SchemaDirectives)
});

export default function(app: $TSFixMe) {
  // The GraphQL endpoint
  app.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress(async req => {
      let context = {
        req,
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        user: req.user || null,
        expired: false
      };
      // let fun = null;
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      if (req.headers.authorization) {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        const token = req.headers.authorization;
        // fun = fetchGraphql({
        //   authorization: token,
        // })
        context = {
          ...context,
          ...(await verifyToken(token))
          // fetchGraphql: fun,
        };
      } else {
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        req.user = null;
      }
      // var waitTill = new Date(new Date().getTime() + 2 * 1000);
      // while(waitTill > new Date()){}

      return {
        schema,
        context
        // tracing: true,
        // cacheControl: true
      };
    })
  );

  // GraphiQL, a visual editor for queries
  app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
}
