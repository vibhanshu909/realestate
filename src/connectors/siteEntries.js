import { isAdmin, isManager } from "../config/permissions";
import { Site } from "../models/Site";
import { SiteEntry } from "../models/SiteEntry";
import { getDate } from "../utils/date";
import crud from "./crud";
import { Sites } from "./sites";

export const SiteEntries = crud(SiteEntry);

const typeDefs = `    
  type SiteEntry {
    id: ID!
    mistri: SiteEntryOutput
    labour: SiteEntryOutput
    eit: SiteEntryOutput
    morang: SiteEntryOutput
    baalu: SiteEntryOutput
    githi: SiteEntryOutput
    cement: SiteEntryOutput
    saria: SiteEntryOutput
    dust: SiteEntryOutput
    other: SiteEntryOtherOutput
    other2: SiteEntryOtherOutput
    createdAt: String!
    updatedAt: String!
    site: Site!
    managerSpentAmount: Float!
    total: Float!
    note: String!
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
    baalu: SiteEntryFieldInput,
    githi: SiteEntryFieldInput,
    cement: SiteEntryFieldInput,
    saria: SiteEntryFieldInput,
    dust: SiteEntryFieldInput,
    other: SiteEntryFieldOtherInput,
    other2: SiteEntryFieldOtherInput,
    createdAt: String
    note: String
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
`;

// Queries allowed in graphql
const QuerySchema = `    
    siteEntries(siteId: String!, limit: Int = 15, skip: Int = 0): [SiteEntry!]
    siteEntry(id: String!): SiteEntry
`;

// Query resolvers
const TypeResolvers = {
  SiteEntry: {
    site: async (_, args, ctx) => {
      if (ctx.data) {
        return ctx.data.site;
      }
      Sites.find({ id: _.site });
    }
  }
};

const RootQuery = {
  siteEntries: isManager.createResolver(
    async (_, { siteId: id, limit, skip }, ctx) => {
      const site = await Sites.find({ id });
      const result = await Site.populate(site, {
        path: "entries",
        options: {
          limit,
          skip,
          sort: "-createdAt"
        }
      });
      ctx.data = { count: site.entries.length, site };
      return result.entries;
    }
  ),
  siteEntry: isManager.createResolver(async (_, args, ctx) => {
    return SiteEntries.find(args);
  })
};

// Mutations allowed in graphql
const MutationSchema = `
    createSiteEntry(
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
  createSiteEntry: isManager.createResolver(
    async (_, { siteId, data }, ctx) => {
      const { createdAt } = data;
      if (ctx.user.isManager()) {
        const today = new Date(getDate());
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const entries = await SiteEntries.all({
          query: {
            site: await Sites.find({ id: siteId }),
            createdAt: { $gte: today }
          }
        });
        if (entries.length) {
          throw new Error("Not allowed");
        }
      }
      const site = await Sites.find({ id: siteId }).populate("manager");
      ctx.data = {
        site
      };
      let payload = null;
      if (createdAt) {
        payload = { site: siteId, ...data };
      } else {
        const { createdAt, ...restPayload } = data;
        payload = { site: siteId, ...restPayload };
      }
      // // Remote Begin
      // const excludeList = ['createdAt', 'site', 'mistri', 'labour', 'other', 'other2', 'note']
      // const variables = Object.keys(payload)
      //   .filter(e => !excludeList.includes(e))
      //   .map(e => ({
      //     name: e,
      //     quantity: payload[e].quantity,
      //     price: payload[e].cost
      //   }))
      // const result = await ctx.fetchGraphql(`
      // mutation createTransactionOnSiteEntry($data: RemoteTransactionCreateInput!) {
      //   createRemoteTransaction(data: $data){
      //     id
      //     createdAt
      //     stock{
      //       id
      //       name
      //       unit
      //       available
      //     }
      //     supplier{
      //       id
      //       username
      //       role
      //     }
      //   }
      // }
      // `, {
      //     data: {
      //       entries: variables,
      //       supplierId: site.manager._id,
      //       supplierName: site.manager.username,
      //       siteName: site.name
      //     }
      //   })
      // console.log("result ===", result)
      // if (!result.data && result.errors) {
      //   throw new Error("Error from Stock, stock may be unavailable")
      // }
      // Remote End
      const entry = await SiteEntries.create(payload);
      await site.manager.debit({
        amount: entry.managerSpentAmount,
        note: `For: "${site.name}"`
      });
      site.entries.unshift(entry);
      site.save();
      return entry;
    }
  ),
  updateSiteEntry: isAdmin.createResolver(
    async (_, { siteId, id, data }, ctx) => {
      let site = Sites.find({ id: siteId });
      let entry = await SiteEntries.update({ id, ...data });
      site = await site;
      ctx.data = {
        site
      };
      site.save();
      return entry;
    }
  ),
  deleteSiteEntries: isAdmin.createResolver(async (_, args, ctx) => {
    console.log("deleteSiteEntries");
    if (args.ids.length) {
      let site = await Sites.find({ id: args.siteId });
      args.ids.map(id => site.entries.pull(id));
      await site.save();
      console.log("about to remove");
      await SiteEntries.remove(args);
      console.log("removed");
      return { status: true };
    } else {
      console.log("else");
    }
    return { status: false };
  })
};

// const SchemaDirectives = {
//     auth: AuthDirective,
//     authorized: AuthDirective,
//     authenticated: AuthDirective,
// };

export default {
  typeDefs,
  QuerySchema,
  MutationSchema,
  RootQuery,
  RootMutation,
  TypeResolvers
};
