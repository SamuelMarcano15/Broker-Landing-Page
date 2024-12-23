import ArrowUpIcon from "../icons/ArrowUpIcon";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import TimePickerChart from "./TimePickerChart";
import { ActualIndicator, Asset, Marker, StateChart, Trade } from "../../types";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
type Props = {
  actualIndicator: ActualIndicator;
  addMark: (mark: any) => void;
  timer: string;
  assets: Asset[];
  navigatorId: string;
  balance_demo: string;
  timeframe: {
    value:string,
    seconds:number
  };
  updateStatus:(balance_type:number,demo:string,real:string)=>void
  avalaible_current_asset: boolean;
  userId:string;
  assetSelected:Asset
};
const SidebarDashboard = ({
  actualIndicator,
  addMark,
  timer,
  assets,
  navigatorId,
  balance_demo,
  timeframe,
  avalaible_current_asset,
  updateStatus,
  userId,
  assetSelected
}: Props) => {
  const [amount, setAmount] = useState(1);
  const [feeling,setFeeling]= useState({buy:0,sell:0})
  const numberPattern = /^(\d+|\d+\.\d{1,2})$/; // Matches whole numbers or decimals up to two decimal places

  const addTrade = async (trade: any) => {
    if (isNaN(trade.amount)) {
      return toast.error("Ingrese un monto valido");
    }
    /*
    if (!avalaible_current_asset || trade.timestamp === 0) {
      return toast.error("El activo no esta disponible para operar");
    }

    if(new Date((trade.timestamp + Number(timer) + Number(timeframe)) * 1000).getTime() < new Date().getTime()){
      return toast.error("No se ha podido realizar la operacion")
    }*/

    const sendData: Trade = {
      entry: "0",
      asset_id: assetSelected.id,
      time_start: 0,
      time_end: 0,
      timer: Number(timer),
      direction: trade.direction,
      amount: String(trade.amount),
      id: "",
      timestamp: 0,
      user_id: userId,
    };
    try {
      const res = await fetch("/api/operation/add/trade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${Cookies.get('token')}`
        },
        body: JSON.stringify(sendData),
      });

      if (!res.ok) {
        if(res.status == 400){
          const data = await res.json()
          toast.error(data.message)
          return
        }
        return alert("No se pudo completar la operacion");
      }

      const response = await res.json();
      // code to addMark
      toast.warning(`Operacion abierta - ${assetSelected.name} - ${trade.direction === "up" ? "Arriba" : "Abajo"} - $${trade.amount} `)
      addMark({ ...trade,
        operation_id:response.trade.operation_id, 
        time_start: response.trade.time_start, //Send actual time
        id: response.trade.operation_id, 
        entry:response.trade.entry, 
        time_end:response.trade.time_end, //Send actual time with sum timer
        created_at:response.trade.created_at,
        asset:{
        name:assetSelected.name,
        type:assetSelected.type
      },});

      updateStatus(response.user_data.account_mode,response.user_data.balance_demo,response.user_data.balance_real)

      console.log("ADD_TRADE", response);
    } catch (e) {
      toast.error("No se pudo completar la operacion")
      return console.log(e);
    }
  };

  useEffect(()=>{
    const calculateBuySellSentiment = (kline:any) => {
      // Extract relevant data from the Kline object
      const totalVolume = parseFloat(kline.volume); // Total base asset volume
      const takerBuyVolume = parseFloat(kline.buy_volume); // Taker buy base asset volume
  
      // Calculate buy and sell volumes
      const takerSellVolume = totalVolume - takerBuyVolume;
  
      // Calculate buy and sell percentages
      const buyPercentage = (takerBuyVolume / totalVolume) * 100;
      const sellPercentage = (takerSellVolume / totalVolume) * 100;
  
      return {
          buyPercentage: buyPercentage.toFixed(2), // Return buy percentage
          sellPercentage: sellPercentage.toFixed(2) // Return sell percentage
      };
  }
    const {buyPercentage,sellPercentage} = calculateBuySellSentiment(actualIndicator)
    setFeeling({
      buy:Math.round(Number(buyPercentage)),
      sell:Math.round(Number(sellPercentage))
    })
  },[actualIndicator])

  return (
    <div className="sidebar-trading">
      <div className="deal-field d-flex align-items-end align-items-lg-center justify-content-lg-center mb-lg-2">
      { assets.map((elm: Asset) => {
            if (elm.active_id === assetSelected.active_id && elm.type === assetSelected.type) {
                return(<p key={elm.id} className="text-white text-center" style={{ fontSize: "13px" }}>
                  <span style={{fontWeight:'600', textTransform:'uppercase'}}>{elm.name}</span> <span>{ elm.profit >= 1 ? `${ 100 * (elm.profit - 1.0) }%` : '0%' }</span>
                </p>)      
            }})
        }
      </div>
      <div className="d-flex flex-row flex-lg-column justify-content-center gap-3 trade-field">
        <div className="amount-field" style={{flex:'1'}}>
          <label className="label-sidebar">Monto</label>
          <div className="field">
            <span>$</span>

            <input
              type="number"
              min={1}
              maxLength={3}
              value={amount}
              onKeyDown={(evt) =>
                ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()
              }
              onChange={(e) => {
                const value = e.target.value;

                // Validate the input
                if (value === "") {
                  setAmount(1); // Set to 1 if input is empty
                } else {
                  const value = e.target.value;
                  // Validate the input against the regex pattern
                  if (numberPattern.test(value) || value === '') {
                    setAmount(parseFloat(value));
                  }
                }
              }}
            />
          </div>
        </div>
        <TimePickerChart />
      </div>

      <div className="d-flex mt-2 estimated-field justify-content-end justify-content-center">
        <p
          className="text-white text-center w-100 flex-wrap m-0 m-lg-auto d-flex gap-0 justify-content-end justify-content-lg-center flex-lg-column"
          style={{ fontSize: "13px" }}
        >
         {assetSelected.profit ?  <><span style={{fontWeight:'600'}}>Ganancias estimadas: </span>  <span>1.{100 * (assetSelected.profit - 1.0) }$</span></> : ''}
        </p>
      </div>
      <div className="d-flex flex-row gap-2 flex-lg-column justify-content-center container-buttons mt-lg-2">
        <button
          className="button-trade button-up flex-grow-1 flex-lg-grow-0"
          onClick={() => {
            addTrade({
              ...actualIndicator,
              direction: "up",
              amount: String(amount),
              type_name: assetSelected.type,
            });
          }}
        >
          Arriba <ArrowUpIcon style={{ width: "20px", height: "20px" }} />
        </button>
        <button
          className="button-trade button-down flex-grow-1 flex-lg-grow-0"
          onClick={() => {
            addTrade({
              ...actualIndicator,
              direction: "down",
              amount: amount,
              type_name: assetSelected.type,
            });
          }}
        >
          Abajo{" "}
          <ArrowUpIcon
            style={{
              transform: "rotate(180deg)",
              width: "20px",
              height: "20px",
            }}
          />
        </button>
      </div>

     { !isNaN(feeling.buy) ? <div className="d-flex flex-column market-feel">
      <p className="mt-2" style={{fontWeight:'600', fontSize:'13px', color:'white', textAlign:'center'}}>Opinion del mercado</p>

            <div className="d-flex flex-column position-relative mt-1">
              
              <div className="line-feel w-100 position-absolute top-0 left-0 bottom-0" style={{background:'#df3737', height:'3px', borderRadius:'15px'}} ></div>
              <div className="line-feel position-absolute top-0 left-0 bottom-0" style={{background:'#39af4d', height:'3px', borderRadius:'15px', width:`${feeling.buy}%`}} ></div>
            </div>
            <div className="d-flex flex-wrap justify-content-between mt-2">
              <p className="d-flex justify-content-between w-100 mt-0"><span style={{fontWeight:'600', color:'#39af4d'}}>{feeling.buy}%</span> <span style={{fontWeight:'600', color:'#df3737'}}>{feeling.sell}%</span></p>
            </div>
      </div> : ''}
    </div>
  );
};

interface StateSidebar extends StateChart {
  navigatorId: string;
  balance_demo: string;
  userId:string;
  avalaible_current_asset: boolean;
}
const mapStateToProps = (state: StateSidebar) => ({
  actualIndicator: state.actualIndicator,
  assets: state.assets,
  timer: state.timer,
  timeframe:state.timeframe,
  navigatorId: state.navigatorId,
  userId:state.userId,
  balance_demo: state.balance_demo,
  avalaible_current_asset: state.avalaible_current_asset,
  assetSelected:state.assetSelected
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addMark(mark: Marker) {
    dispatch({
      type: "ADD_MARK",
      mark,
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

export default connect(mapStateToProps, mapDispatchToProps)(SidebarDashboard);
