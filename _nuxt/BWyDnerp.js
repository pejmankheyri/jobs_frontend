import{g as S,r as l,k as N,z as u,c as T,a as m,t as i,b as a,m as o,w as s,A as w,o as B,d as $,q as k,y as F}from"./DjVHutgK.js";import{_ as R}from"./DuYhhQRU.js";import{_ as z,a as D}from"./NY1tLGcX.js";import{b as E}from"./BxvrHIhX.js";import{u as G}from"./EjIFSMx8.js";import"./DJZhdGD7.js";import"./Dq3WvQhT.js";const I={class:"container max-w-md mx-auto my-10"},H={class:"mb-4 text-2xl font-bold"},q={class:"pt-4"},W={__name:"change-avatar",setup(J){const _=F(),p=E(),{t:d}=S(),f=G(),n=l(!1),r=l(null),e=N({avatar:void 0}),v=t=>{r.value=t[0]},A=async()=>{try{n.value=!0;const t=new FormData;t.append("avatar",r.value),await p.changeAvatar(t,d,f),e.avatar=void 0}finally{n.value=!1}},g=u(()=>JSON.parse(localStorage.getItem("user"))),b=u(()=>_.public.apiBaseUrl+g.value.avatar);return(t,c)=>{const x=w,h=R,y=D,V=k,U=z;return B(),T("div",I,[m("h1",H,i(t.$t("CHANGE_AVATAR")),1),a(x,{src:o(b),size:"3xl"},null,8,["src"]),a(U,{state:o(e),class:"space-y-4",onSubmit:A},{default:s(()=>[a(y,{label:t.$t("AVATAR"),name:"avatar"},{default:s(()=>[a(h,{modelValue:o(e).avatar,"onUpdate:modelValue":c[0]||(c[0]=C=>o(e).avatar=C),color:"indigo",type:"file",size:"sm",icon:"i-heroicons-folder",onChange:v},null,8,["modelValue"])]),_:1},8,["label"]),m("div",q,[a(V,{type:"submit",color:"indigo",loading:o(n),block:""},{default:s(()=>[$(i(t.$t("CHANGE_AVATAR")),1)]),_:1},8,["loading"])])]),_:1},8,["state"])])}}};export{W as default};
