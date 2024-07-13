import{K as j,M as g,ai as S,_ as q,N as I,q as M,O as E,P as L,z as h,o as f,c as $,V as B,n as b,U as c,J as k,F as W,x as D}from"./BIGTx159.js";const J={wrapper:"flex items-center -space-x-px",base:"",rounded:"first:rounded-s-md last:rounded-e-md",default:{size:"sm",activeButton:{color:"primary"},inactiveButton:{color:"white"},firstButton:{color:"white",class:"rtl:[&_span:first-child]:rotate-180",icon:"i-heroicons-chevron-double-left-20-solid"},lastButton:{color:"white",class:"rtl:[&_span:last-child]:rotate-180",icon:"i-heroicons-chevron-double-right-20-solid"},prevButton:{color:"white",class:"rtl:[&_span:first-child]:rotate-180",icon:"i-heroicons-chevron-left-20-solid"},nextButton:{color:"white",class:"rtl:[&_span:last-child]:rotate-180",icon:"i-heroicons-chevron-right-20-solid"}}},u=j(g.ui.strategy,g.ui.pagination,J),K=j(g.ui.strategy,g.ui.button,S),R=I({components:{UButton:M},inheritAttrs:!1,props:{modelValue:{type:Number,required:!0},pageCount:{type:Number,default:10},total:{type:Number,required:!0},max:{type:Number,default:7,validate(e){return e>=5&&e<Number.MAX_VALUE}},disabled:{type:Boolean,default:!1},size:{type:String,default:()=>u.default.size,validator(e){return Object.keys(K.size).includes(e)}},to:{type:Function,default:null},activeButton:{type:Object,default:()=>u.default.activeButton},inactiveButton:{type:Object,default:()=>u.default.inactiveButton},showFirst:{type:Boolean,default:!1},showLast:{type:Boolean,default:!1},firstButton:{type:Object,default:()=>u.default.firstButton},lastButton:{type:Object,default:()=>u.default.lastButton},prevButton:{type:Object,default:()=>u.default.prevButton},nextButton:{type:Object,default:()=>u.default.nextButton},divider:{type:String,default:"…"},class:{type:[String,Object,Array],default:()=>""},ui:{type:Object,default:()=>({})}},emits:["update:modelValue"],setup(e,{emit:C}){const{ui:z,attrs:P}=E("pagination",L(e,"ui"),u,L(e,"class")),o=h({get(){return e.modelValue},set(n){C("update:modelValue",n)}}),p=h(()=>Array.from({length:Math.ceil(e.total/e.pageCount)},(n,s)=>s+1)),r=h(()=>{const n=p.value.length,s=o.value,O=Math.max(e.max,5),l=Math.floor((Math.min(O,n)-5)/2),N=s-l,y=s+l,F=N-1>1,w=y+1<n,t=[];if(n<=O){for(let a=1;a<=n;a++)t.push(a);return t}if(t.push(1),F&&t.push(e.divider),!w){const a=s+l+2-n;for(let d=s-l-a;d<=s-l-1;d++)t.push(d)}for(let a=Math.max(2,N);a<=Math.min(n,y);a++)t.push(a);if(!F){const a=1-(s-l-2);for(let d=s+l+1;d<=s+l+a;d++)t.push(d)}return w&&t.push(e.divider),y<n&&t.push(n),t.length>=3&&t[1]===e.divider&&t[2]===3&&(t[1]=2),t.length>=3&&t[t.length-2]===e.divider&&t[t.length-1]===t.length&&(t[t.length-2]=t.length-1),t}),i=h(()=>o.value>1),v=h(()=>o.value<p.value.length);function m(){i.value&&(o.value=1)}function V(){v.value&&(o.value=p.value.length)}function G(n){typeof n!="string"&&(o.value=n)}function A(){i.value&&o.value--}function U(){v.value&&o.value++}return{ui:z,attrs:P,currentPage:o,pages:p,displayedPages:r,canGoLastOrNext:v,canGoFirstOrPrev:i,onClickPrev:A,onClickNext:U,onClickPage:G,onClickFirst:m,onClickLast:V}}});function X(e,C,z,P,o,p){const r=M;return f(),$("div",c({class:e.ui.wrapper},e.attrs),[B(e.$slots,"first",{onClick:e.onClickFirst},()=>[e.firstButton&&e.showFirst?(f(),b(r,c({key:0,size:e.size,disabled:!e.canGoFirstOrPrev||e.disabled,class:[e.ui.base,e.ui.rounded]},{...e.ui.default.firstButton||{},...e.firstButton},{ui:{rounded:""},"aria-label":"First",onClick:e.onClickFirst}),null,16,["size","disabled","class","onClick"])):k("",!0)]),B(e.$slots,"prev",{onClick:e.onClickPrev},()=>[e.prevButton?(f(),b(r,c({key:0,size:e.size,disabled:!e.canGoFirstOrPrev||e.disabled,class:[e.ui.base,e.ui.rounded]},{...e.ui.default.prevButton||{},...e.prevButton},{ui:{rounded:""},"aria-label":"Prev",onClick:e.onClickPrev}),null,16,["size","disabled","class","onClick"])):k("",!0)]),(f(!0),$(W,null,D(e.displayedPages,(i,v)=>{var m;return f(),b(r,c({key:`${i}-${v}`,to:typeof i=="number"?(m=e.to)==null?void 0:m.call(e,i):null,size:e.size,disabled:e.disabled,label:`${i}`,ref_for:!0},i===e.currentPage?{...e.ui.default.activeButton||{},...e.activeButton}:{...e.ui.default.inactiveButton||{},...e.inactiveButton},{class:[{"pointer-events-none":typeof i=="string","z-[1]":i===e.currentPage},e.ui.base,e.ui.rounded],ui:{rounded:""},onClick:()=>e.onClickPage(i)}),null,16,["to","size","disabled","label","class","onClick"])}),128)),B(e.$slots,"next",{onClick:e.onClickNext},()=>[e.nextButton?(f(),b(r,c({key:0,size:e.size,disabled:!e.canGoLastOrNext||e.disabled,class:[e.ui.base,e.ui.rounded]},{...e.ui.default.nextButton||{},...e.nextButton},{ui:{rounded:""},"aria-label":"Next",onClick:e.onClickNext}),null,16,["size","disabled","class","onClick"])):k("",!0)]),B(e.$slots,"last",{onClick:e.onClickLast},()=>[e.lastButton&&e.showLast?(f(),b(r,c({key:0,size:e.size,disabled:!e.canGoLastOrNext||e.disabled,class:[e.ui.base,e.ui.rounded]},{...e.ui.default.lastButton||{},...e.lastButton},{ui:{rounded:""},"aria-label":"Last",onClick:e.onClickLast}),null,16,["size","disabled","class","onClick"])):k("",!0)])],16)}const Q=q(R,[["render",X]]);export{Q as _};