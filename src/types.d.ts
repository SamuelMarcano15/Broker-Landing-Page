export type Direction = "up" | "down";

export interface ActualIndicator {
  close: number;
  high: number;
  low: number;
  open: number;
  time: number;
  volume: number;
  direction: string;
  amount: string;
  asset_id: string;
  timestamp: number;
  type_name: string;
  expire_time:number
}

export interface Asset {
  status: boolean ;
  name: string;
  active_id:string;
  id: string;
  type: string;
  image: string;
  profit: number;
  show: boolean;
}

export interface StateChart {
  timeframe: {
    value:string,
    seconds:number
  };
  assets: Asset[];
  assetSelected:Asset;
  timer: string;
  markersUsers: any;
  actualIndicator: ActualIndicator;
  setCandleActual: (...args: any) => void;
  deleteMark: (...args: any) => void;
  addHistotyTrade: (...args: any) => void;
  chartType:string
}

export interface Marker {
  created_at: string;
  open: number;
  operation_id:string;
  high: number;
  low: number;
  close: number;
  entry:number;
  volume: number;
  time: string;
  timestamp: number;
  time_end:number;
  asset_id: string;
  asset_name:string;
  asset:{name:string,type:string};
  direction: Direction;
  amount: string;
  time_start:number;
  asset_type: string;
  id: string;
  timer: number;
}

export interface TradeHistory{
    asset: Asset;
    asset_name:string;
    time_start: number;
    entry:string;
    close: string;
    operation_id: string;
    winner: boolean;
    amount: string;
    type_asset: string;
    user_id: string;
    time_end: number;
    asset_id: string;
    direction: string;
    income: string;
    is_verified: boolean;
    created_at:string;
    closed_at:string;
}

export interface Trade{
    entry: string;
    asset_id: string;
    time_start:number;
    time_end:number;
    timer:number;
    timestamp: number;
    direction: string;
    amount: string;
    user_id:string;
    id:string;
    
}

export interface Timeframe{
  
    value:string,
    seconds:number

}


export interface balanceUser{
  balance_type:number, // 0 practice | 1 Real
  demo:string,
  real:string
}


export interface optionsSelect{
  label:string,
  value:string
}

export interface TransactionCrypto{

    pay_amount:number,
    created_at:string,
    expiration_estimate_date:string,
    network:string,
    order_description:string,
    pay_address:string,
    pay_currency:string,
    payment_id:string,
    payment_status:string,
    pay_currency_format:string
  
}


export interface AssetAdmin{
  id:string,
  active_id:string,
  name:string,
  type:string,
  profit:string,
  custom_profit:number | string,
  available_broker:string,
  in_custom:string,
  created_at:string,
  updated_at:string
}


export interface Withdraw{
    user:UserData | null;
    amount: string,
    id: string,
    network: string,
    status: string,
    updated_at: string,
    user_id: string,
    type: string,
    address: string,
    created_at: string,
    reason:string

}

export interface UserData {
    created_at: string,
    firstname: string,
    lastname: string,
    email: string,
    birthday: string,
    country: string,
    updated_at: string,
    user_id: string,
    balance_real: string,
    phone_number: string,
    balance_demo: string,
    last_connection: string,
    accept_terms: true,
    account_mode: 0,
    role: string,
    newsletter: true,
    deposits: false,
    block:false,
    deposits_total: 0
}


export interface Deposit {
  created_at: string;
  updated_at:string;
  type: string;
  status: string;
  amount: string;
  currency: string;
  payment_id: string;
  id: string;
}