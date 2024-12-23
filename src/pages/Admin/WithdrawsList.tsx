import { FormEvent, useEffect, useState } from "react"
import { UserData, Withdraw } from "../../types";
import { useNavigate } from "react-router-dom";
import { listWithdrawAdmin } from "../../components/API/UserApi";
import { toast } from "react-toastify";
import ModalWithdrawInfo from "../../components/User/ModalWithdrawInfo";
import imgUser from "../../assets/images/icons/user.png"


const WithdrawsList = () =>{

    const navigate = useNavigate()
    const [withdraws, setWithdraws] = useState<Withdraw[]>([]);
    const [withdrawSelected, setWithdrawSelected] = useState<Withdraw>();
    const [show, setShow] = useState(false);
    const [loading,setLoading] = useState(false)
    const [onEdit, setOnEdit] = useState(false);
    const [email,setEmail] = useState("")
    const [error, setError] = useState(null);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);

    const handleNextPage = () => {
        if (withdraws.length < limit) {
          return toast.warning("No hay mas retiros registradas");
        }
        if (withdraws.length > 9) {
          setOffset((prev) => prev + limit);
        } else {
          toast.warning("No hay mas retiros registradas");
        }
      };
    
      const handlePrevPage = () => {
        if (offset <= 0) {
          setOffset(0);
        } else {
          setOffset((prev) => prev - limit);
        }
      };
  
    const requestWithdraws = async (offset: number, limit: number) => {
        setLoading(true);
        try {
          const { data, status } = await listWithdrawAdmin(String(offset), String(limit),"");
          if (status > 400) {
            setLoading(false);
            return toast.error("No se pudieron encontrar retiros");
          }
          setLoading(false);
          setWithdraws(data.Retiros);
          console.log('DATA',data);
        } catch (e) {
          return toast.error("No se pudieron consultar los retiros");
        }
      };
    
      const requestWithdrawsEmail = async (offset: number, limit: number) => {
        setLoading(true);
        try {
          const { data, status } = await listWithdrawAdmin(String(offset), String(limit),email);
          if (status > 400) {
            setLoading(false);
            return toast.error("No se pudieron encontrar activos");
          }
          setLoading(false);
          setWithdraws(data.Retiros);
          console.log(data);
        } catch (e) {
          return toast.error("No se pudieron consultar los retiros");
        }
      };

    const handleClose = () => {
      setShow(false);
      requestWithdraws(offset,limit)
    };
    const handleShow = (el:any) =>{ 
        setShow(true);
        setWithdrawSelected(el)

    }
  
    const handleClick = (withdraw: Withdraw) => {
      console.log(withdraw)
    };

    const handleChangeEmail = (e:any) =>{
        if(e.target.value === ""){
          setEmail("")
          requestWithdraws(offset,limit)
        }
    
        setEmail(e.target.value)
      }

    const handleRequestEmail = async(e:FormEvent<HTMLFormElement>) =>{
        try{
          e.preventDefault()
          await requestWithdrawsEmail(offset,limit)
        }catch(e){
          toast.error("Ocurrio un error al obtener la lista")
        }
      }

      useEffect(() => {
        requestWithdraws(offset, limit);
      }, [offset, limit]);


      type TransactionStates = {
        approved: string;
        reject: string;
        pending: string;
        waiting:string;
      };

      const STATES_TRANSACTIONS:TransactionStates = {
        approved: "Aprobado",
        reject: "Rechazado",
        waiting:"En espera",
        pending: "En espera",
      };

      
    return(<>
    <ModalWithdrawInfo isAdmin={true} show={show} handleClose={handleClose} onEdit={true} selectedWithdraw={withdrawSelected}/>
    <div className="container container-dashboard-user container-dashboard-admin mt-3  m-0 w-100 m-auto">
     

        <div className="row mt-3 content-row p-3">
        <div className=" col-lg-12  align-items-center">
              {" "}
              <h2 className="text-white text-lg-start title m-0" style={{fontWeight:'600'}}>Administracion de retiros</h2>
            </div>
        <form onSubmit={handleRequestEmail}>
            <div className="d-flex flex-column flex-lg-row w-100 justify-content-lg-between">
            <div className="col-12 col-lg-8 mt-3 d-flex">
              <input type="email" value={email} onInput={(e)=>{handleChangeEmail(e)}} className="form-control" placeholder="Buscar por correo"/>
            </div>
            <div className="col-12 col-lg-2 mt-3 d-flex align-items-lg-end justify-content-lg-end">
              <button type="submit" style={{maxWidth:'100%'}} className="w-100 btn btn-primary d-flex text-center align-items-center justify-content-center m-auto mt-0 m-lg-0 mt-lg-0">Buscar</button>
            </div>
            </div>
            </form>

            <div className="mt-3">
              <h3 className="title text-lg-start" style={{fontWeight:'700'}}>Lista de retiros</h3>
              <div className="grid-table-admin mt-4">
                <div className="thead-table-admin">
                  <p>Usuario</p>
                  <p>Monto solicitado</p>
                  <p>Estado</p>
                  <p>Actualizado</p>
                </div>

                <div className="body-admin-table mt-2">
                  {withdraws.length > 0 ?withdraws.map((el, i) => {
                    return (
                      <div
                        className="body-elm"
                        key={i}
                        onClick={(e)=>{handleShow(el)}}
                      >
                        <div className="name item">
                          <label>Usuario</label>
                          <div className="d-flex flex-wrap align-items-center gap-2">
                            <img style={{width:'20px', height:'20px'}} src={imgUser} alt={`user ${el.user?.firstname} ${el.user?.lastname}`}/>
                          <p>{el.user?.firstname} {el.user?.lastname}</p>
                          </div>
                        </div>

                        <div className="email item">
                          <label>Monto solicitado</label>
                          <p style={{ }}>
                          ${el.amount}
                          </p>
                        </div>

                        <div className="balance item">
                          <label>Estado</label>
                            <p>
                              {STATES_TRANSACTIONS[el.status as keyof TransactionStates]}
                            </p>
                        </div>

                        <div className="updated item">
                          <label>Actualizado</label>
                          <p>
                            {new Date(el.updated_at).toLocaleString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: false,
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  }):''}
                  {withdraws.length === 0 ? <div className="d-flex justify-content-center align-items-center"><p className="text-center text-white">No se encontraron usuario registrados</p></div> : ''}
                </div>
              </div>
            </div>
            <div
              className={`d-flex flex-lg-wrap flex-column flex-lg-row mt-3 gap-3 w-100 ${
                offset == 0
                  ? "justify-content-lg-end"
                  : "justify-content-lg-between "
              }`}
            >
              {offset > 1 ? (
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => {
                    handlePrevPage();
                  }}
                >
                  Anterior
                </button>
              ) : (
                ""
              )}
              {withdraws.length > 9 ? (
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => {
                    handleNextPage();
                  }}
                >
                  Siguiente
                </button>
              ) : (
                ""
              )}
            </div>
        </div>
    </div>
    </>)
}

export default WithdrawsList