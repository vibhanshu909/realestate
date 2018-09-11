import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config/main';
import AuthDirective from '../directives/auth_directive';
import { isAdmin, isManager } from '../config/permissions';
import crud from './crud';
export const Users = crud(User);

Users.login = async (params) => {
    console.log(params);
    const { username, password } = params;
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error("Can't find user");
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
        const { _id } = user;
        const token = jwt.sign({ id: _id, role: user.role }, config.secret, {
            expiresIn: "1y"
        });
        return { token };
    }
    else {
        throw new Error("Incorrect Password");
    }
};

const typeDefs = `
    type User {
        id: ID!
        username: String!
        password: String!        
        totalReceivedAmount: Float!
        spent: Float!
        balance: Float!
        siteCount: Int!
        totalSitesCost: Int!
        createdAt: String!
        updatedAt: String!
        count: Int!
    }
    input UserInput {
        username: String!
        password: String!
        totalReceivedAmount: Float!
    }
    input LoginInput {
        username: String!
        password: String!     
    }

    type Login{
        token: String!
    }
`;

// Queries allowed in graphql
const QuerySchema = `
    users(limit: Int, skip: Int = 0): [User]
    user(id: String!): User
`;

// Query resolvers
const Query = {
    User: {
        count: (_, args, ctx) => {
            // console.log("count....", ctx.count);
            return ctx.data.count;
        },
        siteCount: (_, args, ctx) => {
            return _.sites.length;
        },
        totalSitesCost: async (_, args, ctx) => {            
            let user = await User.populate(_, "sites");            
            return user.toObject().sites.reduce((first, second) => {
                let result = first + second.cost;
                console.log(result);
                return result;
            }, 0);            
        }
    },
};

const RootQuery = {
    users: isAdmin.createResolver((_, args, ctx) => {
        ctx.data = {
            count: User.count({}),
        };
        return Users.all({ ...args, query: { username: { $ne: "admin" } } })
    }),
    user: isManager.createResolver((_, args, ctx) => {
        return Users.find(args);
    }),
};

// Mutations allowed in graphql
const MutationSchema = `
    createUser(data: UserInput!): User
    updateUser(id: String!, data: UserInput!): User
    deleteUser(id: String!): User
    login(data: LoginInput!): Login
    credit(id: String!, amount: Float!): Status
`;

// Mutation resolvers
const RootMutation = {
    createUser: isAdmin.createResolver((_, { data }) => Users.create(data)),
    updateUser: isManager.createResolver((_, { id, data }) => Users.update({ id, ...data })),
    deleteUser: isAdmin.createResolver((_, args) => Users.remove(args)),
    login: (_, { data }) => Users.login(data),
    credit: isAdmin.createResolver(async (_, { id, amount }) => {
        let user = await (await Users.find({ id })).credit(amount);        
        return { status: true };
    })
}
const Mutation = {

};
// const SchemaDirectives = {
//     auth: AuthDirective,
//     authorized: AuthDirective,
//     authenticated: AuthDirective,
// };

export default { typeDefs, QuerySchema, MutationSchema, RootQuery, RootMutation, Query, Mutation };
