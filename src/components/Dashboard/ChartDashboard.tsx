import { useEffect, useRef, useState } from "react";
// @ts-ignore
import {LastPriceAnimationMode,createChart} from "../Chart/lightweight-chart/lightweight-charts.standalone.development.mjs";
import OptionChart from "./OptionChart";
import { connect } from "react-redux";
import { VertLine } from "../Chart/lightweight-chart/Plugins/vertical-line/vertical-line";
import formatSeconds from "../../utils/formatTimeChart";

import { toast } from "react-toastify";
import {
  ActualIndicator,
  Asset,
  balanceUser,
  Marker,
  StateChart,
  Trade,
  TradeHistory,
} from "../../types";
import { Dispatch } from "redux";
import { PartialPriceLine } from "../Chart/lightweight-chart/Plugins/partial-price-line/partial-price-line";
import { IndicatorTimeLine } from "../Chart/lightweight-chart/Plugins/partial-price-line/indicator-time-line";
import { ExpiringPriceAlerts } from "../Chart/lightweight-chart/Plugins/expiring-price-alerts/expiring-price-alerts";
import HorizontalLinePlugin from "../Chart/HorizontalLinePlugin";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";


interface Props extends StateChart {
  updateBalance: (balance: string) => void;
  updateStatus:(balance_type:number,demo:string,real:string)=>void
  setMarkers: (...arg: any) => void;
  balance_demo: string;
  userId: string;
  setAvailableAsset: (avalaible: boolean) => void;
  addHistotyClient: (...arg: any) => void;
  avalaible_current_asset: boolean;
  assetSelected: Asset;
  balance_user:balanceUser
}

interface candles {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  time: number;
}

const ChartDashboard = ({
  timeframe,
  assets,
  markersUsers,
  setCandleActual,
  actualIndicator,
  deleteMark,
  timer,
  addHistotyTrade,
  updateBalance,
  updateStatus,
  balance_demo,
  addHistotyClient,
  setMarkers,
  userId,
  setAvailableAsset,
  avalaible_current_asset,
  assetSelected,
  chartType,
  balance_user
}: Props) => {
  const [loadPrevious, setLoadPrevious] = useState(false);
  const [loadChart, setLoadChart] = useState(false);
  const [inRequest, setInRequest] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chart = useRef<any>(null);
  const chartWhitepace = useRef<any>(null);
  const candlestickSeries = useRef<any>(null);
  const vertLineFirst = useRef<VertLine | null>(null);
  const vertLineLast = useRef<VertLine | null>(null);
  const indicatorTime = useRef<IndicatorTimeLine | null>(null);
  const previousIndicator = useRef<ActualIndicator | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [whiteSpaceTime, setWhiteSpaceTime] = useState(false);
  const [loadMarks, setLoadMarks] = useState(false);
  const [previousCandles, setPreviousCandles] = useState<candles[]>([]);
  const [previousCandlesInfo, setPreviousCandlesInfo] = useState<candles[]>([]);
  const candlesRef = useRef(previousCandlesInfo);
  const [timerCandle, setTimerCandle] = useState({
    duration: 0,
    start: 0,
    close: 0,
  });
  const [countSeconds, setCountSeconds] = useState(0);
  const [showNotAvalaible, setShowNotAvalaible] = useState(false);
  const socketRef = useRef<any>(null); // Use a ref to keep the socket instance
  const [wsConnected, setWsConnected] = useState(false);
 
  const wsRef = useRef<WebSocket | null>(null); // Ref to hold the WebSocket instance


  // Listen when change actualIndicator and markers

  useEffect(() => {
 
    socketRef.current = new WebSocket(`ws://${location.hostname}:8000/ws/operation?user_id=${userId}`);
    socketRef.current.onopen = () => {
      console.log('WebSocket OPERATIONS connection established');
    };
  
    socketRef.current.onmessage = (event:any) => {
      const dataOperation = JSON.parse(event.data)
      console.log('DATA', dataOperation)
      const data_trade = {
        amount: dataOperation.message.trade.amount,
        asset_id: dataOperation.message.trade.asset_id,
        asset: {
          name: dataOperation.message.trade.asset.name,
          type: dataOperation.message.trade.asset.type,
        },
        user_data:{
          balance_demo:dataOperation.message.user_data.balance_demo,
          balance_real:dataOperation.message.user_data.balance_real
        },
        time_start: dataOperation.message.trade.time_start,
        direction: dataOperation.message.trade.direction,
        close: dataOperation.message.close,
        time_end: dataOperation.message.trade.time_end,
        created_at: dataOperation.message.trade.created_at,
        closed_at: dataOperation.message.closed_at,
        operation_id: dataOperation.message.operation_id,
        income: dataOperation.message.income,
        winner: dataOperation.message.winner,
        entry:dataOperation.message.trade.entry,
        final_balance:dataOperation.message.final_balance
      };
      
      showNotificationOperation(data_trade,true)


    };
  
    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
      if(socketRef.current.readyState === 1){
        socketRef.current.close();
      }
    };
  
    return () => {
      if(socketRef.current.readyState === 1){
        socketRef.current.close();
    }

    if (socketRef.current) {
      socketRef.current.onmessage = null; // Remove the onmessage listener
      socketRef.current.onerror = null;    // Remove the onerror listener
      socketRef.current.onclose = null;     // Remove the onclose listener
      socketRef.current = null;             // Reset the WebSocket reference
    }
    };
  }, []);

  const checkTradeOperation = (operation_id:string) => {
      if(socketRef.current.readyState === 1){
      socketRef.current.send(JSON.stringify({operation_id, user_id:userId }));
    }
  };

  const showNotificationOperation = (data_trade:any, inSocket:boolean) =>{
    if (data_trade.close > data_trade.entry && data_trade.direction == "up") {
       addHistotyClient({
        ...data_trade,
        winner: true,
        entry: data_trade.entry,
        income: inSocket ? data_trade.income : (parseFloat(data_trade.amount) * 1.8).toFixed(2),
      });
    
      if(inSocket){
        updateStatus(balance_user.balance_type, data_trade.user_data.balance_demo, data_trade.user_data.balance_real)
      }
      toast.success(`${data_trade.asset.name.toUpperCase()} - $${data_trade.income}`,{ className: "notification-winner-operation",
        bodyClassName: "notification-winner-body-operation",
        hideProgressBar:true,
        autoClose:5000,
        });
      return
    }

    if (data_trade.close < data_trade.entry && data_trade.direction == "down") {
      addHistotyClient({
        ...data_trade,
        winner: true,
        entry: data_trade.entry,
        income: inSocket ? data_trade.income : (parseFloat(data_trade.amount) * 1.8).toFixed(2),
      });
      
      if(inSocket){
        updateStatus(balance_user.balance_type, data_trade.user_data.balance_demo,  data_trade.user_data.balance_real)
      }

      toast.success(`${data_trade.asset.name.toUpperCase()} - $${data_trade.income}`, {  className: "notification-winner-operation",
        bodyClassName: "notification-winner-body-operation",
        hideProgressBar:true,
        autoClose:5000,
        });
      return
    }

   addHistotyClient({
      ...data_trade,
      winner: false,
      entry: data_trade.entry,
      income: "0",
    });
    console.log('DATAUPDATED', data_trade)
    updateStatus(balance_user.balance_type, data_trade.user_data.balance_demo,  data_trade.user_data.balance_real)

    toast.error(`${data_trade.asset.name.toUpperCase()} - $0`, {  className: "notification-error-operation",
      bodyClassName: "notification-error-body-operation",
      hideProgressBar:true,
      autoClose:5000,
      });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (markersUsers.length > 0) {
        // Check if the actual is winner or loose in base to timestamp
        markersUsers.forEach((el: Marker) => {
          const data_trade = {
            amount: el.amount,
            asset_id: el.asset_id,
            asset: {
              name: el.asset.name,
              type: el.asset.type,
            },
            operation_id: el.operation_id,
            time_start: el.time_start,
            direction: el.direction,
            time_end: el.time_end,
            income: "0",
            entry: el.entry
          };

          if (assetSelected.id != data_trade.asset_id && new Date().getTime() >= data_trade.time_end + 800) {
            deleteMark(el.operation_id);
            return checkTradeOperation(data_trade.operation_id);
          }
          if (
            assetSelected.id  == data_trade.asset_id &&
            new Date().getTime() >= data_trade.time_end + 800
          ) {
            deleteMark(el.operation_id);
            return checkTradeOperation(data_trade.operation_id);
          }
        });
      }
    }, 1000); // Run every 1000 milliseconds (1 second)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [markersUsers, assetSelected]);


  return(
    <div className="w-100 position-relative bg-container-chart"
    style={{ position: "relative", width: "100%", height: "100%" }}>
      <div className="container-chart-user" style={{ position: "relative"}}>

      <AdvancedRealTimeChart  theme="dark" timezone="Etc/UTC" autosize symbol={assetSelected.active_id}  
                allow_symbol_change={false} />
      </div>
      
    </div>
  )
};

