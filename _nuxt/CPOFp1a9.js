import{o as i,c as b,a as e,r as _,m as J,b as m,w as p,E as ge,y as oe,g as fe,z as d,n as E,d as u,t as l,J as ee,F as I,x as te,q as ve}from"./DMVYGfwp.js";import{_ as be}from"./BfaOPqCM.js";import{_ as ye}from"./ChZklIx8.js";import{_ as se,u as he,a as Je}from"./DiqQ4DGh.js";import{_ as Oe}from"./BiQfoKhd.js";import{u as xe}from"./BJF1ClTK.js";import{u as Se,a as Be}from"./DvjFPo4h.js";const Ce={width:"12",height:"13",viewBox:"0 0 12 13",fill:"none",xmlns:"http://www.w3.org/2000/svg",class:"EmployerProfile_star__7xE_Z"},Ee=["fill"],Ie={__name:"Star",props:{color:String},setup(s){return(O,g)=>(i(),b("svg",Ce,[e("path",{d:"m6 1.5 1.18 3.82H11L7.91 7.68l1.18 3.82L6 9.14 2.91 11.5l1.18-3.82L1 5.32h3.82L6 1.5Z",fill:s.color},null,8,Ee)]))}},Le=["src"],Pe={class:"p-4"},$e=["src"],ke={__name:"CompanyImage",props:{image:Object},setup(s){const O=s,g=oe(),f=_(!1),a=_(""),y=()=>{a.value=g.public.apiBaseUrl+O.image.path,f.value=!0};return(L,v)=>{const h=se;return i(),b("div",null,[e("img",{src:J(g).public.apiBaseUrl+s.image.path,alt:"company image",class:"object-cover w-full h-48 rounded-lg cursor-pointer",onClick:v[0]||(v[0]=r=>y())},null,8,Le),m(h,{modelValue:J(f),"onUpdate:modelValue":v[1]||(v[1]=r=>ge(f)?f.value=r:null)},{default:p(()=>[e("div",Pe,[e("img",{src:J(a),alt:"company image",class:"w-full h-full rounded-lg"},null,8,$e)])]),_:1},8,["modelValue"])])}}},we={class:"relative block p-8"},Ae={class:"block pb-2 lg:flex lg:justify-between"},Te={class:"flex"},Ue={class:"flex gap-2 pr-3 text-xl place-items-center"},Re=["src"],Ve={class:"flex items-center gap-1 text-sm font-thin"},Ye={class:"p-4"},Ne={class:"flex items-center"},De={class:"flex flex-col"},Me={class:"text-3xl"},je={class:""},He={class:"py-4"},Fe={class:"grid gap-2 overflow-hidden lg:flex"},Ze={class:"grid grid-cols-1 gap-2 py-4 lg:grid-cols-3"},Ge={class:"bottom-0 block w-full border-t-2 lg:absolute"},We={class:"p-8"},qe={class:"text-2xl"},ze={class:"grid grid-cols-1 py-6 lg:grid-cols-2"},Ke=["href"],at={__name:"JobDetails",props:{selectedJob:Object},setup(s){const O=oe(),g=Se(),f=he(),{t:a}=fe(),y=xe(),{isMobile:L,isDesktop:v}=Je(),h=d(()=>!!g.token),r=_(!1),S=_(!1),B=_("");_(!1),_("");const C=s,le=d(()=>f.preference==="light"?"#000000":"#ffffff"),ae=t=>t+".0",ne=async(t,o)=>{try{S.value=!0;const c=await Be(`/jobs/${t}/apply`,{method:"POST",body:{message:o}});r.value=!1,y.toastSuccess({title:a("SUCCESS"),description:a("JOB_APPLIED_SUCCESSFULLY")})}catch(c){c.response.status===400||c.response.status===404?y.toastError({title:a("ERROR"),description:c.response._data.message}):y.toastError({title:a("ERROR"),description:a("ERROR_APPLYING_JOB")})}finally{S.value=!1}},ce=d(()=>{const t=JSON.parse(localStorage.getItem("jobs"));return t==null?void 0:t.map(o=>o.id)}),P=d(()=>{var t,o;return(o=ce.value)==null?void 0:o.includes((t=C.selectedJob)==null?void 0:t.id)}),$=d(()=>{var t,o,c,x;return((t=g.user)==null?void 0:t.id)===((x=(c=(o=C.selectedJob)==null?void 0:o.company)==null?void 0:c.user)==null?void 0:x.id)}),k=d(()=>P.value||$.value||!h.value),ie=d(()=>{var t;return O.public.apiBaseUrl+((t=C.selectedJob)==null?void 0:t.company.logo)}),re=d(()=>$.value?a("YOU_OWN_THIS_JOB"):P.value?a("JOB_ALREADY_APPLIED_TO_THIS_JOB"):h.value?a("CLICK_TO_APPLY_JOB"):a("LOGIN_TO_APPLY_JOB"));return(t,o)=>{var w,A,T,U,R,V,Y,N,D,M,j,H,F,Z,G,W,q,z,K,Q,X;const c=ve,x=Ie,de=be,ue=ye,me=se,pe=Oe,_e=ke;return i(),b(I,null,[e("div",we,[e("div",Ae,[J(L)?(i(),E(c,{key:0,color:"indigo",class:"p-4 my-4 ml-auto truncate",disabled:k.value,block:"",onClick:o[0]||(o[0]=n=>r.value=!0)},{default:p(()=>[u(l(t.$t("APPLY_THIS_JOB")),1)]),_:1},8,["disabled"])):ee("",!0),e("div",Te,[e("div",Ue,[e("img",{src:ie.value,alt:"company logo",class:"w-8 h-8 rounded-full"},null,8,Re),u(" "+l((A=(w=s.selectedJob)==null?void 0:w.company)==null?void 0:A.title),1)]),e("div",Ve,[u(l(ae((U=(T=s.selectedJob)==null?void 0:T.company)==null?void 0:U.rating))+" ",1),m(x,{class:"",color:le.value},null,8,["color"])])]),e("div",null,[m(de,{text:re.value},{default:p(()=>[J(v)?(i(),E(c,{key:0,color:"indigo",class:"p-4 ml-auto truncate",disabled:k.value,onClick:o[1]||(o[1]=n=>r.value=!0)},{default:p(()=>[u(l(t.$t("APPLY_THIS_JOB")),1)]),_:1},8,["disabled"])):ee("",!0)]),_:1},8,["text"]),m(me,{modelValue:r.value,"onUpdate:modelValue":o[4]||(o[4]=n=>r.value=n)},{default:p(()=>[e("div",Ye,[m(ue,{color:"indigo",variant:"outline",placeholder:"Your cover letter",class:"pb-4",modelValue:B.value,"onUpdate:modelValue":o[2]||(o[2]=n=>B.value=n)},null,8,["modelValue"]),m(c,{color:"indigo",class:"p-4 ml-auto truncate",disabled:!h.value,loading:S.value,onClick:o[3]||(o[3]=n=>ne(s.selectedJob.id,B.value)),block:""},{default:p(()=>[u(l(t.$t("APPLY_THIS_JOB")),1)]),_:1},8,["disabled","loading"])])]),_:1},8,["modelValue"])])]),e("div",Ne,[e("div",De,[e("h1",Me,l((R=s.selectedJob)==null?void 0:R.title),1),e("span",je,l((N=(Y=(V=s.selectedJob)==null?void 0:V.company)==null?void 0:Y.location[0])==null?void 0:N.state)+", "+l((j=(M=(D=s.selectedJob)==null?void 0:D.company)==null?void 0:M.location[0])==null?void 0:j.country),1)])]),e("p",He,l((H=s.selectedJob)==null?void 0:H.description),1),e("div",Fe,[(i(!0),b(I,null,te((F=s.selectedJob)==null?void 0:F.tags,n=>(i(),b("div",{key:n.id,class:""},[m(pe,{variant:"subtle",color:"indigo"},{default:p(()=>[u(l(n.name),1)]),_:2},1024)]))),128))]),e("div",Ze,[(i(!0),b(I,null,te((G=(Z=s.selectedJob)==null?void 0:Z.company)==null?void 0:G.images,n=>(i(),E(_e,{key:n.id,image:n},null,8,["image"]))),128))])]),e("div",Ge,[e("div",We,[e("h2",qe,l(t.$t("COMPANY_DESCRIPTION")),1),e("div",ze,[e("p",null,l(t.$t("SIZE"))+": "+l((q=(W=s.selectedJob)==null?void 0:W.company)==null?void 0:q.employes)+" "+l(t.$t("EMPLOYEE")),1),e("p",null,[u(l(t.$t("WEBSITE"))+": ",1),e("a",{href:(K=(z=s.selectedJob)==null?void 0:z.company)==null?void 0:K.website,target:"_blank",class:"text-indigo-500"},l((X=(Q=s.selectedJob)==null?void 0:Q.company)==null?void 0:X.website),9,Ke)])])])])],64)}}};export{Ie as _,at as a};