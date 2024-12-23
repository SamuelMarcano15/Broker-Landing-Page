import { useEffect, useState } from "react";
import {ExpiringPriceAlerts} from './lightweight-chart/Plugins/expiring-price-alerts/expiring-price-alerts';
import { ActualIndicator, Direction } from "../../types";

type Props = {
  chart:any,
  chartCandles:any,
  timeframe:{value:string,seconds:number},
  actualIndicator:ActualIndicator,
  chartContainer:any
}
const DrawHorizontalLinePlugin = ({
  chart,
  chartCandles,
  timeframe,
  chartContainer,
  actualIndicator
}:Props) => {
  const [dragging,setDragging] = useState(false)
  const [dragIndex,setDragIndex] = useState(null)

  useEffect(() => {
    console.log("CHART RENDER", chartCandles);
    try {
      if (
        !chart ||
        !chartCandles
          )
        return;
      const line = chart.addLineSeries({
        color: "#d33434",
        lineWidth: 3,
        priceLineVisible: false,
        lineStyle: 0,
        lineType: 0,
        TickMarkType: "none",
        title: ""
      });

      chart.subscribeCrosshairMove((param: any) => {
       
      // console.log('PARAMS', param)
      });

      const priceLine = chartCandles.createPriceLine({
          price: 59225,
          color: 'red',
          lineWidth: 2,
          lineStyle: 2,
          axisLabelVisible: true,
          title: 'Line 1',
        })






       // Click event listener
        const handleClick = (event:any) => {
            console.log('CLIKC')
            const rect = chartContainer.current.getBoundingClientRect();
            const x = event.clientX - rect.left; // Calculate x position relative to the chart
            const y = event.clientY - rect.top;  // Calculate y position relative to the chart

            // Use the chart API to convert to time and value
            const time = chart.timeScale().coordinateToTime(x);

            const price = chart.priceScale().coordinateToPrice(y);

            console.log('Click Position:', { x, y, time, price });
        };

        // Attach click event listener
        chartContainer.current.addEventListener('click', handleClick);


      //line.setData([{ time:timeStart, value: valueActual }, { time:timeEnd, value: valueActual  }]); // Adjust the value as needed
      // Fit the chart to the content
      return () => {
        try {
          if(chart){
            chartContainer.current.removeEventListener('click', handleClick);
            chart.removeSeries(line);
            chartCandles.removeSeries(priceLine)
            console.log('REMOVE SERIES')
          }
        } catch (e) {
          return null;
        }
      };
    } catch (e) {
      return () => {
        null;
      };
    }
  }, [chart, actualIndicator]);

  return null;
};

export default DrawHorizontalLinePlugin;
