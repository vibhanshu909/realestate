import Property from '../models/property';
import AuthDirective from '../directives/auth_directive';
import { isAdmin, isManager } from '../config/permissions';
import crud from './crud';
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
        nextDueDate: String!
        history: [PropertyCreditHistory]!
        createdAt: String!
        updatedAt: String!
        count: Int!
    }

    type PropertyCreditHistory {
        amount: Int!
        createdAt: String!
    }

    input PropertyInput {
        name: String!
        location: String!        
        price: Float!
        buyer: String!
        buyerNumber: Float!
        totalReceivedAmount: Float!
        nextDueDate: String!
    }

    input PropertyUpdateInput {
        name: String!
        location: String!
        buyer: String!
        buyerNumber: Float!
        nextDueDate: String!
    }
`;

// Queries allowed in graphql
const QuerySchema = `
    properties(limit: Int, skip: Int = 0): [Property]
    property(id: String!): Property
    propertyCreditHistory(id: String!, limit: Int, skip: Int = 0): Property!
`;

// Query resolvers

const RootQuery = {
    properties: isAdmin.createResolver((_, args, ctx) => {
        ctx.data = {
            count: Property.count({}),
        };
        return Properties.all({ ...args, query: { } })
    }),
    propertyCreditHistory: isManager.createResolver(async (_, args, ctx) => {
        const {id, skip, limit} = args;
        const property = await Properties.find(args);
        ctx.data = {
            count: property.history.length,
        };
        return Properties.find(args).select({ 'history': { '$slice': [skip,limit] } });
        // return property.select({ 'history': { '$slice': [skip,limit] } })
        // return property.history.find({}, {rest});
    }),
    property: isManager.createResolver((_, args, ctx) => {
        return Properties.find(args);
    }),
};

const TypeResolvers = {
    Property: {
        count: (_, args, ctx) => {            
            return ctx.data.count;
        }        
    },
};

// Mutations allowed in graphql
const MutationSchema = `
    createProperty(data: PropertyInput!): Property
    updateProperty(id: String!, data: PropertyUpdateInput!): Property
    deleteProperty(id: String!): Property    
    propertyCredit(id: String!, amount: Float!): PropertyCreditHistory
`;

// Mutation resolvers
const RootMutation = {
    createProperty: isAdmin.createResolver(async (_, { data }, ctx) => {
        const result = await Properties.create(data);
        ctx.data = {
            count: await Property.count({}),
        };
        return result;
    }),
    updateProperty: isManager.createResolver((_, { id, data }) => Properties.update({ id, ...data })),
    deleteProperty: isAdmin.createResolver((_, args) => Properties.remove(args)),    
    propertyCredit: isAdmin.createResolver(async (_, { id, amount }) => {
        let property = await Properties.find({ id });
        await property.credit(amount); 
        return property.history[0];
    })
}
// const SchemaDirectives = {
//     auth: AuthDirective,
//     authorized: AuthDirective,
//     authenticated: AuthDirective,
// };

export default { typeDefs, QuerySchema, MutationSchema, RootQuery, RootMutation, TypeResolvers };
