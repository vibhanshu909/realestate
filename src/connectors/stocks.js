import crud from './crud';
import StockItem from '../models/StockItem';
import StockItemTransaction from '../models/StockItemTransaction';
import { isAdmin, isManager } from '../config/permissions';

export const StockItems = crud(StockItem);
export const StockItemTransactions = crud(StockItemTransaction);

const typeDefs = `
  type StockItem {
    id: ID!
    count: Int!
    name: String!
    unit: String!
    available: Float!
    createdAt: String!
    updatedAt: String!
  }
  input StockItemInput {
    name: String!
    unit: String!
    available: Float!
  }
  type StockItemTransaction {
    stockItem: StockItem!
    quantity: Float!
    type: String!
    supplier: StockSupplier!
  }
`;

// Queries allowed in graphql
const QuerySchema = `
    stockItems(limit: Int, skip: Int = 0): [StockItem!]!
    stockItem(id: String!): StockItem!
`;

// Query resolvers

const RootQuery = {
  stockItems: isAdmin.createResolver(async (_, args, ctx) => {
    ctx.data = {
      count: await StockItems.model.countDocuments(),
    };
    const stockItems = await StockItems.all(args);
    return stockItems;
  }),
  stockItem: isAdmin.createResolver(async (_, args, ctx) => {
    ctx.data = {
      count: await StockItems.model.countDocuments(),
    };
    const result = await StockItems.find(args);
    return result;
  }),
};

const TypeResolvers = {
  StockItem: {
    count: async (_, args, ctx) => {
      return ctx.data.count;
    }
  }
};

// Mutations allowed in graphql
const MutationSchema = `
  createStockItem(data: StockItemInput!): StockItem!
  updateStockItem(id: String!, data: StockItemInput!): StockItem!
  deleteStockItems(ids: [String!]!): Status!
`;

// Mutation resolvers
const RootMutation = {
  createStockItem: isAdmin.createResolver(async (_, { data }, ctx) => {
    let si = await StockItems.create(data);
    return StockItem.populate(si, { path: "transaction" });
  }),
  updateStockItem: isAdmin.createResolver(async (_, { id, data }, ctx) => {
    return StockItem.populate(await StockItems.update({ id, ...data }), { path: "manager" });
  }),
  deleteStockItems: isAdmin.createResolver(async (_, args, ctx) => {
    if (args.ids.length) {
      await StockItems.remove(args);
      return { status: true }
    }
    return { status: false }
  }),
}

export default { typeDefs, QuerySchema, MutationSchema, RootQuery, RootMutation, TypeResolvers };
