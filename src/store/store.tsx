import { legacy_createStore as createStore } from "redux";
import { loadStorageTimeframe, loadStorageAsset, loadIsAdmin, loadStorageChartType, loadTimerGoal, loadNavigatorId, loadUserId, loadStorageEmail, loadBalanceUser } from "./storage/loadStorage";
import { Asset, Marker } from "../types";
const initialState = {
	timeframe: loadStorageTimeframe(),
    assets:[],
    assetSelected:loadStorageAsset(),
    chartType:loadStorageChartType(),
    timer:loadTimerGoal(),
    navigatorId:loadNavigatorId(),
    userId:loadUserId(),
    balance_demo:"",
    email_user:loadStorageEmail(),
    balance_user:loadBalanceUser(),
    markers:[],
    showNavigation:false,
    actualIndicator:{
        close:0,
        high:0,
        low:0,
        open:0,
        time:0,
        volume:0,
        direction:'',
        amount:0,
        asset_id:'',
        timestamp:'',
        type_name:''
    },
    history_trades:[],
    history_trades_client:[],
    avalaible_current_asset:true,
    reloadHistory:false
};

const reducerTask = (state = initialState, action:any) => {
    if (action.type === "CHANGE_TIMEFRAME") {
		return {...state, timeframe:action.timeframe};
	}

    if(action.type === "SET_ASSETS"){
        if(!action.assets) return state
        return {...state, assets:action.assets}
    }

    if (action.type === "SELECT_ASSET") {
        if(!action.asset) return state
        return {...state, assetSelected:action.asset}
        
	}

   if(action.type === "CHANGE_TYPE_CHART"){
    if(!action.chartType) return state
        return {...state, chartType:action.chartType}
   }


    /*To manage markers in the chart */
    if(action.type === "ADD_MARK"){
        const markersUsers:Marker[] = state.markers
        console.log('ADD MARK', action.mark)
        // Add timer from the mark to chart in the state
        return {...state, markers:markersUsers.concat({...action.mark, timer: state.timer})}
    }

    if(action.type === "RELOAD_HISTORY"){
        return {...state,reloadHistory:action.reload }
    }

    //Set marks actives from the last request
    if(action.type === "SET_MARKS"){
        console.log('ACTION:',action)
        if(!action.markers_request) return state
        return {...state, markers:action.markers_request}
    }

    // Delete mark actives in chart
    if(action.type === "DELETE_MARK"){
        const markersUsers:Marker[] = state.markers
        const newList = markersUsers.filter((el:Marker)=> el.operation_id !== action.id)
        return {...state, markers:newList}
    }

    // Set history trades

    if(action.type === "SET_HISTORY_TRADES"){
        const history = action.history
        return {...state, history_trades: history}
    }

    if(action.type === "ADD_HISTORY_TRADES"){
        const history = action.history
        if(!action.history) return state
        return {...state, history_trades:[...state.history_trades, history]}
    }

    if(action.type === "ADD_HISTORY_TRADES_CLIENT"){
        const history = action.history
        return {...state, history_trades_client:state.history_trades_client.concat(history)}
    }

    if(action.type === "CLEAN_HISTORY_TRADES_CLIENT"){
        return {...state, history_trades_client:[]}
    }



    /*Set the last candle from the asset actual */
    if(action.type === "SET_CANDLE"){
        return {...state, actualIndicator:action.mark}
    }

    /*Save the time to trade */
    if(action.type === "SET_TIMER"){
        return {...state, timer:action.timer}
    }


    /* Check if exist navegator id */
    if(action.type === "SET_NAV_ID"){
        return {...state, navigatorId:action.id}
    }

    if(action.type === "SET_USER_ID"){
        return {...state, userId:action.id}
    }

    /*Update the actual balance*/
    if(action.type === "UPDATE_BALANCE_DEMO"){
        return {...state, balance_demo:action.balance}
    }

    /*Update the status current asset */
    if(action.type === "STATUS_CURRENT_ASSET"){
        return {...state, avalaible_current_asset:action.avalaible}
    }

    /*Update the status current asset */
    if(action.type === "UPDATE_STATUS_USER"){
        return {...state, balance_user:{balance_type:action.balance_type,demo:action.demo,real:action.real }}
    }

    if(action.type === "SET_EMAIL_USER"){
        return {...state, email_user:action.email}
    }

    if(action.type === "SHOW_NAVIGATION"){
        return {...state, showNavigation:action.showNavigation}
    }

  

    return state;
}

export default createStore(reducerTask);