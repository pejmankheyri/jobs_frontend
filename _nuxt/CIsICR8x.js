import{g as U,r as i,k as $,v as B,l as T,z as V,c as k,b as t,w as s,m as G,a as d,t as c,q as L,A as N,o as F,d as f,s as z,y as D}from"./DjVHutgK.js";import{_ as E}from"./DuYhhQRU.js";import{_ as I,a as M}from"./NY1tLGcX.js";import{u as P}from"./EjIFSMx8.js";import{u as R}from"./BxvrHIhX.js";import{u as j}from"./BphmO44c.js";import"./DJZhdGD7.js";import"./Dq3WvQhT.js";const q={class:"container max-w-md mx-auto my-10"},H={class:"mb-4 text-2xl font-bold"},K={class:"pt-4"},eo={__name:"logo",setup(Y){const g=D();R();const r=j(),{t:v}=U(),y=P(),a=i(!1),u=i(null),l=i(null),e=$({logo:void 0}),b=o=>{u.value=o[0]},C=async()=>{try{a.value=!0;const o=new FormData;o.append("logo",u.value),l.value=await r.changeLogo(o,m.params.id,v,y),e.logo=void 0}finally{a.value=!1}},m=B();T(()=>{h()});const h=async()=>{try{a.value=!0,l.value=await r.fetchCompany(m.params.id)}finally{a.value=!1}},O=V(()=>{var o;return g.public.apiBaseUrl+((o=l.value)==null?void 0:o.logo)});return(o,n)=>{const p=L,w=N,x=E,A=M,S=I;return F(),k("div",q,[t(p,{onClick:n[0]||(n[0]=_=>("navigateTo"in o?o.navigateTo:G(z))(o.localePath({name:"company-list"}))),color:"indigo",variant:"outline",icon:"i-heroicons-arrow-left",class:"mb-4"},{default:s(()=>[f(c(o.$t("BACK")),1)]),_:1}),d("h1",H,c(o.$t("COMPANY_LOGO")),1),t(w,{src:O.value,size:"3xl"},null,8,["src"]),t(S,{state:e,class:"space-y-4",onSubmit:C},{default:s(()=>[t(A,{label:o.$t("LOGO"),name:"logo"},{default:s(()=>[t(x,{modelValue:e.logo,"onUpdate:modelValue":n[1]||(n[1]=_=>e.logo=_),color:"indigo",type:"file",size:"sm",icon:"i-heroicons-folder",onChange:b},null,8,["modelValue"])]),_:1},8,["label"]),d("div",K,[t(p,{type:"submit",color:"indigo",loading:a.value,block:""},{default:s(()=>[f(c(o.$t("CHANGE_LOGO")),1)]),_:1},8,["loading"])])]),_:1},8,["state"])])}}};export{eo as default};
