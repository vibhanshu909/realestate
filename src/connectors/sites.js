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
        entries: [SiteEntry!]
        createdAt: String!
        updatedAt: String!
    }
    type SiteEntryOutput {
        quantity: Int!,
        cost: Int!
    }
    input SiteEntryInput {
        quantity: Int!,
        cost: Int!
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
    site(id: String!): Site
`;

// Query resolvers
const Query = {
    Site: {
        // entries: (_, { id }, context, info) => {return Site.findById({id}).populate('entries').pluck('entries');}
    },
};

const RootQuery = {
    sites: async (parent, args, context, info) => await Sites.all(args),
    site: async (parent, args, context, info) => await Sites.find(args).populate('entries'),
};

// Mutations allowed in graphql
const MutationSchema = `
    createSite(name: String!, location: String!):Site
    updateSite(id: String!, sitename: String!, location: String!): Site
    deleteSite(id: String!): Site
    makeSiteEntry(
        siteId: String,
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
        site.entries.push(entry);
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
