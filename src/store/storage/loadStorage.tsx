import { Asset } from "../../types";

export function loadStorageTimeframe() {
    const serializedState = localStorage.getItem("timeframe");
    if (serializedState === null) {
      return {
        value:'1m',
        seconds:60
    };
    } else {
      console.log(serializedState)

      const data = JSON.parse(serializedState)
      return data;
    }
  }

  export function loadStorageAsset() {
    const serializedState = localStorage.getItem("assetSelected") ? JSON.parse(localStorage.getItem("assetSelected") || '{}') : null;
    if (serializedState === null) {
      return {}
    } else {
      const data = serializedState
      return data;
    }
  }

  export function loadTimerGoal() {
    const serializedState = localStorage.getItem("timer");
    if (serializedState === null) {
      return 20; // Saved in seconds
    } else {
      const data = JSON.parse(serializedState)
      return data;
    }
  }

  export function loadStorageEmail() {
    const serializedState = localStorage.getItem("email");
    if (serializedState === null) {
      return ''; 
    } else {
      return serializedState;
    }
  }

  export const loadNavigatorId = ()=>{
    const serializedState = localStorage.getItem("navigatorId");
    if(serializedState === null){
      return ''
    }
    return serializedState
  }

  export const loadUserId = ()=>{
    const serializedState = localStorage.getItem("userid");
    if(serializedState === null){
      return ''
    }
    return serializedState
  }

  export const loadIsAdmin = ()=>{
    const serializedState = localStorage.getItem("isAdmin");
    if(serializedState === null){
      return false
    }
    return serializedState
  }

  export const loadStorageChartType = () =>{
    const serializedState = localStorage.getItem("chartType")
    if(serializedState === null){
      return 'candle'
    }
    return serializedState
  }


  export const loadBalanceUser = () =>{
    const serializedState = localStorage.getItem("balance_user") ? JSON.parse(localStorage.getItem("balance_user") || '{}') : null;
    if (serializedState === null) {
      return {}
    } else {
      const data = serializedState
      return data;
    }
  }
  
  export const saveTimeframeToLocalStorage = (timeframe:string) => {
    const initialSave = timeframe;
    localStorage.setItem("timeframe", initialSave);
  };

  export const saveUserIdToLocalStorage = (user:string)=>{
    const initialSave = user
    localStorage.setItem("userid",initialSave)
  }

  export const saveAssetsToLocalStorage = (assets:Asset[]) => {
    const initialSave = JSON.stringify(assets);
    localStorage.setItem("assetSelected", initialSave);
  };

  export const saveTimerToLocalStorage = (seconds:string) => {
    const initialSave = seconds;
    localStorage.setItem("timer", initialSave);
  };

  export const saveNavigatorId = (id:string) =>{
    const initialSave = id;
    localStorage.setItem("navigatorId",initialSave)
  }

  export const saveChartType  = (id:string) =>{
    const initialSave = id;
    localStorage.setItem("chartType",initialSave)
  }

  export const saveBalanceUser = (balance_user:string) =>{
    const initialSave = JSON.stringify(balance_user);
    localStorage.setItem("balance_user",initialSave)
  }

  export const saveEmailUser  = (email:string) =>{
    const initialSave = email;
    localStorage.setItem("email",initialSave)
  }

  export const saveIsAdmin  = (isAdmin:string) =>{
    const initialSave = isAdmin;
    localStorage.setItem("isAdmin", initialSave)
  }
