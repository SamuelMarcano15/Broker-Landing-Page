import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./assets/styles/cashier.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Provider } from "react-redux";
import store from "./store/store";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import {
  saveAssetsToLocalStorage,
  saveTimerToLocalStorage,
  saveNavigatorId,
  saveChartType,
  saveUserIdToLocalStorage,
  saveEmailUser,
  saveBalanceUser,
  saveIsAdmin,
} from "./store/storage/loadStorage";
import { ToastContainer } from "react-toastify";
import AdminCheck from "./components/Admin/AdminCheck";
import "react-toastify/dist/ReactToastify.css";
import CheckNavigator from "./components/CheckNavigator";
import AssetsAdmin from "./pages/Admin/Assets";
import UserCheck from "./components/User/UserCheck";
import UserDashBoard from "./pages/User/UserDashboard";
import HistoryDeposit from "./components/Deposit/HistoryDeposit";
import UserDeposit from "./pages/User/UserDeposit";
import WithdrawUser from "./components/User/WithdrawUser";
import UserOperations from "./pages/User/UserOperations";
import UsersList from "./pages/Admin/UsersList";
import WithdrawsList from "./pages/Admin/WithdrawsList";
import Contact from "./pages/Contact";

function App() {
  store.subscribe(() => {
    saveTimerToLocalStorage(store.getState().timer); // Saved time of put signal trading
    saveNavigatorId(store.getState().navigatorId); // Saved time of put signal trading
    saveAssetsToLocalStorage(store.getState().assetSelected);
    saveUserIdToLocalStorage(store.getState().userId);
    saveChartType(store.getState().chartType);
    saveEmailUser(store.getState().email_user);
    saveBalanceUser(store.getState().balance_user);
  });

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <Provider store={store}>
        
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>

        <BrowserRouter basename="/app">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/dashboard"
              element={
                <CheckNavigator>
                  <Dashboard />
                </CheckNavigator>
              }
            />

            {/*Routes only users*/}
            <Route path="/user/*" element={<UserCheck />}>
              <Route
                path="dashboard"
                element={<UserDashBoard isAdmin={false} />}
              />
              <Route path="withdraw" element={<WithdrawUser />} />
              <Route path="deposit" element={<UserDeposit />} />
              <Route
                path="operations"
                element={<UserOperations isAdmin={false} />}
              />
            </Route>

            {/* Routes only admin */}
            <Route path="/admin/*" element={<AdminCheck />}>
              <Route path="assets" element={<AssetsAdmin />} />
              <Route path="users" element={<UsersList />} />
              <Route path="withdraws" element={<WithdrawsList />} />
            </Route>

            <Route path="/admin/user/:id/*" element={<AdminCheck />}>
              <Route
                path="dashboard"
                element={<UserDashBoard isAdmin={true} />}
              />
              <Route path="withdraw" element={<WithdrawUser />} />
              <Route path="deposit" element={<UserDeposit />} />
              <Route
                path="operations"
                element={<UserOperations isAdmin={true} />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
