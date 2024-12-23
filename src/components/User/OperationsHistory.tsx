import { useEffect, useState } from "react"
import ClockIcon from "../icons/ClockIcon"
import { listPayments } from "../API/PaymentsApi";
import { toast } from "react-toastify";
import {  formatTimestamp } from "../../utils/formatTimeDate";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { getHistory } from "../API/TradesApi";
import {TradeHistory} from "../../types"
import ModalOperationInfo from "./ModalOperationInfo";
import { useParams } from "react-router-dom";
type Props = {
    balance_demo:string;
    userId:string
    balance_user:{
        balance_type:number, // 0 practice | 1 Real
        demo:string,
        real:string
    }
    reloadHistory:boolean,
    isAdmin:boolean
}



const OperationsHistory = ({balance_demo, userId, balance_user, reloadHistory, isAdmin}:Props) =>{
    const { id } = useParams();
    const [trades, setTrades] = useState<TradeHistory[]>([]);
    const [selectedTrade,setSelectedTrade] = useState<TradeHistory>()
    const [loading, setLoading] = useState(false);
    const [show,setShow] = useState(false)
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);

    const requestOperations = async (offset:number,limit:number)=>{
        if(loading) return
        setLoading(true)
        try{const {data,status} = await getHistory((isAdmin ? id : userId) || '',String(offset),String(limit))
        if(status > 400){
            return toast.error("No se pudieron encontrar las transacciones")
        }
        setTrades(data.trades_list)
        setLoading(false)
        console.log(data)
        }catch(e){
            setLoading(false)
            return toast.error("No se pudieron consultar las transacciones")
        }
    }

    useEffect(()=>{
        //requestOperations(0,10)
        //setLoading(true)

    },[])

    useEffect(()=>{
        if(reloadHistory && !loading){
            requestOperations(0,10)
        }
    },[reloadHistory, loading])

    const handleModalOpen = (el:TradeHistory)=>{
        setShow(true)
        setSelectedTrade(el)
    }

    const handleModalClose = ()=>{
        setShow(false)
        
    }

    const handleNextPage = ()=>{
        if(trades.length < limit){
            return toast.warning("No hay mas transacciones registradas")
        }

        if(trades.length > 9){
            setOffset((prev)=>prev + limit)
        }else{
            toast.warning("No hay mas transacciones registradas")
        }
    }

    const handlePrevPage = ()=>{
        if(offset <= 0){
            setOffset(0)
        }else{
            setOffset((prev)=>prev - limit)
        }
    }


    useEffect(()=>{
        requestOperations(offset,limit)
    },[offset,limit])
    return (
        <>
        <ModalOperationInfo show={show} onEdit={false} handleClose={handleModalClose} selectedOperation={selectedTrade}/>
        <div className="d-flex flex-column" style={{ paddingTop:'10px'}}>
            <div className="d-flex flex-column  list-operations-user">
               { trades.length !== 0 ? <div className="header-table mb-2">
                    <div>
                        <p>Activo</p>
                    </div>
                    <div>
                        <p>Monto</p>
                    </div>
                    <div>
                        <p>Direccion</p>
                    </div>
                    <div>
                        <p>Ingreso</p>
                    </div>
                </div> :''}
                {
                    trades.map((el,i)=>{
                        if(!el.created_at) return <div key={i}></div>
                        return(
                            <div className="content-trade" onClick={()=>{handleModalOpen(el)}} key={el.operation_id}>
                                <div className="content asset">
                                    <label>Activo</label>
                                    <p>{el.asset.name} - <span style={{textTransform:'capitalize'}}>{el.asset.type}</span></p>
                                </div>
                                <div className="content amount">
                                    <label>Monto</label>
                                    <p>${el.amount}</p>
                                </div>
                                <div className="content direction">
                                    <label>Direccion</label>
                                    <p>{el.direction === "up" ? "Arriba" : "Abajo"}</p>
                                </div>
                                <div className={`content income ${Number(el.income) > 0 ? "winner" : ''}`}>
                                    <label>Ganancia</label>
                                    <p>${el.income}</p>
                                </div>
                            </div>
                        )
                    })
                }

                {trades.length === 0 && loading === false ? <div className="d-flex flex-column">

                    <h3 className="text-white text-center text-lg-start" style={{fontSize:'21px'}}>No se han encontrado operaciones registradas</h3>
                </div> : ''}
                
            </div>

            <div className={`d-flex flex-lg-wrap flex-column flex-lg-row justify-content-lg-between mt-3 gap-3`}>
            {offset > 1 ?  <button className={`btn btn-secondary `} type="button" onClick={()=>{handlePrevPage()}}>Anterior</button> : '' }
            {trades.length > 9 ? <button className={`btn btn-secondary`} style={{marginLeft:offset < 1 ? 'auto' : ''}} type="button" onClick={()=>{handleNextPage()}}>Siguiente</button> : '' }
            </div>
        </div>
        </>
    )
}

const mapStateToProps = (state:any) => ({
    balance_demo:state.balance_demo,
    userId:state.userId,
    balance_user:state.balance_user,
    reloadHistory:state.reloadHistory
  });
  
  const mapDispatchToProps = (dispatch:Dispatch) => ({

  });

export default connect(mapStateToProps, mapDispatchToProps)(OperationsHistory)