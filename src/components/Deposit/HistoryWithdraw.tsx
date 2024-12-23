import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import ClockIcon from "../icons/ClockIcon"
import { createWithdraw, listPayments, listWithdraw } from "../API/PaymentsApi";
import { toast } from "react-toastify";
import {  formatTimestamp } from "../../utils/formatTimeDate";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import ModalWithdrawInfo from "../User/ModalWithdrawInfo";
import { Withdraw } from "../../types";
import { useParams } from "react-router-dom";

type Props = {
    balance_demo:string;
    userId:string
    balance_user:{
        balance_type:number, // 0 practice | 1 Real
        demo:string,
        real:string
    },
    reloadHistory:boolean,
    setReloadHistory:(reload:boolean)=>void,
    isAdmin:boolean
}


const HistoryWithdraw = ({balance_demo, userId, balance_user,setReloadHistory,reloadHistory,isAdmin}:Props) =>{
    const { id } = useParams();
    const [withdraw,setWithdraw] = useState({type:'crypto', network:'ETH - ERC20',address:'',user_id:userId})
    const [withdraws, setWithdraws] = useState<Withdraw[]>([]);
    const [show,setShow]=useState(false)
    const [selectedWithdraw,setSelectedWithdraw] = useState<Withdraw>({
        user:null,
        amount: '',
        id: '',
        network: '',
        status: '',
        updated_at: '',
        user_id: '',
        type: '',
        address: '',
        reason:"",
        created_at: ''
    })
    const [amount,setAmount] = useState(0)
    type TransactionStates = {
        approved: string;
        reject: string;
        pending: string;
      };

      const STATES_TRANSACTIONS:TransactionStates = {
        approved: "Aprobado",
        reject: "Rechazado",
        pending: "En espera",
      };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);

    const requestWithdraw = async (offset:number,limit:number)=>{
        if(loading) return
        setLoading(true)
        try{
        const {data,status} = await listWithdraw((isAdmin ? id : userId) || '',offset,limit)
        if(status > 400){
            setLoading(false)
            return toast.error("No se pudieron encontrar las transacciones")
        }
        console.log('PASSSSSS')
        setLoading(false)
        setWithdraws(data.withdraw)
        console.log(data)
        }catch(e){
            setLoading(false)
            return toast.error("No se pudieron consultar las transacciones")
        }
    }

    useEffect(()=>{
        //requestWithdraw(0,10)
        //setLoading(true)
        
    },[])

    useEffect(()=>{
        if(reloadHistory && !loading){
            setReloadHistory(false)
            requestWithdraw(0,10)
        }
    },[reloadHistory, loading])



    const handleNextPage = ()=>{
        if(withdraws.length < limit){
            return toast.warning("No hay mas transacciones registradas")
        }
        if(withdraws.length > 9){
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
    const numberPattern = /^(\d+|\d+\.\d{1,2})$/; // Matches whole numbers or decimals up to two decimal places

    useEffect(()=>{
        requestWithdraw(offset,limit)
    },[offset,limit])

    const showInfo = (el:Withdraw) =>{
        setShow(true)
        setSelectedWithdraw(el)
    }
    return (
        <>
        <ModalWithdrawInfo isAdmin={false} show={show} handleClose={() => { setShow(false); } } onEdit={true} selectedWithdraw={selectedWithdraw}/>
        <div className="d-flex flex-column gap-2 list-user-deposit" style={{ paddingTop:'5px', marginTop:'0px'}}>
 
        <div className="d-flex flex-column" style={{ paddingTop:'5px', marginTop:'0px'}}>
 
            <div className="d-flex flex-column gap-2 list-deposit">
                {
                    withdraws.map((el,i)=>{
                        return(
                            <div className="deposit-detail" key={el.id} onClick={(e)=>showInfo(el)}>
                                <div className="d-flex justify-content-between  flex-wrap w-100" style={{borderBottom: '1px solid #a5a5a5',
    marginBottom: '5px',
    paddingBottom: '2px'}}>
                                    <p style={{fontSize:'15px'}}><ClockIcon style={{marginRight:'3px', marginTop:'-1px'}}/>{formatTimestamp(new Date(el.created_at).getTime() / 1000)}</p>
                                    <p style={{textTransform:'capitalize'}}>{STATES_TRANSACTIONS[el.status as keyof TransactionStates]}</p>
                                </div>

                                <div className="d-flex justify-content-between flex-wrap align-items-center w-100"> 
                                    <div className="asset d-flex flex-column text-start"><span style={{textTransform:'capitalize', fontWeight:'600'}}>{el.type}</span>  <span style={{    fontSize: '14px',
    color: '#bbbbbb',
    fontWeight: '600'}}> {el.network}</span></div>
                                    <p className="amount" style={{color:el.status == 'confirmed' ? '#64f964' : el.status == 'expired' ? '#f14848' : '#9b9b9b' , fontWeight:'500'}}>${el.amount}</p>
                                </div>
                                <small className="text-start m-0 d-flex">Identificador: {el.id}</small>
                            </div>
                        )
                    })
                }


                {withdraws.length === 0 && loading === false ? <div className="d-flex flex-column">

                <h3 className="text-white" style={{fontSize:'21px'}}>No se han encontrado retiros registrados</h3>
                </div> : ''}
                
            </div>

            <div className="d-flex flex-lg-wrap flex-column flex-lg-row justify-content-lg-between mt-3 gap-3">
               {offset > 1 ?  <button className="btn btn-secondary" type="button" onClick={()=>{handlePrevPage()}}>Anterior</button> : '' }
               {withdraws.length > 9 ? <button className="btn btn-secondary" type="button" onClick={()=>{handleNextPage()}}>Siguiente</button> : '' }
            </div>
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
    setReloadHistory(reload:boolean) {
        dispatch({
          type: "RELOAD_HISTORY",
          reload,
        });
      },
  });

export default connect(mapStateToProps, mapDispatchToProps)(HistoryWithdraw)