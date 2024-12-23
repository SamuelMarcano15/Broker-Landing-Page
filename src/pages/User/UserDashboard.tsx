import { Dispatch } from "redux";
import HistoryDeposit from "../../components/Deposit/HistoryDeposit"
import HistoryWithdraw from "../../components/Deposit/HistoryWithdraw"
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserData } from "../../types";
import { infoUser } from "../../components/API/UserApi";
import { toast } from "react-toastify";
import ModalEditUser from "../../components/User/ModalEditUser";
import imgUser from "../../assets/images/icons/user.png"
import Cookies from "js-cookie";
type Props = {
    balance_demo: string;
    userId: string;
    balance_user: {
      balance_type: number; // 0 practice | 1 Real
      demo: string;
      real: string;
    };
    isAdmin:boolean;
  };

  
const UserDashBoard = ({balance_demo, userId, balance_user, isAdmin}:Props) =>{
    const { id } = useParams();
    const [user,setUser] = useState<UserData>()
    const [showModal,setShowModal] = useState(false)
    const handleModalOpen = ()=>{
        setShowModal(true)
    }

    const handleCloseModal = ()=>{
        setShowModal(false)
        requestUser()
    }


    const requestUser = async() =>{
        const {data,status} = await infoUser((isAdmin ? id : userId) || '')
        if(status >= 400){
          return  toast.error("Ocurrio un error al requerir los datos")
        }

        console.log(data)

        setUser({
            created_at: data.usuario[0].created_at,
            firstname: data.usuario[0].firstname,
            lastname: data.usuario[0].lastname,
            email: data.usuario[0].email,
            birthday: data.usuario[0].birthday,
            country: data.usuario[0].country,
            updated_at: data.usuario[0].updated_at,
            user_id: data.usuario[0].user_id,
            balance_real: data.usuario[0].balance_real,
            phone_number: data.usuario[0].phone_number,
            balance_demo: data.usuario[0].balance_demo,
            last_connection: data.usuario[0].last_connection,
            accept_terms: data.usuario[0].accept_terms,
            account_mode: data.usuario[0].account_mode,
            newsletter: data.usuario[0].newsletter,
            deposits: data.usuario[0].deposits,
            deposits_total: data.usuario[0].deposits_total,
            block:data.usuario[0].block,
            role:''
        })
    }
    useEffect(()=>{
        requestUser()
    },[])
    return(
        <>
        <ModalEditUser show={showModal} handleClose={handleCloseModal} onEdit={true} userData={user || null} create={false} admin={Cookies.get("role") === "admin" ? true : false}/>
        <div className="container container-dashboard-user gap-5 d-flex flex-column">
            <div className="row p-3 content-row">
                <div className="col-12 col-lg-1 d-flex flex-column justify-content-center align-items-center flex-wrap flex-lg-column">
                <img style={{width:'100%', maxWidth:'56px', height:'56px', objectFit:'contain'}} src={imgUser} alt="Image-user"/>
                </div>
                <div className="col-12 col-lg-5 d-flex flex-column flex-wrap flex-lg-column">
                <div className="col-lg-12">
                    <div className="d-flex flex-column">
                        {!isAdmin ? <p style={{color:'#b5b5b5',fontSize:'13px'}} className="text-center text-lg-start mt-3 mt-lg-0">Hola:</p> : ''}
                        <div className=" mt-2  mt-lg-0 d-flex flex-column flex-lg-row justify-content-center align-items-center justify-content-lg-start gap-2 gap-lg-3">
                        <h3 className="title text-lg-start mb-0 mb-lg-0" style={{textTransform:'capitalize', fontSize:'17px', fontWeight:'700'}}>{user?.firstname} {user?.lastname}</h3>
                        {user?.block ? <span className="badge-user badge-block">Bloqueado</span> : <span className="badge-user badge-active">Activo</span>}
                        </div>
                    </div>
                </div>
                <div className="row p-0 mt-1 mt-lg-0 text-lg-start justify-content-center justify-content-lg-start" style={{height:'auto'}}>
                
                    {!isAdmin ? <div className="col-lg-12 mt-1 mt-lg-0 text-lg-start text-center">
                        <p style={{color:'#b5b5b5',fontSize:'13px'}} className="text-center text-lg-start mt-0 mt-lg-0">Saldo real:</p>
                        <p className="balance-user text-lg-start" style={{color:'#d3d3d3', marginTop:'-4px'}}>${isAdmin ? (user?.balance_real || '0'): (balance_user?.real || "0")}</p>
                    </div> :<>
                    
                    <div className="col-lg-4 mt-1 mt-lg-0 text-lg-start text-center align-items-lg-start d-flex flex-column justify-content-center justify-content-lg-center">
                        <p style={{color:'#b5b5b5',fontSize:'13px'}} className="text-center text-lg-start mt-0 mt-lg-0">Saldo real:</p>
                        <p className="balance-user text-lg-start" style={{color:'#d3d3d3', marginTop:'-4px'}}>${isAdmin ? (user?.balance_real || '0'): (balance_user?.real || "0")}</p>
                    </div> 

                    <div className="col-lg-4 mt-1 mt-lg-0 text-lg-start text-center align-items-lg-start d-flex flex-column justify-content-center justify-content-lg-center">
                        <p style={{color:'#b5b5b5',fontSize:'13px'}} className="text-center text-lg-start mt-0 mt-lg-0">Depositado:</p>
                        <p className="balance-user text-lg-start" style={{color:'#d3d3d3', marginTop:'-4px'}}>${user?.deposits_total}</p>
                    </div> 
                    
                    </>}
                 
                </div>
                
                </div>
                <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end gap-3 mt-3">
                    { !isAdmin ?
                    <>
                    <Link to="/user/deposit" className="btn btn-primary d-flex align-items-center justify-content-center">Depositar</Link>
                    <Link to="/user/withdraw"  className="btn btn-secondary d-flex align-items-center justify-content-center">Retirar</Link>
                    </> : <Link className="btn btn-primary d-flex align-items-center justify-content-center" to={`/admin/user/${id}/operations`}>Operaciones</Link>
                    }
                </div>
            </div>

            <div className="row p-3 content-row content-personal">
                    <div className="col-lg-6">
                        <h3 className="title text-lg-start" style={{fontWeight:'700'}}>Informacion Personal</h3>
                    </div>
                    <div className="col-lg-6 d-flex justify-content-center mt-1 mt-lg-0 justify-content-lg-end ">
                        <button className="btn btn-secondary" onClick={(e)=>{handleModalOpen()}}>Editar Informacion</button>
                    </div>
                <div className="col-lg-6 col-12 mt-lg-2 text-center text-lg-start d-flex flex-column gap-0 mt-2 mt-lg-0 ">
                    <label>Telefono</label>
                    <p>{user?.phone_number || 'No registrado'}</p>
                </div>
                <div className="col-lg-6 col-12 mt-lg-2 text-center text-lg-start d-flex flex-column gap-0 mt-2 mt-lg-0">
                    <label>Pais de residencia</label>
                    <p>{user?.country}</p>
                </div>
                <div className="col-lg-6 col-12 mt-lg-2 text-center text-lg-start d-flex flex-column gap-0 mt-2 mt-lg-0">
                    <label>Email</label>
                    <p>{user?.email}</p>
                </div>
                <div className="col-lg-6 col-12 mt-lg-2 text-center text-lg-start d-flex flex-column gap-0 mt-2 mt-lg-0">
                    <label>Fecha de nacimiento</label>
                    <p>{user?.birthday}</p>
                </div>
            </div>

            <div className="row p-3 content-row">
            <h3 className="title text-lg-start" style={{fontWeight:'700'}}>Historial de depositos</h3>
            <HistoryDeposit isAdmin={isAdmin} />
            </div>

            <div className="row p-3 content-row">
                <h3 className="title text-lg-start" style={{fontWeight:'700'}}>Historial de retiros</h3>
                <HistoryWithdraw isAdmin={isAdmin}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(UserDashBoard)