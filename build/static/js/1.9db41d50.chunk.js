webpackJsonp([1],{789:function(n,t,e){"use strict";function i(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function r(n,t){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?n:t}function a(n,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(n,t):n.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=e(1),o=e.n(u),s=e(284),d=e(291),c=e.n(d),l=e(810),p=e(293),m=e(792),f=function(){function n(n,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}(),y=function(n){function t(){return i(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,n),f(t,[{key:"render",value:function(){var n=this,t={quantity:{type:"number",default:0},cost:{type:"number",default:0,startAdornment:o.a.createElement(c.a,{position:"start"},"\u20b9")},paid:{type:Boolean,default:!1}},e={mistri:{default:t},labour:{default:t},eit:{default:t},morang:{default:t},githi:{default:t},cement:{default:t},saria:{default:t},dust:{default:t},other:{default:{quantity:{type:"text",default:"N/A"},cost:{type:"number",default:0},paid:{type:Boolean,default:!1}}},createdAt:{type:"date",default:new Date}},i=this.props.match.params,r=i.siteId,a=i.id;return o.a.createElement(l.a,Object.assign({},this.props,{query:m.b,createMutation:s.g,updateMutation:s.i,defaults:e}),function(t){var e=t.update,i=t.defaults;return o.a.createElement(p.a,Object.assign({},n.props,{defaults:i,mutation:e?s.i:s.g,title:e?"Update this entry":"Create a new entry",submitText:e?"Update Entry":"Create Entry",mutateFunc:function(n,t){return n({variables:{siteId:r,id:a,data:t}})}}))})}}]),t}(u.PureComponent);t.default=y},792:function(n,t,e){"use strict";function i(n,t){return Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(t)}}))}e.d(t,"g",function(){return f}),e.d(t,"f",function(){return y}),e.d(t,"i",function(){return g}),e.d(t,"h",function(){return b}),e.d(t,"c",function(){return $}),e.d(t,"e",function(){return h}),e.d(t,"a",function(){return A}),e.d(t,"d",function(){return k}),e.d(t,"b",function(){return j});var r=e(79),a=(e.n(r),i(["\n    query users($limit: Int, $skip: Int){\n        users(limit: $limit, skip: $skip) {\n            id,\n            username,            \n            siteCount,\n            totalSitesCost,\n            totalReceivedAmount,\n            spent,\n            balance,\n            createdAt,\n            updatedAt,\n            count,\n        }\n    }\n"],["\n    query users($limit: Int, $skip: Int){\n        users(limit: $limit, skip: $skip) {\n            id,\n            username,            \n            siteCount,\n            totalSitesCost,\n            totalReceivedAmount,\n            spent,\n            balance,\n            createdAt,\n            updatedAt,\n            count,\n        }\n    }\n"])),u=i(["\n    query user($id: String!){\n        user(id: $id) {\n            id,\n            username,\n            siteCount,\n            totalSitesCost,\n            totalReceivedAmount,\n            spent,\n            balance,\n            createdAt,\n            updatedAt            \n        }\n    }\n"],["\n    query user($id: String!){\n        user(id: $id) {\n            id,\n            username,\n            siteCount,\n            totalSitesCost,\n            totalReceivedAmount,\n            spent,\n            balance,\n            createdAt,\n            updatedAt            \n        }\n    }\n"]),o=i(["\n    query userCreditHistory($id: String!, $limit: Int, $skip: Int){\n        userCreditHistory(id: $id, limit: $limit, skip: $skip) {\n            count\n            history {\n                amount\n                createdAt\n            }\n        }\n    }\n"],["\n    query userCreditHistory($id: String!, $limit: Int, $skip: Int){\n        userCreditHistory(id: $id, limit: $limit, skip: $skip) {\n            count\n            history {\n                amount\n                createdAt\n            }\n        }\n    }\n"]),s=i(["\n    query users($limit: Int, $skip: Int){\n        users(limit: $limit, skip: $skip) {\n            id\n            username\n        }\n    }\n"],["\n    query users($limit: Int, $skip: Int){\n        users(limit: $limit, skip: $skip) {\n            id\n            username\n        }\n    }\n"]),d=i(["\n  query sites($limit: Int, $skip: Int) {\n    sites(limit: $limit, skip: $skip) {\n        id,\n        name,\n        location,\n        entryCount,\n        createdAt,\n        updatedAt,\n        count\n        manager {\n            id,\n            name: username\n        }\n        managerSpentAmount,\n        cost\n    }\n  }\n"],["\n  query sites($limit: Int, $skip: Int) {\n    sites(limit: $limit, skip: $skip) {\n        id,\n        name,\n        location,\n        entryCount,\n        createdAt,\n        updatedAt,\n        count\n        manager {\n            id,\n            name: username\n        }\n        managerSpentAmount,\n        cost\n    }\n  }\n"]),c=i(["\n  query sites {\n  sites {\n    id\n    name\n    location\n    entryCount\n    createdAt\n    updatedAt\n    count\n    manager {\n      id\n      name: username\n    }\n    managerSpentAmount\n    cost\n  }\n}\n"],["\n  query sites {\n  sites {\n    id\n    name\n    location\n    entryCount\n    createdAt\n    updatedAt\n    count\n    manager {\n      id\n      name: username\n    }\n    managerSpentAmount\n    cost\n  }\n}\n"]),l=i(["\n  query site($id: String!) {\n    site(id: $id) {\n        id,\n        name,\n        location,\n        createdAt,\n        updatedAt,\n        count\n        manager {\n            id,\n            name: username\n        }        \n    }\n  }\n"],["\n  query site($id: String!) {\n    site(id: $id) {\n        id,\n        name,\n        location,\n        createdAt,\n        updatedAt,\n        count\n        manager {\n            id,\n            name: username\n        }        \n    }\n  }\n"]),p=i(["\n    query siteEntries($id: String!, $limit: Int!, $skip: Int){\n        siteEntries(id: $id, limit: $limit, skip: $skip){\n            id,\n            name,\n            location,\n            cost,\n            count,\n            manager {\n                id,\n                name: username,                \n            },\n            managerSpentAmount,\n            entries\n            {\n                id,\n                createdAt,\n                updatedAt,                \n                mistri ",",\n                labour ",",\n                eit ",",\n                morang ",",\n                githi ",",\n                cement ",",\n                saria ",",\n                dust ",",\n                other ",",\n                managerSpentAmount,\n                total\n            }\n        }\n    }\n"],["\n    query siteEntries($id: String!, $limit: Int!, $skip: Int){\n        siteEntries(id: $id, limit: $limit, skip: $skip){\n            id,\n            name,\n            location,\n            cost,\n            count,\n            manager {\n                id,\n                name: username,                \n            },\n            managerSpentAmount,\n            entries\n            {\n                id,\n                createdAt,\n                updatedAt,                \n                mistri ",",\n                labour ",",\n                eit ",",\n                morang ",",\n                githi ",",\n                cement ",",\n                saria ",",\n                dust ",",\n                other ",",\n                managerSpentAmount,\n                total\n            }\n        }\n    }\n"]),m=i(["\n    query siteEntry($id: String!){\n        siteEntry(id: $id){\n            id,\n            createdAt,\n            updatedAt,                \n            mistri ",",\n            labour ",",\n            eit ",",\n            morang ",",\n            githi ",",\n            cement ",",\n            saria ",",\n            dust ",",\n            other ",",\n            managerSpentAmount,\n            total\n        }\n    }\n"],["\n    query siteEntry($id: String!){\n        siteEntry(id: $id){\n            id,\n            createdAt,\n            updatedAt,                \n            mistri ",",\n            labour ",",\n            eit ",",\n            morang ",",\n            githi ",",\n            cement ",",\n            saria ",",\n            dust ",",\n            other ",",\n            managerSpentAmount,\n            total\n        }\n    }\n"]),f=Object(r.gql)(a),y=Object(r.gql)(u),g=Object(r.gql)(o),b=Object(r.gql)(s),$=Object(r.gql)(d),h=Object(r.gql)(c),A=Object(r.gql)(l),O="{\n    quantity,\n    cost,\n    paid\n}",k=Object(r.gql)(p,O,O,O,O,O,O,O,O,O),j=Object(r.gql)(m,O,O,O,O,O,O,O,O,O)},794:function(n,t,e){"use strict";t.a=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object.keys(n).filter(function(n){return!t.includes(n)}).reduce(function(t,e){return t[e]=n[e],t},{})}},810:function(n,t,e){"use strict";function i(n,t){var e={};for(var i in n)t.indexOf(i)>=0||Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e}function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function a(n,t){if(!n)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?n:t}function u(n,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(n,t):n.__proto__=t)}var o=e(1),s=e.n(o),d=e(101),c=e(794),l=function(){function n(n,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}(),p=function(n){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,n),l(t,[{key:"formatDate",value:function(n){var t=new Date(n),e=""+(t.getMonth()+1),i=""+t.getDate(),r=t.getFullYear();return e.length<2&&(e="0"+e),i.length<2&&(i="0"+i),[r,e,i].join("-")}},{key:"mergeData",value:function(n,t){var e=this,i={};return Object.keys(n).forEach(function(r){if(i[r]=Object.assign({},n[r]),"string"===typeof n[r].default||"number"===typeof n[r].default)i[r].default=t[r];else if(n[r].default instanceof Array);else if(n[r].type===Boolean)i[r].default=t[r];else if("date"===n[r].type)i[r].default=e.formatDate(t[r]);else{if(!(n[r].default instanceof Object))throw new Error("merge error");i[r].default=Object.assign({},e.mergeData(n[r].default,t[r]))}}),i}},{key:"render",value:function(){var n=this,t=this.props.match.params,e=t.edit,r=void 0!==e&&e,a=i(t,["edit"]),u=this.props,o=u.query,l=u.getQueryVariables,p=void 0===l?function(n){return{id:n.id}}:l,m=u.defaults,f=u.skipOnUpdate,y=m;return r?(y=Object(c.a)(m,f),s.a.createElement(d.a,{query:o,variables:p(a),fetchPolicy:"cache-and-network"},function(t){var e=t.loading,i=t.error,r=t.data;if(e)return s.a.createElement("span",null,"loading...");if(i)return s.a.createElement("span",null,"Error Occured!");var a=n.mergeData(y,r[Object.keys(r)[0]]);return n.props.children({update:!0,defaults:a,queryResult:r})})):this.props.children({update:!1,defaults:y,queryResult:null})}}]),t}(o.PureComponent);t.a=p}});
//# sourceMappingURL=1.9db41d50.chunk.js.map