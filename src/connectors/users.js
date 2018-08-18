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
    const user = await User.findOne({username});
    if(!user){
        throw new Error("Can't find user");
    }
    const isMatch = await user.comparePassword(password);
    if(isMatch){
        const { _id } = user;
        const token = jwt.sign( {id: _id, role: user.role}, config.secret, {
            expiresIn: "1y"
        });
        return { token };
    }
    else{
        throw new Error("Incorrect Password");
    }
};

const typeDefs = `
    type User {
        id: ID!
        username: String!
        password: String!
        createdAt: String!
        updatedAt: String!
        count: Int!
    }
    type Login{
        token: String!
    }
`;

// Queries allowed in graphql
const QuerySchema = `
    users(limit: Int!, skip: Int = 0): [User]
    user(id: String!): User
`;

// Query resolvers
const Query = {
    User: {
        count: (_, args, context, info) => {
            console.log("count....", context.count);
            return context.count;
        }
    },
};

const RootQuery = {
    users: isAdmin.createResolver((parent, args, context, info) => {
        context.count = User.count({});
        return Users.all(args)
    }),
    user: isAdmin.createResolver((parent, args, context, info) => Users.find(args)),
};

// Mutations allowed in graphql
const MutationSchema = `
    createUser(username: String!, password: String!):User
    updateUser(id: String!, username: String!, password: String!): User
    deleteUser(id: String!): User
    login(username: String!, password: String!): Login
`;

// Mutation resolvers
const RootMutation = {
    createUser: isAdmin.createResolver((parent, args, context, info) => Users.create(args)),
    updateUser: isManager.createResolver((parent, args, context, info) => Users.update(args)),
    deleteUser: isAdmin.createResolver((parent, args, context, info) => Users.remove(args)),
    login: (parent, args, context, info) => Users.login(args),
}
const Mutation = {

};
// const SchemaDirectives = {
//     auth: AuthDirective,
//     authorized: AuthDirective,
//     authenticated: AuthDirective,
// };

export default { typeDefs, QuerySchema,  MutationSchema, RootQuery, RootMutation, Query, Mutation };
