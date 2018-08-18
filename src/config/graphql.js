import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import jwt from 'jsonwebtoken';

import config from './main';
import User from '../models/user';

import Users from '../connectors/users';
import Sites from '../connectors/sites';

export default function(app){
    const typeDefs = `
        ${Users.typeDefs}
        ${Sites.typeDefs}

        # the schema allows the following query:
        type Query {
            ${Users.QuerySchema}
            ${Sites.QuerySchema}
        }

        # this schema allows the following mutation:
        type Mutation {
            ${Users.MutationSchema}
            ${Sites.MutationSchema}
        }
    `;
    const resolvers = Object.assign({}, {
            Query: Object.assign({},
                Users.RootQuery,
                Sites.RootQuery,
            ),
            Mutation: Object.assign({},
                Users.RootMutation,
                Sites.RootMutation,
            ),
        },
        Users.Query,
        Sites.Query,
        Users.Mutation,
        Sites.Mutation,
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
        if(req.headers.authorization){
            const token = req.headers.authorization;
            try {
                const obj = await jwt.verify(token, config.secret,  {
                    maxAge: "1y"
                });
                context.user = await User.findOne({ _id: obj.id });
            } catch (e) {
                context.expired = true;
            }
        }
        else{
            req.user = null;
        }
        // var waitTill = new Date(new Date().getTime() + 2 * 1000);
        // while(waitTill > new Date()){}
        return {
            schema ,
            context
            // tracing: true,
            // cacheControl: true
        }
    }));

    // GraphiQL, a visual editor for queries
    app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
}
