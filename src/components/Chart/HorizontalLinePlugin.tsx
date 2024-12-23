import { useEffect } from "react";
import {ExpiringPriceAlerts} from './lightweight-chart/Plugins/expiring-price-alerts/expiring-price-alerts';
import { ActualIndicator, Direction } from "../../types";

type Props = {
  chart:any,
  chartCandles:any,
  timeStart:number,
  timeEnd:number,
  timeframe:{value:string,seconds:number},
  valueActual:any,
  direction:Direction,
  amount:string,
  actualIndicator:ActualIndicator
}
const HorizontalLinePlugin = ({
  chart,
  chartCandles,
  timeStart,
  timeframe,
  timeEnd,
  valueActual,
  direction,
  amount,
  actualIndicator
}:Props) => {
  useEffect(() => {
    console.log("CHART RENDER", chartCandles);
    try {
      if (
        !chart ||
        !chartCandles ||
        !timeStart ||
        !timeEnd ||
        !valueActual ||
        !direction
      )
        return;
      const line = chart.addLineSeries({
        color: direction === "up" ? "#2c933d" : "#d33434",
        lineWidth: 3,
        priceLineVisible: false,
        lineStyle: 0,
        lineType: 0,
        TickMarkType: "none",
        title: ""
      });

        //format the time start from the line
        let initialTimeStart = 0

        if((timeStart as any) % timeframe.seconds === 0){
            initialTimeStart = Math.round(timeStart)
        }else{
            initialTimeStart = Math.round(timeStart - ((timeStart as any) % timeframe.seconds))
        }

        
      const timeRest = timeEnd - timeStart;
      for (let i = 0; i < timeRest; i++) {
         console.log(i);
         console.log('value', valueActual)
        if ((i % timeframe.seconds) === 0) {
          line.update({ time: Math.round(initialTimeStart + i), value: parseFloat(valueActual) });
        }
      }

    
      let time_space = 0
      //Set the time space on the end alert
      if((timeEnd as any) % timeframe.seconds === 0){
          time_space = Math.round(Number(timeEnd))
      }else{
          time_space = Number(timeEnd) - ((timeEnd as any) % timeframe.seconds)
      }

      const expiringAlert = new ExpiringPriceAlerts(line, {interval:1})
      if((timeStart + time_space) % timeframe.seconds !== 0){
        time_space = timeStart // if timeSpace i'ts not equal to the timeframe seconds
      }
      expiringAlert.addExpiringAlert(valueActual, Math.round(initialTimeStart),  Math.round(initialTimeStart),{crossingDirection:direction, title:`$${amount}`})

      //line.setData([{ time:timeStart, value: valueActual }, { time:timeEnd, value: valueActual  }]); // Adjust the value as needed
      // Fit the chart to the content
      return () => {
        try {
          if(chart){
            chart.removeSeries(line);
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
  }, [chart, timeStart, timeEnd, valueActual, direction, amount, actualIndicator]);

  return null;
};

export default HorizontalLinePlugin;
