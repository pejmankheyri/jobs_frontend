import{K,ap as Q,M as f,_ as R,N as X,X as V,O as Y,P as j,aa as Z,z as i,r as O,Q as _,l as x,S as ee,T as c,o as y,c as I,a as ae,U as le,V as b,H as g,b as $,J as k,W as ne}from"./DjVHutgK.js";import{u as ie}from"./DJZhdGD7.js";const t=K(f.ui.strategy,f.ui.input,Q),te=X({components:{UIcon:V},inheritAttrs:!1,props:{modelValue:{type:[String,Number],default:""},type:{type:String,default:"text"},id:{type:String,default:null},name:{type:String,default:null},placeholder:{type:String,default:null},required:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},autofocus:{type:Boolean,default:!1},autofocusDelay:{type:Number,default:100},icon:{type:String,default:null},loadingIcon:{type:String,default:()=>t.default.loadingIcon},leadingIcon:{type:String,default:null},trailingIcon:{type:String,default:null},trailing:{type:Boolean,default:!1},leading:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},padded:{type:Boolean,default:!0},size:{type:String,default:null,validator(e){return Object.keys(t.size).includes(e)}},color:{type:String,default:()=>t.default.color,validator(e){return[...f.ui.colors,...Object.keys(t.color)].includes(e)}},variant:{type:String,default:()=>t.default.variant,validator(e){return[...Object.keys(t.variant),...Object.values(t.color).flatMap(n=>Object.keys(n))].includes(e)}},inputClass:{type:String,default:null},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})},modelModifiers:{type:Object,default:()=>({})}},emits:["update:modelValue","blur","change"],setup(e,{emit:n,slots:p}){const{ui:a,attrs:C}=Y("input",j(e,"ui"),t,j(e,"class")),{size:B,rounded:v}=Z({ui:a,props:e}),{emitFormBlur:s,emitFormInput:M,size:w,color:u,inputId:A,name:F}=ie(e,t),o=i(()=>B.value||w.value),d=O(_({},e.modelModifiers,{trim:!1,lazy:!1,number:!1})),S=O(null),T=()=>{var l;e.autofocus&&((l=S.value)==null||l.focus())},z=l=>{d.value.trim&&(l=l.trim()),(d.value.number||e.type==="number")&&(l=ne(l)),n("update:modelValue",l),M()},W=l=>{d.value.lazy||z(l.target.value)},q=l=>{if(e.type==="file"){const r=l.target.files;n("change",r)}else{const r=l.target.value;n("change",r),d.value.lazy&&z(r),d.value.trim&&(l.target.value=r.trim())}},G=l=>{s(),n("blur",l)};x(()=>{setTimeout(()=>{T()},e.autofocusDelay)});const U=i(()=>{var r,h;const l=((h=(r=a.value.color)==null?void 0:r[u.value])==null?void 0:h[e.variant])||a.value.variant[e.variant];return ee(c(a.value.base,a.value.form,v.value,a.value.placeholder,e.type==="file"&&a.value.file.base,a.value.size[o.value],e.padded?a.value.padding[o.value]:"p-0",l==null?void 0:l.replaceAll("{color}",u.value),(m.value||p.leading)&&a.value.leading.padding[o.value],(N.value||p.trailing)&&a.value.trailing.padding[o.value]),e.inputClass)}),m=i(()=>e.icon&&e.leading||e.icon&&!e.trailing||e.loading&&!e.trailing||e.leadingIcon),N=i(()=>e.icon&&e.trailing||e.loading&&e.trailing||e.trailingIcon),D=i(()=>e.loading?e.loadingIcon:e.leadingIcon||e.icon),J=i(()=>e.loading&&!m.value?e.loadingIcon:e.trailingIcon||e.icon),L=i(()=>c(a.value.icon.leading.wrapper,a.value.icon.leading.pointer,a.value.icon.leading.padding[o.value])),P=i(()=>c(a.value.icon.base,u.value&&f.ui.colors.includes(u.value)&&a.value.icon.color.replaceAll("{color}",u.value),a.value.icon.size[o.value],e.loading&&a.value.icon.loading)),E=i(()=>c(a.value.icon.trailing.wrapper,a.value.icon.trailing.pointer,a.value.icon.trailing.padding[o.value])),H=i(()=>c(a.value.icon.base,u.value&&f.ui.colors.includes(u.value)&&a.value.icon.color.replaceAll("{color}",u.value),a.value.icon.size[o.value],e.loading&&!m.value&&a.value.icon.loading));return{ui:a,attrs:C,name:F,inputId:A,input:S,isLeading:m,isTrailing:N,inputClass:U,leadingIconName:D,leadingIconClass:P,leadingWrapperIconClass:L,trailingIconName:J,trailingIconClass:H,trailingWrapperIconClass:E,onInput:W,onChange:q,onBlur:G}}}),ue=["id","name","value","type","required","placeholder","disabled"];function oe(e,n,p,a,C,B){const v=V;return y(),I("div",{class:g(e.ui.wrapper)},[ae("input",le({id:e.inputId,ref:"input",name:e.name,value:e.modelValue,type:e.type,required:e.required,placeholder:e.placeholder,disabled:e.disabled,class:e.inputClass},e.attrs,{onInput:n[0]||(n[0]=(...s)=>e.onInput&&e.onInput(...s)),onBlur:n[1]||(n[1]=(...s)=>e.onBlur&&e.onBlur(...s)),onChange:n[2]||(n[2]=(...s)=>e.onChange&&e.onChange(...s))}),null,16,ue),b(e.$slots,"default"),e.isLeading&&e.leadingIconName||e.$slots.leading?(y(),I("span",{key:0,class:g(e.leadingWrapperIconClass)},[b(e.$slots,"leading",{disabled:e.disabled,loading:e.loading},()=>[$(v,{name:e.leadingIconName,class:g(e.leadingIconClass)},null,8,["name","class"])])],2)):k("",!0),e.isTrailing&&e.trailingIconName||e.$slots.trailing?(y(),I("span",{key:1,class:g(e.trailingWrapperIconClass)},[b(e.$slots,"trailing",{disabled:e.disabled,loading:e.loading},()=>[$(v,{name:e.trailingIconName,class:g(e.trailingIconClass)},null,8,["name","class"])])],2)):k("",!0)],2)}const de=R(te,[["render",oe]]);export{de as _};
