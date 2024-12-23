import {useEffect, useState} from "react"
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { StateChart, Timeframe } from "../../types";
import CandlestickChartIcon from "../icons/CandlestickChartIcon";
import BarChartIcon from "../icons/BarChartIcon";
import AreaChartIcon from "../icons/AreaChartIcon";

type Props = {
    changeTimeFrame: (...arg:any)=>void
    chartType:string
    changeChartType:(typeChart:string) => void
}
const OptionChart = ({changeTimeFrame, chartType, changeChartType}:Props) =>{
    const [currentTime,setCurrentTime] = useState(localStorage.getItem("timeframe") ? JSON.parse(localStorage.getItem("timeframe") || '{}') : {
        value:'1m',
        seconds:60
    })
    const changeTime = (time:Timeframe) =>{
        localStorage.setItem("timeframe",JSON.stringify(time))
        setCurrentTime(time)
        changeTimeFrame(time)
    }
    const [optionTime] = useState([{
        label:"1m",
        value:'1m',
        seconds:60
    },
    {
        label:"3m",
        value:'3m',
        seconds:180
    },
    {
        label:"5m",
        value:'5m',
        seconds:300
    },
    {
        label:"15m",
        value:'15m',
        seconds:900
    },
    {
        label:"30m",
        value:'30m',
        seconds:1800
    },
    {
        label:"1h",
        value:'1h',
        seconds:3600
    },
    {
        label:"2h",
        value:'2h',
        seconds:7200
    },
    {
        label:"4h",
        value:'4h',
        seconds:14400
    },
    {
        label:"6h",
        value:'6h',
        seconds:21600
    },
    {
        label:"8h",
        value:'8h',
        seconds:28800
    },
    {
        label:"12h",
        value:'12h',
        seconds:43200
    },
    {
        label:"24h",
        value:"24h",
        seconds:86400
    }])

    const [chartTypeAvalaibles] = useState([
        {
            id:'area',
            name:'Area',
            icon:<AreaChartIcon/>
        },
        {
        id:'candle',
        name:'Velas',
        icon:<CandlestickChartIcon/>
    },
    {
        id:'bar',
        name:'Barras',
        icon:<BarChartIcon/>
    }])


    return(
        <div className='options-chart position-absolute'>
              <div className='options d-flex flex-column-reverse gap-1'>
                  <div className='option-timeframe btn-group dropend'>
                    <button className="button-chart" type="button" data-bs-toggle="dropdown" aria-expanded="false">{currentTime ? Object.values(optionTime).find((el)=>{return el.value === currentTime.value})?.label : ''}</button>
                    <div className="dropdown-menu dropdown-timeframe" aria-labelledby="dropdownMenuClickableInside" style={{width: '206px'}}>
                        <div className="d-flex flex-wrap container-timers">
                            {
                                optionTime.map((el,i)=>{
                                    return(
                                        <button type="button" className={currentTime.value === el.value ? 'selected' : ''} onClick={()=>{
                                            changeTime({value:el.value, seconds:el.seconds})
                                        }} key={i}>{el.label}</button>
                                    )
                                })
                            }

                        </div>
                    </div>
                  </div>

                  <div className="option-timeframe btn-group dropend">
                    <button className="button-chart" style={{width:'38px'}} type="button" data-bs-toggle="dropdown" aria-expanded="false">{chartTypeAvalaibles.filter((el:any)=>el.id === chartType)[0].icon}</button>
                    <div className="dropdown-menu dropdown-charts" aria-labelledby="dropdownMenuClickableInside" style={{width: '206px'}}>
                        <div className="d-flex flex-column container-timers container-chart p-2 gap-2">
                            {
                                chartTypeAvalaibles.map((el,i)=>{
                                    return(
                                        <button type="button" className={chartType === el.id ? 'active-chart' : ''} onClick={()=>{changeChartType(el.id)
                                        }} key={i}>{el.icon}<span>{el.name}</span></button>
                                    )
                                })
                            }

                        </div>
                    </div>
                  </div>
              </div>
          </div>
    )
}

const mapStateToProps = (state:StateChart) => ({
    timeframe: state.timeframe,
    chartType: state.chartType
    
  });
  
  const mapDispatchToProps = (dispatch:Dispatch) => ({
    changeTimeFrame(timeframe:any) {
      dispatch({
        type: "CHANGE_TIMEFRAME",
        timeframe,
      });
    },

    changeChartType(chartType:string) {
        dispatch({
          type: "CHANGE_TYPE_CHART",
          chartType,
        });
      }
  
  });

export default connect(mapStateToProps, mapDispatchToProps)(OptionChart);