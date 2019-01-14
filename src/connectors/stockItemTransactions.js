import crud from './crud';
import { StockItem } from '../models/StockItem';
import { StockSuppliers } from './stockSuppliers';
import { StockItemTransaction } from '../models/StockItemTransaction';
import { isAdmin, isManager } from '../config/permissions';
import { StockSupplier } from '../models/StockSupplier';

export const StockItems = crud(StockItem);
export const StockItemTransactions = crud(StockItemTransaction);

const typeDefs = `    
  type StockItemTransaction {
    id: ID!
    stockItem: StockItem!
    quantity: Float!
    type: String!
    supplier: StockSupplier!
    count: Int!
    createdAt: String!
    updatedAt: String!
  }
  input StockItemTransactionInput {    
    supplier: ID!
    quantity: Float!
    type: String!
  }
`;

// Queries allowed in graphql
const QuerySchema = `
  stockItemTransactions(stockItemId: ID!, limit: Int, skip: Int = 0): [StockItemTransaction!]!
  stockItemTransaction(id: ID!): StockItemTransaction!
`;

// Query resolvers

const RootQuery = {
  stockItemTransactions: isAdmin.createResolver(async (_, args, ctx) => {
    ctx.data = {
      count: await StockItemTransactions.model.countDocuments(),
    };    
    const stockItemTransactions = await StockItemTransactions.all({query: {
      stockItem: {
        $eq: args.stockItemId
      }
    }, ...args});    
    return stockItemTransactions;
  }),
  stockItemTransaction: isAdmin.createResolver(async (_, args, ctx) => {
    ctx.data = {
      count: await StockItemTransactions.model.countDocuments(),
    };
    const result = await StockItemTransactions.find(args);
    return result;
  }),
};

const TypeResolvers = {
  StockItemTransaction: {
    stockItem: async (_, args, ctx) => {
      return StockItems.find({ id: _.stockItem });
    },
    count: async (_, args, ctx) => {
      return ctx.data.count;
    },
    supplier: async (_, args, ctx) => {
      return StockSuppliers.find({ id: _.supplier });
    }
  }
};

// Mutations allowed in graphql
const MutationSchema = `
  createStockItemTransaction(stockItemId: ID!, data: StockItemTransactionInput!): StockItemTransaction!
  updateStockItemTransaction(id: String!, data: StockItemTransactionInput!): StockItemTransaction!
  deleteStockItemTransactions(ids: [String!]!): Status!
`;

// Mutation resolvers
const RootMutation = {
  createStockItemTransaction: isAdmin.createResolver(async (_, { stockItemId, data }, ctx) => {
    return await StockItemTransactions.create({ stockItem: stockItemId, ...data });    
  }),
  updateStockItemTransaction: isAdmin.createResolver(async (_, { id, data }, ctx) => {
    return StockItemTransaction.populate(await StockItemTransactions.update({ id, ...data }), { path: "manager" });
  }),
  deleteStockItemTransactions: isAdmin.createResolver(async (_, args, ctx) => {
    if (args.ids.length) {
      await StockItemTransactions.remove(args);
      return { status: true }
    }
    return { status: false }
  }),
}

export default { typeDefs, QuerySchema, MutationSchema, RootQuery, RootMutation, TypeResolvers };
