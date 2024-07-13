import{_ as H}from"./DuYhhQRU.js";import{_ as J}from"./BJeSV9wJ.js";import{_ as W}from"./DQvfYuRq.js";import{g as K,C as Q,j as X,r as u,z as v,D as Z,l as ee,n as oe,w as i,o as T,a as s,t as c,d as h,m as r,b as a,E as C,c as w,x as te,F as ae,s as k,q as ne}from"./DjVHutgK.js";import{_ as se}from"./Cn5jCJl6.js";import{_ as le}from"./BDchhSlv.js";import{_ as ie}from"./CPPzu7zr.js";import{u as re}from"./BphmO44c.js";import{u as ce}from"./EjIFSMx8.js";import{a as ue}from"./BxvrHIhX.js";import"./DJZhdGD7.js";import"./COmt5Jyh.js";import"./Dq3WvQhT.js";const de={class:"text-xl font-semibold leading-tight text-gray-900 dark:text-white"},me={class:"flex items-center justify-between gap-3 px-4 py-3"},pe={class:"flex items-center justify-between w-full px-4 py-3"},_e={class:"flex items-center gap-1.5"},fe={class:"text-sm leading-5"},ge={class:"grid grid-cols-3 gap-4"},ye={class:"flex flex-wrap items-center justify-between"},ve={class:"text-sm leading-5"},he={class:"font-medium"},be={class:"font-medium"},xe={class:"font-medium"},Ve={__name:"list",setup(Ce){const{t:n}=K(),N=re();Q();const b=X(),S=ce(),O=[{key:"id",label:"#",sortable:!0},{key:"title",label:n("TITLE"),sortable:!0},{key:"description",label:n("DESCRIPTION"),sortable:!1},{key:"rating",label:n("RATING"),sortable:!0},{key:"employes",label:n("EMPLOYEES"),sortable:!0},{key:"location",label:n("LOCATION"),sortable:!1},{key:"create_dates",label:n("CREATED_AT"),sortable:!0},,{key:"actions",label:n("ACTIONS"),sortable:!1}],$=u(O),R=v(()=>O.filter(e=>$.value.includes(e)));n("EDIT"),n("VIEW"),n("DELETE");const f=u(""),A=u([]),g=u(!1),I=u([]),P=v(()=>{var e;if(((e=A.value)==null?void 0:e.length)===0)return""});v(()=>JSON.parse(localStorage.getItem("user")));const p=u({column:"id",direction:"asc"}),m=u(1),d=u(10),x=u(200),L=v(()=>(m.value-1)*d.value+1),V=v(()=>Math.min(m.value*d.value,x.value));Z([m,d,p,f],()=>{E()}),ee(()=>{E()});const M=async e=>{try{g.value=!0,await N.deleteCompany(e,n,S),E()}catch(o){console.error(n("ERROR_REMOVING_COMPANY")+":",o)}finally{g.value=!1}},U=e=>{const o=b({name:"company-id-edit",params:{id:e}});k(o.fullPath)},q=e=>{const o=b({name:"company-id-images",params:{id:e}});k(o.fullPath)},D=e=>{const o=b({name:"company-id-logo",params:{id:e}});k(o.fullPath)},z=e=>{const o=b({name:"company-id-jobs",params:{id:e}});k(o.fullPath)},E=async()=>{try{g.value=!0;const e=await ue(`/users/companies${P.value}`,{query:{q:f.value,page:m.value,per_page:d.value,sort:p.value.column,order:p.value.direction}});x.value=e.meta.total,I.value=e.data}catch(e){console.error(n("ERROR_FETCHING_COMPANIES")+":",e)}finally{g.value=!1}};return(e,o)=>{const B=H,G=J,_=W,y=ne,Y=se,j=le,F=ie;return T(),oe(F,{class:"w-full",ui:{base:"",ring:"",divide:"divide-y divide-gray-200 dark:divide-gray-700",header:{padding:"px-4 py-5"},body:{padding:"",base:"divide-y divide-gray-200 dark:divide-gray-700"},footer:{padding:"p-4"}}},{header:i(()=>[s("h2",de,c(e.$t("COMPANIES_LIST")),1)]),footer:i(()=>[s("div",ye,[s("div",null,[s("span",ve,[h(c(e.$t("SHOWING"))+" ",1),s("span",he,c(r(L)),1),h(" "+c(e.$t("TO"))+" ",1),s("span",be,c(r(V)),1),h(" "+c(e.$t("OF"))+" ",1),s("span",xe,c(r(x)),1),h(" "+c(e.$t("ENTRIES")),1)])]),a(j,{modelValue:r(m),"onUpdate:modelValue":o[3]||(o[3]=t=>C(m)?m.value=t:null),"page-count":r(d),total:r(x),ui:{wrapper:"flex items-center gap-1",rounded:"!rounded-full min-w-[32px] justify-center",default:{activeButton:{variant:"outline",color:"indigo"}}}},null,8,["modelValue","page-count","total"])])]),default:i(()=>[s("div",me,[a(B,{modelValue:r(f),"onUpdate:modelValue":o[0]||(o[0]=t=>C(f)?f.value=t:null),icon:"i-heroicons-magnifying-glass-20-solid",color:"indigo",placeholder:e.$t("SEARCH")+"..."},null,8,["modelValue","placeholder"])]),s("div",pe,[s("div",_e,[s("span",fe,c(e.$t("ROWS_PER_PAGE"))+":",1),a(G,{modelValue:r(d),"onUpdate:modelValue":o[1]||(o[1]=t=>C(d)?d.value=t:null),options:[3,5,10,20,30,40],color:"indigo",class:"w-20 me-2",size:"xs"},null,8,["modelValue"])])]),a(Y,{sort:r(p),"onUpdate:sort":o[2]||(o[2]=t=>C(p)?p.value=t:null),rows:r(I),columns:r(R),loading:r(g),"sort-asc-icon":"i-heroicons-arrow-up","sort-desc-icon":"i-heroicons-arrow-down","sort-mode":"manual",class:"w-full",ui:{td:{base:"max-w-[0] truncate"},default:{checkbox:{color:"indigo"}}}},{"location-data":i(({row:t})=>[(T(!0),w(ae,null,te(t.location,l=>(T(),w("div",{key:l.id},[a(_,{text:l.country+","+l.state+","+l.city},{default:i(()=>[s("span",null,c(l.country+","+l.state+","+l.city),1)]),_:2},1032,["text"])]))),128))]),"create_dates-data":i(({row:t})=>[h(c(t.create_dates.created_at_human),1)]),"actions-data":i(({row:t})=>[s("div",ge,[a(_,{text:e.$t("COMPANY_JOBS")},{default:i(()=>[a(y,{icon:"i-heroicons-briefcase",size:"2xs",color:"indigo",variant:"outline",ui:{rounded:"rounded-full"},onClick:l=>z(t.id),square:""},null,8,["onClick"])]),_:2},1032,["text"]),a(_,{text:e.$t("EDIT_COMPANY")},{default:i(()=>[a(y,{icon:"i-heroicons-pencil-square",size:"2xs",color:"orange",variant:"outline",ui:{rounded:"rounded-full"},onClick:l=>U(t.id),square:""},null,8,["onClick"])]),_:2},1032,["text"]),a(_,{text:e.$t("COMPANY_IMAGES")},{default:i(()=>[a(y,{icon:"i-heroicons-photo",size:"2xs",color:"green",variant:"outline",ui:{rounded:"rounded-full"},onClick:l=>q(t.id),square:""},null,8,["onClick"])]),_:2},1032,["text"]),a(_,{text:e.$t("COMPANY_LOGO")},{default:i(()=>[a(y,{icon:"i-heroicons-building-storefront",size:"2xs",color:"blue",variant:"outline",ui:{rounded:"rounded-full"},onClick:l=>D(t.id),square:""},null,8,["onClick"])]),_:2},1032,["text"]),a(_,{text:e.$t("DELETE_COMPANY")},{default:i(()=>[a(y,{icon:"i-heroicons-trash",size:"2xs",color:"red",variant:"outline",ui:{rounded:"rounded-full"},onClick:l=>M(t.id),square:""},null,8,["onClick"])]),_:2},1032,["text"])])]),_:1},8,["sort","rows","columns","loading"])]),_:1})}}};export{Ve as default};
