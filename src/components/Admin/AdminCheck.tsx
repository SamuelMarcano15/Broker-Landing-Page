import { ReactElement, useEffect, useState } from "react"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { CheckAccount, CheckAccountAdmin } from "../API/UserApi";
import "../../assets/styles/components/user-dashboard.css";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import NavDashboard from "../NavDashboard";
import NavBarUser from "../NavBarUser";
interface Props {
  updateStatus: (balance_type: number, demo: string, real: string) => void;
  userId: string;
  setUserId: (id: string) => void;
}


const AdminCheck = ({ setUserId, updateStatus, userId }: Props) =>{
  const [requestBalance, setRequestBalance] = useState(false);
  const [requestUser, setRequestUser] = useState(false);
  const [inRequest, setInRequest] = useState(false);
  const [allLoad,setAllLoad] = useState(false)
  const navigate = useNavigate();

  const checkUser = async () => {


    setInRequest(true);
    if (inRequest) return;
    console.log("PASS HERE AGAIN");
    const { data, status } = await CheckAccountAdmin();
    if (status >= 400 || Cookies.get("role") !== "admin") {
      setInRequest(false);
      setRequestUser(false);
      setInRequest(false);
      toast.error("Sesion invalida o expirada");
      Cookies.remove("token");
      Cookies.remove("role")
      Cookies.remove("user_id")
      localStorage.removeItem("navigatorId");
      return navigate("/login");
    }

    console.log(data);
    setUserId(userId);
    setRequestUser(true);
    setAllLoad(true)
    return setInRequest(false);
  };

  useEffect(() => {
    console.log("USERID", userId);
    if (userId && !requestUser) {
      checkUser();
    }
  }, [userId, requestUser]);

    return (
        <>
           <div className="container-fluid d-flex flex-column p-0 ">
              <NavDashboard page={"cashier"} isAdmin={true}/>
              <div
                className="d-flex flex-row "
                style={{ overflow: "hidden", height: "91.9vh" }}
              >
                <NavBarUser isAdmin={Cookies.get("role") === "admin" ? true : false}/>
                <div
                  className="d-flex flex-column "
                  style={{ overflow: "auto", paddingBottom: "40px", width: "100%" }}
                >
                  {allLoad ? <Outlet /> : ''}
                </div>
              </div>
            </div>
        </>
      ) 
}

const mapStateToProps = (state: any) => ({
  userId: state.userId,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUserId(id: string) {
    dispatch({
      type: "SET_USER_ID",
      id,
    });
  },

  updateStatus(balance_type: number, demo: string, real: string) {
    dispatch({
      type: "UPDATE_STATUS_USER",
      balance_type,
      demo,
      real,
    });
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(AdminCheck)