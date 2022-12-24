// @ts-expect-error TS(7016): Could not find a declaration file for module 'json... Remove this comment to see the full error message
import jwt from 'jsonwebtoken';
import { User, ROLES } from '../models/User';
import AuthDirective from '../directives/auth_directive';
import { isAdmin, isManager, isAuth } from '../config/permissions';
import crud from './crud';
import { verifyToken } from '../config/graphql';
import { Sites } from './sites'

export const Users = crud(User);

// @ts-expect-error TS(2339): Property 'login' does not exist on type '{ all: ({... Remove this comment to see the full error message
Users.login = async (params: $TSFixMe) => {
    const { username, password } = params;
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error("Can't find user");
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
        const { _id } = user;
        const token = jwt.sign({ id: _id, username: user.username, role: user.role }, process.env.SECRET, {
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
        contact: Float!
        sites: [Site!]!
        siteCount: Int!
        totalSitesCost: Float!
        totalReceivedAmount: Float!
        spent: Float!
        balance: Float!
        history: [UserCreditHistory]!
        createdAt: String!
        updatedAt: String!
        count: Int!
        stockPermission: Boolean!
        role: String!
    }

    type UserCreditHistory {
        amount: Float!
        type: String!
        balance: Float
        createdAt: String!
        count: Int!
        note: String!
    }

    input UserInput {
        username: String!
        password: String!
        totalReceivedAmount: Float!
        stockPermission: Boolean!
    }
    input UserUpdateInput {
        username: String!
        stockPermission: Boolean!
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
    me: User
    userCreditHistory(id: String!, limit: Int, skip: Int = 0): [UserCreditHistory!]
`;

// Query resolvers

const RootQuery = {
    users: isAdmin.createResolver(async (_: $TSFixMe, args: $TSFixMe, ctx: $TSFixMe) => {
        ctx.data = {
            count: await User.countDocuments(),
        };
        return Users.all({ ...args, query: { role: { $ne: ROLES.ADMIN } } });
    }),
    userCreditHistory: isManager.createResolver(async (_: $TSFixMe, args: $TSFixMe, ctx: $TSFixMe) => {
        const { id, skip, limit } = args;
        const user = await Users.find(args);
        ctx.data = {
            count: user.history.length,
        };
        return (await Users.find(args).select({ 'history': { '$slice': [skip, limit] } })).history;
    }),
    user: isManager.createResolver((_: $TSFixMe, args: $TSFixMe, ctx: $TSFixMe) => {
        return Users.find(args);
    }),
    me: isAuth.createResolver((_: $TSFixMe, args: $TSFixMe, ctx: $TSFixMe) => {
        return ctx.user
    }),
};

const TypeResolvers = {
    User: {
        count: (_: $TSFixMe, args: $TSFixMe, ctx: $TSFixMe) => {
            if (!ctx.result) {
                ctx.result = ctx.data.count - 1;
            }
            return ctx.result;
        },
        sites: async (_: $TSFixMe, args: $TSFixMe, ctx: $TSFixMe) => {
            return (await User.populate(_, 'sites')).sites;
        },
        siteCount: async (_: $TSFixMe, args: $TSFixMe, ctx: $TSFixMe) => {
            const result = (await Sites.model.find({ manager: _.id, $or: [{ isDeleted: false }, { isDeleted: null }] }))            
            return result.length
        },
        totalSitesCost: async (_: $TSFixMe, args: $TSFixMe, ctx: $TSFixMe) => {
            const user = await User.populate(_, "sites");
            return user.toObject().sites.reduce((first: $TSFixMe, second: $TSFixMe) => {
                return first + second.cost;
            }, 0);
        }
    },
    UserCreditHistory: {
        count: (_: $TSFixMe, args: $TSFixMe, ctx: $TSFixMe) => {
            if (!ctx.result) {
                ctx.result = ctx.data.count;
            }
            return ctx.result;
        },
    }
};

// Mutations allowed in graphql
const MutationSchema = `
    createUser(data: UserInput!): User
    updateUser(id: ID!, data: UserUpdateInput!): User
    deleteUsers(ids: [String!]!): Status
    login(data: LoginInput!): Login
    credit(id: String!, amount: Float!, note: String): UserCreditHistory!
    updateUserContact(id: String!, contact: Float!): User
    updateUserPassword(id: String!, data: UserPasswordInput!): Status
`;

// Mutation resolvers
const RootMutation = {
    createUser: isAdmin.createResolver(async (_: $TSFixMe, {
        data
    }: $TSFixMe, ctx: $TSFixMe) => {
        const result = await Users.create(data);
        ctx.data = {
            count: await User.count({}),
        };
        return result;
    }),
    updateUser: isManager.createResolver(async (_: $TSFixMe, {
        id,
        data
    }: $TSFixMe, ctx: $TSFixMe) => {
        ctx.data = {
            count: await User.count({}),
        };
        return Users.update({ id, ...data });
    }),
    deleteUsers: isAdmin.createResolver(async (_: $TSFixMe, args: $TSFixMe) => {
        await Users.remove(args);
        return { status: true };
    }),
    login: (_: $TSFixMe, {
        data
    // @ts-expect-error TS(2339): Property 'login' does not exist on type '{ all: ({... Remove this comment to see the full error message
    }: $TSFixMe) => Users.login(data),
    credit: isAdmin.createResolver(async (_: $TSFixMe, {
        id,
        ...rest
    }: $TSFixMe) => {
        let user = await Users.find({ id });
        await user.credit(rest);
        return await (await Users.find({ id })).toObject().history[0];
    }),
    updateUserContact: isManager.createResolver(async (_: $TSFixMe, {
        id,
        contact
    }: $TSFixMe) => {
        await User.findByIdAndUpdate({ _id: id }, { contact });
        return Users.find({ id });
    }),
    updateUserPassword: isManager.createResolver(async (_: $TSFixMe, {
        id,
        data
    }: $TSFixMe, ctx: $TSFixMe) => {
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
