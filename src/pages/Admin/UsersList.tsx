import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AssetAdmin, UserData } from "../../types";
import "../../assets/styles/components/assets-admin.css";
import CreateAssetModal from "../../components/Admin/assets/CreateAssetModal";
import { listAssetApi } from "../../components/API/AssetApi";
import imgUser from "../../assets/images/icons/user.png"
import { toast } from "react-toastify";
import { listUsersAdmin } from "../../components/API/UserApi";
import { Link, useNavigate } from "react-router-dom";
import ModalEditUser from "../../components/User/ModalEditUser";
const UsersList = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<UserData[]>([]);
  const [userSelected, setUserSelected] = useState<UserData>();
  const [show, setShow] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [email,setEmail] = useState("")


  const handleClose = () => {
    setShow(false);
    requestUsers(offset,limit)
  };
  const handleShow = () => setShow(true);

  const handleClick = (user: UserData) => {
    navigate(`/admin/user/${user.user_id}/dashboard`)
    console.log(user)
  };

  const handleRequestEmail = async(e:FormEvent<HTMLFormElement>) =>{
    try{
      e.preventDefault()
      await requestUsersEmail(offset,limit)
    }catch(e){
      toast.error("Ocurrio un error al obtener la lista")
    }
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  type DataType = {
    crypto: string;
    binary: string;
    forex: string;
};
  const requestUsers = async (offset: number, limit: number) => {
    setLoading(true);
    try {
      const { data, status } = await listUsersAdmin(String(offset), String(limit),"");
      if (status > 400) {
        setLoading(false);
        return toast.error("No se pudieron encontrar activos");
      }
      setLoading(false);
      setUsers(data.usuarios);
      console.log(data);
    } catch (e) {
      return toast.error("No se pudieron consultar los usuarios");
    }
  };

  const requestUsersEmail = async (offset: number, limit: number) => {
    setLoading(true);
    try {
      const { data, status } = await listUsersAdmin(String(offset), String(limit),email);
      if (status > 400) {
        setLoading(false);
        return toast.error("No se pudieron encontrar activos");
      }
      setLoading(false);
      setUsers(data.usuarios);
      console.log(data);
    } catch (e) {
      return toast.error("No se pudieron consultar los usuarios");
    }
  };

  const handleChangeEmail = (e:any) =>{
    if(e.target.value === ""){
      setEmail("")
      requestUsers(offset,limit)
    }

    setEmail(e.target.value)
  }

  const handleNextPage = () => {
    if (users.length < limit) {
      return toast.warning("No hay mas usuarios registradas");
    }
    if (users.length > 9) {
      setOffset((prev) => prev + limit);
    } else {
      toast.warning("No hay mas usuarios registradas");
    }
  };

  const handlePrevPage = () => {
    if (offset <= 0) {
      setOffset(0);
    } else {
      setOffset((prev) => prev - limit);
    }
  };

 

  useEffect(() => {
    requestUsers(offset, limit);
  }, [offset, limit]);
  
  return (
    <>
      <ModalEditUser show={show} handleClose={handleClose} onEdit={false} create={true} admin={true} userData={null}/>
        <div className="container container-dashboard-user container-dashboard-admin mt-3  m-0 w-100 m-auto">
          <div className="row mt-0 content-row p-3">
            <div className=" col-lg-6  align-items-center">
              {" "}
              <h2 className="text-white text-lg-start title m-0" style={{fontWeight:'600'}}>Administracion de usuarios</h2>
            </div>
     
            <div className="col-lg-6 d-flex justify-content-lg-end">
              <button
                type="button"
                className="btn btn-primary m-auto mt-3 m-lg-0 mt-lg-0"
                onClick={() => {
                  handleShow();
                }}
              >
                Agregar usuario
              </button>
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
              <h3 className="title text-lg-start" style={{fontWeight:'700'}}>Lista de usuario</h3>
              <div className="grid-table-admin mt-4">
                <div className="thead-table-admin">
                  <p>Usuario</p>
                  <p>Email</p>
                  <p>Balance real</p>
                  <p>Actualizado</p>
                </div>

                <div className="body-admin-table mt-2">
                  {users.length > 0 ?users.map((el, i) => {
                    return (
                      <Link
                        className="body-elm"
                        key={i}
                        to={`/admin/user/${el.user_id}/dashboard`}
                      >
                        <div className="name item">
                          <label>Usuario</label>
                          <div className="d-flex flex-wrap align-items-center gap-2">
                            <img style={{width:'20px', height:'20px'}} src={imgUser} alt={`user ${el.firstname} ${el.lastname}`}/>
                          <p>{el.firstname} {el.lastname}</p>
                          </div>
                        </div>

                        <div className="email item">
                          <label>Email</label>
                          <p style={{ }}>
                            {el.email}
                          </p>
                        </div>

                        <div className="balance item">
                          <label>Balance real</label>
                            <p>
                              ${el?.balance_real || '0'}
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
                      </Link>
                    );
                  }):''}
                  {users.length === 0 ? <div className="d-flex justify-content-center align-items-center"><p className="text-center text-white">No se encontraron usuario registrados</p></div> : ''}
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
              {users.length > 9 ? (
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
    </>
  );
};

export default UsersList;
