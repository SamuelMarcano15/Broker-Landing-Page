import Cookies from "js-cookie";
import OperationsHistory from "../../components/User/OperationsHistory";
import { Link, useParams } from "react-router-dom";

type Props ={
  isAdmin:boolean
}

const UserOperations = ({isAdmin}:Props) => {
  const {id} = useParams()
  return (
    <div className="container container-dashboard-user gap-5 d-flex flex-column">
      <div className="row p-3 content-row">
        <div className="row">
          <div className="col-12 col-lg-6">
            <h3 className="text-white title text-lg-start">Historial de operaciones</h3>
          </div>
        { isAdmin ?
          <div className="col-12 col-lg-6 d-flex align-items-end justify-content-center justify-content-lg-end">
            <Link className="btn btn-primary d-flex align-items-center justify-content-center" to={`/admin/user/${id}/dashboard`}>Dashboard</Link>
          </div> : ''}
        </div>
        
       <OperationsHistory isAdmin={isAdmin}/>
      </div>

    </div>
  );
};

export default UserOperations;
