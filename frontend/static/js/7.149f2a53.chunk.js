(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{687:function(e,t,a){"use strict";var n=a(32),r=a(23),u=a(17),i=a(24),l=a(19),c=a(18),o=a(20),s=a(0),d=a.n(s),p=a(244),f=a(100),m=a(57),b=function(e){function t(){return Object(u.a)(this,t),Object(l.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(i.a)(t,[{key:"mergeData",value:function(e,t){var a=this,n={};return Object.keys(e).forEach(function(u){if(n[u]=Object(r.a)({},e[u]),"date"===e[u].type)n[u].default=Object(p.c)(t[u]);else if(e[u].default instanceof Array)n[u].current=t[u]&&(t[u][n[u].mapping&&n[u].mapping.value]||t[u]);else if("string"===typeof e[u].default||"number"===typeof e[u].default)n[u].default=t[u];else if(e[u].type===Boolean)n[u].default=t[u];else if("custom"===e[u].type);else{if(!(e[u].default instanceof Object))throw new Error("merge error");n[u].default=Object(r.a)({},a.mergeData(e[u].default,t[u]))}}),n}},{key:"render",value:function(){var e=this,t=this.props.match.params,a=t.edit,r=void 0!==a&&a,u=Object(n.a)(t,["edit"]),i=this.props,l=i.query,c=i.getQueryVariables,o=void 0===c?function(e){return{id:e.id}}:c,s=i.defaults,p=i.skipOnUpdate,b=i.clientOnly,y=s;return"edit"===r?(y=Object(f.a)(s,p),d.a.createElement(m.a,{query:l,variables:o(u),fetchPolicy:"cache-and-network"},function(t){var a=t.loading,n=t.error,r=t.data;if(a)return d.a.createElement("span",null,"loading...");if(n)return d.a.createElement("span",null,"Error Occured!");var u=e.mergeData(Object(f.a)(y,b),r[Object.keys(r)[0]]);return u=Object.assign(y,u),e.props.children instanceof Function&&e.props.children({update:!0,defaults:u,queryResult:r})})):this.props.children instanceof Function&&this.props.children({update:!1,defaults:y,queryResult:null})}}]),t}(s.PureComponent);t.a=b},741:function(e,t,a){"use strict";a.r(t),a.d(t,"BalaceAmountComponent",function(){return g}),a.d(t,"defaults",function(){return E});var n=a(23),r=a(32),u=a(17),i=a(24),l=a(19),c=a(18),o=a(20),s=a(101),d=a.n(s),p=a(49),f=a(0),m=a.n(f),b=a(78),y=a(34),O=a(244),h=a(246),v=a(687),j=a(80),g=Object(p.withFormState)(function(e){var t=e.formState.values;return m.a.createElement("p",{style:{}},m.a.createElement("label",null,"Balance Amount:")," ",Object(h.a)(t.price-t.totalReceivedAmount))}),E={name:{type:"text",default:"",required:!0},location:{type:"text",default:"",required:!0},price:{type:"number",default:0,required:!0,startAdornment:m.a.createElement(d.a,{position:"start"},"\u20b9")},balanceAmount:{type:"custom",default:m.a.createElement(g,null)},totalReceivedAmount:{type:"number",default:0,required:!0,min:0,startAdornment:m.a.createElement(d.a,{position:"start"},"\u20b9")},buyer:{type:"text",default:""},buyerNumber:{type:"number",default:0,max:9999999999,required:!0,startAdornment:m.a.createElement(d.a,{position:"start"},"+91"),validate:function(e){return e<1?null:10!==String(e).length?"Invalid phone number":null}},nextDueDate:{type:"date",default:" ",validate:function(e,t){return console.log("val in validate is ",e)," "===e||null===e?null:t.totalReceivedAmount===t.price?null:new Date(e).getTime()<=new Date(Object(O.c)()).getTime()?"Must be a future date":null}},note:{type:"text",default:""}},w=function(e){function t(){return Object(u.a)(this,t),Object(l.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props.match.params.id;return m.a.createElement(v.a,Object.assign({},this.props,{query:y.d,defaults:E,skipOnUpdate:["price","totalReceivedAmount"]}),function(a){var u=a.update,i=a.defaults;a.queryResult;return m.a.createElement(j.a,Object.assign({},e.props,{defaults:i,mutation:u?b.l:b.a,title:u?"Update this property":"Create a new property",submitText:u?"Update Property":"Create Property",mutateFunc:function(e,a){var u=a.nextDueDate,i=Object(r.a)(a,["nextDueDate"]);return e({variables:{id:t,data:Object(n.a)({},i,{nextDueDate:" "===u?null:u})}})}}))})}}]),t}(f.PureComponent);t.default=w}}]);
//# sourceMappingURL=7.149f2a53.chunk.js.map