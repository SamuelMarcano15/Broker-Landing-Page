(function(c,n){typeof exports=="object"&&typeof module<"u"?n(exports,require("lightweight-charts")):typeof define=="function"&&define.amd?define(["exports","lightweight-charts"],n):(c=typeof globalThis<"u"?globalThis:c||self,n(c.ExpiringPriceAlerts={},c.LightweightCharts))})(this,function(c,n){"use strict";var T=Object.defineProperty;var A=(c,n,l)=>n in c?T(c,n,{enumerable:!0,configurable:!0,writable:!0,value:l}):c[n]=l;var a=(c,n,l)=>(A(c,typeof n!="symbol"?n+"":n,l),l);const l={interval:86400,clearTimeout:3e3};function _(d){if(d===void 0)throw new Error("Value is undefined");return d}class g{constructor(){a(this,"_chart");a(this,"_series");a(this,"_requestUpdate");a(this,"_fireDataUpdated",t=>{this.dataUpdated&&this.dataUpdated(t)})}requestUpdate(){this._requestUpdate&&this._requestUpdate()}attached({chart:t,series:i,requestUpdate:s}){this._chart=t,this._series=i,this._series.subscribeDataChanged(this._fireDataUpdated),this._requestUpdate=s,this.requestUpdate()}detached(){var t;(t=this._series)==null||t.unsubscribeDataChanged(this._fireDataUpdated),this._chart=void 0,this._series=void 0,this._requestUpdate=void 0}get chart(){return _(this._chart)}get series(){return _(this._series)}}const f=new Path2D("M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"),v=new Path2D("M6.28 5.22a.75.75 0 00-1.06 1.06l7.22 7.22H6.75a.75.75 0 000 1.5h7.5a.747.747 0 00.75-.75v-7.5a.75.75 0 00-1.5 0v5.69L6.28 5.22z"),m=new Path2D("M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"),w=new Path2D("M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"),x=20;function S(d){return Math.floor(d*.5)}function D(d,t,i=1,s){const e=Math.round(t*d),r=s?i:Math.round(i*t),h=S(r);return{position:e-h,length:r}}class P{constructor(){a(this,"_data",[])}draw(t){let i=1;t.useBitmapCoordinateSpace(s=>{i=s.verticalPixelRatio}),t.useMediaCoordinateSpace(s=>{const e=s.context;e.lineWidth=2,this._data.forEach(r=>{const h=D(r.priceY,i,e.lineWidth),o=(h.position+h.length/2)/i;e.fillStyle=r.color,e.strokeStyle=r.color,e.lineDashOffset=0,e.globalAlpha=r.fade?.5:1,e.beginPath(),e.moveTo(r.startX+4,o),e.lineTo(r.endX-4,o),e.stroke(),e.beginPath(),e.setLineDash([3,6]),e.lineCap="round",e.moveTo(r.startX-30,o),e.lineTo(s.mediaSize.width,o),e.stroke(),e.setLineDash([]),e.beginPath(),e.arc(r.startX,o,4,0,2*Math.PI),e.arc(r.endX,o,4,0,2*Math.PI),e.fill(),e.font="10px sans-serif";const u=e.measureText(r.text);e.beginPath(),e.roundRect(r.startX-30-20-u.width,o-7,u.width+20,14,4),e.fill(),e.fillStyle="#FFFFFF",e.fillText(r.text,r.startX-30-15-u.width,o+3),e.save(),e.translate(r.startX-30-14,o-6);const p=12/x;e.scale(p,p),e.fill(r.icon,"evenodd"),e.restore()})})}update(t){this._data=t}}class C{constructor(t){a(this,"_source");a(this,"_renderer");this._source=t,this._renderer=new P}renderer(){return this._renderer}update(){var s;const t=[],i=(s=this._source._chart)==null?void 0:s.timeScale();if(i)for(const e of this._source._alerts.values()){const r=this._source._series.priceToCoordinate(e.price);if(r===null)continue;let h=i.timeToCoordinate(e.start),o=i.timeToCoordinate(e.end);if(h===null&&o===null)continue;h||(h=0),o||(o=i.width());let u="#000000",p=f;e.parameters.crossingDirection==="up"?(u=e.crossed?"#386D2E":e.expired?"#30472C":"#64C750",p=e.crossed?m:e.expired?w:f):e.parameters.crossingDirection==="down"&&(u=e.crossed?"#7C1F3E":e.expired?"#4A2D37":"#C83264",p=e.crossed?m:e.expired?w:v),t.push({priceY:r,startX:h,endX:o,icon:p,color:u,text:e.parameters.title,fade:e.expired})}this._renderer.update(t)}}class E extends g{constructor(i){super();a(this,"_source");a(this,"_views");this._source=i,this._views=[new C(this._source)]}requestUpdate(){super.requestUpdate()}updateAllViews(){this._views.forEach(i=>i.update())}paneViews(){return this._views}autoscaleInfo(){let i=1/0,s=-1/0;for(const e of this._source._alerts.values())e.price<i&&(i=e.price),e.price>s&&(s=e.price);return i>s?null:{priceRange:{maxValue:s,minValue:i}}}}function b(d){return d.value!==void 0}class M{constructor(t,i){a(this,"_options");a(this,"_chart",null);a(this,"_series");a(this,"_primitive");a(this,"_whitespaceSeriesStart",null);a(this,"_whitespaceSeriesEnd",null);a(this,"_whitespaceSeries");a(this,"_alerts",new Map);a(this,"_dataChangedHandler");a(this,"_lastValue");this._series=t,this._options={...l,...i},this._primitive=new E(this),this._series.attachPrimitive(this._primitive),this._dataChangedHandler=this._dataChanged.bind(this),this._series.subscribeDataChanged(this._dataChangedHandler);const s=this._series.dataByIndex(1e4,n.MismatchDirection.NearestLeft);s&&this.checkedCrossed(s),this._chart=this._primitive.chart,this._whitespaceSeries=this._chart.addLineSeries()}destroy(){this._series.unsubscribeDataChanged(this._dataChangedHandler),this._series.detachPrimitive(this._primitive)}alerts(){return this._alerts}chart(){return this._chart}series(){return this._series}addExpiringAlert(t,i,s,e){let r=(Math.random()*1e5).toFixed();for(;this._alerts.has(r);)r=(Math.random()*1e5).toFixed();return this._alerts.set(r,{price:t,start:i,end:s,parameters:e,crossed:!1,expired:!1}),this._update(),r}removeExpiringAlert(t){this._alerts.delete(t),this._update()}toggleCrossed(t){const i=this._alerts.get(t);i&&(i.crossed=!0,setTimeout(()=>{this.removeExpiringAlert(t)},this._options.clearTimeout),this._update())}checkExpired(t){for(const[i,s]of this._alerts.entries())s.end<=t&&(s.expired=!0,setTimeout(()=>{this.removeExpiringAlert(i)},this._options.clearTimeout));this._update()}checkedCrossed(t){if(b(t)){if(this._lastValue!==void 0)for(const[i,s]of this._alerts.entries()){let e=!1;s.parameters.crossingDirection==="up"?this._lastValue<=s.price&&t.value>s.price&&(e=!0):s.parameters.crossingDirection==="down"&&this._lastValue>=s.price&&t.value<s.price&&(e=!0),e&&this.toggleCrossed(i)}this._lastValue=t.value}}_update(){var e;let t=1/0,i=0;const s=this._alerts.size>0;for(const[r,h]of this._alerts.entries())h.end>i&&(i=h.end),h.start<t&&(t=h.start);if(s||(t=null,i=null),t){const r=((e=this._series.dataByIndex(1e6,n.MismatchDirection.NearestLeft))==null?void 0:e.time)??t;r<t&&(t=r)}(this._whitespaceSeriesStart!==t||this._whitespaceSeriesEnd!==i)&&(this._whitespaceSeriesStart=t,this._whitespaceSeriesEnd=i,!this._whitespaceSeriesStart||!this._whitespaceSeriesEnd?this._whitespaceSeries.setData([]):this._whitespaceSeries.setData(this._buildWhitespace(this._whitespaceSeriesStart,this._whitespaceSeriesEnd))),this._primitive.requestUpdate()}_buildWhitespace(t,i){const s=[];for(let e=t;e<=i;e+=this._options.interval)s.push({time:e});return s}_dataChanged(){const t=this._series.dataByIndex(1e5,n.MismatchDirection.NearestLeft);t&&(this.checkedCrossed(t),this.checkExpired(t.time))}}c.ExpiringPriceAlerts=M,Object.defineProperty(c,Symbol.toStringTag,{value:"Module"})});
