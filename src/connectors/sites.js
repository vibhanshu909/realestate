import { Site, SiteEntry } from '../models/site';
import { isAdmin, isManager } from '../config/permissions';
import { ROLES } from '../models/user';
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
        managerSpentAmount: Int!
        cost: Int!
        entries: [SiteEntry!]
        createdAt: String!
        updatedAt: String!
        count: Int!
    }

    input SiteInput {
        name: String!
        location: String!
        manager: String!
        createdAt: String!
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
        managerSpentAmount: Int!
        total: Int!
    }

    type SiteEntryOutput {
        quantity: Int!,
        cost: Float!
        paid: Boolean!
    }
    
    type SiteEntryOtherOutput {
        quantity: String!,
        cost: Float!
        paid: Boolean!
    }

    
    input SiteEntryInput {
        mistri: SiteEntryFieldInput,
        labour: SiteEntryFieldInput,
        eit: SiteEntryFieldInput,
        morang: SiteEntryFieldInput,
        githi: SiteEntryFieldInput,
        cement: SiteEntryFieldInput,
        saria: SiteEntryFieldInput,
        dust: SiteEntryFieldInput,
        other: SiteEntryFieldOtherInput,
        createdAt: String!
    }
    
    input SiteEntryFieldInput {
        quantity: Int!,
        cost: Float!
        paid: Boolean!
    }
    
    input SiteEntryFieldOtherInput {
        quantity: String!,
        cost: Float!
        paid: Boolean!
    }
    
    type Status {
        status: Boolean!
    }
`;

// Queries allowed in graphql
const QuerySchema = `
    sites(limit: Int, skip: Int = 0): [Site]
    site(id: String!): Site
    siteEntries(id: String!, limit: Int = 15, skip: Int = 0): Site
    siteEntry(id: String!): SiteEntry
`;

// Query resolvers
const Query = {
    Site: {
        count: (_, args, context, info) => {
            return context.data.count;
        }
    },
    SiteEntry: {
    }
};

const RootQuery = {
    sites: isManager.createResolver((parent, args, context, info) => {
        context.data = { count: Site.countDocuments() };
        const { user } = context;
        if (user.role == ROLES.ADMIN) {
            return Sites.all(args).populate('manager');
        }
        else {
            return Sites.all({ query: { _id: { $in: user.sites } }, ...args }).populate('manager');
        }
    }),
    site: isManager.createResolver((parent, args, context, info) => {
        context.data = { count: Site.countDocuments() };
        const { user } = context;
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
    }),
    siteEntries: isManager.createResolver(async (parent, { id, limit, skip }, context, info) => {
        const site = await Sites.find({ id });
        console.log("length....", site.entries.length);
        context.data = { count: site.entries.length };
        return Sites.find({ id }).populate('manager').populate({ path: 'entries', options: { limit, skip, sort: "-createdAt" } });
    }),
    siteEntry: isManager.createResolver(async (parent, args, context, info) => {
        return SiteEntries.find(args);
    })
};

// Mutations allowed in graphql
const MutationSchema = `
    createSite(data: SiteInput!):Site
    updateSite(id: String!, data: SiteInput!): Site
    deleteSites(ids: [String!]!): Status
    deleteSiteEntry(siteId: String!, ids: [String!]!): Status
    makeSiteEntry(
        siteId: String!,
        data: SiteEntryInput!
    ): SiteEntry
    updateSiteEntry(
        siteId: String!,
        id: String!,
        data: SiteEntryInput!
    ): SiteEntry
    deleteSiteEntries(siteId: String!, ids: [String!]!): Status
`;

// Mutation resolvers
const RootMutation = {
    createSite: isAdmin.createResolver(async (parent, { data }, context, info) => {
        console.log("args....", data);
        let site = await Sites.create(data);
        const user = await Users.find({ id: data.manager });
        user.sites.push(site);
        user.save();
        return Site.populate(site, { path: "manager" });
    }),
    updateSite: isAdmin.createResolver(async (parent, { id, data }, context, info) => {
        const oldSite = await Sites.find({ id });
        if(oldSite.manager === data.manager){
            return Sites.update({id, ...data});
        }
        const oldUser = await Users.find({ id: oldSite.manager });        
        oldUser.sites.pull(id);
        const user = await Users.find({ id: data.manager });
        let result = await Sites.update({id, ...data});
        user.sites.push(result);
        oldUser.save();
        user.save();
        return result;
    }),
    deleteSites: isAdmin.createResolver(async (parent, args, context, info) => {
        await Sites.remove(args);
        return { status: true }
    }),
    deleteSiteEntry: isAdmin.createResolver(async (parent, args, context, info) => {
        let site = await Sites.find({ id: args.siteId });
        await Promise.all(args.ids.map(id => site.entries.pull(id)));
        await site.save();
        return { status: true };
    }),
    makeSiteEntry: isManager.createResolver(async (parent, { siteId, data }, context, info) => {
        const site = await Sites.find({ id: siteId });
        const entry = await SiteEntries.create(data); 
        site.entries.unshift(entry);        
        // const { managerSpentAmount } = entry.toObject();
        // Object.values(rest).forEach(e => managerSpentAmount += e.paid ? e.cost : 0)
        site.managerSpentAmount += entry.toObject().managerSpentAmount;
        site.save();
        return entry;
    }),
    updateSiteEntry: isManager.createResolver(async (parent, { siteId, id, data }, context, info) => {
        let site = Sites.find({ id: siteId });
        let oldEntry = SiteEntries.find({id});
        let { managerSpentAmount } = (await oldEntry).toObject();
        await SiteEntries.model.findByIdAndUpdate(id, data);
        let entry = await SiteEntries.find({id});
        site = await site;
        // site.entries.unshift(entry);                        
        site.managerSpentAmount += entry.toObject().managerSpentAmount - managerSpentAmount;
        site.save();
        console.log("oldEntry.managerSpentAmount...", managerSpentAmount);
        console.log("entry.managerSpentAmount...", entry.toObject().managerSpentAmount);
        console.log("site.managerSpentAmount...", site.managerSpentAmount);
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

export default { typeDefs, QuerySchema, MutationSchema, RootQuery, RootMutation, Query, Mutation };
