import AuthDirective from '../directives/auth_directive';
import { isAdmin, isManager } from '../config/permissions';
import { Users } from './users';

const typeDefs = `
    type UsersMetric {
        count: Int!
        receivedAmount: Float!
        spentAmount: Float!
        balaceAmount: Float!        
    }
    type SitesMetric {
        count: Int!
        cost: Float!
        managerSpentAmount: Float!
        entries: Float!        
    }
    type PropertiesMetric {
        count: Int!
        totalPrice: Float!
        totalReceived: Float!
        upcoming: Property!
    }    
`;

// Queries allowed in graphql
const QuerySchema = `
    usersMetric: UsersMetric!
`;

// sitesMetric(): SitesMetric!
// propertiesMetric(): PropertiesMetric!

// Query resolvers

const RootQuery = {
  usersMetric: isAdmin.createResolver(async (_: $TSFixMe, args: $TSFixMe, ctx: $TSFixMe) => {
    const result = {
      count: (await Users.model.countDocuments()) - 1,
      receivedAmount: 0,
      spentAmount: 0,
      balaceAmount: 0
    };
    const users = await Users.all({ ...args, query: {} });
    users.map((u: $TSFixMe) => {
      result.receivedAmount += u.totalReceivedAmount;
      result.spentAmount += u.spent;
      result.balaceAmount += u.balance;
    })
    return result;
  }),
};

const TypeResolvers = {
};

// Mutations allowed in graphql
const MutationSchema = `
`;

// Mutation resolvers
const RootMutation = {
}

export default { typeDefs, QuerySchema, MutationSchema, RootQuery, RootMutation, TypeResolvers };
