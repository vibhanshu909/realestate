import { gql } from 'apollo-boost';

export const LOCAL_LOGIN = gql`
    mutation localLogin($token: String!){
        localLogin(token: $token)@client{
            token
        }
    }
`;

export const ENTRY_TABLE = gql`
    mutation entryTable(
        $order: String,
        $orderBy: String,
        $selected: [String],
        $page: Int,
        $rowsPerPage: Int        
    )
    {
        entryTable(
            order: $order,
            orderBy: $orderBy,
            selected: $selected,
            page: $page,
            rowsPerPage: $rowsPerPage) @client {
                order,
                orderBy,
                selected,
                page,
                rowsPerPage,                
            }
    }
`;

export const SITE_TABLE = gql`
    mutation siteTable(
        $order: String,
        $orderBy: String,
        $selected: [String],
        $page: Int,
        $rowsPerPage: Int        
    )
    {
        siteTable(
            order: $order,
            orderBy: $orderBy,
            selected: $selected,
            page: $page,
            rowsPerPage: $rowsPerPage) @client {
                order,
                orderBy,
                selected,
                page,
                rowsPerPage,                
            }
    }
`;

export const USER_ENTRY_TABLE = gql`
    mutation userEntryTable(
        $order: String,
        $orderBy: String,
        $selected: [String],
        $page: Int,
        $rowsPerPage: Int        
    )
    {
        userEntryTable(
            order: $order,
            orderBy: $orderBy,
            selected: $selected,
            page: $page,
            rowsPerPage: $rowsPerPage) @client {
                order,
                orderBy,
                selected,
                page,
                rowsPerPage                
            }
    }
`;

export const CREDIT_ENTRY_TABLE = gql`
    mutation creditEntryTable(
        $order: String,
        $orderBy: String,
        $selected: [String],
        $page: Int,
        $rowsPerPage: Int        
    )
    {
        creditEntryTable(
            order: $order,
            orderBy: $orderBy,
            selected: $selected,
            page: $page,
            rowsPerPage: $rowsPerPage) @client {
                order,
                orderBy,
                selected,
                page,
                rowsPerPage                
            }
    }
`;

export const PROPERTY_TABLE = gql`
    mutation propertyTable(
        $order: String,
        $orderBy: String,
        $selected: [String],
        $page: Int,
        $rowsPerPage: Int        
    )
    {
        propertyTable(
            order: $order,
            orderBy: $orderBy,
            selected: $selected,
            page: $page,
            rowsPerPage: $rowsPerPage) @client {
                order,
                orderBy,
                selected,
                page,
                rowsPerPage                
            }
    }
`;