interface StateElements extends StateChart {
  markers: Marker[];
  balance_demo: "";
  userId: "";
  avalaible_current_asset: boolean;
  balance_user:balanceUser
}
const mapStateToProps = (state: StateElements) => ({
  timeframe: state.timeframe,
  assets: state.assets,
  timer: state.timer,
  markersUsers: state.markers,
  actualIndicator: state.actualIndicator,
  balance_demo: state.balance_demo,
  userId: state.userId,
  avalaible_current_asset: state.avalaible_current_asset,
  assetSelected: state.assetSelected,
  chartType: state.chartType,
  balance_user: state.balance_user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCandleActual(mark: Marker) {
    dispatch({
      type: "SET_CANDLE",
      mark,
    });
  },

  addHistotyTrade(history: TradeHistory) {
    dispatch({
      type: "ADD_HISTORY_TRADES",
      history,
    });
  },

  addHistotyClient(history: TradeHistory) {
    dispatch({
      type: "ADD_HISTORY_TRADES_CLIENT",
      history,
    });
  },

  deleteMark(id: string) {
    dispatch({
      type: "DELETE_MARK",
      id,
    });
  },

  updateBalance(balance: string) {
    dispatch({
      type: "UPDATE_BALANCE_DEMO",
      balance,
    });
  },

  setAvailableAsset(avalaible: boolean) {
    dispatch({
      type: "STATUS_CURRENT_ASSET",
      avalaible,
    });
  },

  setMarkers(markers_request: []) {
    dispatch({
      type: "SET_MARKS",
      markers_request,
    });
  },

  updateStatus(balance_type:number,demo:string,real:string){
    dispatch({
      type:'UPDATE_STATUS_USER',
      balance_type,
      demo,
      real
    })
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChartDashboard);
