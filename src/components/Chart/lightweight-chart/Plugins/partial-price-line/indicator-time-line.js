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
    constructor(text) {
      l(this, "_price", null);
      l(this, "_x", null);
      l(this, "_color", "#000000");
      l(this, "_ballColor", "#ffffff"); // Color for the ball
      l(this, "_ballRadius", 2); // Radius for the ball
      l(this, "_text", text); // Store the text passed to the constructor
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
  
          // Draw the rectangle with text
          const rectWidth = 50; // Width of the rectangle
          const rectHeight = 21; // Height of the rectangle
          const rectX = this._x - rectWidth / 2 + 40; // Center the rectangle on the ball
          const rectY = lineY - rectHeight / 2; // Center the rectangle vertically
  
          const borderRadius = 5; // Border radius
  
          // Draw rounded rectangle
          n.beginPath();
          n.moveTo(rectX + borderRadius, rectY); // Move to the top-left corner
          n.lineTo(rectX + rectWidth - borderRadius, rectY); // Top edge
          n.quadraticCurveTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + borderRadius); // Top-right corner
          n.lineTo(rectX + rectWidth, rectY + rectHeight - borderRadius); // Right edge
          n.quadraticCurveTo(rectX + rectWidth, rectY + rectHeight, rectX + rectWidth - borderRadius, rectY + rectHeight); // Bottom-right corner
          n.lineTo(rectX + borderRadius, rectY + rectHeight); // Bottom edge
          n.quadraticCurveTo(rectX, rectY + rectHeight, rectX, rectY + rectHeight - borderRadius); // Bottom-left corner
          n.lineTo(rectX, rectY + borderRadius); // Left edge
          n.quadraticCurveTo(rectX, rectY, rectX + borderRadius, rectY); // Top-left corner
          n.closePath();
          n.fillStyle = "#293041"; // Rectangle color
          n.fill(); // Fill the rectangle
  
          // Draw text inside the rectangle
          n.fillStyle = "#ffffff"; // Text color
          n.font = "10px Roboto"; // Font style
          n.textAlign = "center"; // Center the text
          n.textBaseline = "middle"; // Middle the text vertically
          n.fillText(this._text, this._x + 40, lineY + 1); // Draw the custom text instead of price
      });
    }
  }
  
  class f {
    constructor(text) {
      l(this, "_renderer");
      this._renderer = new d(text); // Pass the text to the d class
    }
    renderer() {
      return this._renderer;
    }
    update(i, e, r) {
      this._renderer.update(i, e, r);
    }
  }
  
  class w {
    constructor(text) {
      l(this, "_paneViews");
      l(this, "_chart", null);
      l(this, "_series", null);
      this._paneViews = [new f(text)]; // Pass the text to the f class
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
    w as IndicatorTimeLine
  };