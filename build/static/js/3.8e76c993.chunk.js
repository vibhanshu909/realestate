webpackJsonp([3],{822:function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),r.d(t,"defaults",function(){return h});var u=r(1),i=r.n(u),l=r(182),c=r.n(l),f=r(832),s=r(109),p=r(303),d=r(108),y=r(829),b=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),h={name:{type:"text",default:""},location:{type:"text",default:""},price:{type:"number",default:0,startAdornment:i.a.createElement(c.a,{position:"start"},"\u20b9")},buyer:{type:"text",default:"",required:!0,validate:function(e){return e.length<1?"required":null}},buyerNumber:{type:"number",default:"",required:!0,startAdornment:i.a.createElement(c.a,{position:"start"},"+91"),validate:function(e){return 10!==String(e).length?"Invalid phone number":null}},totalReceivedAmount:{type:"number",default:0,startAdornment:i.a.createElement(c.a,{position:"start"},"\u20b9")},nextDueDate:{type:"date",default:Object(y.b)(),validate:function(e,t){return t.totalReceivedAmount===t.price?null:new Date(e).getTime()<=new Date(Object(y.b)()).getTime()?"Must be a future date":null}},note:{type:"text",default:""}},m=function(e){function t(){return n(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),b(t,[{key:"render",value:function(){var e=this,t=this.props.match.params.id;return i.a.createElement(f.a,Object.assign({},this.props,{query:p.b,defaults:h,skipOnUpdate:["price","totalReceivedAmount"]}),function(r){var n=r.update,a=r.defaults;r.queryResult;return i.a.createElement(s.a,Object.assign({},e.props,{defaults:a,mutation:n?d.j:d.a,title:n?"Update this property":"Create a new property",submitText:n?"Update Property":"Create Property",mutateFunc:function(e,r){return e({variables:{id:t,data:r}})}}))})}}]),t}(u.PureComponent);t.default=m},829:function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:new Date;e=new Date(e);var t=e.getFullYear(),r=e.getMonth()+1,n=e.getDate();return t+"-"+(r<10?"0"+r:r)+"-"+(n<10?"0"+n:n)}t.b=n,t.a=function(e){var t={weekday:"long",year:"numeric",month:"long",day:"numeric"};return new Date(e).toLocaleDateString("hi-IN",t)}},832:function(e,t,r){"use strict";function n(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function u(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=r(1),l=r.n(i),c=r(86),f=r(183),s=r(829),p=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),d=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),p(t,[{key:"mergeData",value:function(e,t){var r=this,n={};return Object.keys(e).forEach(function(a){if(n[a]=Object.assign({},e[a]),"date"===e[a].type)n[a].default=Object(s.b)(t[a]);else if("string"===typeof e[a].default||"number"===typeof e[a].default)n[a].default=t[a];else if(e[a].default instanceof Array);else if(e[a].type===Boolean)n[a].default=t[a];else{if(!(e[a].default instanceof Object))throw new Error("merge error");n[a].default=Object.assign({},r.mergeData(e[a].default,t[a]))}}),n}},{key:"render",value:function(){var e=this,t=this.props.match.params,r=t.edit,a=void 0!==r&&r,o=n(t,["edit"]),u=this.props,i=u.query,s=u.getQueryVariables,p=void 0===s?function(e){return{id:e.id}}:s,d=u.defaults,y=u.skipOnUpdate,b=d;return a?(b=Object(f.a)(d,y),l.a.createElement(c.a,{query:i,variables:p(o),fetchPolicy:"cache-and-network"},function(t){var r=t.loading,n=t.error,a=t.data;if(r)return l.a.createElement("span",null,"loading...");if(n)return l.a.createElement("span",null,"Error Occured!");var o=e.mergeData(b,a[Object.keys(a)[0]]);return e.props.children({update:!0,defaults:o,queryResult:a})})):this.props.children({update:!1,defaults:b,queryResult:null})}}]),t}(i.PureComponent);t.a=d}});
//# sourceMappingURL=3.8e76c993.chunk.js.map