(function(e,a){typeof exports=="object"&&typeof module<"u"?a(exports,require("lightweight-charts")):typeof define=="function"&&define.amd?define(["exports","lightweight-charts"],a):(e=typeof globalThis<"u"?globalThis:e||self,a(e.HighlightBarCrosshair={},e.LightweightCharts))})(this,function(e,a){"use strict";var f=Object.defineProperty;var b=(e,a,o)=>a in e?f(e,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[a]=o;var r=(e,a,o)=>(b(e,typeof a!="symbol"?a+"":a,o),o);function o(h){return Math.floor(h*.5)}function l(h,t,i=1,s){const n=Math.round(t*h),c=s?i:Math.round(i*t),_=o(c);return{position:n-_,length:c}}class d{constructor(t){r(this,"_data");this._data=t}draw(t){this._data.visible&&t.useBitmapCoordinateSpace(i=>{const s=i.context,n=l(this._data.x,i.horizontalPixelRatio,Math.max(1,this._data.barSpacing));s.fillStyle=this._data.color,s.fillRect(n.position,0,n.length,i.bitmapSize.height)})}}class u{constructor(t){r(this,"_data");this._data=t}update(t){this._data=t}renderer(){return new d(this._data)}zOrder(){return"bottom"}}const g={color:"rgba(0, 0, 0, 0.2)"};class p{constructor(t){r(this,"_options");r(this,"_paneViews");r(this,"_data",{x:0,visible:!1,color:"rgba(0, 0, 0, 0.2)",barSpacing:6});r(this,"_attachedParams");r(this,"_moveHandler",t=>this._onMouseMove(t));this._options={...g,...t},this._paneViews=[new u(this._data)]}attached(t){this._attachedParams=t,this._setCrosshairMode(),t.chart.subscribeCrosshairMove(this._moveHandler)}detached(){const t=this.chart();t&&t.unsubscribeCrosshairMove(this._moveHandler)}paneViews(){return this._paneViews}updateAllViews(){this._paneViews.forEach(t=>t.update(this._data))}setData(t){var i;this._data=t,this.updateAllViews(),(i=this._attachedParams)==null||i.requestUpdate()}currentColor(){return this._options.color}chart(){var t;return(t=this._attachedParams)==null?void 0:t.chart}_setCrosshairMode(){const t=this.chart();if(!t)throw new Error("Unable to change crosshair mode because the chart instance is undefined");t.applyOptions({crosshair:{mode:a.CrosshairMode.Normal,vertLine:{visible:!1}}})}_barSpacing(){const t=this.chart();if(!t)return 6;const i=t.timeScale(),s=i.getVisibleLogicalRange();return s?i.width()/(s.to-s.from):6}_onMouseMove(t){const i=this.chart(),s=t.logical;if(!s||!i){this.setData({x:0,visible:!1,color:this.currentColor(),barSpacing:this._barSpacing()});return}const n=i.timeScale().logicalToCoordinate(s);this.setData({x:n??0,visible:n!==null,color:this.currentColor(),barSpacing:this._barSpacing()})}}e.CrosshairHighlightPrimitive=p,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})});
