(function(l,r){typeof exports=="object"&&typeof module<"u"?r(exports,require("lightweight-charts")):typeof define=="function"&&define.amd?define(["exports","lightweight-charts"],r):(l=typeof globalThis<"u"?globalThis:l||self,r(l.Tooltip={},l.LightweightCharts))})(this,function(l,r){"use strict";var O=Object.defineProperty;var z=(l,r,d)=>r in l?O(l,r,{enumerable:!0,configurable:!0,writable:!0,value:d}):l[r]=d;var n=(l,r,d)=>(z(l,typeof r!="symbol"?r+"":r,d),d);const d={title:"",followMode:"tracking",horizontalDeadzoneWidth:45,verticalDeadzoneHeight:100,verticalSpacing:20,topOffset:20};class x{constructor(t,e){n(this,"_chart");n(this,"_element");n(this,"_titleElement");n(this,"_priceElement");n(this,"_dateElement");n(this,"_timeElement");n(this,"_options");n(this,"_lastTooltipWidth",null);this._options={...d,...e},this._chart=t;const o=document.createElement("div");_(o,{display:"flex","flex-direction":"column","align-items":"center",position:"absolute",transform:"translate(calc(0px - 50%), 0px)",opacity:"0",left:"0%",top:"0","z-index":"100","background-color":"white","border-radius":"4px",padding:"5px 10px","font-family":"-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif","font-size":"12px","font-weight":"400","box-shadow":"0px 2px 4px rgba(0, 0, 0, 0.2)","line-height":"16px","pointer-events":"none",color:"#131722"});const s=document.createElement("div");_(s,{"font-size":"16px","line-height":"24px","font-weight":"590"}),p(s,this._options.title),o.appendChild(s);const a=document.createElement("div");_(a,{"font-size":"14px","line-height":"18px","font-weight":"590"}),p(a,""),o.appendChild(a);const h=document.createElement("div");_(h,{color:"#787B86"}),p(h,""),o.appendChild(h);const c=document.createElement("div");_(c,{color:"#787B86"}),p(c,""),o.appendChild(c),this._element=o,this._titleElement=s,this._priceElement=a,this._dateElement=h,this._timeElement=c;const u=this._chart.chartElement();u.appendChild(this._element);const f=u.parentElement;if(!f){console.error("Chart Element is not attached to the page.");return}const m=getComputedStyle(f).position;m!=="relative"&&m!=="absolute"&&console.error("Chart Element position is expected be `relative` or `absolute`.")}destroy(){this._chart&&this._element&&this._chart.chartElement().removeChild(this._element)}applyOptions(t){this._options={...this._options,...t}}options(){return this._options}updateTooltipContent(t){if(!this._element)return;const e=this._element.getBoundingClientRect();this._lastTooltipWidth=e.width,t.title!==void 0&&this._titleElement&&p(this._titleElement,t.title),p(this._priceElement,t.price),p(this._dateElement,t.date),p(this._timeElement,t.time)}updatePosition(t){if(!this._chart||!this._element||(this._element.style.opacity=t.visible?"1":"0",!t.visible))return;const e=this._calculateXPosition(t,this._chart),o=this._calculateYPosition(t);this._element.style.transform=`translate(${e}, ${o})`}_calculateXPosition(t,e){const o=t.paneX+e.priceScale("left").width(),s=this._lastTooltipWidth?Math.ceil(this._lastTooltipWidth/2):this._options.horizontalDeadzoneWidth;return`calc(${Math.min(Math.max(s,o),e.timeScale().width()-s)}px - 50%)`}_calculateYPosition(t){if(this._options.followMode=="top")return`${this._options.topOffset}px`;const e=t.paneY,o=e<=this._options.verticalSpacing+this._options.verticalDeadzoneHeight;return`calc(${e+(o?1:-1)*this._options.verticalSpacing}px${o?"":" - 100%"})`}}function p(i,t){!i||t===i.innerText||(i.innerText=t,i.style.display=t?"block":"none")}function _(i,t){for(const[e,o]of Object.entries(t))i.style.setProperty(e,o)}function b(i){if(r.isUTCTimestamp(i))return i*1e3;if(r.isBusinessDay(i))return new Date(i.year,i.month,i.day).valueOf();const[t,e,o]=i.split("-").map(parseInt);return new Date(t,e,o).valueOf()}function y(i){if(!i)return["",""];const t=new Date(i),e=t.getFullYear(),o=t.toLocaleString("default",{month:"short"}),a=`${t.getDate().toString().padStart(2,"0")} ${o} ${e}`,h=t.getHours().toString().padStart(2,"0"),c=t.getMinutes().toString().padStart(2,"0"),u=`${h}:${c}`;return[a,u]}function E(i){return Math.floor(i*.5)}function w(i,t,e=1,o){const s=Math.round(t*i),a=o?e:Math.round(e*t),h=E(a);return{position:s-h,length:a}}class T{constructor(t){n(this,"_data");this._data=t}draw(t){this._data.visible&&t.useBitmapCoordinateSpace(e=>{const o=e.context,s=w(this._data.x,e.horizontalPixelRatio,1);o.fillStyle=this._data.color,o.fillRect(s.position,this._data.topMargin*e.verticalPixelRatio,s.length,e.bitmapSize.height)})}}class M{constructor(t){n(this,"_data");this._data=t}update(t){this._data=t}renderer(){return new T(this._data)}zOrder(){return"bottom"}}const C={lineColor:"rgba(0, 0, 0, 0.2)",priceExtractor:i=>i.value!==void 0?i.value.toFixed(2):i.close!==void 0?i.close.toFixed(2):""};class P{constructor(t){n(this,"_options");n(this,"_tooltip");n(this,"_paneViews");n(this,"_data",{x:0,visible:!1,color:"rgba(0, 0, 0, 0.2)",topMargin:0});n(this,"_attachedParams");n(this,"_moveHandler",t=>this._onMouseMove(t));this._options={...C,...t},this._paneViews=[new M(this._data)]}attached(t){this._attachedParams=t,this._setCrosshairMode(),t.chart.subscribeCrosshairMove(this._moveHandler),this._createTooltipElement()}detached(){const t=this.chart();t&&t.unsubscribeCrosshairMove(this._moveHandler)}paneViews(){return this._paneViews}updateAllViews(){this._paneViews.forEach(t=>t.update(this._data))}setData(t){var e;this._data=t,this.updateAllViews(),(e=this._attachedParams)==null||e.requestUpdate()}currentColor(){return this._options.lineColor}chart(){var t;return(t=this._attachedParams)==null?void 0:t.chart}series(){var t;return(t=this._attachedParams)==null?void 0:t.series}applyOptions(t){this._options={...this._options,...t},this._tooltip&&this._tooltip.applyOptions({...this._options.tooltip})}_setCrosshairMode(){const t=this.chart();if(!t)throw new Error("Unable to change crosshair mode because the chart instance is undefined");t.applyOptions({crosshair:{mode:r.CrosshairMode.Magnet,vertLine:{visible:!1,labelVisible:!1},horzLine:{visible:!1,labelVisible:!1}}})}_hideTooltip(){this._tooltip&&(this._tooltip.updateTooltipContent({title:"",price:"",date:"",time:""}),this._tooltip.updatePosition({paneX:0,paneY:0,visible:!1}))}_hideCrosshair(){this._hideTooltip(),this.setData({x:0,visible:!1,color:this.currentColor(),topMargin:0})}_onMouseMove(t){var m,v;const e=this.chart(),o=this.series(),s=t.logical;if(!s||!e||!o){this._hideCrosshair();return}const a=t.seriesData.get(o);if(!a){this._hideCrosshair();return}const h=this._options.priceExtractor(a),c=e.timeScale().logicalToCoordinate(s),[u,f]=y(t.time?b(t.time):void 0);if(this._tooltip){const g=this._tooltip.options(),S=g.followMode=="top"?g.topOffset+10:0;this.setData({x:c??0,visible:c!==null,color:this.currentColor(),topMargin:S}),this._tooltip.updateTooltipContent({price:h,date:u,time:f}),this._tooltip.updatePosition({paneX:((m=t.point)==null?void 0:m.x)??0,paneY:((v=t.point)==null?void 0:v.y)??0,visible:!0})}}_createTooltipElement(){const t=this.chart();if(!t)throw new Error("Unable to create Tooltip element. Chart not attached");this._tooltip=new x(t,{...this._options.tooltip})}}l.TooltipPrimitive=P,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})});
