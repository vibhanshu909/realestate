import jwt from 'jsonwebtoken';
import {Site, SiteEntry} from '../models/site';
import config from '../config/main';
import AuthDirective from '../directives/auth_directive';
import { isAdmin, isManager } from '../config/permissions';
import crud from './crud';
import { Users } from './users';
export const Sites = crud(Site);
export const SiteEntries = crud(SiteEntry);

const typeDefs = `
    type Site {
        id: ID!
        name: String!
        location: String!
        manager: User
        cost: Int!
        entries: [SiteEntry!]
        createdAt: String!
        updatedAt: String!
        count: Int!
    }
    type SiteEntryOutput {
        quantity: Int!,
        cost: Float!
    }
    type SiteEntryOtherOutput {
        quantity: String!,
        cost: Float!
    }
    input SiteEntryInput {
        quantity: Int!,
        cost: Float!
    }
    input SiteEntryOtherInput {
        quantity: String!,
        cost: Float!
    }

    type SiteEntry {
        id: ID!
        mistri: SiteEntryOutput
        labour: SiteEntryOutput
        eit: SiteEntryOutput
        morang: SiteEntryOutput
        githi: SiteEntryOutput
        cement: SiteEntryOutput
        saria: SiteEntryOutput
        dust: SiteEntryOutput
        other: SiteEntryOtherOutput
        createdAt: String!
        updatedAt: String!
        total: Int!,
    }
    
    type Status {
        status: Boolean!
    }
`;

// Queries allowed in graphql
const QuerySchema = `
    sites(limit: Int!, skip: Int = 0): [Site]
    site(id: String!, limit: Int = 15, skip: Int = 0): Site
`;

// Query resolvers
const Query = {
    Site: {
        // entries: (_, { id, limit }, context, info) => {return Site.findById({id}).populate({path: 'entries'});}
        count: (_, args, context, info) => {
            console.log("count....", context.count);
            return context.count;
        }
    },
    SiteEntry: {
    }
};

const RootQuery = {
    sites: isAdmin.createResolver((parent, args, context, info) => {
        context.count = Site.count({});
        return Sites.all(args).populate('manager')
    }),
    site: isManager.createResolver(async (parent, {id, limit, skip}, context, info) => {
        const site = await Sites.find({id});
        console.log("length....", site.entries.length);
        context.count = site.entries.length;
        return Sites.find({id}).populate('manager').populate({ path: 'entries', options: {limit, skip, sort: "-createdAt"}});
    }),
};

// Mutations allowed in graphql
const MutationSchema = `
    createSite(name: String!, location: String!, manager: String!):Site
    updateSite(id: String!, sitename: String!, location: String!): Site
    deleteSite(id: String!): Site
    deleteSiteEntry(siteId: String!, ids: [String!]!): Status
    makeSiteEntry(
        siteId: String!,
        mistri: SiteEntryInput,
        labour: SiteEntryInput,
        eit: SiteEntryInput,
        morang: SiteEntryInput,
        githi: SiteEntryInput,
        cement: SiteEntryInput,
        saria: SiteEntryInput,
        dust: SiteEntryInput,
        other: SiteEntryOtherInput,
        createdAt: String!
    ): SiteEntry
    deleteSiteEntries(siteId: String!, ids: [String!]!): Status
`;

// Mutation resolvers
const RootMutation = {
    createSite: isAdmin.createResolver(async (parent, args, context, info) => {
        let site = await Sites.create(args);
        const user = await Users.find({id: args.manager});
        user.sites.push(site);
        user.save();
        return Site.populate(site, { path: "manager"});
    }),
    updateSite: isAdmin.createResolver((parent, args, context, info) => Sites.update(args)),
    deleteSite: isAdmin.createResolver((parent, args, context, info) => Sites.remove(args)),
    deleteSiteEntry: isAdmin.createResolver(async (parent, args, context, info) => {
        let site = await Sites.find({id: args.siteId});
        await Promise.all(args.ids.map(id => site.entries.pull(id)));
        await site.save();
        return {status: true};
    }),
    makeSiteEntry: isManager.createResolver(async (parent, {siteId, ...args}, context, info) => {        
        const site = await Sites.find({id: siteId});    
        const entry = await SiteEntries.create(args);
        site.entries.unshift(entry);
        // const { _id, createdAt, updatedAt, __v, total, ...rest} = entry.toObject();        
        // Object.values(rest).forEach(e=> site.cost += e.cost);
        site.save();
        return entry;
    }),
}

const Mutation = {

};
// const SchemaDirectives = {
//     auth: AuthDirective,
//     authorized: AuthDirective,
//     authenticated: AuthDirective,
// };

export default { typeDefs, QuerySchema,  MutationSchema, RootQuery, RootMutation, Query, Mutation };
