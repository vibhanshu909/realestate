import { Site } from '../models/site';
import { isAdmin, isManager } from '../config/permissions';
import { ROLES } from '../models/user';
import crud from './crud';
import { Users } from './users';

export const Sites = crud(Site);

const typeDefs = `
    type Total {
        mistri: Int!
        labour: Int!
        eit: Int!
        morang: Int!
        baalu: Int!
        githi: Int!
        cement: Int!
        saria: Int!
        dust: Int!
        other: Int!
        other2: Int!
    }
    type Site {
        id: ID!
        name: String!
        location: String!
        manager: User
        entryCount: Int!
        managerSpentAmount: Float!
        cost: Float!
        entries: [SiteEntry!]
        total: Total!
        count: Int!        
        createdAt: String!
        updatedAt: String!
    }

    input SiteInput {
        name: String!
        location: String!
        manager: String!
        createdAt: String!
    }

    input SiteUpdateInput {
        name: String!
        location: String!        
    }
`;

// Queries allowed in graphql
const QuerySchema = `
    sites(limit: Int, skip: Int = 0): [Site]
    site(id: String!): Site    
`;

// Query resolvers
const TypeResolvers = {
    Site: {
        count: async (_, args, ctx) => {            
            if(!ctx.result){                
                ctx.result = (ctx.data && ctx.data.count) || _.entries.length;
            }
            return ctx.result;
        },
        entryCount: (_, args, ctx) => {
            return _.entries.length
        }
    }
};

const RootQuery = {
    sites: isManager.createResolver(async (_, args, ctx) => {
        ctx.data = { count: await Site.countDocuments() };
        const { user } = ctx;
        let result;
        if (user.role == ROLES.ADMIN) {
            result = await Promise.resolve(Sites.all(args).populate('manager'));
        }
        else {
            result = await Sites.all({ query: { _id: { $in: user.sites } }, ...args }).populate('manager');
            ctx.data = { count: result.length };
        }
        return result;
    }),
    site: isManager.createResolver((_, args, ctx) => {
        ctx.data = { count: Site.countDocuments() };
        const { user } = ctx;
        if (user.role == ROLES.ADMIN) {
            return Sites.find(args).populate('manager');
        }
        else {
            if (args.id in user.sites) {
                return Sites.find(args).populate('manager');
            }
            else {
                throw new Error("Site doesn't belong to user");
            }
        }
    })
};

// Mutations allowed in graphql
const MutationSchema = `
    createSite(data: SiteInput!): Site
    updateSite(id: String!, data: SiteUpdateInput!): Site
    deleteSites(ids: [String!]!): Status    
`;

// Mutation resolvers
const RootMutation = {
    createSite: isAdmin.createResolver(async (_, { data }, ctx) => {
        console.log("args....", data);
        let site = await Sites.create(data);
        const user = await Users.find({ id: data.manager });
        user.sites.push(site);
        user.save();
        return Site.populate(site, { path: "manager" });
    }),
    updateSite: isAdmin.createResolver(async (_, { id, data }, ctx) => {
        // return (await .populate('manager');
        return Site.populate(await Sites.update({ id, ...data }), { path: "manager" });
        // const oldSite = await Sites.find({ id });
        // console.log(data);
        // if (oldSite.manager === data.manager) {
        //     return Sites.update({ id, ...data });
        // }
        // const oldUser = await Users.find({ id: oldSite.manager });
        // oldUser.sites.pull(id);
        // const user = await Users.find({ id: data.manager });
        // let result = await Sites.update({ id, ...data });
        // user.sites.push(result);
        // oldUser.save();
        // user.save();
        // return result;
    }),
    deleteSites: isAdmin.createResolver(async (_, args, ctx) => {
        await Sites.remove(args);
        return { status: true }
    }),
}

// const SchemaDirectives = {
//     auth: AuthDirective,
//     authorized: AuthDirective,
//     authenticated: AuthDirective,
// };

export default { typeDefs, QuerySchema, MutationSchema, RootQuery, RootMutation, TypeResolvers };
