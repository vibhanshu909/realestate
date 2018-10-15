import Activity from '../models/Activity';
// import AuthDirective from '../directives/auth_directive';
import { isAdmin, isManager } from '../config/permissions';
import crud from './crud';
export const Activities = crud(Activity);

const typeDefs = `
    type Activity {
      id: ID!
      user: User!
      activity: String!
      arguments: JSON!
      result: JSON!
      createdAt: String!
      updatedAt: String!
      count: Int!
    }
`;

// Queries allowed in graphql
const QuerySchema = `
  activities(limit: Int, skip: Int = 0): [Activity]
  activity(id: String!): Activity    
`;

// Query resolvers

const RootQuery = {
  activities: isAdmin.createResolver((_, args, ctx) => {
    ctx.data = {
      count: Activity.countDocuments(),
    };
    return Activities.all({ ...args, query: {} }).populate('user');
  }),
  activity: isManager.createResolver((_, args, ctx) => {
    return Activities.find(args).populate('user');
  }),
};

const TypeResolvers = {
  Activity: {
    count: (_, args, ctx) => {
      return ctx.data.count;
    }
  }
};

// Mutations allowed in graphql
const MutationSchema = `  
`;

// Mutation resolvers
const RootMutation = {  
}

export default { typeDefs, QuerySchema, MutationSchema, RootQuery, RootMutation, TypeResolvers };
