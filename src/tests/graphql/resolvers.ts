export const typeDefs = `
    type SiteEntryOutput {
        quantity: Int!,
        cost: Int!
    }
    input SiteEntryInput {
        quantity: Int!,
        cost: Int!
    }
`;
export const defaultState = {
    networkStatus: {
      __typename: 'NetworkStatus',
      isConnected: true,
    },
    localLogin: {
        __typename: 'LocalLogin',
        token: window.localStorage.getItem('userToken'),
    },
    entryTable: {
        __typename: 'EntryTable',
        order: 'asc',
        orderBy: 'createdAt',
        selected: [],
        page: 0,
        rowsPerPage: 10
    },
    entryTotalTable: {
        __typename: 'EntryTotalTable',
        order: 'asc',
        orderBy: 'createdAt',
        selected: [],
        page: 0,
        rowsPerPage: 1
    },
    siteTable: {
        __typename: 'SiteTable',
        order: 'asc',
        orderBy: 'createdAt',
        selected: [],
        page: 0,
        rowsPerPage: 10
    },
    creditEntryTable: {
        __typename: 'CreditEntryTable',
        order: 'asc',
        orderBy: 'createdAt',
        selected: [],
        page: 0,
        rowsPerPage: 5
    },
    userEntryTable: {
        __typename: 'UserEntryTable',
        order: 'desc',
        orderBy: 'id',
        selected: [],
        page: 0,
        rowsPerPage: 10,        
    },
    propertyTable: {
        __typename: 'PropertyTable',
        order: 'desc',
        orderBy: 'id',
        selected: [],
        page: 0,
        rowsPerPage: 10,        
    }
};

export const resolvers = {
    Mutation: {
        updateNetworkStatus: (_: $TSFixMe, {
            isConnected
        }: $TSFixMe, {
            cache
        }: $TSFixMe) => {
            const data = {
                networkStatus: {
                    __typename: 'NetworkStatus',
                    isConnected
                },
            };
            cache.writeData({ data });
            return null;
        },
        localLogin: async (_: $TSFixMe, {
            token
        }: $TSFixMe, {
            cache
        }: $TSFixMe) => {            
            const data = {
                localLogin: {
                    __typename: 'LocalLogin',
                    token
                },
            };
            await cache.writeData({ data });
            return null;
        },
        entryTable: async (_: $TSFixMe, args: $TSFixMe, {
            cache
        }: $TSFixMe) => {
            const data = {
                entryTable: {
                    __typename: 'EntryTable',
                    ...args
                },
            };
            await cache.writeData({ data });
            return null;
        },
        siteTable: async (_: $TSFixMe, args: $TSFixMe, {
            cache
        }: $TSFixMe) => {
            const data = {
                siteTable: {
                    __typename: 'SiteTable',
                    ...args
                },
            };
            await cache.writeData({ data });
            return null;
        },
        userEntryTable: async (_: $TSFixMe, args: $TSFixMe, {
            cache
        }: $TSFixMe) => {
            const data = {
                userEntryTable: {
                    __typename: 'UserEntryTable',
                    ...args
                },
            };
            await cache.writeData({ data });
            return null;
        },
        creditEntryTable: async (_: $TSFixMe, args: $TSFixMe, {
            cache
        }: $TSFixMe) => {
            const data = {
                creditEntryTable: {
                    __typename: 'CreditEntryTable',
                    ...args
                },
            };
            await cache.writeData({ data });
            return null;
        },
        propertyTable: async (_: $TSFixMe, args: $TSFixMe, {
            cache
        }: $TSFixMe) => {
            const data = {
                propertyTable: {
                    __typename: 'PropertyTable',
                    ...args
                },
            };
            await cache.writeData({ data });
            return null;
        }
    },
};
