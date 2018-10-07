export const USERS = `
    query users($limit: Int, $skip: Int){
        users(limit: $limit, skip: $skip) {
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
            count,
        }
    }
`;

export const USER = `
    query user($id: String!){
        user(id: $id) {
            id,
            username,
            contact,
            siteCount,
            totalSitesCost,
            totalReceivedAmount,
            spent,
            balance,            
            createdAt,
            updatedAt            
        }
    }
`;

export const USER_CREDIT_HISTORY = `
    query userCreditHistory($id: String!, $limit: Int, $skip: Int){
        userCreditHistory(id: $id, limit: $limit, skip: $skip) {
            amount
            createdAt
            count                        
        }
    }
`;

export const USERS_USERNAME = `
    query users($limit: Int, $skip: Int){
        users(limit: $limit, skip: $skip) {
            id
            username
        }
    }
`;

export const siteTotalRepeater = `{
  quantity
  cost
}
`
export const SITES = `
  query sites($limit: Int, $skip: Int) {
    sites(limit: $limit, skip: $skip) {
        id,
        name,
        location,
        entryCount,
        count
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

// export const STORE_SITELIST = `
//   query sites {
//   sites {
//     id
//     name
//     location
//     entryCount
//     createdAt
//     updatedAt
//     count
//     manager {
//       id
//       name: username
//     }
//     managerSpentAmount
//     cost
//   }
// }
// `;

export const SITE = `
  query site($id: String!) {
    site(id: $id) {
        id,
        name,
        location,
        cost
        entryCount
        manager {
            id,
            name: username
        }
        managerSpentAmount,
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
        },
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

export const SITE_ENTRIES = `
    query siteEntries($siteId: String!, $limit: Int!, $skip: Int){
        siteEntries(siteId: $siteId, limit: $limit, skip: $skip){            
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
            managerSpentAmount,
            total            
        }
    }
`

export const SITE_ENTRY = `
    query siteEntry($id: String!){
        siteEntry(id: $id){
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
            managerSpentAmount,
            total
        }
    }
`

export const PROPERTIES = `
    query properties($limit: Int!, $skip: Int){
        properties(limit: $limit, skip: $skip){
            id
            name
            location
            price
            buyer
            buyerNumber
            totalReceivedAmount
            balance
            nextDueDate
            note
            count
            createdAt
            updatedAt            
        }
    }
`;

export const PROPERTY = `
    query property($id: String!){
        property(id: $id){
            id
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

export const PROPERTY_CREDIT_HISTORY = `
    query propertyCreditHistory($id: String!, $limit: Int, $skip: Int){
        propertyCreditHistory(id: $id, limit: $limit, skip: $skip) {
            amount
            createdAt
            count
        }
    }
`;
