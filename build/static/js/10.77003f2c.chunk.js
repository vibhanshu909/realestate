(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{684:function(e,t,a){"use strict";var r=a(32),n=a(21),u=a(17),i=a(24),c=a(19),s=a(18),l=a(20),o=a(0),d=a.n(o),p=a(239),f=a(99),b=a(54),m=function(e){function t(){return Object(u.a)(this,t),Object(c.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(i.a)(t,[{key:"mergeData",value:function(e,t){var a=this,r={};return Object.keys(e).forEach(function(u){if(r[u]=Object(n.a)({},e[u]),"date"===e[u].type)r[u].default=Object(p.c)(t[u]);else if(e[u].default instanceof Array)r[u].current=t[u]&&(t[u][r[u].mapping&&r[u].mapping.value]||t[u]);else if("string"===typeof e[u].default||"number"===typeof e[u].default)r[u].default=t[u];else if(e[u].type===Boolean)r[u].default=t[u];else if("custom"===e[u].type);else{if(!(e[u].default instanceof Object))throw new Error("merge error");r[u].default=Object(n.a)({},a.mergeData(e[u].default,t[u]))}}),r}},{key:"render",value:function(){var e=this,t=this.props.match.params,a=t.edit,n=void 0!==a&&a,u=Object(r.a)(t,["edit"]),i=this.props,c=i.query,s=i.getQueryVariables,l=void 0===s?function(e){return{id:e.id}}:s,o=i.defaults,p=i.skipOnUpdate,m=i.clientOnly,y=o;return"edit"===n?(y=Object(f.a)(o,p),d.a.createElement(b.a,{query:c,variables:l(u),fetchPolicy:"cache-and-network"},function(t){var a=t.loading,r=t.error,n=t.data;if(a)return d.a.createElement("span",null,"loading...");if(r)return d.a.createElement("span",null,"Error Occured!");var u=e.mergeData(Object(f.a)(y,m),n[Object.keys(n)[0]]);return u=Object.assign(y,u),e.props.children instanceof Function&&e.props.children({update:!0,defaults:u,queryResult:n})})):this.props.children instanceof Function&&this.props.children({update:!1,defaults:y,queryResult:null})}}]),t}(o.PureComponent);t.a=m},737:function(e,t,a){"use strict";a.r(t);var r=a(17),n=a(24),u=a(19),i=a(18),c=a(20),s=a(0),l=a.n(s),o=a(77),d=a(34),p=a(239),f=a(54),b=a(684),m=a(78),y=function(e){function t(){return Object(r.a)(this,t),Object(u.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement(f.a,{query:d.q},function(t){var a=t.loading,r=t.error,n=t.data;if(a)return l.a.createElement("span",null,"loading...");if(r)return l.a.createElement("span",null,"Error Occured!");var u={name:{type:"text",default:"",required:!0},location:{type:"text",default:"",required:!0},manager:{type:"select",default:n.users,current:null,required:!0,mapping:{key:"username",value:"id"},validate:function(e){return Boolean(e)?null:"No manager selected"}},createdAt:{type:"date",default:Object(p.c)(),required:!0}},i=e.props.match.params.id;return l.a.createElement(b.a,Object.assign({},e.props,{query:d.g,defaults:u,skipOnUpdate:["manager","createdAt"]}),function(t){var a=t.update,r=t.defaults;t.queryResult;return l.a.createElement(m.a,Object.assign({},e.props,{defaults:r,mutation:a?o.n:o.b,title:a?"Update this site":"Create a new site",submitText:a?"Update site":"Create site",mutateFunc:function(e,t){return e({variables:{id:i,data:t}})}}))})})}}]),t}(s.PureComponent);t.default=y}}]);
//# sourceMappingURL=10.77003f2c.chunk.js.map