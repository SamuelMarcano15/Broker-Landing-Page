import { FormEvent, useState } from "react";
import '../assets/styles/login.css'
import OpenEye from "../components/icons/OpenEye";
import CloseEye from "../components/icons/CloseEye";
import Register from "../components/Register"
import { loginAccount } from "../components/API/UserApi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import PasswordIcon from "../components/icons/PasswordIcon";
import EmailIcon from "../components/icons/EmailIcon";
import ImageBg from "../assets/images/forex-trading.webp"
type Props ={
  setUserId:(...args:any)=>void
  setEmail:(...args:any)=>void
}
const Login = ({setUserId,setEmail}:Props) => {
  const navigate = useNavigate()
  const [user,setUser] = useState({
    email:'',
    password:'',
    phonenumber:'',
    visiblePassword:false
  })

  const [typeForm,setTypeForm] = useState("login")

  const changeForm = (type:string)=>{
    setTypeForm(type)
  }

  const sendForm = async (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const {data,status} = await loginAccount(user)
    if(status >= 400){
      return toast.warning(data.message || 'No se pudo encontrar el usuario')
    }
    Cookies.set('token',data.token)
    Cookies.set('role',data.user_data.role)
    Cookies.set("user_id",data.user_data.user_id)
    Cookies.set("username",`${data.user_data.firstname} ${data.user_data.lastname}`)
    setUserId(data.user_data.user_id)
    setEmail(data.user_data.email)
    navigate('/dashboard')
  }
 
  return (
    <div className="login-user-page" style={{backgroundImage:`url(${ImageBg})`}}>
     {
      typeForm == "login" ?  <section
      className=" p-3 p-md-4 p-xl-5"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
      <div className="container m-auto">
        <div className="row justify-content-center">
          <div className="col-12 col-xxl-11">
            <div
              className="card shadow-sm"
              style={{ background: `rgb(15 20 24 / 95%)`,
                backdropFilter: 'blur(16px)',
                color: 'white',
                maxWidth: '800px',
                margin: 'auto',
                borderRadius: '20px' }}
            >
              <div className="row g-0">
                <div className="col-12 col-md-12 d-flex align-items-center justify-content-center">
                  <div className="col-12 col-lg-11 col-xl-10">
                    <div className="card-body p-3 p-md-4 p-xl-5">
                      <div className="row">
                        <div className="col-12">
                          <div className="mb-1">
                            <h4
                              className="text-center"
                              style={{ fontWeight: "600", fontSize: "27px" }}
                            >
                              Inicio de sesion
                            </h4>
                            <p className="text-center">
                              ¡Tan solo abra su cuenta y comience a operar!
                            </p>
                          </div>
                        </div>
                      </div>

                      <form onSubmit={sendForm} style={{ color: "black" }}>
                        <div
                          className="row gy-3 overflow-hidden"
                          style={{ maxWidth: "435px", margin: "auto" }}
                        >
                          <div className="col-12">
                            <div className="d-flex flex-column-reverse field">
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                placeholder="Correo"
                                value={user.email}
                                onChange={(e)=>{setUser({...user,email:e.target.value})}}
                                required
                              />
                              <label
                                htmlFor="email"
                                className="form-label text-white"
                                style={{ fontWeight: "600" }}
                              >
                               <EmailIcon/>
                              </label>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="d-flex flex-column-reverse position-relative field">
                              <input
                                type={user.visiblePassword ? "text" : "password"}
                                className="form-control"
                                name="password"
                                id="password"
                                placeholder="Contraseña"
                                value={user.password}
                                onChange={(e)=>{setUser({...user,password:e.target.value})}}
                                required
                              />
                              <label
                                htmlFor="password"
                                className="form-label text-white"
                                style={{ fontWeight: "600" }}
                              >
                                <PasswordIcon/>
                              </label>
                              <button className="password-eye" type="button" onClick={()=>{
                                setUser({...user,visiblePassword:!user.visiblePassword})
                                
                                }}>{user.visiblePassword ? <OpenEye style={{fill:'#000'}}/> : <CloseEye style={{fill:'#000'}}/>}</button>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="d-flex flex-column align-items-center justify-content-center">
                              <button
                                className="btn btn-primary btn-lg w-100"
                                style={{
                                  fontWeight: "600",
                                  fontSize: "16px",
                                }}
                                type="submit"
                              >
                                Iniciar sesion
                              </button>
                              <div className="text-white d-flex align-items-center gap-3 mt-4 flex-wrap justify-conent-center ">
                                <p className="text-center w-100" style={{ color: "#b3b3b3" }}>
                                  ¿Aun no tiene una cuenta?
                                </p>
                                <button
                                  className="btn btn-dark btn-lg  m-auto"
                                  type="button"
                                  onClick={(()=>{changeForm("register")})}
                                  style={{ fontSize: "14px" }}
                                >
                                  Registrase
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> : <Register changeForm={changeForm}/>
     }
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userId: state.userId,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({


  setUserId(id:string){
    dispatch({
      type:'SET_USER_ID',
      id
    })
  },

  setEmail(email:string){
    dispatch({
      type:'SET_EMAIL_USER',
      email
    })
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
