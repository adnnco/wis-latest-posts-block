(()=>{"use strict";var e={n:t=>{var s=t&&t.__esModule?()=>t.default:()=>t;return e.d(s,{a:s}),s},d:(t,s)=>{for(var a in s)e.o(s,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:s[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.React,s=window.ReactDOM;var a=e.n(s);const o=window.ReactJSXRuntime,n=({numberOfPosts:e})=>{const[s,a]=(0,t.useState)([]);return(0,t.useEffect)((()=>{fetch(`/wp-json/wis/v1/latest-posts?per_page=${e}`).then((e=>e.json())).then((e=>a(e)))}),[e]),(0,o.jsx)("div",{className:"latest-posts-block",children:s.map((e=>(0,o.jsxs)("div",{className:"post-item",children:[(0,o.jsx)("img",{className:"post-image",src:e.featured_image||"path/to/default/image.jpg",alt:e.title}),(0,o.jsxs)("div",{className:"post-content",children:[(0,o.jsx)("h2",{className:"post-title",children:e.title}),(0,o.jsx)("div",{className:"post-excerpt",dangerouslySetInnerHTML:{__html:e.excerpt}})]})]},e.id)))})};document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelector(".wp-block-create-block-wis-latest-posts-block"),t=e.getAttribute("data-number-of-posts")||5;a().render((0,o.jsx)(n,{numberOfPosts:t}),e)}))})();