(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{739:function(a,e,t){"use strict";t.r(e);var n=t(26),i=t.n(n),l=t(45),r=t(32),c=t(23),d=t(59),u=t.n(d),o=t(74),m=t.n(o),s=t(25),b=t(39),g=t.n(b),p=t(0),P=t.n(p),S=t(245),y=t(58),E=t(57),A=t(247),T=t(146),O=t(78),h=t(79),Q=t(34),v=t(99),f=t(73),j=t(123),I=t(246),R=[{id:"createdAt",numeric:!1,disablePadding:!0,colSpan:1,label:"Created At"},{id:"mistri",numeric:!1,disablePadding:!1,colSpan:2,label:"MISTRI (Quantity & Price)"},{id:"labour",numeric:!1,disablePadding:!1,colSpan:2,label:"LABOUR (Quantity & Price)"},{id:"eit",numeric:!1,disablePadding:!1,colSpan:2,label:"EIT (Quantity & Price)"},{id:"morang",numeric:!1,disablePadding:!1,colSpan:2,label:"MORANG (Quantity & Price)"},{id:"baalu",numeric:!1,disablePadding:!1,colSpan:2,label:"BAALU (Quantity & Price)"},{id:"githi",numeric:!1,disablePadding:!1,colSpan:2,label:"GITHI (Quantity & Price)"},{id:"cement",numeric:!1,disablePadding:!1,colSpan:2,label:"CEMENT (Quantity & Price)"},{id:"saria",numeric:!1,disablePadding:!1,colSpan:2,label:"SARIA (Quantity & Price)"},{id:"dust",numeric:!1,disablePadding:!1,colSpan:2,label:"DUST (Quantity & Price)"},{id:"other",numeric:!1,disablePadding:!1,colSpan:2,label:"OTHER (Quantity & Price)"},{id:"other2",numeric:!1,disablePadding:!1,colSpan:2,label:"OTHER 2 (Quantity & Price)"},{id:"managerTotal",numeric:!1,disablePadding:!1,colSpan:1,label:"MANAGER TOTAL (\u20b9)"},{id:"total",numeric:!1,disablePadding:!1,colSpan:1,label:"TOTAL (\u20b9)"},{id:"note",numeric:!1,disablePadding:!1,colSpan:1,label:"NOTE"}],M=["id","count","site","createdAt","updatedAt","__typename"],N=[{id:"mistri",numeric:!1,disablePadding:!1,colSpan:2,label:"MISTRI (Quantity & Price) (\u20b9)"},{id:"labour",numeric:!1,disablePadding:!1,colSpan:2,label:"LABOUR (Quantity & Price) (\u20b9)"},{id:"eit",numeric:!1,disablePadding:!1,colSpan:2,label:"EIT (Quantity & Price) (\u20b9)"},{id:"morang",numeric:!1,disablePadding:!1,colSpan:2,label:"MORANG (Quantity & Price) (\u20b9)"},{id:"baalu",numeric:!1,disablePadding:!1,colSpan:2,label:"BAALU (Quantity & Price) (\u20b9)"},{id:"githi",numeric:!1,disablePadding:!1,colSpan:2,label:"GITHI (Quantity & Price) (\u20b9)"},{id:"cement",numeric:!1,disablePadding:!1,colSpan:2,label:"CEMENT (Quantity & Price) (\u20b9)"},{id:"saria",numeric:!1,disablePadding:!1,colSpan:2,label:"SARIA (Quantity & Price) (\u20b9)"},{id:"dust",numeric:!1,disablePadding:!1,colSpan:2,label:"DUST (Quantity & Price) (\u20b9)"},{id:"other",numeric:!1,disablePadding:!0,colSpan:1,label:"OTHER (Price) (\u20b9)"},{id:"other2",numeric:!1,disablePadding:!0,colSpan:1,label:"OTHER 2 (Price) (\u20b9)"},{id:"managerTotal",numeric:!1,disablePadding:!0,colSpan:1,label:"MANAGER TOTAL (\u20b9)"},{id:"total",numeric:!1,disablePadding:!0,colSpan:1,label:"TOTAL (\u20b9)"}],w=["id","count","createdAt","updatedAt","__typename"],L=Object(s.withStyles)(function(a){return Object(s.createStyles)({paper:Object(c.a)({},a.mixins.gutters(),{paddingTop:2*a.spacing.unit,paddingBottom:2*a.spacing.unit,marginTop:2*a.spacing.unit,marginBottom:2*a.spacing.unit}),fab:{position:"fixed",bottom:2*a.spacing.unit,right:2*a.spacing.unit}})})(function(a){var e=a.match.params.id,t=a.classes,n=a.history,d=(a.user,Object(r.a)(a,["classes","history","user"])),o=v.a.entryTotalTable,s=v.a.entryTable;return P.a.createElement(P.a.Fragment,null,P.a.createElement(E.a,{query:Q.g,variables:{id:e}},function(a){var r=a.loading,b=a.data.site;return P.a.createElement(P.a.Fragment,null,P.a.createElement(m.a,{className:t.paper},P.a.createElement(u.a,{container:!0,spacing:32},P.a.createElement(u.a,{item:!0,container:!0,direction:"column",sm:4},P.a.createElement(u.a,{item:!0},P.a.createElement(g.a,{variant:"headline",className:"ttc",color:"primary"},"Name: ",b.name)),P.a.createElement(u.a,{item:!0},P.a.createElement(g.a,{variant:"headline",className:"ttc",color:"secondary"},"Location: ",b.location))),P.a.createElement(u.a,{item:!0,container:!0,direction:"column",sm:4},P.a.createElement(u.a,{item:!0},P.a.createElement(g.a,{variant:"subheading"},"Total Cost (\u20b9): ",Object(I.a)(b.cost))),P.a.createElement(u.a,{item:!0},P.a.createElement(g.a,{variant:"subheading"},"Total Entry: ",Object(I.a)(b.entryCount)))),P.a.createElement(u.a,{item:!0,container:!0,direction:"column",sm:4},P.a.createElement(u.a,{item:!0},P.a.createElement(g.a,{variant:"subheading"},"Manager : ",b.manager.name)),P.a.createElement(u.a,{item:!0},P.a.createElement(g.a,{variant:"subheading"},"Manager Spent Amount: \u20b9"," ",P.a.createElement("span",{style:{color:Object(j.a)({value:b.managerSpentAmount,balance:!1}).color||void 0}},Object(j.a)({value:b.managerSpentAmount}).value)))))),P.a.createElement(S.a,Object.assign({},d,{loading:r,data:Object(c.a)({},b.total,{managerSpentAmount:b.managerSpentAmount,total:b.cost}),count:1,settings:o,title:"Total",columnData:N,exclude:w,render:Object(j.b)({match:"managerSpentAmount"}),mutate:function(a){return null}})),P.a.createElement(A.a,{tableMutation:T.d,tableQuery:h.d,dataQuery:Q.i,defaultState:s,getQueryVariables:function(){return{siteId:e}},resetOnMount:!0},function(a,t,r){var c=r.loading,u=r.data,o=(r.refetch,u[Object.keys(u)[0]]);return P.a.createElement(y.a,{mutation:O.h},function(r,u){var m=u.loading;return P.a.createElement(S.a,Object.assign({},d,{loading:c||m,data:o,count:b.entryCount,settings:a,title:"Entry",columnData:R,exclude:M,options:{onAdd:function(){return n.push(f.a.SiteEntry.create({siteId:e,edit:!1,id:void 0}))}},render:Object(j.b)({match:"managerSpentAmount"}),mutate:function(){var a=Object(l.a)(i.a.mark(function a(e){return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t({variables:e});case 2:case"end":return a.stop()}},a)}));return function(e){return a.apply(this,arguments)}}()}))})}))}))});e.default=L}}]);
//# sourceMappingURL=16.cb27fc76.chunk.js.map