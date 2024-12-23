(function(l,r){typeof exports=="object"&&typeof module<"u"?r(exports,require("lightweight-charts")):typeof define=="function"&&define.amd?define(["exports","lightweight-charts"],r):(l=typeof globalThis<"u"?globalThis:l||self,r(l.StackedBarsSeries={},l.LightweightCharts))})(this,function(l,r){"use strict";var y=Object.defineProperty;var E=(l,r,h)=>r in l?y(l,r,{enumerable:!0,configurable:!0,writable:!0,value:h}):l[r]=h;var p=(l,r,h)=>(E(l,typeof r!="symbol"?r+"":r,h),h);const h={...r.customSeriesDefaultOptions,colors:["#2962FF","#E1575A","#F28E2C","rgb(164, 89, 209)","rgb(27, 156, 133)"]},B=4,M=1;function g(i,t){return Math.ceil(i*t)<=M?0:Math.max(1,Math.floor(t))}function w(i,t,n){return Math.round(i*t)-(n??g(i,t))}function b(i,t){const n=g(i,t),o=w(i,t,n),s=o%2===0,u=(o-(s?0:1))/2;return{spacing:n,shiftLeft:s,columnHalfWidthBitmap:u,horizontalPixelRatio:t}}function v(i,t,n){const o=i*t.horizontalPixelRatio,s=Math.round(o),u={left:s-t.columnHalfWidthBitmap,right:s+t.columnHalfWidthBitmap-(t.shiftLeft?1:0),shiftLeft:s>o},a=t.spacing+1;return n&&u.left-n.right!==a&&(n.shiftLeft?n.right=u.left-a:u.left=n.right+a),u}function S(i,t,n,o,s){const u=b(t,n);let a;for(let e=o;e<Math.min(s,i.length);e++)i[e].column=v(i[e].x,u,a),a=i[e].column;const f=i.reduce((e,c,d)=>{if(!c.column||d<o||d>s)return e;c.column.right<c.column.left&&(c.column.right=c.column.left);const m=c.column.right-c.column.left+1;return Math.min(e,m)},Math.ceil(t*n));u.spacing>0&&f<B&&i.forEach((e,c)=>!e.column||c<o||c>s?void 0:e.column.right-e.column.left+1<=f?e:(e.column.shiftLeft?e.column.right-=1:e.column.left+=1,e.column))}function W(i,t,n){const o=Math.round(n*i),s=Math.round(n*t);return{position:Math.min(o,s),length:Math.abs(s-o)+1}}function x(i){let t=0;return i.map(n=>{const o=t+n;return t=o,o})}class C{constructor(){p(this,"_data",null);p(this,"_options",null)}draw(t,n){t.useBitmapCoordinateSpace(o=>this._drawImpl(o,n))}update(t,n){this._data=t,this._options=n}_drawImpl(t,n){if(this._data===null||this._data.bars.length===0||this._data.visibleRange===null||this._options===null)return;const o=this._options,s=this._data.bars.map(a=>({x:a.x,ys:x(a.originalData.values).map(f=>n(f)??0)}));S(s,this._data.barSpacing,t.horizontalPixelRatio,this._data.visibleRange.from,this._data.visibleRange.to);const u=n(0)??0;for(let a=this._data.visibleRange.from;a<this._data.visibleRange.to;a++){const f=s[a],e=f.column;if(!e)return;let c=u;const d=Math.min(Math.max(t.horizontalPixelRatio,e.right-e.left),this._data.barSpacing*t.horizontalPixelRatio);f.ys.forEach((m,R)=>{const k=o.colors[R%o.colors.length],_=W(c,m,t.verticalPixelRatio);t.context.fillStyle=k,t.context.fillRect(e.left,_.position,d,_.length),c=m})}}}class L{constructor(){p(this,"_renderer");this._renderer=new C}priceValueBuilder(t){return[0,t.values.reduce((n,o)=>n+o,0)]}isWhitespace(t){var n;return!((n=t.values)!=null&&n.length)}renderer(){return this._renderer}update(t,n){this._renderer.update(t,n)}defaultOptions(){return h}}l.StackedBarsSeries=L,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})});
