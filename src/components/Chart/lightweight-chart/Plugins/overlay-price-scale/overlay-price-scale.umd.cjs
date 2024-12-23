(function(i,s){typeof exports=="object"&&typeof module<"u"?s(exports):typeof define=="function"&&define.amd?define(["exports"],s):(i=typeof globalThis<"u"?globalThis:i||self,s(i.OverlayPriceScale={}))})(this,function(i){"use strict";var y=Object.defineProperty;var w=(i,s,c)=>s in i?y(i,s,{enumerable:!0,configurable:!0,writable:!0,value:c}):i[s]=c;var r=(i,s,c)=>(w(i,typeof s!="symbol"?s+"":s,c),c);class S{constructor(){r(this,"_data",null)}update(t){this._data=t}draw(t){t.useMediaCoordinateSpace(n=>{if(!this._data)return;const o=this._calculatePriceScale(n.mediaSize.height,this._data),l=o.reduce((p,u)=>Math.max(p,u.label.length),0),a="".padEnd(l,"0"),e=n.context,d=this._data.options.side==="left";e.font="12px -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif",e.textAlign="center",e.textBaseline="top";const h=e.measureText(a).width,g=d?10:n.mediaSize.width-10-h,x=g+3+Math.round(h/2);o.forEach(p=>{e.beginPath();const u=p.y-12/2;e.roundRect(g,u,h+3*2,12+2*2,4),e.fillStyle=this._data.options.backgroundColor,e.fill(),e.beginPath(),e.fillStyle=this._data.options.textColor,e.fillText(p.label,x,u+2,h)})})}_calculatePriceScale(t,n){const o=[],l=Math.round(10);let a=l;for(;a<=t-l;)o.push(a),a+=40;return o.map(d=>{const _=n.coordinateToPrice(d);return _===null?null:{label:n.priceFormatter.format(_),y:d}}).filter(d=>!!d)}}class b{constructor(){r(this,"_renderer");this._renderer=new S}renderer(){return this._renderer}update(t){this._renderer.update(t)}}const P={textColor:"rgb(0, 0, 0)",backgroundColor:"rgba(255, 255, 255, 0.6)",side:"left"};class m{constructor(t){r(this,"_paneViews");r(this,"_chart",null);r(this,"_series",null);r(this,"_requestUpdate");r(this,"_options");this._options={...P,...t},this._paneViews=[new b]}applyOptions(t){this._options={...this._options,...t},this._requestUpdate&&this._requestUpdate()}attached({chart:t,series:n,requestUpdate:o}){this._chart=t,this._series=n,this._requestUpdate=o}detached(){this._chart=null,this._series=null}updateAllViews(){if(!this._series||!this._chart)return;const t=e=>this._series.coordinateToPrice(e),n=e=>this._series.priceToCoordinate(e),o=this._series.priceFormatter(),l=this._options,a={coordinateToPrice:t,priceToCoordinate:n,priceFormatter:o,options:l};this._paneViews.forEach(e=>e.update(a))}paneViews(){return this._paneViews}}i.OverlayPriceScale=m,Object.defineProperty(i,Symbol.toStringTag,{value:"Module"})});
