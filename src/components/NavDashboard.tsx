import '../assets/styles/components/NavDashboard.css'
import OptionsGoals from "./Dashboard/OptionsGoals"
import { Link } from "react-router-dom"
import ArrowDownIcon from "./icons/ArrowDownIcon"
import imgUser from "../assets/images/icons/user.png"
import {ChangeBalance, RefillDemo} from "../components/API/UserApi"
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { toast } from 'react-toastify';
import RechangeIcon from './icons/RechangeIcon'
import { useEffect } from 'react'
import BarsIcon from './icons/BarsIcon'
import AreaChartIcon from './icons/AreaChartIcon'
import Cookies from 'js-cookie'
import AdminPanelIcon from './icons/AdminPanelIcon'
type Props = {
    balance_demo:string;
    updateStatus:(balance_type:number,demo:string,real:string)=>void
    userId:string
    page:string
    isAdmin:boolean | undefined
    balance_user:{
        balance_type:number, // 0 practice | 1 Real
        demo:string,
        real:string
    },
    showNavigation:boolean,
    setShowNavigation:(showNavigation:boolean)=>void
}
const NavDashboard = ({balance_demo,updateStatus, userId, balance_user,page,setShowNavigation,showNavigation,isAdmin}:Props) =>{
    const handleNavigation = async ()=>{
        if(showNavigation){
            setShowNavigation(false)
        }else{
            setShowNavigation(true)
        }
    }
    const refillBalanceDemo = async () =>{
        try{
            console.log(balance_user)
            const toast_id = toast.loading("Actualizando demo...")
            //do something else
            const {data,status} = await RefillDemo(userId)
            if(status >= 400){
                return toast.update(toast_id, { render: "Error al actualizar demo", type: "error", isLoading: false, closeOnClick:true,
                    closeButton:true, autoClose:5000 });

            }

            updateStatus(data.balance_user.account_mode,data.balance_user.balance_demo,data.balance_user.balance_real)
            return toast.update(toast_id, { render: "Demo actualizado!", type: "success", isLoading: false, closeOnClick:true,
                closeButton:true, autoClose:5000
             });

        }catch(e){
            console.log(e)
        }
    }


    const changeMode = async () =>{
        try{
            const {data,status} = await ChangeBalance(userId,String(balance_user.balance_type))
            if(status>400){
                return toast.error("Ocurrio un error al cambiar el saldo")
            }

            updateStatus(data.balance_user.account_mode,data.balance_user.balance_demo,data.balance_user.balance_real)
            toast.warning(`Saldo cambiado a ${balance_user.balance_type === 0 ? 'Real' : 'Demo'}`)
        }catch(e){
            console.log(e)
        }
    }
    return(
        <nav className={`navbar navbar-user navbar-dark bg-dark ${page === "cashier" ? 'position-relative' : 'fixed-top'}`}>
            <div className="container-fluid justify-content-between gap-lg-3 gap-1">
                <div className="d-flex gap-3">
                <button className="navbar-toggler d-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                <span className="navbar-toggler-icon"></span>
                </button>

                {/*container goals*/}
                { page === "cashier" ? <button className='btn btn-graph btn-mobile-bar' onClick={()=>{handleNavigation()}}><BarsIcon style={{fill:'white'}}/></button> : ''}
                { page === "cashier" || isAdmin ? <Link className="navbar-brand btn-graph" to="/dashboard"><AreaChartIcon/></Link> : ''}
                { page === "cashier" || isAdmin ? '' : <OptionsGoals/>}
                </div>
                
                <div>
                    <Link className="navbar-brand" to={isAdmin ? "/admin/dashboard" : "/dashboard"}>Broker</Link>

                </div>
                <div className="d-flex justify-content-between">
                    <div className="d-flex gap-2">
                    <li className="nav-item item-account dropdown " >
                        <button className="nav-link text-white" style={{fontSize:'10px'}} type="button" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="d-flex align-items-center gap-1">
                                <div className="d-flex flex-column">
                                     <span style={{textAlign:'left'}}>{balance_user.balance_type == 0 ? "Cuenta Demo" : "Cuenta Real"}</span>   
                                    <span className="text-white text-start" style={{fontSize:'12px'}}>${parseFloat(balance_user.balance_type == 0  ? balance_user.demo : balance_user.real).toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                        })}</span>
                                                                            
                                    </div>
                                <div><ArrowDownIcon/></div>
                            </div>
                            
                            </button>
                            <ul className="dropdown-menu dropdown-balances" style={{background:'#20283f', boxShadow:'0'}}>
                                {
                                    balance_user.balance_type === 1 ? <li><button onClick={()=>{changeMode()}} className="dropdown-item d-flex flex-column" type="button" > <span style={{textAlign:'left',fontWeight:'600'}}>{"Cuenta Demo"}</span>   
                                    <span className="text-white" style={{fontSize:'12px'}}>${parseFloat(balance_user.demo).toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                        })}</span></button></li> : ''
                                }

{
                                    balance_user.balance_type === 0 ? <li><button onClick={()=>{changeMode()}} className="dropdown-item d-flex flex-column" type="button" > <span style={{textAlign:'left',fontWeight:'600'}}>{"Cuenta Real"}</span>   
                                    <span className="text-white" style={{fontSize:'12px'}}>${parseFloat(balance_user.real).toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                        })}</span></button></li> : ''
                                }
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><button className="dropdown-item" type='button' onClick={()=>{refillBalanceDemo()}}>Reiniciar saldo demo</button></li>
                                </ul>


                    
                        </li>
                    <li>
                        <Link to={Cookies.get("role") === "admin" ? "/admin/assets" : "/user/deposit"} className="text-white button-deposit">{Cookies.get("role") === "admin" ? <AdminPanelIcon/> : <RechangeIcon/>}<span>{Cookies.get("role") === "admin" ? "Administracion" : "Depositar"}</span></Link>
                    </li>
                    <li className="d-flex align-items-center position-relative">
                        <button type="button" style={{background:'transparent', border:'none'}} className="user-icon d-flex" data-bs-toggle="dropdown" aria-expanded="false"><img src={imgUser} alt="user"/></button>
                        <ul className="dropdown-menu dropdown-balances dropdown-user" style={{background:'#20283f', boxShadow:'0',marginLeft: '-100px'}}>
                            <p className='dropdown-item' style={{color:'white'}}>{Cookies.get("username")}</p>
                            <Link className='dropdown-item' style={{color:'white'}} to="/logout">Cerrar session</Link>
                        </ul>
                    </li>
                    </div>
                </div>
               
            </div>
        </nav>
    )
}
const mapStateToProps = (state:any) => ({
    balance_demo:state.balance_demo,
    userId:state.userId,
    balance_user:state.balance_user,
    showNavigation:state.showNavigation
  });
  
  const mapDispatchToProps = (dispatch:Dispatch) => ({
    updateStatus(balance_type:number,demo:string,real:string){
        dispatch({
          type:'UPDATE_STATUS_USER',
          balance_type,
          demo,
          real
        })
      },

      setShowNavigation(showNavigation:boolean){
        dispatch({
          type:'SHOW_NAVIGATION',
          showNavigation
        })
      }
  });


export default connect(mapStateToProps, mapDispatchToProps)(NavDashboard)