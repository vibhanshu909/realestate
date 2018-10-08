import { siteTotalRepeater } from '../query/remote';
export const LOGIN = `
    mutation login($data: LoginInput!){
        login(data: $data){
            token
        }
    }
`;

export const CREDIT = `
    mutation credit($id: String!, $amount: Float!){
        credit(id: $id, amount: $amount){            
            amount
            createdAt
        }
    }
`;

export const CREATE_SITE = `
mutation createSite($data: SiteInput!) {
    createSite(data: $data) {
        id,
        name,
        location,
        entries {
            id
        },
        entryCount,
        count
        manager {
            id,
            name: username
        }
        managerSpentAmount,
        cost
        total {
            mistri ${siteTotalRepeater}
            labour ${siteTotalRepeater}
            eit ${siteTotalRepeater}
            morang ${siteTotalRepeater}
            baalu ${siteTotalRepeater}
            githi ${siteTotalRepeater}
            cement ${siteTotalRepeater}
            saria ${siteTotalRepeater}
            dust ${siteTotalRepeater}
            other
            other2
        }
        createdAt,
        updatedAt,
    }
}
`;

export const UPDATE_SITE = `
mutation updateSite($id: String!, $data: SiteUpdateInput!) {
    updateSite(id: $id, data: $data) {
        id,
        name,
        location,
        entries {
            id
        },
        entryCount,
        manager {
            id,
            name: username
        }
        managerSpentAmount,
        cost
        total{
            mistri ${siteTotalRepeater}
            labour ${siteTotalRepeater}
            eit ${siteTotalRepeater}
            morang ${siteTotalRepeater}
            baalu ${siteTotalRepeater}
            githi ${siteTotalRepeater}
            cement ${siteTotalRepeater}
            saria ${siteTotalRepeater}
            dust ${siteTotalRepeater}
            other
            other2
        }
        createdAt,
        updatedAt,        
    }
}
`;


const repeater = `{
    quantity,
    cost,
    paid
}`;

export const CREATE_SITE_ENTRY = `
mutation createSiteEntry(
    $siteId: String!,
    $data: SiteEntryInput!
) {
    createSiteEntry(
        siteId: $siteId,
        data: $data
    ) {
        id,
        createdAt,
        updatedAt,                
        mistri ${repeater},
        labour ${repeater},
        eit ${repeater},
        morang ${repeater},
        baalu ${repeater},
        githi ${repeater},
        cement ${repeater},
        saria ${repeater},
        dust ${repeater},
        other ${repeater},
        other2 ${repeater},
        site {
            id
        }
        managerSpentAmount,
        total
    }
}
`;

export const UPDATE_SITE_ENTRY = `
mutation updateSiteEntry(
    $id: String!
    $siteId: String!,
    $data: SiteEntryInput!
) {
    updateSiteEntry(
        id: $id,
        siteId: $siteId,
        data: $data
    ) {
        id,
        createdAt,
        updatedAt,                
        mistri ${repeater},
        labour ${repeater},
        eit ${repeater},
        morang ${repeater},
        baalu ${repeater},
        githi ${repeater},
        cement ${repeater},
        saria ${repeater},
        dust ${repeater},
        other ${repeater},
        other2 ${repeater},
        site {
            id
        }
        managerSpentAmount,
        total
    }
}
`;

export const CREATE_USER = `
mutation createUser($data: UserInput!){
    createUser(data: $data){
        id,
        username,            
        siteCount,
        totalSitesCost,
        totalReceivedAmount,
        spent,
        balance,
        createdAt,
        updatedAt,
        count,
    }
}
`;

export const UPDATE_USER_CONTACT = `
mutation updateUserContact($id: String!, $contact: Float!){
    updateUserContact(id: $id, contact: $contact){
        id,
        username,
        contact,
        siteCount,
        totalSitesCost,
        totalReceivedAmount,
        spent,
        balance,
        createdAt,
        updatedAt,        
    }
}
`;

export const UPDATE_USER_PASSWORD = `
mutation updateUserPassword($id: String!, $data: UserPasswordInput!){
    updateUserPassword(id: $id, data: $data){
        status
    }
}
`;

export const DELETE_SITE_ENTRY = `
mutation deleteSiteEntry($siteId: String!, $ids: [String!]!){
    deleteSiteEntry(siteId: $siteId, ids: $ids){
        status
    }
}
`

export const DELETE_SITES = `
mutation deleteSites($ids: [String!]!){
    deleteSites(ids: $ids){
        status
    }
}
`

export const CREATE_PROPERTY = `
mutation createProperty($data: PropertyInput!){
    createProperty(data: $data){
        id,
        name
        location
        price
        buyer
        buyerNumber
        totalReceivedAmount
        balance
        nextDueDate
        note
        createdAt
        updatedAt 
    }
}
`;

export const UPDATE_PROPERTY = `
mutation updateProperty($id: String!, $data: PropertyUpdateInput!){
    updateProperty(id: $id, data: $data){
        id,
        name
        location
        price
        buyer
        totalReceivedAmount
        balance
        nextDueDate        
        note
        createdAt
        updatedAt 
    }
}
`;

export const PROPERTY_CREDIT = `
    mutation propertyCredit($id: String!, $amount: Float!){
        propertyCredit(id: $id, amount: $amount){
            amount
            createdAt
        }
    }
`;