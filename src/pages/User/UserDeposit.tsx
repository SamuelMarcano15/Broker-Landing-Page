import Cookies from "js-cookie";
import Deposit from "../../components/Deposit";
import HistoryDeposit from "../../components/Deposit/HistoryDeposit";

const UserDeposit = () => {
  return (
    <div className="container container-dashboard-user gap-5 d-flex flex-column">
      <div className="row p-3 content-row">
        <div className="col-12 col-lg-6">
          <h3 className="text-white title text-lg-start">Realizar deposito</h3>
        </div>
        <Deposit />
      </div>

      <div className="row p-3 content-row">
        <h3 className="title text-lg-start">Lista de depositos</h3>

        <HistoryDeposit isAdmin={Cookies.get("role") === "admin" ? true : false} />
      </div>
    </div>
  );
};

export default UserDeposit;
