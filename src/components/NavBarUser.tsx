import "../assets/styles/components/sidebar.css";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Deposit from "./Deposit";
import DepositIcon from "./icons/DepositIcon";
import StatusIcon from "./icons/StatusIcon";
import OperationsIcon from "./icons/OperationsIcon";
import WithdrawIcon from "./icons/WithdrawIcon";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import Cookies from "js-cookie";
import AssetsIcon from "./icons/AssetsIcon";
import BillIcon from "./icons/BillIcon";


const NavBarUser = (props:any) => {
  //change visibility dropdown
  const navigate = useNavigate();

  const [dropdown, setDropdown] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [uid, setUid] = useState("");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const { hash, pathname, search } = location;

  const [dataUser, setDataUser] = useState({ admin: false });

  const ref = useRef(window);
  useEffect(() => {
    //listen click outside in class dropdown and class sidebar
    const handleClickOutside = (event:any) => {
      if (dropdown && !event.target.closest(".dropdown")) {
        setDropdown(false);
      }
      if (
        mobileSidebar &&
        !event.target.closest(".sidebar") &&
        !event.target.closest(".button-sidebar")
      ) {
        setMobileSidebar(false);
      }
    };

    const element = ref.current;

    element.addEventListener("click", handleClickOutside);

    // 👇️ remove the event listener when the component unmounts
    return () => {
      element.removeEventListener("click", handleClickOutside);
    };
  }, [dropdown, mobileSidebar]);

  useEffect(()=>{
    props.setShowNavigation(false)
  },[pathname])

  const handleDropdown = (event:any) => {
    if (dropdown) return setDropdown(false);
    return setDropdown(true);
  };

  const handleMobileSidebar = (event:any) => {
    if (mobileSidebar) return setMobileSidebar(false);
    setMobileSidebar(true);
  };

  const handleDropdownTop = (event:any) => {
    if (dropdownTop) return setDropdownTop(false);
    return setDropdownTop(true);
  };

  return (
    <>
      <div
        className={`dropdown-top-mobile ${
          props.showNavigation ? "dropdown-top-mobile-active" : ""
        }`}
      >
        <div className="container-dropdown w-100">
          <div className="mt-3">
            <div className="row d-flex flex-column position-relative gap-2">
         
            {
            Cookies.get("role") === "admin" ? <ul className="nav nav-pills flex-column mb-auto">
            <li
              className="nav-item nav-item-active"
              onClick={() => setMobileSidebar(false)}
            >
              <Link
                to="/admin/users"
                className={`nav-link ${
                  pathname === "/admin/users" ? "nav-item-actual" : ""
                }`}
              >
                <div className="icon-side">
                <StatusIcon/>
                </div>

                <p>Lista de usuarios</p>
              </Link>
            </li>

            <li
              className="nav-item nav-item-active"
              onClick={() => setMobileSidebar(false)}
            >
              <Link
                to="/admin/assets"
                className={`nav-link ${
                  pathname === "/admin/assets" ? "nav-item-actual" : ""
                }`}
              >
                <div className="icon-side">
                <AssetsIcon/>
                </div>

                <p>Lista de activos</p>
              </Link>
            </li>
            <li
              className="nav-item nav-item-active"
              onClick={() => setMobileSidebar(false)}
            >
              <Link
                to="/admin/withdraws"
                className={`nav-link ${
                  pathname === "/admin/withdraws" ? "nav-item-actual" : ""
                }`}
              >
                <div className="icon-side">
                <BillIcon/>
                </div>

                <p>Lista de retiros</p>
              </Link>
            </li>
      
          </ul> : ''
          }

        

            { Cookies.get("role") !== "admin" ? <ul className="nav nav-pills flex-column mb-auto">
            <li
              className="nav-item nav-item-active"
              onClick={() => setMobileSidebar(false)}
            >
              <Link
                to="/user/dashboard"
                className={`nav-link ${
                  pathname === "/user/dashboard" ? "nav-item-actual" : ""
                }`}
              >
                <div className="icon-side">
                <StatusIcon/>
                </div>

                <p>Estado de la cuenta</p>
              </Link>
            </li>
            <li
              className="nav-item nav-item-active"
              onClick={() => setMobileSidebar(false)}
            >
              <Link
                to="/user/deposit"
                className={`nav-link ${
                  pathname === "/user/deposit" ? "nav-item-actual" : ""
                }`}
              >
                <div className="icon-side">
                  <DepositIcon/>
                </div>

                <p>Depositar</p>
              </Link>
            </li>
            <li
              className="nav-item nav-item-active"
              onClick={() => setMobileSidebar(false)}
            >
              <Link
                to="/user/operations"
                className={`nav-link ${
                  pathname === "/user/operations" ? "nav-item-actual" : ""
                }`}
              >
                <div className="icon-side">
                <OperationsIcon/>
                </div>

                <p>Operaciones</p>
              </Link>
            </li>
            <li
              className="nav-item nav-item-active"
              onClick={() => setMobileSidebar(false)}
            >
              <Link
                to="/user/withdraw"
                className={`nav-link ${
                  pathname === "/user/withdraw" ? "nav-item-actual" : ""
                }`}
              >
                <div className="icon-side">
                  <WithdrawIcon/>
                </div>

                <p>Retirar</p>
              </Link>
            </li>
          </ul> : ''}

              <div className="d-flex flex-column">
              
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div
        className={`d-flex flex-column flex-shrink-0   sidebar ${
          mobileSidebar ? "sidebar-active" : ""
        }`}
      >
 
        <div
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
          style={{ padding: "10px 14px" }}
        >

        </div>
 <>
          {
            Cookies.get("role") === "admin" ? <ul className="nav nav-pills flex-column mb-auto">
            <li
              className="nav-item nav-item-active"
              onClick={() => setMobileSidebar(false)}
            >
              <Link
                to="/admin/users"
                className={`nav-link ${
                  pathname === "/admin/users" ? "nav-item-actual" : ""
                }`}
              >
                <div className="icon-side">
                <StatusIcon/>
                </div>

                <p>Lista de usuarios</p>
              </Link>
            </li>

            <li
              className="nav-item nav-item-active"
              onClick={() => setMobileSidebar(false)}
            >
              <Link
                to="/admin/assets"
                className={`nav-link ${
                  pathname === "/admin/assets" ? "nav-item-actual" : ""
                }`}
              >
                <div className="icon-side">
                <AssetsIcon/>
                </div>

                <p>Lista de activos</p>
              </Link>
            </li>

            <li
              className="nav-item nav-item-active"
              onClick={() => setMobileSidebar(false)}
            >
              <Link
                to="/admin/withdraws"
                className={`nav-link ${
                  pathname === "/admin/withdraws" ? "nav-item-actual" : ""
                }`}
              >
                <div className="icon-side">
                <BillIcon/>
                </div>

                <p>Lista de retiros</p>
              </Link>
            </li>
      
      
          </ul> : ''
          }
 
         { Cookies.get("role") !== "admin" ? <ul className="nav nav-pills flex-column mb-auto">
            <li
              className="nav-item nav-item-active"
              onClick={() => setMobileSidebar(false)}
            >
              <Link
                to="/user/dashboard"
                className={`nav-link ${
                  pathname === "/user/dashboard" ? "nav-item-actual" : ""
                }`}
              >
                <div className="icon-side">
                <StatusIcon/>
                </div>

                <p>Estado de la cuenta</p>
              </Link>
            </li>
            <li
              className="nav-item nav-item-active"
              onClick={() => setMobileSidebar(false)}
            >
              <Link
                to="/user/deposit"
                className={`nav-link ${
                  pathname === "/user/deposit" ? "nav-item-actual" : ""
                }`}
              >
                <div className="icon-side">
                  <DepositIcon/>
                </div>

                <p>Depositar</p>
              </Link>
            </li>
            <li
              className="nav-item nav-item-active"
              onClick={() => setMobileSidebar(false)}
            >
              <Link
                to="/user/operations"
                className={`nav-link ${
                  pathname === "/user/operations" ? "nav-item-actual" : ""
                }`}
              >
                <div className="icon-side">
                <OperationsIcon/>
                </div>

                <p>Operaciones</p>
              </Link>
            </li>
            <li
              className="nav-item nav-item-active"
              onClick={() => setMobileSidebar(false)}
            >
              <Link
                to="/user/withdraw"
                className={`nav-link ${
                  pathname === "/user/withdraw" ? "nav-item-actual" : ""
                }`}
              >
                <div className="icon-side">
                  <WithdrawIcon/>
                </div>

                <p>Retirar</p>
              </Link>
            </li>
          </ul> : '' }
        </> 
       
      </div>

    </>
  );
};

const mapStateToProps = (state:any) => ({
  showNavigation:state.showNavigation
});

const mapDispatchToProps = (dispatch:Dispatch) => ({
 setShowNavigation(showNavigation:boolean){
        dispatch({
          type:'SHOW_NAVIGATION',
          showNavigation
        })
      }
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBarUser);
