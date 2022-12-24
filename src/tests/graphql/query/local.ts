import { gql } from 'apollo-boost';

export const LOCAL_LOGIN = gql`
    query {
        localLogin @client{
            token
        }
    }
`;

export const ENTRY_TABLE = gql`
    query {
        entryTable @client{
            order,
            orderBy,
            selected,
            page,
            rowsPerPage            
        }
    }
`;

export const SITE_TABLE = gql`
    query {
        siteTable @client{
            order,
            orderBy,
            selected,
            page,
            rowsPerPage            
        }
    }
`;

export const USER_ENTRY_TABLE = gql`
    query {
        userEntryTable @client{
            order,
            orderBy,
            selected,
            page,
            rowsPerPage            
        }
    }
`;

export const CREDIT_ENTRY_TABLE = gql`
    query {
        creditEntryTable @client{
            order,
            orderBy,
            selected,
            page,
            rowsPerPage            
        }
    }
`;

export const PROPERTY_TABLE = gql`
    query {
        propertyTable @client{
            order,
            orderBy,
            selected,
            page,
            rowsPerPage            
        }
    }
`;
