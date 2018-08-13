import jwt from 'jsonwebtoken';
import {Site, SiteEntry} from '../models/site';
import config from '../config/main';
import AuthDirective from '../directives/auth_directive';
import { isAdmin, isSuperAdmin } from '../config/permissions';
import crud from './crud';
export const Sites = crud(Site);
export const SiteEntries = crud(SiteEntry);

const typeDefs = `
    type Site {
        id: String!
        name: String!
        location: String!
        cost: Int!,
        entries: [SiteEntry!]
        createdAt: String!
        updatedAt: String!
        count: Int!
    }
    type SiteEntryOutput {
        quantity: Int!,
        cost: Float!
    }
    input SiteEntryInput {
        quantity: Int!,
        cost: Float!
    }

    type SiteEntry {
        id: String!
        mistri: SiteEntryOutput
        labour: SiteEntryOutput
        eit: SiteEntryOutput
        morang: SiteEntryOutput
        githi: SiteEntryOutput
        cement: SiteEntryOutput
        saria: SiteEntryOutput
        dust: SiteEntryOutput
        other: SiteEntryOutput
        createdAt: String!
        updatedAt: String!
    }
`;

// Queries allowed in graphql
const QuerySchema = `
    sites(limit: Int!, offset: String = "0"): [Site]
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
    sites: async (parent, args, context, info) => Sites.all(args),
    site: async (parent, {id, limit, skip}, context, info) => {
        const site = await Sites.find({id});
        console.log("length....", site.entries.length);
        context.count = site.entries.length;
        return Sites.find({id}).populate({ path: 'entries', options: {limit, skip, sort: "-createdAt"}});
    },
};

// Mutations allowed in graphql
const MutationSchema = `
    createSite(name: String!, location: String!):Site
    updateSite(id: String!, sitename: String!, location: String!): Site
    deleteSite(id: String!): Site
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
        other: SiteEntryInput
    ): SiteEntry
`;

// Mutation resolvers
const RootMutation = {
    createSite: (parent, args, context, info) => Sites.create(args),
    updateSite: (parent, args, context, info) => Sites.update(args),
    deleteSite: isSuperAdmin.createResolver((parent, args, context, info) => Sites.remove(args)),
    makeSiteEntry: async (parent, {siteId, ...args}, context, info) => {
        console.log(siteId);
        console.log(args);
        const site = await Sites.find({id: siteId});
        console.log(site);
        const entry = await SiteEntries.create(args);
        console.log(entry);
        site.entries.unshift(entry);
        const { _id, createdAt, updatedAt, __v, ...rest} = entry.toObject();
        console.log("rest....", rest);
        Object.values(rest).forEach(e=> site.cost += e.cost);
        site.save();
        return entry;
    },
}

const Mutation = {

};
// const SchemaDirectives = {
//     auth: AuthDirective,
//     authorized: AuthDirective,
//     authenticated: AuthDirective,
// };

export default { typeDefs, QuerySchema,  MutationSchema, RootQuery, RootMutation, Query, Mutation };
