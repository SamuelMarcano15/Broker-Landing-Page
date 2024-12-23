import { ReactElement, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import NavDashboard from "../NavDashboard";
import NavBarUser from "../NavBarUser";
import "../../assets/styles/components/user-dashboard.css";
import { CheckAccount, CheckBalance } from "../API/UserApi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface Props {
  updateStatus: (balance_type: number, demo: string, real: string) => void;
  userId: string;
  setUserId: (id: string) => void;
}

const UserCheck = ({ setUserId, updateStatus, userId }: Props) => {
  const [requestBalance, setRequestBalance] = useState(false);
  const [requestUser, setRequestUser] = useState(false);
  const [inRequest, setInRequest] = useState(false);
  const [allLoad,setAllLoad] = useState(false)
  const navigate = useNavigate();

  const checkUser = async () => {
    const requestBalanceActual = async (id: string) => {
      const { data, status } = await CheckBalance(userId);
      if (status >= 400) {
        return alert("Error al requerir saldo demo");
      }

      console.log(data.user_data);
      updateStatus(
        data.user_data.account_mode,
        data.user_data.balance_demo,
        data.user_data.balance_real
      );
      return setRequestBalance(true);
    };

    setInRequest(true);
    if (inRequest) return;
    console.log("PASS HERE AGAIN");
    const { data, status } = await CheckAccount(userId);
    if (status >= 400) {
      setInRequest(false);
      setRequestUser(false);
      setInRequest(false);
      toast.error("Sesion invalida o expirada");
      Cookies.remove("token");
      localStorage.removeItem("navigatorId");
      return navigate("/login");
    }

    console.log(data);
    setUserId(userId);
    requestBalanceActual(userId);
    setRequestUser(true);
    setAllLoad(true)
    return setInRequest(false);
  };

  useEffect(() => {
    if (userId && !requestUser) {
      checkUser();
    }

    if(!userId){
      Cookies.remove("token");
      localStorage.removeItem("navigatorId");
      return navigate("/login");
    }
  }, [userId, requestUser]);

  return (
    <>
      <div className="container-fluid d-flex flex-column p-0">
        <NavDashboard page={"cashier"} isAdmin={false}/>
        <div
          className="d-flex flex-row"
          style={{ overflow: "hidden", height: "91.9vh" }}
        >
          <NavBarUser />
          <div
            className="d-flex flex-column"
            style={{ overflow: "auto", paddingBottom: "40px", width: "100%" }}
          >
            {allLoad ? <Outlet /> : ''}
          </div>
        </div>
      </div>
    </>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(UserCheck);
