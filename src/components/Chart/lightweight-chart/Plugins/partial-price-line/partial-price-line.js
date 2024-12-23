var c = Object.defineProperty;
var h = (t, i, e) => i in t ? c(t, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[i] = e;
var l = (t, i, e) => (h(t, typeof i != "symbol" ? i + "" : i, e), e);
import { MismatchDirection as u } from "lightweight-charts";
function _(t) {
  return Math.floor(t * 0.5);
}
function p(t, i, e = 1, r) {
  const s = Math.round(i * t), o = r ? e : Math.round(e * i), n = _(o);
  return { position: s - n, length: o };
}
class d {
  constructor() {
    l(this, "_price", null);
    l(this, "_x", null);
    l(this, "_color", "#000000");
    l(this, "_ballColor", "#ffffff"); // Color for the ball
    l(this, "_ballRadius", 2); // Radius for the ball
  }
  
  update(i, e, r) {
    this._price = i;
    this._color = e;
    this._x = r;
  }
  
  draw(i) {
    i.useBitmapCoordinateSpace((e) => {
      if (this._price === null) return; // No price set, nothing to draw

      const o = p(this._price, e.verticalPixelRatio, e.verticalPixelRatio);
      const lineY = o.position + o.length / 2; // Calculate the Y position of the line
      const n = e.context;

      // Draw the left dotted line
      n.beginPath();
      n.setLineDash([4 * e.verticalPixelRatio, 2 * e.verticalPixelRatio]); // Set the dashed line style
      n.moveTo(0, lineY); // Start from the left edge
      n.lineTo(this._x, lineY); // Draw to the price level x-coordinate
      n.strokeStyle = "#ffffff52"; // Set the color
      n.lineWidth = e.verticalPixelRatio; // Set the line width
      n.stroke();

      // Draw the right solid line
      n.beginPath();
      n.setLineDash([]); // Clear the dashed line style for solid line
      n.moveTo(this._x, lineY); // Start from the price level x-coordinate
      n.lineTo(e.bitmapSize.width, lineY); // Draw to the right edge
      n.strokeStyle = this._color; // Set the color
      n.lineWidth = e.verticalPixelRatio; // Set the line width
      n.stroke();

      // Draw the pulsing ball (circle) between the left and right lines
      n.beginPath();
      n.arc(this._x, lineY, this._ballRadius, 0, Math.PI * 2); // Draw a circle
      n.fillStyle = this._ballColor; // Set the ball color
      n.fill(); // Fill the circle
      n.strokeStyle = this._color; // Optional: outline the ball with the same color
      n.lineWidth = e.verticalPixelRatio; // Set the line width for the outline
      n.stroke(); // Draw the outline
    });
  }
}
class f {
  constructor() {
    l(this, "_renderer");
    this._renderer = new d();
  }
  renderer() {
    return this._renderer;
  }
  update(i, e, r) {
    this._renderer.update(i, e, r);
  }
}
class w {
  constructor() {
    l(this, "_paneViews");
    l(this, "_chart", null);
    l(this, "_series", null);
    this._paneViews = [new f()];
  }
  attached({ chart: i, series: e }) {
    this._chart = i, this._series = e, this._series.applyOptions({
      priceLineVisible: !1
    });
  }
  detached() {
    this._chart = null, this._series = null;
  }
  updateAllViews() {
    if (!this._series || !this._chart)
      return;
    const i = this._series.options();
    let e = i.priceLineColor || i.color || "#000000";
    const r = this._series.dataByIndex(
      1e5,
      u.NearestLeft
    );
    let s = null, o = null;
    r && (r.color !== void 0 && (e = r.color), s = P(r), o = this._chart.timeScale().timeToCoordinate(r.time));
    const n = s !== null ? this._series.priceToCoordinate(s) : null;
    this._paneViews.forEach((a) => a.update(n, e, o));
  }
  paneViews() {
    return this._paneViews;
  }
}
function P(t) {
  return t.value !== void 0 ? t.value : t.close !== void 0 ? t.close : null;
}
export {
  w as PartialPriceLine
};
