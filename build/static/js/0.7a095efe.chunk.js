webpackJsonp([0],{773:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),c=n.n(i),l=n(160),u=n(792),s=n(159),d=(n.n(s),n(778)),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),p=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),f(t,[{key:"render",value:function(){var e=this;return console.log("assadfas-f---------------asdfasdf"),c.a.createElement(s.Query,{query:d.a},function(t){var n=t.client,r=(t.loading,t.error,t.data);return console.log("ROOT Query login",r),r.localLogin&&r.localLogin.token?c.a.createElement(u.a,Object.assign({},e.props,{client:n})):c.a.createElement(l.c,{to:"/login"})})}}]),t}(i.Component);t.default=p},778:function(e,t,n){"use strict";function r(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}n.d(t,"a",function(){return l}),n.d(t,"b",function(){return u}),n.d(t,"c",function(){return s});var a=n(158),o=(n.n(a),r(["\n    query {\n        localLogin @client{\n            token\n        }\n    }\n"],["\n    query {\n        localLogin @client{\n            token\n        }\n    }\n"])),i=r(["\n    query {\n        siteEntryTable @client{\n            order,\n            orderBy,\n            selected,\n            page,\n            rowsPerPage\n        }\n    }\n"],["\n    query {\n        siteEntryTable @client{\n            order,\n            orderBy,\n            selected,\n            page,\n            rowsPerPage\n        }\n    }\n"]),c=r(["\n    query {\n        userEntryTable @client{\n            order,\n            orderBy,\n            selected,\n            page,\n            rowsPerPage\n        }\n    }\n"],["\n    query {\n        userEntryTable @client{\n            order,\n            orderBy,\n            selected,\n            page,\n            rowsPerPage\n        }\n    }\n"]),l=Object(a.gql)(o),u=Object(a.gql)(i),s=Object(a.gql)(c)},779:function(e,t,n){"use strict";function r(e,t){var n=function(t){return o.default.createElement(c.default,t,e)};return n.displayName=t,n=(0,i.default)(n),n.muiName="SvgIcon",n}var a=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=a(n(1)),i=a(n(23)),c=a(n(21)),l=r;t.default=l},780:function(e,t,n){"use strict";function r(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}n.d(t,"a",function(){return l}),n.d(t,"b",function(){return u}),n.d(t,"c",function(){return s});var a=n(158),o=(n.n(a),r(["\n    mutation localLogin($token: String!){\n        localLogin(token: $token)@client{\n            token\n        }\n    }\n"],["\n    mutation localLogin($token: String!){\n        localLogin(token: $token)@client{\n            token\n        }\n    }\n"])),i=r(["\n    mutation siteEntryTable(\n        $order: String,\n        $orderBy: String,\n        $selected: [String],\n        $page: Int,\n        $rowsPerPage: Int\n    )\n    {\n        siteEntryTable(\n            order: $order,\n            orderBy: $orderBy,\n            selected: $selected,\n            page: $page,\n            rowsPerPage: $rowsPerPage) @client {\n                order,\n                orderBy,\n                selected,\n                page,\n                rowsPerPage\n            }\n    }\n"],["\n    mutation siteEntryTable(\n        $order: String,\n        $orderBy: String,\n        $selected: [String],\n        $page: Int,\n        $rowsPerPage: Int\n    )\n    {\n        siteEntryTable(\n            order: $order,\n            orderBy: $orderBy,\n            selected: $selected,\n            page: $page,\n            rowsPerPage: $rowsPerPage) @client {\n                order,\n                orderBy,\n                selected,\n                page,\n                rowsPerPage\n            }\n    }\n"]),c=r(["\n    mutation userEntryTable(\n        $order: String,\n        $orderBy: String,\n        $selected: [String],\n        $page: Int,\n        $rowsPerPage: Int\n    )\n    {\n        userEntryTable(\n            order: $order,\n            orderBy: $orderBy,\n            selected: $selected,\n            page: $page,\n            rowsPerPage: $rowsPerPage) @client {\n                order,\n                orderBy,\n                selected,\n                page,\n                rowsPerPage\n            }\n    }\n"],["\n    mutation userEntryTable(\n        $order: String,\n        $orderBy: String,\n        $selected: [String],\n        $page: Int,\n        $rowsPerPage: Int\n    )\n    {\n        userEntryTable(\n            order: $order,\n            orderBy: $orderBy,\n            selected: $selected,\n            page: $page,\n            rowsPerPage: $rowsPerPage) @client {\n                order,\n                orderBy,\n                selected,\n                page,\n                rowsPerPage\n            }\n    }\n"]),l=Object(a.gql)(o),u=Object(a.gql)(i),s=Object(a.gql)(c)},781:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(1),c=n.n(i),l=n(159),u=(n.n(l),n(778)),s=n(782),d=n(783),f=n(784),p=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),m=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),p(t,[{key:"render",value:function(){var e=this;return c.a.createElement(l.Query,{query:u.a},function(t){var n=t.client;t.loading,t.error,t.data;return c.a.createElement(c.a.Fragment,null,c.a.createElement(s.a,Object.assign({},e.props,{client:n})),c.a.createElement(d.a,null,c.a.createElement("div",{className:"pv3"},e.props.children)),c.a.createElement(f.a,null))})}}]),t}(i.Component);t.a=m},782:function(e,t,n){"use strict";function r(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(a,o){try{var i=t[a](o),c=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(c).then(function(e){r("next",e)},function(e){r("throw",e)});e(c)}return r("next")})}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=n(274),l=n.n(c),u=n(1),s=n.n(u),d=n(75),f=(n.n(d),n(276)),p=n.n(f),m=n(162),y=n.n(m),b=n(24),g=n.n(b),h=n(58),v=n.n(h),E=n(160),w=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),O={root:{flexGrow:1},flex:{flex:1},menuButton:{marginLeft:-12,marginRight:20}},P=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),w(t,[{key:"render",value:function(){var e=this,t=this.props.classes;return s.a.createElement("header",{className:""},s.a.createElement("div",null,s.a.createElement(p.a,{position:"static"},s.a.createElement(y.a,null,s.a.createElement(g.a,{variant:"title",color:"inherit",className:t.flex,component:E.b,to:"/"},"RealState"),s.a.createElement(v.a,{color:"inherit",onClick:function(){var t=r(l.a.mark(function t(n){return l.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.localStorage.clear();case 2:e.props.client.resetStore(),window.location.href="/";case 4:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}()},"Logout")))))}}]),t}(u.Component);t.a=Object(d.withStyles)(O)(P)},783:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(1),c=n.n(i),l=n(75),u=(n.n(l),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()),s=function(e){return{root:{flexGrow:1},paper:{padding:2*e.spacing.unit,textAlign:"center",color:e.palette.text.secondary}}},d=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),u(t,[{key:"render",value:function(){return c.a.createElement("div",{className:"black bg-light-gray min-vh-100"},this.props.children)}}]),t}(i.Component);t.a=Object(l.withStyles)(s)(d)},784:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(1),c=n.n(i),l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),l(t,[{key:"render",value:function(){return c.a.createElement("footer",{className:"silver bg-dark-gray pa3"},c.a.createElement("div",{className:"mh7 mv3 tc"},"\xa9 2018 KKAssociates"))}}]),t}(i.Component);t.a=u},785:function(e,t,n){"use strict";function r(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}n.d(t,"c",function(){return u}),n.d(t,"b",function(){return s}),n.d(t,"a",function(){return d});var a=n(158),o=(n.n(a),r(["\n    query users($limit: Int = 15){\n        users(limit: $limit) {\n            id,\n            username,\n            createdAt,\n            updatedAt,\n            count\n        }\n    }\n"],["\n    query users($limit: Int = 15){\n        users(limit: $limit) {\n            id,\n            username,\n            createdAt,\n            updatedAt,\n            count\n        }\n    }\n"])),i=r(["\n  query sites($limit: Int = 10) {\n    sites(limit: $limit) {\n        id,\n        name,\n        location,\n        createdAt,\n        updatedAt,\n        count\n        manager {\n            name: username\n        }\n    }\n  }\n"],["\n  query sites($limit: Int = 10) {\n    sites(limit: $limit) {\n        id,\n        name,\n        location,\n        createdAt,\n        updatedAt,\n        count\n        manager {\n            name: username\n        }\n    }\n  }\n"]),c=r(["\n    query users_sites($limit: Int = 15){\n        users(limit: $limit) {\n            id,\n            username,\n            createdAt,\n            updatedAt,\n            count\n        }\n        sites(limit: $limit) {\n            id,\n            name,\n            location,\n            createdAt,\n            updatedAt,\n            count,\n            manager {\n                username\n            }\n        }\n    }\n"],["\n    query users_sites($limit: Int = 15){\n        users(limit: $limit) {\n            id,\n            username,\n            createdAt,\n            updatedAt,\n            count\n        }\n        sites(limit: $limit) {\n            id,\n            name,\n            location,\n            createdAt,\n            updatedAt,\n            count,\n            manager {\n                username\n            }\n        }\n    }\n"]),l=r(["\n    query site($id: String!, $limit: Int!, $skip: Int){\n        site(id: $id, limit: $limit, skip: $skip){\n            id,\n            name,\n            location,\n            cost,\n            count,\n            entries\n            {\n                id,\n                createdAt,\n                updatedAt,                \n                mistri{\n                    quantity,\n                    cost\n                },\n                labour{\n                    quantity,\n                    cost\n                },\n                eit{\n                    quantity,\n                    cost\n                },\n                morang{\n                    quantity,\n                    cost\n                },\n                githi{\n                    quantity,\n                    cost\n                },\n                cement{\n                    quantity,\n                    cost\n                },\n                saria{\n                    quantity,\n                    cost\n                },\n                dust{\n                    quantity,\n                    cost\n                },\n                other{\n                    quantity,\n                    cost\n                },\n                total\n            }\n        }\n    }\n"],["\n    query site($id: String!, $limit: Int!, $skip: Int){\n        site(id: $id, limit: $limit, skip: $skip){\n            id,\n            name,\n            location,\n            cost,\n            count,\n            entries\n            {\n                id,\n                createdAt,\n                updatedAt,                \n                mistri{\n                    quantity,\n                    cost\n                },\n                labour{\n                    quantity,\n                    cost\n                },\n                eit{\n                    quantity,\n                    cost\n                },\n                morang{\n                    quantity,\n                    cost\n                },\n                githi{\n                    quantity,\n                    cost\n                },\n                cement{\n                    quantity,\n                    cost\n                },\n                saria{\n                    quantity,\n                    cost\n                },\n                dust{\n                    quantity,\n                    cost\n                },\n                other{\n                    quantity,\n                    cost\n                },\n                total\n            }\n        }\n    }\n"]),u=Object(a.gql)(o),s=Object(a.gql)(i),d=(Object(a.gql)(c),Object(a.gql)(l))},786:function(e,t,n){"use strict";var r=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(1)),o=r(n(779)),i=(0,o.default)(a.default.createElement("g",null,a.default.createElement("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"})),"Add");t.default=i},787:function(e,t,n){"use strict";function r(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n}function a(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(a,o){try{var i=t[a](o),c=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(c).then(function(e){r("next",e)},function(e){r("throw",e)});e(c)}return r("next")})}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function l(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e,t){return"desc"===e?function(e,n){return n[t]<e[t]?-1:1}:function(e,n){return e[t]<n[t]?-1:1}}function s(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.primary,r=void 0===n?"#35A7FF":n,a=t.secondary,o=void 0===a?"#FF5964":a;return f.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e=r;case 1:return e=e===o?r:o,t.next=5,e;case 5:t.next=1;break;case 7:case"end":return t.stop()}},re,this)}var d=n(274),f=n.n(d),p=n(1),m=n.n(p),y=n(6),b=n.n(y),g=n(2),h=n.n(g),v=n(75),E=(n.n(v),n(161)),w=n.n(E),O=n(279),P=n.n(O),j=n(280),_=n.n(j),k=n(163),$=n.n(k),x=n(281),S=n.n(x),q=n(282),C=n.n(q),A=n(283),T=n.n(A),B=n(284),M=n.n(B),R=n(162),I=n.n(R),N=n(24),z=n.n(N),D=n(27),L=n.n(D),H=n(278),F=n.n(H),Q=n(76),V=n.n(Q),W=n(285),U=n.n(W),G=n(788),K=n.n(G),J=n(789),X=n.n(J),Y=n(790),Z=n.n(Y),ee=n(38),te=(n.n(ee),n(791)),ne=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),re=f.a.mark(s),ae=function(e){function t(){var e,n,r,a;i(this,t);for(var o=arguments.length,l=Array(o),u=0;u<o;u++)l[u]=arguments[u];return n=r=c(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(l))),r.createSortHandler=function(e){return function(t){r.props.onRequestSort(t,e)}},a=n,c(r,a)}return l(t,e),ne(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.onSelectAllClick,r=t.order,a=t.orderBy,o=t.numSelected,i=t.rowCount,c=t.columnData,l=s(),u=!0;return m.a.createElement(S.a,null,m.a.createElement(T.a,null,m.a.createElement($.a,{padding:"checkbox"},m.a.createElement(F.a,{indeterminate:o>0&&o<i,checked:o===i,onChange:n})),c.map(function(t){var n=null;return u?(n=null,u=!1):n=l.next().value,m.a.createElement($.a,{key:t.id,numeric:t.numeric,padding:t.disablePadding?"none":"default",sortDirection:a===t.id&&r,colSpan:t.colSpan},m.a.createElement(U.a,{title:"Sort",placement:t.numeric?"bottom-end":"bottom-start",enterDelay:300},m.a.createElement(M.a,{active:a===t.id,direction:r,onClick:e.createSortHandler(t.id),style:{color:n}},t.label)))},this)))}}]),t}(m.a.Component);ae.propTypes={numSelected:h.a.number.isRequired,onRequestSort:h.a.func.isRequired,onSelectAllClick:h.a.func.isRequired,order:h.a.string.isRequired,orderBy:h.a.string.isRequired,rowCount:h.a.number.isRequired};var oe=function(e){return{root:{paddingRight:e.spacing.unit},highlight:"light"===e.palette.type?{color:e.palette.secondary.main,backgroundColor:Object(ee.lighten)(e.palette.secondary.light,.85)}:{color:e.palette.text.primary,backgroundColor:e.palette.secondary.dark},spacer:{flex:"1 1 50%"},actions:{color:e.palette.text.secondary},title:{flex:"0 0 auto"}}},ie=function(e){var t=e.numSelected,n=e.selected,r=e.classes,a=e.title,i=e.editable,c=e.deletable,l=e.deleteMutate;return m.a.createElement(I.a,{className:b()(r.root,o({},r.highlight,t>0))},m.a.createElement("div",{className:r.title},t>0?m.a.createElement(z.a,{color:"inherit",variant:"subheading"},t," selected"):m.a.createElement(z.a,{variant:"title",id:"tableTitle"},a)),m.a.createElement("div",{className:r.spacer}),m.a.createElement("div",{className:r.actions},t>0?1===t?m.a.createElement(w.a,{container:!0,direction:"row",justify:"space-between"},i?m.a.createElement(w.a,{item:!0,xs:6},m.a.createElement(U.a,{title:"Edit"},m.a.createElement(V.a,{"aria-label":"Edit",onClick:function(e){return console.log("edited")}},m.a.createElement(X.a,null)))):null,c?m.a.createElement(w.a,{item:!0,xs:6},m.a.createElement(U.a,{title:"Delete"},m.a.createElement(V.a,{"aria-label":"Delete",onClick:function(e){return l({ids:n})}},m.a.createElement(K.a,null)))):null):m.a.createElement(U.a,{title:"Delete"},m.a.createElement(V.a,{"aria-label":"Delete",onClick:function(e){return l({ids:n})}},m.a.createElement(K.a,null))):m.a.createElement(U.a,{title:"Filter list"},m.a.createElement(V.a,{"aria-label":"Filter list"},m.a.createElement(Z.a,null)))))};ie.propTypes={classes:h.a.object.isRequired,numSelected:h.a.number.isRequired},ie=Object(v.withStyles)(oe)(ie);var ce=function(e){return{root:{width:"100%",marginTop:3*e.spacing.unit},table:{minWidth:"100%"},tableWrapper:{overflowX:"auto"}}},le=function(e){function t(){var e,n,r,o,l=this;i(this,t);for(var u=arguments.length,s=Array(u),d=0;d<u;d++)s[d]=arguments[d];return n=r=c(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(s))),r.handleRequestSort=function(){var e=a(f.a.mark(function e(t,n){var a,o;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=n,o="asc",r.props.settings.orderBy===n&&"asc"===r.props.settings.order&&(o="desc"),e.next=5,r.props.mutate(Object.assign({},r.props.settings,{order:o,orderBy:a}));case 5:case"end":return e.stop()}},e,l)}));return function(t,n){return e.apply(this,arguments)}}(),r.handleSelectAllClick=function(){var e=a(f.a.mark(function e(t,n){return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("data.length...",r.props.data.length),!n){e.next=5;break}return e.next=4,r.props.mutate(Object.assign({},r.props.settings,{selected:r.props.data.map(function(e){return e.id})}));case 4:return e.abrupt("return");case 5:return e.next=7,r.props.mutate(Object.assign({},r.props.settings,{selected:[]}));case 7:case"end":return e.stop()}},e,l)}));return function(t,n){return e.apply(this,arguments)}}(),r.handleClick=function(){var e=a(f.a.mark(function e(t,n){var a,o,i;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=r.props.settings.selected,o=a.indexOf(n),i=[],-1===o?i=i.concat(a,n):0===o?i=i.concat(a.slice(1)):o===a.length-1?i=i.concat(a.slice(0,-1)):o>0&&(i=i.concat(a.slice(0,o),a.slice(o+1))),e.next=6,r.props.mutate(Object.assign({},r.props.settings,{selected:i}));case 6:case"end":return e.stop()}},e,l)}));return function(t,n){return e.apply(this,arguments)}}(),r.handleChangePage=function(){var e=a(f.a.mark(function e(t,n){return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Page Change..",n),e.next=3,r.props.mutate(Object.assign({},r.props.settings,{page:n,selected:[]}));case 3:case"end":return e.stop()}},e,l)}));return function(t,n){return e.apply(this,arguments)}}(),r.isSelected=function(e){return-1!==r.props.settings.selected.indexOf(e)},o=n,c(r,o)}return l(t,e),ne(t,[{key:"componentWillMount",value:function(){this.props.refetch()}},{key:"filter",value:function(e,t){return Object.keys(e).filter(function(e){return!t.includes(e)}).reduce(function(t,n){return t[n]=e[n],t},{})}},{key:"render",value:function(){var e=this,t=this.props,n=t.data,a=t.count,o=t.settings,i=o.order,c=o.orderBy,l=o.selected,d=void 0===l?[]:l,f=o.rowsPerPage,p=o.page,y=t.title,b=t.columnData,g=t.exclude,h=t.onClick,v=void 0===h?function(e){return null}:h,E=t.editable,w=t.deletable,O=t.deleteMutate,j=void 0===O?function(e){return null}:O,k=t.classes;if(0===n.length)return m.a.createElement("h1",null,"No Entry Yet!");console.log("settings...",this.props.settings),console.log("data",n);var x=[].concat(n).sort(u(i,c));return console.log("renderData...",x),m.a.createElement(L.a,{className:k.root},m.a.createElement(ie,{numSelected:d.length,selected:d,editable:E,deletable:w,deleteMutate:j,title:y}),m.a.createElement("div",{className:k.tableWrapper},m.a.createElement(P.a,{className:k.table,"aria-labelledby":"tableTitle"},m.a.createElement(ae,{numSelected:d.length,order:i,orderBy:c,onSelectAllClick:this.handleSelectAllClick,onRequestSort:this.handleRequestSort,rowCount:n.length,columnData:b}),m.a.createElement(_.a,null,x.map(function(t){var n=e.isSelected(t.id);return m.a.createElement(T.a,{hover:!0,role:"checkbox","aria-checked":n,tabIndex:-1,key:t.id,onClick:function(e){return v(t)},selected:n},m.a.createElement($.a,{padding:"checkbox"},m.a.createElement(F.a,{checked:n,onClick:function(n){return e.handleClick(n,t.id)}})),m.a.createElement($.a,{component:"th",scope:"row",padding:"none"},Object(te.a)(t.createdAt)),function(){var n=e.filter(t,g),a=s();return Object.values(n).map(function(e){var t=a.next().value;if(!(e instanceof Object))return m.a.createElement($.a,{style:{color:t},key:Math.random()},e);var n=(e.__typename,r(e,["__typename"]));return m.a.createElement(m.a.Fragment,{key:Math.random()},Object.values(n).map(function(e){return m.a.createElement($.a,{style:{color:t},key:Math.random()},e)}))})}())})))),m.a.createElement(C.a,{component:"div",count:a,rowsPerPage:f,rowsPerPageOptions:[15],page:p,backIconButtonProps:{"aria-label":"Previous Page"},nextIconButtonProps:{"aria-label":"Next Page"},onChangePage:this.handleChangePage}))}}]),t}(m.a.Component);le.propTypes={classes:h.a.object.isRequired},t.a=Object(v.withStyles)(ce)(le)},788:function(e,t,n){"use strict";var r=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(1)),o=r(n(779)),i=(0,o.default)(a.default.createElement("g",null,a.default.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"})),"Delete");t.default=i},789:function(e,t,n){"use strict";var r=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(1)),o=r(n(779)),i=(0,o.default)(a.default.createElement("g",null,a.default.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"})),"Edit");t.default=i},790:function(e,t,n){"use strict";var r=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(1)),o=r(n(779)),i=(0,o.default)(a.default.createElement("g",null,a.default.createElement("path",{d:"M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"})),"FilterList");t.default=i},791:function(e,t,n){"use strict";t.a=function(e){var t={weekday:"long",year:"numeric",month:"long",day:"numeric"};return new Date(e).toLocaleDateString("hi-IN",t)}},792:function(e,t,n){"use strict";function r(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(a,o){try{var i=t[a](o),c=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(c).then(function(e){r("next",e)},function(e){r("throw",e)});e(c)}return r("next")})}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var c=n(274),l=n.n(c),u=n(1),s=n.n(u),d=n(160),f=n(159),p=(n.n(f),n(161)),m=n.n(p),y=n(58),b=n.n(y),g=n(786),h=n.n(g),v=n(793),E=n.n(v),w=n(75),O=(n.n(w),n(781)),P=n(787),j=n(785),_=n(778),k=n(780),$=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),x=function(e){return{root:{width:"100%"},fab:{position:"fixed",width:"8rem",bottom:2*e.spacing.unit,right:2*e.spacing.unit}}},S=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),$(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.classes,a=t.history,o=[{id:"createdAt",numeric:!1,disablePadding:!1,colSpan:1,label:"Created At"},{id:"username",numeric:!1,disablePadding:!1,colSpan:1,label:"Username"}],i=[{id:"createdAt",numeric:!1,disablePadding:!1,colSpan:1,label:"Created At"},{id:"name",numeric:!1,disablePadding:!1,colSpan:1,label:"Name"},{id:"location",numeric:!1,disablePadding:!1,colSpan:1,label:"Location"},{id:"manager",numeric:!1,disablePadding:!1,colSpan:1,label:"Manager"}],c=["id","count","createdAt","updatedAt","__typename"],u=["id","count","createdAt","updatedAt","__typename"];return s.a.createElement(O.a,this.props,s.a.createElement("div",null,s.a.createElement(m.a,{container:!0,spacing:8,className:n.root},s.a.createElement(m.a,{item:!0,xs:12,sm:6},s.a.createElement(f.Mutation,{mutation:k.c},function(t,n){return s.a.createElement(f.Query,{query:_.c},function(n){var a=n.loading,i=n.error,u=n.data.userEntryTable;return a?s.a.createElement("span",null,"loading..."):i?s.a.createElement("span",null,"Error Occured!"):s.a.createElement(f.Query,{query:j.c},function(n){var a=n.loading,i=n.error,d=n.data,f=n.refetch;return a?s.a.createElement("span",null,"loading..."):i?s.a.createElement("span",null,"Error Occured!"):s.a.createElement(P.a,Object.assign({},e.props,{data:d.users,title:"Users",settings:u,refetch:f,count:d.users.length,columnData:o,exclude:c,editable:!0,deletable:!0,mutate:function(){var n=r(l.a.mark(function n(r){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("calling mutate function..."),e.next=3,t({variables:r});case 3:f();case 4:case"end":return e.stop()}},n,e)}));return function(e){return n.apply(this,arguments)}}()}))})})})),s.a.createElement(m.a,{item:!0,xs:12,sm:6},s.a.createElement(f.Mutation,{mutation:k.b},function(t,n){return s.a.createElement(f.Query,{query:_.b},function(n){var o=n.loading,c=n.error,d=n.data.siteEntryTable;return o?s.a.createElement("span",null,"loading..."):c?s.a.createElement("span",null,"Error Occured!"):s.a.createElement(f.Query,{query:j.b},function(n){var o=n.loading,c=n.error,f=n.data,p=n.refetch;return o?s.a.createElement("span",null,"loading..."):c?s.a.createElement("span",null,"Error Occured!"):s.a.createElement(P.a,Object.assign({},e.props,{data:f.sites,title:"Sites",settings:d,refetch:p,count:f.sites.length&&f.sites[0].count||f.sites.length,columnData:i,exclude:u,onClick:function(e){return a.push("/site/"+e.id)},editable:!0,deletable:!0,mutate:function(){var n=r(l.a.mark(function n(r){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("calling mutate function..."),e.next=3,t({variables:r});case 3:p();case 4:case"end":return e.stop()}},n,e)}));return function(e){return n.apply(this,arguments)}}()},e.props))})})}))),s.a.createElement(m.a,{container:!0,justify:"space-between",className:n.fab},s.a.createElement(m.a,{item:!0,xs:6},s.a.createElement(b.a,{variant:"fab",color:"primary",component:d.b,to:"/site"},s.a.createElement(h.a,null))),s.a.createElement(m.a,{item:!0,xs:6},s.a.createElement(b.a,{variant:"fab",color:"primary",component:d.b,to:"/createUser"},s.a.createElement(E.a,null))))))}}]),t}(u.Component);t.a=Object(w.withStyles)(x)(S)},793:function(e,t,n){"use strict";var r=n(0);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(n(1)),o=r(n(779)),i=(0,o.default)(a.default.createElement("g",null,a.default.createElement("path",{d:"M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"})),"PersonAdd");t.default=i}});
//# sourceMappingURL=0.7a095efe.chunk.js.map