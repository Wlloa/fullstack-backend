(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(0),r=t(1),o=t.n(r),s=t(15),i=t.n(s),u=t(3);var a=function(e){var n=e.persons,t=e.setPersons,o=Object(r.useState)(""),s=Object(u.a)(o,2),i=s[0],a=s[1];return Object(c.jsxs)("div",{children:["filter shown with: ",Object(c.jsx)("input",{type:"text",value:i,onChange:function(e){a(e.target.value);var c=n.filter((function(e){return e.name.toLowerCase().includes(i.toLowerCase())}));t(c)}})]})},d=t(6),j=t(4),b=t.n(j),l="/api/persons",f=function(){return b.a.get(l).then((function(e){return e.data}))},h=function(e){return b.a.post(l,e).then((function(e){return e.data}))},m=function(e){return b.a.delete("".concat(l,"/").concat(e)).then((function(e){return e.data}))},O=function(e,n){return b.a.put("".concat(l,"/").concat(e),n).then((function(e){return e.data}))};t(39);var v="error",p="success",x=function(e){var n=e.notificacion;return null===n?null:Object(c.jsx)("div",{className:null===n||void 0===n?void 0:n.type,children:null===n||void 0===n?void 0:n.message})};var w=function(e){var n=e.newName,t=e.newNumber,r=e.setNewName,o=e.setNewNumber,s=e.setPersons,i=e.persons,u=e.setMessage;return Object(c.jsx)("div",{children:Object(c.jsxs)("form",{onSubmit:function(e){e.preventDefault();var c=i.find((function(e){return e.name===n}));c?window.confirm("".concat(n," is already added to phonebook, replace the old number with a new one"))&&O(c.id,Object(d.a)(Object(d.a)({},c),{},{number:t})).then((function(e){console.log(e),s(i.map((function(n){return n.id!==e.id?n:e})))})):h({name:n,number:t}).then((function(e){s(i.concat(e)),u({message:"Added ".concat(n),type:p}),setTimeout((function(){u(null)}),5e3)})),r(""),o("")},children:[Object(c.jsx)("h2",{children:"add a new"}),Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{value:n,onChange:function(e){return r(e.target.value)}})]}),Object(c.jsxs)("div",{children:["number: ",Object(c.jsx)("input",{value:t,onChange:function(e){return o(e.target.value)}})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"add"})})]})})};var g=function(e){var n=e.persons,t=e.setPersons,r=e.setMessage;return Object(c.jsx)("div",{children:n.map((function(e){return Object(c.jsxs)("div",{children:[e.name,": ",e.number,Object(c.jsx)("button",{onClick:function(){return function(e){var c=n.find((function(n){return n.id===e}));c&&window.confirm("Delete ".concat(c.name))&&m(e).then((function(c){t(n.filter((function(n){return n.id!==e})))})).catch((function(o){r({message:"Information of ".concat(c.name," has already been removed from server"),type:v}),t(n.filter((function(n){return n.id!==e}))),setTimeout((function(){r(null)}),5e3)}))}(e.id)},children:"Delete"})]})}))})},N=function(){var e=Object(r.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],s=Object(r.useState)(""),i=Object(u.a)(s,2),d=i[0],j=i[1],b=Object(r.useState)(""),l=Object(u.a)(b,2),h=l[0],m=l[1],O=Object(r.useState)(null),v=Object(u.a)(O,2),p=v[0],N=v[1];return Object(r.useEffect)((function(){f().then((function(e){o(e)}))}),[]),Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(x,{notificacion:p}),Object(c.jsx)(a,{persons:t,setPersons:o}),Object(c.jsx)(w,{newName:d,newNumber:h,setNewName:j,setNewNumber:m,persons:t,setPersons:o,setMessage:N}),Object(c.jsx)("h2",{children:"Numbers"}),Object(c.jsx)(g,{persons:t,setPersons:o,setMessage:N})]})};i.a.render(Object(c.jsx)(o.a.StrictMode,{children:Object(c.jsx)(N,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.b52fcd1a.chunk.js.map