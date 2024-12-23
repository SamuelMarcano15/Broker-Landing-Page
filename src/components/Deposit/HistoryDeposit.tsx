import { useEffect, useState } from "react";
import ClockIcon from "../icons/ClockIcon";
import { checkAllPayments, listPayments } from "../API/PaymentsApi";
import { toast } from "react-toastify";
import { formatTimestamp } from "../../utils/formatTimeDate";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import ModalDepositInfo from "../User/ModalDepositInfo";
import { Deposit } from "../../types";
import { useParams } from "react-router-dom";

type Props = {
  balance_demo: string;
  userId: string;
  balance_user: {
    balance_type: number; // 0 practice | 1 Real
    demo: string;
    real: string;
  };
  reloadHistory: boolean;
  setReloadHistory: (reload: boolean) => void;
  isAdmin:boolean
};



const HistoryDeposit = ({
  balance_demo,
  userId,
  balance_user,
  reloadHistory,
  setReloadHistory,
  isAdmin
}: Props) => {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  type TransactionStates = {
    waiting: string;
    confirming: string;
    confirmed: string;
    sending: string;
    partially_pay: string;
    finished: string;
    failed: string;
    refunded: string;
    expired: string;
  };

  const STATES_TRANSACTIONS: TransactionStates = {
    waiting: "En espera",
    confirming: "En confirmacion",
    confirmed: "Confirmada",
    sending: "Enviando... continue consultado el estado de pago",
    partially_pay: "Parcialmente pagado",
    finished: "Finalizada",
    failed: "Fallida",
    refunded: "Reintegrado",
    expired: "Expirada",
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [show,setShow] = useState(false)
  const [selectedDeposit,setSelectedDeposit] = useState<Deposit>()
  const { id } = useParams();

  const requestDeposits = async (offset: number, limit: number) => {
    if(loading) return
    setLoading(true);
    try {
      // first fetch check payments
      const check = await checkAllPayments((isAdmin ? id : userId) || '')
      if(check.status > 400){
        setLoading(false);
        return toast.error("No se pudieron encontrar las transacciones");
      }
      const { data, status } = await listPayments((isAdmin ? id : userId) || '', offset, limit);
      if (status > 400) {
        setLoading(false);
        return toast.error("No se pudieron encontrar las transacciones");
      }

      setDeposits(data.payments);
      setLoading(false);
      console.log(data);
    } catch (e) {
      setLoading(false);
      return toast.error("No se pudieron consultar las transacciones");
    }
  };

  useEffect(() => {
    //requestDeposits(0, 10);
    //setLoading(true)
  }, []);

  
  useEffect(() => {
    if (reloadHistory && !loading) {
      setReloadHistory(false);
      requestDeposits(0, 10);
    }
  }, [reloadHistory, loading]);

  const handleModalOpen = (el:Deposit)=>{
    console.log(el)
    setSelectedDeposit(el)
    setShow(true)
  }

  const handleModalClose = ()=>{
    setShow(false)
  }

  const handleNextPage = () => {
    if (deposits.length < limit) {
      return toast.warning("No hay mas transacciones registradas");
    }

    if (deposits.length > 9) {
      setOffset((prev) => prev + limit);
    } else {
      toast.warning("No hay mas transacciones registradas");
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
    requestDeposits(offset, limit);
  }, [offset, limit]);
  return (
    <>
    <ModalDepositInfo show={show} selectedDeposit={selectedDeposit} onEdit={true} handleClose={handleModalClose}/>
    <div className="d-flex flex-column" style={{ paddingTop: "10px" }}>
      <div className="d-flex flex-column gap-2 list-deposit">
        {deposits.map((el, i) => {
          if (!el.created_at) return "";
          return (
            <div className="deposit-detail" key={i} onClick={()=>{handleModalOpen(el)}}>
              <div className="d-flex justify-content-between  flex-wrap w-100" style={{borderBottom: '1px solid #a5a5a5',
    marginBottom: '5px',
    paddingBottom: '2px'}}>
                <p style={{ fontSize: "15px" }}>
                  <ClockIcon
                    style={{ marginRight: "3px", marginTop: "-1px" }}
                  />
                  {formatTimestamp(new Date(el.created_at).getTime() / 1000)}
                </p>
                <p style={{ textTransform: "capitalize" ,fontWeight:'600' }}>
                  {STATES_TRANSACTIONS[el.status as keyof TransactionStates]}
                </p>
              </div>

              <div className="d-flex justify-content-between flex-wrap align-items-center w-100">
                <div className="asset text-start d-flex flex-column">
                  <span style={{ textTransform: "capitalize", fontWeight:'500', fontSize:'16px' }}>{el.type}</span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#bbbbbb",
                      fontWeight: "600",
                    }}
                  >
                    {el.currency}
                  </span>
                </div>
                <p
                  className="amount"
                  style={{
                    color:
                      el.status == "confirmed"
                        ? "#64f964"
                        : el.status == "expired"
                        ? "#f14848"
                        : "#9b9b9b",
                    fontWeight: "500",
                  }}
                >
                  ${el.amount}
                </p>
              </div>
              <small>Identificador: {el.payment_id}</small>
            </div>
          );
        })}

        {deposits.length === 0 && loading === false ? (
          <div className="d-flex flex-column">
            <h3
              className="text-white text-center text-lg-start"
              style={{ fontSize: "21px" }}
            >
              No se han encontrado depositos registrados
            </h3>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="d-flex flex-lg-wrap flex-column flex-lg-row justify-content-lg-between mt-3 gap-3">
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
        {deposits.length > 9 ? (
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
    </>
  );
};

const mapStateToProps = (state: any) => ({
  balance_demo: state.balance_demo,
  userId: state.userId,
  balance_user: state.balance_user,
  reloadHistory: state.reloadHistory,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setReloadHistory(reload: boolean) {
    dispatch({
      type: "RELOAD_HISTORY",
      reload,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDeposit);
