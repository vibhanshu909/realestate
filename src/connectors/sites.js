import { Site } from '../models/Site';
import { isAdmin, isManager } from '../config/permissions';
import { ROLES } from '../models/User';
import crud from './crud';
import { Users } from './users';
import { SiteEntries } from './siteEntries';

export const Sites = crud(Site);

const typeDefs = `
    type SiteTotalField {
      quantity: Int!
      cost: Float!
    }
    type SiteTotal {
        mistri: SiteTotalField!
        labour: SiteTotalField!
        eit: SiteTotalField!
        morang: SiteTotalField!
        baalu: SiteTotalField!
        githi: SiteTotalField!
        cement: SiteTotalField!
        saria: SiteTotalField!
        dust: SiteTotalField!
        other: Float!
        other2: Float!
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
        total: SiteTotal!
        count: Int!        
        createdAt: String!
        updatedAt: String!
        lastEntryDate: String
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
      if (!ctx.result) {
        ctx.result = (ctx.data && ctx.data.count) || _.entries.length;
      }
      return ctx.result;
    },
    entryCount: (_, args, ctx) => {
      return _.entries.length
    },
    lastEntryDate: async (_) => {
      console.log(_)
      if(_.entries && _.entries.length){
        const entryId = _.entries[0]
        return (await SiteEntries.find({id: entryId})).createdAt
      }
      return null
    }
  }
};

const RootQuery = {
  sites: isManager.createResolver(async (_, args, ctx) => {
    ctx.data = { count: await Site.countDocuments() };
    const { user } = ctx;
    let result;
    if (user.role == ROLES.ADMIN) {
      result = await Promise.resolve(Sites.all({
        query: {
          $or: [
            {
              isDeleted: false
            },
            {
              isDeleted: null
            }
          ]
        },
        ...args,
      }).populate('manager'));
      const length = (await Sites.model.count({ $or: [{ isDeleted: false }, { isDeleted: null }] }))            
            // return result.length
      ctx.data = { count: length };
    }
    else {
      result = await Sites.all({
        query: {
          _id: { $in: user.sites },
          $or: [
            {
              isDeleted: false
            },
            {
              isDeleted: null
            }
          ]
        },
        ...args,
      }).populate('manager');
      const length = (await Sites.model.count({ _id: { $in: user.sites }, $or: [{ isDeleted: false }, { isDeleted: null }] }))            
      // ctx.data = { count: user.sites.length };
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
      if (user.sites.find(e => String(e) === args.id)) {
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
    let site = await Sites.create(data);
    const user = await Users.find({ id: data.manager });
    user.sites.push(site);
    user.save();
    return Site.populate(site, { path: "manager" });
  }),
  updateSite: isAdmin.createResolver(async (_, { id, data }, ctx) => {
    return Site.populate(await Sites.update({ id, ...data }), { path: "manager" });
  }),
  deleteSites: isAdmin.createResolver(async (_, args, ctx) => {
    if (args.ids.length) {
      // await Sites.remove(args);
      args.ids.forEach(async e => {
        const site = await Site.populate(await Sites.find({ id: e }), 'manager')
        site.isDeleted = true
        // await site.manager.debit({
        //   amount: site
        // })
        site.save()
      })
      return { status: true }
    }
    return { status: false }
  }),
}

// const SchemaDirectives = {
//     auth: AuthDirective,
//     authorized: AuthDirective,
//     authenticated: AuthDirective,
// };

export default { typeDefs, QuerySchema, MutationSchema, RootQuery, RootMutation, TypeResolvers };
