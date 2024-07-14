import{_ as E}from"./D7TTXPIU.js";import{_ as I,a as R}from"./DFje3nGA.js";import{h as A,g as D,r as b,k as T,c as V,a as i,t as c,b as s,w as r,m as U,a7 as g,o as h,d as y,q as N}from"./vT5Awhrc.js";import{u as O}from"./B-ELNDSt.js";import{u as $}from"./DZ-GVF-D.js";import{c as k,a as _}from"./BqjAheMm.js";import"./T7PZxXqv.js";import"./AXwBvxvj.js";const v={class:"container max-w-md mx-auto my-10"},x={class:"mb-4 text-2xl font-bold"},F={class:"pt-4"},M={__name:"change-password",setup(H){const u=O();A();const{t:a}=D(),p=$(),w=k({oldPassword:_().required(a("THIS_FIELD_IS_REQUIRED")),newPassword:_().min(8,a("THIS_FIELD_MUST_BE_AT_LEAST_8_CHARACTERS")).required(a("THIS_FIELD_IS_REQUIRED")),confirmPassword:_().required(a("THIS_FIELD_IS_REQUIRED"))}),l=b(!1),o=T({oldPassword:"",newPassword:"",confirmPassword:""}),f=async()=>{try{l.value=!0,await u.updatePassword(g(o),a,p),o.oldPassword="",o.newPassword="",o.confirmPassword=""}finally{l.value=!1}};return(t,e)=>{const d=E,m=R,S=N,P=I;return h(),V("div",null,[i("div",v,[i("h1",x,c(t.$t("CHANGE_PASSWORD")),1),s(P,{state:o,schema:U(w),class:"space-y-4",onSubmit:f},{default:r(()=>[s(m,{label:t.$t("OLD_PASSWORD"),name:"oldPassword"},{default:r(()=>[s(d,{modelValue:o.oldPassword,"onUpdate:modelValue":e[0]||(e[0]=n=>o.oldPassword=n),color:"indigo",type:"password",size:"sm",icon:"i-heroicons-lock-closed"},null,8,["modelValue"])]),_:1},8,["label"]),s(m,{label:t.$t("NEW_PASSWORD"),name:"newPassword"},{default:r(()=>[s(d,{modelValue:o.newPassword,"onUpdate:modelValue":e[1]||(e[1]=n=>o.newPassword=n),color:"indigo",type:"password",size:"sm",icon:"i-heroicons-lock-closed"},null,8,["modelValue"])]),_:1},8,["label"]),s(m,{label:t.$t("NEW_PASSWORD_CONFIRMATION"),name:"confirmPassword"},{default:r(()=>[s(d,{modelValue:o.confirmPassword,"onUpdate:modelValue":e[2]||(e[2]=n=>o.confirmPassword=n),color:"indigo",type:"password",size:"sm",icon:"i-heroicons-lock-closed"},null,8,["modelValue"])]),_:1},8,["label"]),i("div",F,[s(S,{type:"submit",color:"indigo",loading:l.value,block:""},{default:r(()=>[y(c(t.$t("CHANGE_PASSWORD")),1)]),_:1},8,["loading"])])]),_:1},8,["state","schema"])])])}}};export{M as default};