import { isAdmin, isManager } from "../config/permissions";
import Property from "../models/Property";
import crud from "./crud";
export const Properties = crud(Property);

const typeDefs = `
    type Property {
        id: ID!
        name: String!
        location: String!
        price: Float!
        buyer: String!
        buyerNumber: Float!
        totalReceivedAmount: Float!        
        balance: Float!
        nextDueDate: String
        note: String
        history: [PropertyCreditHistory]!
        createdAt: String!
        updatedAt: String!
        count: Int!
        total: PropertyTotal!
    }
    type PropertyTotal {
        price: Float!
        totalReceivedAmount: Float!        
        balance: Float!
    }
    type PropertyCreditHistory {
        amount: Float!
        balance: Float
        createdAt: String!
        count: Int!
        note: String!
    }

    input PropertyInput {
        name: String!
        location: String!        
        price: Float!
        buyer: String!
        buyerNumber: Float!
        totalReceivedAmount: Float!
        nextDueDate: String
        note: String
    }

    input PropertyUpdateInput {
        name: String!
        location: String!
        buyer: String!
        buyerNumber: Float!
        nextDueDate: String!
        note: String
    }

    input PropertyCreditInput {
        amount: Float!
        note: String
        nextDueDate: String!
    }
`;

// Queries allowed in graphql
const QuerySchema = `
    properties(limit: Int, skip: Int = 0): [Property]
    dueProperties(limit: Int, skip: Int = 0): [Property]
    property(id: String!): Property
    propertyTotal: PropertyTotal!
    propertyCreditHistory(id: String!, limit: Int, skip: Int = 0): [PropertyCreditHistory!]!
`;

// Query resolvers

const RootQuery = {
  properties: isAdmin.createResolver(async (_: $TSFixMe, args: $TSFixMe, ctx: $TSFixMe) => {
    const query = {
      $or: [
        {
          nextDueDate: {
            $gt: Date.now()
          }
        },
        {
          nextDueDate: {
            $eq: null
          }
        }
      ]
    };
    ctx.data = {
      count: await Property.countDocuments(query)
    };
    return Properties.all({ ...args, query });
  }),
  dueProperties: isAdmin.createResolver(async (_: $TSFixMe, args: $TSFixMe, ctx: $TSFixMe) => {
    const query = {
      nextDueDate: {
        $lte: Date.now()
      }
    };
    ctx.data = {
      count: await Property.countDocuments(query)
    };
    return Properties.all({ ...args, query });
  }),
  propertyTotal: async () => {
    const propertiesResult = await Properties.all({ query: {} });
    const result = {
      price: 0,
      totalReceivedAmount: 0,
      balance: 0
    };
    propertiesResult.forEach((property: $TSFixMe) => {
      console.log(property);
      result.price += property.price;
      result.totalReceivedAmount += property.totalReceivedAmount;
      result.balance += property.balance;
    });
    return result;
  },
  propertyCreditHistory: isManager.createResolver(async (_: $TSFixMe, args: $TSFixMe, ctx: $TSFixMe) => {
    const { id, skip, limit } = args;
    const property = await Properties.find(args);
    ctx.data = {
      count: property.history.length
    };
    return (await Properties.find(args).select({
      history: { $slice: [skip, limit] }
    })).history;
    // return property.select({ 'history': { '$slice': [skip,limit] } })
    // return property.history.find({}, {rest});
  }),
  property: isManager.createResolver((_: $TSFixMe, args: $TSFixMe, ctx: $TSFixMe) => {
    return Properties.find(args);
  })
};

const TypeResolvers = {
  Property: {
    count: (_: $TSFixMe, args: $TSFixMe, ctx: $TSFixMe) => {
      return ctx.data.count;
    }
  },
  PropertyCreditHistory: {
    count: (_: $TSFixMe, args: $TSFixMe, ctx: $TSFixMe) => {
      return ctx.data.count;
    }
  }
};

// Mutations allowed in graphql
const MutationSchema = `
    createProperty(data: PropertyInput!): Property
    updateProperty(id: String!, data: PropertyUpdateInput!): Property
    deleteProperties(ids: [String!]!): Status
    propertyCredit(id: String!, data: PropertyCreditInput!): PropertyCreditHistory
`;

// Mutation resolvers
const RootMutation = {
  createProperty: isAdmin.createResolver(async (_: $TSFixMe, {
    data
  }: $TSFixMe, ctx: $TSFixMe) => {
    const result = await Properties.create({ ...data, owner: ctx.user });
    ctx.data = {
      count: await Property.count({})
    };
    return result;
  }),
  updateProperty: isManager.createResolver(async (_: $TSFixMe, {
    id,
    data
  }: $TSFixMe) => {
    return Properties.update({ id, ...data });
  }),
  deleteProperties: isAdmin.createResolver(async (_: $TSFixMe, args: $TSFixMe) => {
    await Properties.remove(args);
    return { status: true };
  }),
  propertyCredit: isAdmin.createResolver(async (_: $TSFixMe, {
    id,
    data
  }: $TSFixMe) => {
    let property = await Properties.find({ id });
    await property.credit(data);
    return await (await Properties.find({ id })).toObject().history[0];
    // return property.history[0];
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
