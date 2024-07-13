import{K as T,L as V,M as m,_ as $,N as q,O as F,P as B,r as z,Q as H,l as h,D as R,R as A,z as D,S as x,T as P,o as U,c as E,a as G,U as J,V as K,H as L,W as Q}from"./DjVHutgK.js";import{u as W}from"./DJZhdGD7.js";const u=T(m.ui.strategy,m.ui.textarea,V),X=q({inheritAttrs:!1,props:{modelValue:{type:[String,Number],default:""},id:{type:String,default:null},name:{type:String,default:null},placeholder:{type:String,default:null},required:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},rows:{type:Number,default:3},maxrows:{type:Number,default:0},autoresize:{type:Boolean,default:!1},autofocus:{type:Boolean,default:!1},autofocusDelay:{type:Number,default:100},resize:{type:Boolean,default:!1},padded:{type:Boolean,default:!0},size:{type:String,default:null,validator(e){return Object.keys(u.size).includes(e)}},color:{type:String,default:()=>u.default.color,validator(e){return[...m.ui.colors,...Object.keys(u.color)].includes(e)}},variant:{type:String,default:()=>u.default.variant,validator(e){return[...Object.keys(u.variant),...Object.values(u.color).flatMap(t=>Object.keys(t))].includes(e)}},textareaClass:{type:String,default:null},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})},modelModifiers:{type:Object,default:()=>({})}},emits:["update:modelValue","blur","change"],setup(e,{emit:t}){const{ui:l,attrs:c}=F("textarea",B(e,"ui"),u,B(e,"class")),{emitFormBlur:p,emitFormInput:g,inputId:n,color:v,size:y,name:C}=W(e,u),s=z(H({},e.modelModifiers,{trim:!1,lazy:!1,number:!1})),r=z(null),b=()=>{var a;e.autofocus&&((a=r.value)==null||a.focus())},d=()=>{if(e.autoresize){if(!r.value)return;r.value.rows=e.rows;const a=window.getComputedStyle(r.value),o=parseInt(a.paddingTop),i=parseInt(a.paddingBottom),M=o+i,k=parseInt(a.lineHeight),{scrollHeight:N}=r.value,f=(N-M)/k;f>e.rows&&(r.value.rows=e.maxrows?Math.min(f,e.maxrows):f)}},w=a=>{s.value.trim&&(a=a.trim()),s.value.number&&(a=Q(a)),t("update:modelValue",a),g()},I=a=>{d(),s.value.lazy||w(a.target.value)},S=a=>{const o=a.target.value;t("change",o),s.value.lazy&&w(o),s.value.trim&&(a.target.value=o.trim())},O=a=>{t("blur",a),p()};h(()=>{setTimeout(()=>{b()},e.autofocusDelay)}),R(()=>e.modelValue,()=>{A(d)}),h(()=>{setTimeout(()=>{b(),d()},100)});const j=D(()=>{var o,i;const a=((i=(o=l.value.color)==null?void 0:o[v.value])==null?void 0:i[e.variant])||l.value.variant[e.variant];return x(P(l.value.base,l.value.form,l.value.rounded,l.value.placeholder,l.value.size[y.value],e.padded?l.value.padding[y.value]:"p-0",a==null?void 0:a.replaceAll("{color}",v.value),!e.resize&&"resize-none"),e.textareaClass)});return{ui:l,attrs:c,name:C,inputId:n,textarea:r,textareaClass:j,onInput:I,onChange:S,onBlur:O}}}),Y=["id","value","name","rows","required","disabled","placeholder"];function Z(e,t,l,c,p,g){return U(),E("div",{class:L(e.ui.wrapper)},[G("textarea",J({id:e.inputId,ref:"textarea",value:e.modelValue,name:e.name,rows:e.rows,required:e.required,disabled:e.disabled,placeholder:e.placeholder,class:e.textareaClass},e.attrs,{onInput:t[0]||(t[0]=(...n)=>e.onInput&&e.onInput(...n)),onBlur:t[1]||(t[1]=(...n)=>e.onBlur&&e.onBlur(...n)),onChange:t[2]||(t[2]=(...n)=>e.onChange&&e.onChange(...n))}),null,16,Y),K(e.$slots,"default")],2)}const ae=$(X,[["render",Z]]);export{ae as _};
