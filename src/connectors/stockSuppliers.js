import crud from './crud';
import { StockSupplier } from '../models/StockSupplier';
import { isAdmin, isManager } from '../config/permissions';

export const StockSuppliers = crud(StockSupplier);

const typeDefs = `
  type StockSupplier {
    id: ID!
    count: Int!
    name: String!
    contact: Float!    
    createdAt: String!
    updatedAt: String!
  }
  input StockSupplierInput {
    name: String!
    contact: Float!    
  }  
`;

// Queries allowed in graphql
const QuerySchema = `
  stockSuppliers(limit: Int, skip: Int = 0): [StockSupplier!]!
  stockSupplier(id: String!): StockSupplier!
`;

// Query resolvers

const RootQuery = {
  stockSuppliers: isAdmin.createResolver(async (_, args, ctx) => {
    ctx.data = {
      count: await StockSupplier.countDocuments(),
    };
    const stockSuppliers = await StockSuppliers.all(args);
    return stockSuppliers;
  }),
  stockSupplier: isAdmin.createResolver(async (_, args, ctx) => {
    ctx.data = {
      count: await StockSupplier.countDocuments(),
    };
    const result = await StockSuppliers.find(args);
    return result;
  }),
};

const TypeResolvers = {
  StockSupplier: {
    count: async (_, args, ctx) => {
      return ctx.data.count;
    }
  }
};

// Mutations allowed in graphql
const MutationSchema = `
  createStockSupplier(data: StockSupplierInput!): StockSupplier!
  updateStockSupplier(id: String!, data: StockSupplierInput!): StockSupplier!
  deleteStockSuppliers(ids: [String!]!): Status!
`;

// Mutation resolvers
const RootMutation = {
  createStockSupplier: isAdmin.createResolver(async (_, { data }, ctx) => {
    let si = await StockSuppliers.create(data);
    return StockSupplier.populate(si, { path: "transaction" });
  }),
  updateStockSupplier: isAdmin.createResolver(async (_, { id, data }, ctx) => {
    return StockSupplier.populate(await StockSuppliers.update({ id, ...data }), { path: "manager" });
  }),
  deleteStockSuppliers: isAdmin.createResolver(async (_, args, ctx) => {
    if (args.ids.length) {
      await StockSuppliers.remove(args);
      return { status: true }
    }
    return { status: false }
  }),
}

export default { typeDefs, QuerySchema, MutationSchema, RootQuery, RootMutation, TypeResolvers };
