import jwt from 'jsonwebtoken';
import User, { ROLES } from '../models/user';
import config from '../config/main';
import AuthDirective from '../directives/auth_directive';
import { isAdmin, isManager } from '../config/permissions';
import crud from './crud';
export const Users = crud(User);

Users.login = async (params) => {    
    const { username, password } = params;
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error("Can't find user");
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
        const { _id } = user;
        const token = jwt.sign({ id: _id, username: user.username, role: user.role }, config.secret, {
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
        contact: Float!
        sites: [Site!]!
        siteCount: Int!
        totalSitesCost: Int!
        totalReceivedAmount: Float!
        spent: Float!
        balance: Float!
        history: [History]!
        createdAt: String!
        updatedAt: String!
        count: Int!
    }

    type History {
        amount: Int!
        createdAt: String!        
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

    input UserPasswordInput {
        currentPassword: String
        newPassword: String!        
    }

    type Login{
        token: String!
    }
`;

// Queries allowed in graphql
const QuerySchema = `
    users(limit: Int, skip: Int = 0): [User]
    user(id: String!): User
    userCreditHistory(id: String!, limit: Int, skip: Int = 0): User!
`;

// Query resolvers

const RootQuery = {
    users: isAdmin.createResolver(async (_, args, ctx) => {
        ctx.data = {
            count: await User.countDocuments(),
        };
        return Users.all({ ...args, query: { role: { $ne: ROLES.ADMIN } } })
    }),
    userCreditHistory: isManager.createResolver(async (_, args, ctx) => {
        const { id, skip, limit } = args;
        const user = await Users.find(args);
        ctx.data = {
            count: user.history.length,
        };
        return Users.find(args).select({ 'history': { '$slice': [skip, limit] } });        
    }),
    user: isManager.createResolver((_, args, ctx) => {
        return Users.find(args);
    }),
};

const TypeResolvers = {
    User: {
        count: async (_, args, ctx) => {
            if (!ctx.result) {
                ctx.result = ctx.data.count - 1;
            }
            return ctx.result;
        },
        sites: async (_, args, ctx) => {
            return (await User.populate(_, 'sites')).sites;
        },
        siteCount: (_, args, ctx) => {
            return _.sites.length;
        },
        totalSitesCost: async (_, args, ctx) => {
            const user = await User.populate(_, "sites");
            return user.toObject().sites.reduce((first, second) => {
                return first + second.cost;
            }, 0);
        }
    },
};

// Mutations allowed in graphql
const MutationSchema = `
    createUser(data: UserInput!): User
    updateUser(id: String!, data: UserInput!): User
    deleteUser(id: String!): User
    login(data: LoginInput!): Login
    credit(id: String!, amount: Float!): Status
    updateUserContact(id: String!, contact: Float!): User
    updateUserPassword(id: String!, data: UserPasswordInput!): Status
`;

// Mutation resolvers
const RootMutation = {
    createUser: isAdmin.createResolver(async (_, { data }, ctx) => {
        const result = await Users.create(data);
        ctx.data = {
            count: await User.count({}),
        };
        return result;
    }),
    updateUser: isManager.createResolver(async (_, { id, data }) => {
        ctx.data = {
            count: await User.count({}),
        };
        return Users.update({ id, ...data });
    }),
    deleteUser: isAdmin.createResolver((_, args) => Users.remove(args)),
    login: (_, { data }) => Users.login(data),
    credit: isAdmin.createResolver(async (_, { id, amount }) => {
        const user = await (await Users.find({ id })).credit(amount);
        return { status: true };
    }),
    updateUserContact: isManager.createResolver(async (_, { id, contact }) => {        
        await User.findByIdAndUpdate({ _id: id }, { contact });
        return Users.find({ id });
    }),
    updateUserPassword: isManager.createResolver(async (_, { id, data }, ctx) => {
        const user = await (await Users.find({ id }));        
        if (ctx.user.isAdmin()) {
            await user.resetPassword(data);
        }
        else {
            await user.changePassword(data);
        }
        return { status: true };
    })
}
// const SchemaDirectives = {
//     auth: AuthDirective,
//     authorized: AuthDirective,
//     authenticated: AuthDirective,
// };

export default { typeDefs, QuerySchema, MutationSchema, RootQuery, RootMutation, TypeResolvers };
