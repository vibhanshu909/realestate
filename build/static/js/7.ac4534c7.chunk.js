webpackJsonp([7],{791:function(e,t,n){"use strict";function r(e,t){var n=function(t){return i.default.createElement(l.default,t,e)};return n.displayName=t,n=(0,o.default)(n),n.muiName="SvgIcon",n}var a=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n(1)),o=a(n(24)),l=a(n(21)),u=r;t.default=u},792:function(e,t,n){"use strict";function r(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}n.d(t,"g",function(){return m}),n.d(t,"f",function(){return b}),n.d(t,"i",function(){return h}),n.d(t,"h",function(){return v}),n.d(t,"c",function(){return y}),n.d(t,"e",function(){return g}),n.d(t,"a",function(){return E}),n.d(t,"d",function(){return w}),n.d(t,"b",function(){return k});var a=n(79),i=(n.n(a),r(["\n    query users($limit: Int, $skip: Int){\n        users(limit: $limit, skip: $skip) {\n            id,\n            username,            \n            siteCount,\n            totalSitesCost,\n            totalReceivedAmount,\n            spent,\n            balance,\n            createdAt,\n            updatedAt,\n            count,\n        }\n    }\n"],["\n    query users($limit: Int, $skip: Int){\n        users(limit: $limit, skip: $skip) {\n            id,\n            username,            \n            siteCount,\n            totalSitesCost,\n            totalReceivedAmount,\n            spent,\n            balance,\n            createdAt,\n            updatedAt,\n            count,\n        }\n    }\n"])),o=r(["\n    query user($id: String!){\n        user(id: $id) {\n            id,\n            username,\n            siteCount,\n            totalSitesCost,\n            totalReceivedAmount,\n            spent,\n            balance,\n            createdAt,\n            updatedAt            \n        }\n    }\n"],["\n    query user($id: String!){\n        user(id: $id) {\n            id,\n            username,\n            siteCount,\n            totalSitesCost,\n            totalReceivedAmount,\n            spent,\n            balance,\n            createdAt,\n            updatedAt            \n        }\n    }\n"]),l=r(["\n    query userCreditHistory($id: String!, $limit: Int, $skip: Int){\n        userCreditHistory(id: $id, limit: $limit, skip: $skip) {\n            count\n            history {\n                amount\n                createdAt\n            }\n        }\n    }\n"],["\n    query userCreditHistory($id: String!, $limit: Int, $skip: Int){\n        userCreditHistory(id: $id, limit: $limit, skip: $skip) {\n            count\n            history {\n                amount\n                createdAt\n            }\n        }\n    }\n"]),u=r(["\n    query users($limit: Int, $skip: Int){\n        users(limit: $limit, skip: $skip) {\n            id\n            username\n        }\n    }\n"],["\n    query users($limit: Int, $skip: Int){\n        users(limit: $limit, skip: $skip) {\n            id\n            username\n        }\n    }\n"]),c=r(["\n  query sites($limit: Int, $skip: Int) {\n    sites(limit: $limit, skip: $skip) {\n        id,\n        name,\n        location,\n        entryCount,\n        createdAt,\n        updatedAt,\n        count\n        manager {\n            id,\n            name: username\n        }\n        managerSpentAmount,\n        cost\n    }\n  }\n"],["\n  query sites($limit: Int, $skip: Int) {\n    sites(limit: $limit, skip: $skip) {\n        id,\n        name,\n        location,\n        entryCount,\n        createdAt,\n        updatedAt,\n        count\n        manager {\n            id,\n            name: username\n        }\n        managerSpentAmount,\n        cost\n    }\n  }\n"]),s=r(["\n  query sites {\n  sites {\n    id\n    name\n    location\n    entryCount\n    createdAt\n    updatedAt\n    count\n    manager {\n      id\n      name: username\n    }\n    managerSpentAmount\n    cost\n  }\n}\n"],["\n  query sites {\n  sites {\n    id\n    name\n    location\n    entryCount\n    createdAt\n    updatedAt\n    count\n    manager {\n      id\n      name: username\n    }\n    managerSpentAmount\n    cost\n  }\n}\n"]),d=r(["\n  query site($id: String!) {\n    site(id: $id) {\n        id,\n        name,\n        location,\n        createdAt,\n        updatedAt,\n        count\n        manager {\n            id,\n            name: username\n        }        \n    }\n  }\n"],["\n  query site($id: String!) {\n    site(id: $id) {\n        id,\n        name,\n        location,\n        createdAt,\n        updatedAt,\n        count\n        manager {\n            id,\n            name: username\n        }        \n    }\n  }\n"]),p=r(["\n    query siteEntries($id: String!, $limit: Int!, $skip: Int){\n        siteEntries(id: $id, limit: $limit, skip: $skip){\n            id,\n            name,\n            location,\n            cost,\n            count,\n            manager {\n                id,\n                name: username,                \n            },\n            managerSpentAmount,\n            entries\n            {\n                id,\n                createdAt,\n                updatedAt,                \n                mistri ",",\n                labour ",",\n                eit ",",\n                morang ",",\n                githi ",",\n                cement ",",\n                saria ",",\n                dust ",",\n                other ",",\n                managerSpentAmount,\n                total\n            }\n        }\n    }\n"],["\n    query siteEntries($id: String!, $limit: Int!, $skip: Int){\n        siteEntries(id: $id, limit: $limit, skip: $skip){\n            id,\n            name,\n            location,\n            cost,\n            count,\n            manager {\n                id,\n                name: username,                \n            },\n            managerSpentAmount,\n            entries\n            {\n                id,\n                createdAt,\n                updatedAt,                \n                mistri ",",\n                labour ",",\n                eit ",",\n                morang ",",\n                githi ",",\n                cement ",",\n                saria ",",\n                dust ",",\n                other ",",\n                managerSpentAmount,\n                total\n            }\n        }\n    }\n"]),f=r(["\n    query siteEntry($id: String!){\n        siteEntry(id: $id){\n            id,\n            createdAt,\n            updatedAt,                \n            mistri ",",\n            labour ",",\n            eit ",",\n            morang ",",\n            githi ",",\n            cement ",",\n            saria ",",\n            dust ",",\n            other ",",\n            managerSpentAmount,\n            total\n        }\n    }\n"],["\n    query siteEntry($id: String!){\n        siteEntry(id: $id){\n            id,\n            createdAt,\n            updatedAt,                \n            mistri ",",\n            labour ",",\n            eit ",",\n            morang ",",\n            githi ",",\n            cement ",",\n            saria ",",\n            dust ",",\n            other ",",\n            managerSpentAmount,\n            total\n        }\n    }\n"]),m=Object(a.gql)(i),b=Object(a.gql)(o),h=Object(a.gql)(l),v=Object(a.gql)(u),y=Object(a.gql)(c),g=Object(a.gql)(s),E=Object(a.gql)(d),O="{\n    quantity,\n    cost,\n    paid\n}",w=Object(a.gql)(p,O,O,O,O,O,O,O,O,O),k=Object(a.gql)(f,O,O,O,O,O,O,O,O,O)},793:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function a(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(a,i){try{var o=t[a](i),l=o.value}catch(e){return void n(e)}if(!o.done)return Promise.resolve(l).then(function(e){r("next",e)},function(e){r("throw",e)});e(l)}return r("next")})}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function u(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function c(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.primary,r=void 0===n?"#35A7FF":n,a=t.secondary,i=void 0===a?"#FF5964":a;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e=r;case 1:return e=e===i?r:i,t.next=5,e;case 5:t.next=1;break;case 7:case"end":return t.stop()}},le,this)}var s=n(102),d=n.n(s),p=n(1),f=n.n(p),m=n(6),b=n.n(m),h=n(2),v=n.n(h),y=n(47),g=(n.n(y),n(104)),E=n.n(g),O=n(295),w=n.n(O),k=n(296),S=n.n(k),C=n(169),j=n.n(C),P=n(297),_=n.n(P),A=n(298),x=n.n(A),$=n(299),q=n.n($),T=n(300),M=n.n(T),H=n(105),R=n.n(H),I=n(23),D=n.n(I),z=n(28),N=n.n(z),V=n(171),B=n.n(V),F=n(301),L=n.n(F),W=n(78),U=n.n(W),Y=n(800),G=n.n(Y),J=n(795),X=n.n(J),K=n(801),Q=(n.n(K),n(802)),Z=n(38),ee=(n.n(Z),n(804)),te=n(805),ne=n(807),re=n(797),ae=n(794),ie=this,oe=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),le=d.a.mark(c),ue=function(e){function t(){var e,n,r,a;o(this,t);for(var i=arguments.length,u=Array(i),c=0;c<i;c++)u[c]=arguments[c];return n=r=l(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),r.createSortHandler=function(e){return function(t){r.props.onRequestSort(t,e)}},a=n,l(r,a)}return u(t,e),oe(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.selectable,r=t.onSelectAllClick,a=t.order,i=t.orderBy,o=t.numSelected,l=t.rowCount,u=t.columnData,s=c(),d=!0;return f.a.createElement(_.a,null,f.a.createElement(q.a,null,n?f.a.createElement(j.a,{padding:"checkbox"},f.a.createElement(B.a,{indeterminate:o>0&&o<l,checked:o===l,onChange:r})):null,u.map(function(t,n){var r=null;return d?(r=null,d=!1):r=s.next().value,f.a.createElement(j.a,{key:t.id,numeric:t.numeric,padding:0!==n&&t.disablePadding?"none":"default",sortDirection:i===t.id&&a,colSpan:t.colSpan},f.a.createElement(L.a,{title:"Sort",placement:t.numeric?"bottom-end":"bottom-start",enterDelay:300},f.a.createElement(M.a,{active:i===t.id,direction:a,onClick:e.createSortHandler(t.id),style:{color:r}},t.label)))},this)))}}]),t}(f.a.PureComponent);ue.propTypes={numSelected:v.a.number.isRequired,onRequestSort:v.a.func.isRequired,onSelectAllClick:v.a.func.isRequired,order:v.a.string.isRequired,orderBy:v.a.string.isRequired,rowCount:v.a.number.isRequired};var ce=function(e){return{root:{paddingRight:e.spacing.unit},highlight:"light"===e.palette.type?{color:e.palette.secondary.main,backgroundColor:Object(Z.lighten)(e.palette.secondary.light,.85)}:{color:e.palette.text.primary,backgroundColor:e.palette.secondary.dark},spacer:{flex:"1 1 50%"},actions:{color:e.palette.text.secondary},title:{flex:"0 0 auto"}}},se=function(e){var t=e.numSelected,n=e.selected,r=e.classes,a=e.title,o=e.menu,l=e.historyable,u=e.options,c=u.onView,s=u.onEdit,d=u.onDelete,p=u.onCredit,m=u.viewable,h=void 0===m?c!==s:m,v=u.editable,y=void 0===v?!!s:v,g=u.deletable,O=void 0===g?!!d:g,w=u.creditable,k=void 0===w?!!p:w,S=f.a.createElement(E.a,{item:!0,xs:!0},f.a.createElement(L.a,{title:"Delete"},f.a.createElement(te.a,{positiveHandler:function(e){return d({ids:n})}})));return f.a.createElement(R.a,{className:b()(r.root,i({},r.highlight,t>0))},f.a.createElement("div",{className:r.title},t>0?f.a.createElement(D.a,{color:"inherit",variant:"subheading"},t," selected"):f.a.createElement(D.a,{variant:"title",id:"tableTitle"},a)),f.a.createElement("div",{className:r.spacer}),f.a.createElement("div",{className:r.actions},t>0?1===t?f.a.createElement(E.a,{container:!0,direction:"row",justify:"space-between"},l?f.a.createElement(ne.a,{selected:n[0]}):null,k?f.a.createElement(E.a,{item:!0,xs:!0},f.a.createElement(L.a,{title:"Credit"},f.a.createElement(Q.a,Object.assign({},ie.props,{positiveHandler:function(e,t){return p(e,Object.assign({},t,{id:n[0]}))}})))):null,h?f.a.createElement(E.a,{item:!0,xs:!0},f.a.createElement(L.a,{title:"View"},f.a.createElement(U.a,{"aria-label":"View",onClick:function(e){return c(n[0])}},f.a.createElement(X.a,null)))):null,y?f.a.createElement(E.a,{item:!0,xs:!0},f.a.createElement(L.a,{title:"Edit"},f.a.createElement(U.a,{"aria-label":"Edit",onClick:function(e){return s(n[0])}},f.a.createElement(G.a,null)))):null,O?S:null):O?S:null:o))};se.propTypes={classes:v.a.object.isRequired,numSelected:v.a.number.isRequired},se=Object(y.withStyles)(ce)(se);var de=function(e){return{root:{width:"100%",marginTop:3*e.spacing.unit},table:{minWidth:"100%"},tableWrapper:{overflowX:"auto"}}},pe=function(e){function t(){var e,n,r,i,u=this;o(this,t);for(var c=arguments.length,s=Array(c),p=0;p<c;p++)s[p]=arguments[p];return n=r=l(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),r.handleRequestSort=function(){var e=a(d.a.mark(function e(t,n){var a,i;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=n,i="asc",r.props.settings.orderBy===n&&"asc"===r.props.settings.order&&(i="desc"),e.next=5,r.props.mutate(Object.assign({},r.props.settings,{order:i,orderBy:a}));case 5:case"end":return e.stop()}},e,u)}));return function(t,n){return e.apply(this,arguments)}}(),r.handleSelectAllClick=function(){var e=a(d.a.mark(function e(t,n){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!n){e.next=4;break}return e.next=3,r.props.mutate(Object.assign({},r.props.settings,{selected:r.props.data.map(function(e){return e.id})}));case 3:return e.abrupt("return");case 4:return e.next=6,r.props.mutate(Object.assign({},r.props.settings,{selected:[]}));case 6:case"end":return e.stop()}},e,u)}));return function(t,n){return e.apply(this,arguments)}}(),r.handleClick=function(){var e=a(d.a.mark(function e(t,n){var a,i,o;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.props.settings.selected,i=a.indexOf(n),o=[],-1===i?o=o.concat(a,n):0===i?o=o.concat(a.slice(1)):i===a.length-1?o=o.concat(a.slice(0,-1)):i>0&&(o=o.concat(a.slice(0,i),a.slice(i+1))),e.next=6,r.props.mutate(Object.assign({},r.props.settings,{selected:o}));case 6:case"end":return e.stop()}},e,u)}));return function(t,n){return e.apply(this,arguments)}}(),r.handleChangePage=function(){var e=a(d.a.mark(function e(t,n){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Page Change..",n),e.next=3,r.props.mutate(Object.assign({},r.props.settings,{page:n,selected:[]}));case 3:case"end":return e.stop()}},e,u)}));return function(t,n){return e.apply(this,arguments)}}(),r.isSelected=function(e){return-1!==r.props.settings.selected.indexOf(e)},r.dialogMutate=function(e){return r.props.mutate(Object.assign({},r.props.settings,{dialogOpen:!e}))},i=n,l(r,i)}return u(t,e),oe(t,[{key:"componentWillMount",value:function(){}},{key:"render",value:function(){var e=this,t=this.props,n=t.classes,a=t.loading,i=t.data,o=t.count,l=t.settings,u=l.order,s=l.orderBy,d=l.selected,p=void 0===d?[]:d,m=l.rowsPerPage,b=l.page,h=t.skipToolbar,v=t.title,y=t.columnData,g=t.exclude,E=t.historyable,O=t.menu,k=t.options,C=void 0===k?{}:k,P=t.customColumnData,_=t.render,A=void 0===_?function(e,t,n){if(!(t instanceof Object))return f.a.createElement(j.a,{style:{color:n},key:Math.random()},t);var a=(t.__typename,r(t,["__typename"]));return Object.values(a).map(function(e){return f.a.createElement(j.a,{style:{color:n},key:Math.random()},e)})}:_,$=C.onEdit,T=C.onView,M=void 0===T?$:T,H=C.onDelete,R=C.onCredit,I=C.selectable,D=void 0===I?$||M||H||R:I,z={onEdit:$,onView:M,onDelete:H,onCredit:R};if(0===i.length)return f.a.createElement("h1",null,"No Data Yet!");var V=[].concat(i);return f.a.createElement(N.a,{className:n.root},a?f.a.createElement(re.a,null):null,h?null:f.a.createElement(se,{title:v,numSelected:p.length,selected:p,menu:O,historyable:E,options:z}),f.a.createElement("div",{className:n.tableWrapper},f.a.createElement(w.a,{className:n.table,"aria-labelledby":v},f.a.createElement(ue,{selectable:D,numSelected:p.length,order:u,orderBy:s,onSelectAllClick:this.handleSelectAllClick,onRequestSort:this.handleRequestSort,rowCount:i.length,columnData:y}),f.a.createElement(S.a,null,V.map(function(t,n){var a=t.createdAt,i=r(t,["createdAt"]),o=e.isSelected(i.id);return f.a.createElement(q.a,{hover:!0,role:"checkbox","aria-checked":o,tabIndex:-1,key:i.id||n,selected:o,onDoubleClick:function(e){return M&&M(i.id)}},D?f.a.createElement(j.a,{padding:"checkbox"},f.a.createElement(B.a,{checked:o,onClick:function(t){return e.handleClick(t,i.id)}})):null,a?f.a.createElement(j.a,{component:"th",scope:"row",padding:D?"none":"default"},Object(ee.a)(a)):null,function(){var e=Object(ae.a)(i,g),t=c();return f.a.createElement(f.a.Fragment,null,Object.keys(e).map(function(n){var r=t.next().value;return A(n,e[n],r)}),P?f.a.createElement(j.a,{style:{color:t.next().value},key:Math.random()},P(e)):null)}())})))),f.a.createElement(x.a,{component:"div",count:o,rowsPerPage:m,rowsPerPageOptions:[15],page:b,backIconButtonProps:{"aria-label":"Previous Page"},nextIconButtonProps:{"aria-label":"Next Page"},onChangePage:this.handleChangePage}))}}]),t}(f.a.PureComponent);pe.propTypes={classes:v.a.object.isRequired},pe=Object(y.withStyles)(de)(pe),t.a=pe},794:function(e,t,n){"use strict";t.a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object.keys(e).filter(function(e){return!t.includes(e)}).reduce(function(t,n){return t[n]=e[n],t},{})}},795:function(e,t,n){"use strict";var r=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(1)),i=r(n(791)),o=(0,i.default)(a.default.createElement("g",null,a.default.createElement("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"})),"Visibility");t.default=o},796:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=n(1),l=n.n(o),u=n(2),c=n.n(u),s=n(48),d=n.n(s),p=n(286),f=n.n(p),m=n(287),b=n.n(m),h=n(288),v=n.n(h),y=n(289),g=n.n(y),E=n(290),O=n.n(E),w=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),k=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),w(t,[{key:"render",value:function(){var e=this.props,t=e.fullScreen,n=e.open,r=void 0!==n&&n,a=e.title,i=e.content,o=e.positiveText,u=void 0===o?"Yes":o,c=e.negativeText,s=e.negativeHandler,p=void 0===s?function(e){return null}:s,m=e.positiveHandler;return l.a.createElement(f.a,{fullScreen:t,open:r,onClose:p,"aria-labelledby":a},l.a.createElement(O.a,{id:a},a),l.a.createElement(v.a,null,"string"===typeof i?l.a.createElement(g.a,null,i):i),l.a.createElement(b.a,null,c?l.a.createElement(d.a,{onClick:p,color:"primary",autoFocus:!0},c):null,m?l.a.createElement(d.a,{onClick:m,color:"primary"},u):null))}}]),t}(l.a.PureComponent);k.propTypes={fullScreen:c.a.bool.isRequired},t.a=k},797:function(e,t,n){"use strict";function r(e){var t=e.classes;return i.a.createElement("div",{className:t.root},i.a.createElement(s.a,null))}var a=n(1),i=n.n(a),o=n(2),l=n.n(o),u=n(47),c=(n.n(u),n(80)),s=n.n(c),d={root:{flexGrow:1}};r.propTypes={classes:l.a.object.isRequired},t.a=Object(u.withStyles)(d)(r)},798:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}var a=n(1),i=n.n(a),o=n(169),l=n.n(o);t.a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"rgba(0, 255, 0, 0.5)";return function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,a=arguments[1],o=arguments[2];if(!(a instanceof Object))return i.a.createElement(l.a,{style:{color:o,backgroundColor:n===e?t:null},key:Math.random()},a);var u=(a.id,a.__typename,a.paid),c=r(a,["id","__typename","paid"]);return Object.values(c).map(function(e){return i.a.createElement(l.a,{style:{color:o,backgroundColor:u?t:null},key:Math.random()},e)})}}},799:function(e,t,n){"use strict";var r=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(1)),i=r(n(791)),o=(0,i.default)(a.default.createElement("g",null,a.default.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"})),"Add");t.default=o},800:function(e,t,n){"use strict";var r=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(1)),i=r(n(791)),o=(0,i.default)(a.default.createElement("g",null,a.default.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})),"Edit");t.default=o},801:function(e,t,n){"use strict";var r=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(1)),i=r(n(791)),o=(0,i.default)(a.default.createElement("g",null,a.default.createElement("path",{d:"M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"})),"FilterList");t.default=o},802:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=n(1),l=n.n(o),u=n(47),c=(n.n(u),n(78)),s=n.n(c),d=n(803),p=n.n(d),f=n(168),m=n(48),b=n.n(m),h=n(170),v=n.n(h),y=n(81),g=(n.n(y),n(286)),E=n.n(g),O=n(287),w=n.n(O),k=n(288),S=n.n(k),C=n(289),j=n.n(C),P=n(290),_=n.n(P),A=n(291),x=n.n(A),$=n(294),q=n(284),T=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),M={progress:{margin:"1rem"}},H={amount:{type:"number",default:0,startAdornment:l.a.createElement(x.a,{position:"start"},"\u20b9")}},R=function(e){function t(){var e,n,i,o;r(this,t);for(var l=arguments.length,u=Array(l),c=0;c<l;c++)u[c]=arguments[c];return n=i=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),i.state={open:!1},i.handleClose=function(){i.setState({open:!1})},i.handleOpen=function(){i.setState({open:!0})},o=n,a(i,o)}return i(t,e),T(t,[{key:"render",value:function(){var e=this,t=this.state.open,n=this.props,r=n.history,a=n.classes,i=n.negativeHandler,o=void 0===i?function(t){return e.handleClose()}:i,u=n.positiveHandler,c=void 0===u?function(e){return null}:u,d=n.postMutation,m=void 0===d?function(e){return null}:d,h="Add Credit";return l.a.createElement("div",null,l.a.createElement(f.a,{mutation:q.c},function(n,i){var u=i.loading;i.error,i.data;return l.a.createElement(l.a.Fragment,null,l.a.createElement(s.a,{"aria-label":"Credit",onClick:e.handleOpen},l.a.createElement(p.a,null)),t?l.a.createElement(E.a,{fullScreen:!1,open:t,onClose:o,"aria-labelledby":h},l.a.createElement(y.Form,{onSubmit:function(t){console.log("form submitted",t),c(n,t).then(function(n){m?(m(n),e.handleClose(t)):r.goBack()})}},l.a.createElement(_.a,{id:h},h),l.a.createElement(S.a,null,l.a.createElement(j.a,null,"Add credit amount to this user."),l.a.createElement($.a,{field:"amount",type:H.amount.type||"text",step:.01,validate:H.amount.validate,initialValue:H.amount.default,startAdornment:H.amount.startAdornment,validateOnChange:!0,validateOnBlur:!0})),l.a.createElement(w.a,null,u?l.a.createElement(v.a,{className:a.progress}):null,l.a.createElement(b.a,{onClick:o,color:"primary",autoFocus:!0},"Cancel"),l.a.createElement(b.a,{size:"large",type:"submit",disabled:u},"Confirm")))):null)}))}}]),t}(l.a.PureComponent);t.a=Object(u.withStyles)(M)(R)},803:function(e,t,n){"use strict";var r=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(1)),i=r(n(791)),o=(0,i.default)(a.default.createElement("g",null,a.default.createElement("path",{d:"M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"})),"AttachMoney");t.default=o},804:function(e,t,n){"use strict";t.a=function(e){var t={weekday:"long",year:"numeric",month:"long",day:"numeric"};return new Date(e).toLocaleDateString("hi-IN",t)}},805:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var o=n(1),l=n.n(o),u=n(78),c=n.n(u),s=n(806),d=n.n(s),p=n(796),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),m=function(e){function t(){var e,n,i,o;r(this,t);for(var l=arguments.length,u=Array(l),c=0;c<l;c++)u[c]=arguments[c];return n=i=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),i.state={open:!1},i.handleClose=function(){i.setState({open:!1})},i.handleOpen=function(){i.setState({open:!0})},o=n,a(i,o)}return i(t,e),f(t,[{key:"render",value:function(){var e=this,t=this.state.open,n=this.props,r=n.positiveHandler,a=void 0===r?function(e){return null}:r,i=n.negativeHandler,o=void 0===i?function(e){return null}:i;return l.a.createElement("div",null,l.a.createElement(c.a,{"aria-label":"Delete",onClick:this.handleOpen},l.a.createElement(d.a,null)),t?l.a.createElement(p.a,{fullScreen:!1,open:t,title:"Confirm Delete",content:"Are You sure?",negativeHandler:function(t){e.handleClose(t),o(t)},positiveHandler:function(t){e.handleClose(t),a(t)}}):null)}}]),t}(l.a.PureComponent);t.a=m},806:function(e,t,n){"use strict";var r=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(1)),i=r(n(791)),o=(0,i.default)(a.default.createElement("g",null,a.default.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})),"Delete");t.default=o},807:function(e,t,n){"use strict";function r(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(a,i){try{var o=t[a](i),l=o.value}catch(e){return void n(e)}if(!o.done)return Promise.resolve(l).then(function(e){r("next",e)},function(e){r("throw",e)});e(l)}return r("next")})}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=n(102),u=n.n(l),c=n(1),s=n.n(c),d=n(78),p=n.n(d),f=n(795),m=n.n(f),b=n(168),h=n(101),v=n(792),y=n(285),g=n(103),E=n(292),O=n(793),w=n(796),k=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),S=[{id:"createdAt",numeric:!1,disablePadding:!1,colSpan:1,label:"Credited On"},{id:"amount",numeric:!1,disablePadding:!1,colSpan:1,label:"Amount (\u20b9)"}],C=["__typename"],j=function(e){function t(){var e,n,r,o;a(this,t);for(var l=arguments.length,u=Array(l),c=0;c<l;c++)u[c]=arguments[c];return n=r=i(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),r.state={open:!1},r.handleClose=function(){r.setState({open:!1})},r.handleOpen=function(){r.setState({open:!0})},o=n,i(r,o)}return o(t,e),k(t,[{key:"componentWillMount",value:function(){this.setState({reset:!0})}},{key:"render",value:function(){var e=this,t=this.state.open,n=this.props,a=n.positiveText,i=void 0===a?"Ok":a,o=n.positiveHandler,l=void 0===o?function(e){return null}:o,c=n.selected;return s.a.createElement("div",null,s.a.createElement(p.a,{"aria-label":"Credit History",onClick:this.handleOpen},s.a.createElement(m.a,null)),t?s.a.createElement(w.a,Object.assign({},this.props,{fullScreen:!1,open:t,title:"Credit History",content:s.a.createElement(b.a,{mutation:y.a},function(t,n){return e.state.reset&&(t({variables:E.a.creditEntryTable}),e.setState({reset:!1})),s.a.createElement(h.a,{query:g.a},function(n){var a=(n.loading,n.error,n.data.creditEntryTable),i=a.page,o=a.rowsPerPage;return s.a.createElement(h.a,{query:v.i,variables:{id:c,limit:o,skip:i*o}},function(n){var i=n.loading,o=(n.error,n.data.userCreditHistory),l=n.refetch;return l(),s.a.createElement(O.a,Object.assign({},e.props,{loading:i,data:o.history,title:"Users Credit History",settings:a,skipToolbar:!0,refetch:l,count:o.count,columnData:S,exclude:C,mutate:function(){var n=r(u.a.mark(function n(r){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("calling mutate function..."),e.next=3,t({variables:r});case 3:l();case 4:case"end":return e.stop()}},n,e)}));return function(e){return n.apply(this,arguments)}}()}))})})}),positiveText:i,negativeHandler:function(t){return e.handleClose(t)},positiveHandler:function(t){e.handleClose(t),l(t)}})):null)}}]),t}(s.a.PureComponent);t.a=j},808:function(e,t,n){"use strict";function r(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(a,i){try{var o=t[a](i),l=o.value}catch(e){return void n(e)}if(!o.done)return Promise.resolve(l).then(function(e){r("next",e)},function(e){r("throw",e)});e(l)}return r("next")})}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"userColumnData",function(){return $}),n.d(t,"siteColumnData",function(){return q}),n.d(t,"userExclude",function(){return T}),n.d(t,"siteExclude",function(){return M});var l=n(102),u=n.n(l),c=n(1),s=n.n(c),d=n(60),p=n(168),f=n(104),m=n.n(f),b=n(48),h=n.n(b),v=n(799),y=n.n(v),g=n(809),E=n.n(g),O=n(47),w=(n.n(O),n(101)),k=n(793),S=n(792),C=n(103),j=n(285),P=n(284),_=n(798),A=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),x=function(e){return{root:{width:"100%"},fab:{position:"fixed",width:"8rem",bottom:2*e.spacing.unit,right:2*e.spacing.unit}}},$=[{id:"createdAt",numeric:!1,disablePadding:!1,colSpan:1,label:"Created At"},{id:"username",numeric:!1,disablePadding:!1,colSpan:1,label:"Username"},{id:"siteCount",numeric:!1,disablePadding:!1,colSpan:1,label:"Total Sites"},{id:"totalSitesCost",numeric:!1,disablePadding:!1,colSpan:1,label:"Total Sites Cost (\u20b9)"},{id:"totalReceivedAmount",numeric:!1,disablePadding:!1,colSpan:1,label:"Total Received Amount (\u20b9)"},{id:"spent",numeric:!1,disablePadding:!1,colSpan:1,label:"Spent Amount (\u20b9)"},{id:"balance",numeric:!1,disablePadding:!1,colSpan:1,label:"Balance Amount (\u20b9)"}],q=[{id:"createdAt",numeric:!1,disablePadding:!1,colSpan:1,label:"Created At"},{id:"name",numeric:!1,disablePadding:!1,colSpan:1,label:"Name"},{id:"location",numeric:!1,disablePadding:!1,colSpan:1,label:"Location"},{id:"entryCount",numeric:!1,disablePadding:!1,colSpan:1,label:"Total Entries"},{id:"manager",numeric:!1,disablePadding:!1,colSpan:1,label:"Manager"},{id:"managerSpentAmount",numeric:!1,disablePadding:!1,colSpan:1,label:"Manager Spent Amount (\u20b9)"},{id:"Total Cost",numeric:!1,disablePadding:!1,colSpan:1,label:"Total Cost (\u20b9)"}],T=["id","count","createdAt","updatedAt","__typename"],M=["id","count","createdAt","updatedAt","__typename"],H=function(e){function t(){return a(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),A(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.classes,a=t.history;return s.a.createElement("div",null,s.a.createElement(m.a,{container:!0,className:n.root},s.a.createElement(m.a,{item:!0,xs:12},s.a.createElement(p.a,{mutation:j.e},function(t,n){return s.a.createElement(w.a,{query:C.e},function(n){var a=(n.loading,n.error,n.data.userEntryTable),i=a.page,o=a.rowsPerPage;return s.a.createElement(w.a,{query:S.g,variables:{limit:o,skip:i*o}},function(n){var i=n.loading,o=n.data,l=n.refetch;return s.a.createElement(k.a,Object.assign({},e.props,{loading:i,data:o.users,title:"Users",settings:a,refetch:l,count:o.users.length&&o.users[0].count||o.users.length,columnData:$,exclude:T,historyable:!0,options:{onCredit:function(){function t(e,t){return n.apply(this,arguments)}var n=r(u.a.mark(function t(n,r){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("calling credit mutate function..."),e.next=3,n({variables:r});case 3:case"end":return e.stop()}},t,e)}));return t}()},render:Object(_.a)("spent"),mutate:function(){var n=r(u.a.mark(function n(r){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("calling mutate function..."),e.next=3,t({variables:r});case 3:case"end":return e.stop()}},n,e)}));return function(e){return n.apply(this,arguments)}}()}))})})})),s.a.createElement(m.a,{item:!0,xs:12},s.a.createElement(p.a,{mutation:j.d},function(t,n){return s.a.createElement(w.a,{query:C.d},function(n){var i=(n.loading,n.error,n.data.siteTable);return s.a.createElement(p.a,{mutation:P.e},function(n,o){var l=(o.loading,o.error,i.page),c=i.rowsPerPage;return s.a.createElement(w.a,{query:S.c,variables:{limit:c,skip:l*c}},function(n){var o=n.loading,l=(n.error,n.data),c=n.refetch;return s.a.createElement(k.a,Object.assign({},e.props,{loading:o,data:l.sites,title:"Sites",settings:i,refetch:c,count:l.sites.length&&l.sites[0].count||l.sites.length,columnData:q,exclude:M,options:{onView:function(e){return a.push("/siteDetail/"+e)},onEdit:function(e){return a.push("/site/edit/"+e)}},render:Object(_.a)("managerSpentAmount"),mutate:function(){var n=r(u.a.mark(function n(r){return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("calling mutate function..."),e.next=3,t({variables:r});case 3:case"end":return e.stop()}},n,e)}));return function(e){return n.apply(this,arguments)}}()}))})})})}))),s.a.createElement(m.a,{container:!0,justify:"space-between",className:n.fab},s.a.createElement(m.a,{item:!0,xs:6},s.a.createElement(h.a,{variant:"fab",color:"primary",component:d.b,to:"/site"},s.a.createElement(y.a,null))),s.a.createElement(m.a,{item:!0,xs:6},s.a.createElement(h.a,{variant:"fab",color:"primary",component:d.b,to:"/createUser"},s.a.createElement(E.a,null)))))}}]),t}(c.PureComponent);t.default=Object(O.withStyles)(x)(H)},809:function(e,t,n){"use strict";var r=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(1)),i=r(n(791)),o=(0,i.default)(a.default.createElement("g",null,a.default.createElement("path",{d:"M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"})),"PersonAdd");t.default=o}});
//# sourceMappingURL=7.ac4534c7.chunk.js.map