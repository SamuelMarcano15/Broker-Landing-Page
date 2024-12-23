import { Link } from "react-router-dom";
import HistoryDeposit from "../Deposit/HistoryDeposit";
import { createWithdraw } from "../API/PaymentsApi";
import { ChangeEvent, FormEvent, useState } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import HistoryWithdraw from "../Deposit/HistoryWithdraw";
import Cookies from "js-cookie";

type Props = {
  balance_demo: string;
  userId: string;
  balance_user: {
    balance_type: number; // 0 practice | 1 Real
    demo: string;
    real: string;
  };
  setReloadHistory:(reload:boolean)=>void
};

interface Withdraw {
  created_at: string;
  id: string;
  type: string;
  network: string;
  address: string;
  status: string;
  amount: string;
}

const WithdrawUser = ({ balance_demo, userId, balance_user, setReloadHistory }: Props) => {
  const numberPattern = /^(\d+|\d+\.\d{1,2})$/; // Matches whole numbers or decimals up to two decimal places
  const [withdraw, setWithdraw] = useState({
    type: "crypto",
    network: "ETH - ERC20",
    address: "",
    user_id: userId,
  });
  const [withdraws, setWithdraws] = useState<Withdraw[]>([]);
  const [amount, setAmount] = useState(0);
  type TransactionStates = {
    approved: string;
    reject: string;
    pending: string;
  };

  const STATES_TRANSACTIONS: TransactionStates = {
    approved: "Aprobado",
    reject: "Rechazado",
    pending: "En espera",
  };

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(withdraw);

    const { data, status } = await createWithdraw({
      ...withdraw,
      amount: String(amount),
    });
    console.log(data);
    if (status >= 400) {
      return toast.error(data.data.message);
    }

    toast.success(data.message);
    setWithdraw({
      type: "crypto",
      network: "ETH - ERC20",
      address: "",
      user_id: userId,
    });
    setAmount(0);
    setReloadHistory(true)
  };
  return (
    <div className="container container-dashboard-user gap-5 d-flex flex-column">
      <div className="row p-3 content-row">
        <div className="col-12 col-lg-6">
          <h3 className="text-white title text-lg-start">Realizar retiro</h3>
        </div>

        <div className="col-12">
          <form
            className="d-flex flex-column form-withdraw gap-2"
            onSubmit={handleForm}
          >
            <div className="row gap-y-3">
              <div className="d-flex flex-column col-12 col-lg-6">
                <label style={{ fontWeight: "600" }}>
                  Seleccione el tipo de retiro
                </label>
                <select
                  defaultValue={"crypto"}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setWithdraw({ ...withdraw, type: e.target.value });
                  }}
                >
                  <option value="crypto">Criptomoneda</option>
                </select>
              </div>

              <div className="d-flex flex-column col-12 col-lg-6">
                <label style={{ fontWeight: "600" }}>
                  Introduzca la cantidad a retirar
                </label>
                <input
                  type="number"
                  placeholder="Cantidad"
                  value={amount}
                  onKeyDown={(evt) =>
                    ["e", "E", "+", "-"].includes(evt.key) &&
                    evt.preventDefault()
                  }
                  onChange={(e) => {
                    const value = e.target.value;

                    // Validate the input
                    if (value === "") {
                      setAmount(0); // Set to 0 if input is empty
                    } else {
                      const value = e.target.value;
                      // Validate the input against the regex pattern
                      if (numberPattern.test(value) || value === "") {
                        setAmount(parseFloat(value));
                      }
                    }
                  }}
                />
              </div>

              {withdraw?.type === "crypto" ? (
                <div className="d-flex flex-column mt-1">
                  <label style={{ fontWeight: "600" }}>
                    Seleccione el tipo de red
                  </label>
                  <select defaultValue={withdraw.network}>
                    <option value="ETH - ERC20">Ethereum (ETH) - ERC20</option>
                    <option value="TRON (TRX) - ERC20">
                      TRON (TRX) - TRC20
                    </option>
                    <option value="BEP20 (BSC)">BEP20 - (BSC)</option>
                  </select>
                </div>
              ) : (
                ""
              )}

              {withdraw?.type === "crypto" ? (
                <div className="d-flex flex-column mt-1">
                  <label style={{ fontWeight: "600" }}>
                    Introduzca la direccion de la billetera
                  </label>
                  <input
                    type="text"
                    value={withdraw.address}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setWithdraw({ ...withdraw, address: e.target.value });
                    }}
                    placeholder="Direccion de la billetera"
                  />
                  <small>
                    Asegurate que tu billetera coincida con la red seleccionada
                  </small>
                </div>
              ) : (
                ""
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ fontWeight: "600", maxWidth: "100%" }}
            >
              Realizar solicitud
            </button>
          </form>
        </div>
      </div>

      <div className="content-row row p-3">
        <div className="col-12 text-center mt-4 mt-lg-0 text-lg-start">
          <HistoryWithdraw isAdmin={Cookies.get("role") === "admin" ? true : false}/>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  balance_demo: state.balance_demo,
  userId: state.userId,
  balance_user: state.balance_user,
  
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setReloadHistory(reload:boolean) {
    dispatch({
      type: "RELOAD_HISTORY",
      reload,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawUser);
