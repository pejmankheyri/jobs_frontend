import{g as T,r as u,k as $,v as U,l as F,c as s,b as i,w as C,m as k,a as p,t as d,n as N,F as D,x as E,q as M,o as t,d as b,s as O,y as P}from"./DjVHutgK.js";import{_ as R}from"./DuYhhQRU.js";import{_ as j}from"./CKgnmhEy.js";import{_ as q}from"./BN4tFAgM.js";import{u as z}from"./EjIFSMx8.js";import{u as G}from"./BxvrHIhX.js";import{u as K}from"./BphmO44c.js";import"./DJZhdGD7.js";const L={class:"container max-w-md mx-auto my-10"},Y={class:"mb-4 text-2xl font-bold"},H={key:1},J={class:"grid grid-cols-3 gap-4 mb-8"},Q=["src"],lo={__name:"images",setup(W){const w=P();G();const l=K(),{t:_}=T(),f=z(),e=u(!1),v=u(null),r=u(null),c=$({image:void 0}),x=o=>{v.value=o[0]},S=async()=>{try{e.value=!0;const o=new FormData;o.append("images[]",v.value),r.value=await l.addImage(o,g.params.id,_,f),c.image=void 0,m()}finally{e.value=!1}},g=U();F(()=>{m()});const m=async()=>{try{e.value=!0,r.value=await l.fetchCompany(g.params.id)}finally{e.value=!1}},B=async o=>{try{e.value=!0,await l.removeImage(o,_,f),m()}finally{e.value=!1}};return(o,n)=>{var h;const y=M,V=R,A=j,I=q;return t(),s("div",L,[i(y,{onClick:n[0]||(n[0]=a=>("navigateTo"in o?o.navigateTo:k(O))(o.localePath({name:"company-list"}))),color:"indigo",variant:"outline",icon:"i-heroicons-arrow-left",class:"mb-4"},{default:C(()=>[b(d(o.$t("BACK")),1)]),_:1}),p("h1",Y,d(o.$t("COMPANY_IMAGES")),1),i(V,{modelValue:c.image,"onUpdate:modelValue":n[1]||(n[1]=a=>c.image=a),color:"indigo",type:"file",size:"sm",icon:"i-heroicons-folder",onChange:x},null,8,["modelValue"]),i(y,{onClick:S,color:"indigo",block:"",icon:"i-heroicons-save",class:"my-4"},{default:C(()=>[b(d(o.$t("SAVE")),1)]),_:1}),e.value?(t(),N(A,{key:0,class:"h-[100px] w-full mb-auto mt-16"})):(t(),s("div",H,[p("div",J,[(t(!0),s(D,null,E((h=r.value)==null?void 0:h.images,a=>(t(),s("div",{key:a.id},[i(I,{class:"cursor-pointer",onClick:X=>B(a.id)},null,8,["onClick"]),p("img",{src:k(w).public.apiBaseUrl+a.path},null,8,Q)]))),128))])]))])}}};export{lo as default};
