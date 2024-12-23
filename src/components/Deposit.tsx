import { ChangeEvent, useState, useEffect, FormEvent } from "react";
import Select, { components } from "react-select";
import { balanceUser, optionsSelect, TransactionCrypto } from "../types";
import {toast} from 'react-toastify'
import { connect } from "react-redux";
import { Dispatch } from "redux";
import ModalCrypto from "./Deposit/ModalCrypto";
import { createCrypto } from "./API/PaymentsApi";
type Props ={
  balance_user:balanceUser
  userId:string
}

const Deposit = ({balance_user,userId}:Props) => {
  const API_KEY_NOWPAYMENTS = 'FNR55V2-JJPM6JT-JB7J8WF-6M2NXNE'
  const numberPattern = /^(\d+|\d+\.\d{1,2})$/; // Matches whole numbers or decimals up to two decimal places
  const [paymentMethod, setPaymentMethod] = useState("crypto");
  const [customerInfo, setCustomerInfo] = useState({ country: "" });
  const [activeTransaction,setActiveTransaction] = useState(false)
  const [showModalCrypto,setShowModalCrypto] = useState(false)
  const [transactionCrypto,setTransactionCrypto] = useState<TransactionCrypto>({pay_amount:0,
    created_at:'',
    expiration_estimate_date:'',
    pay_currency_format:'',
    network:'',
    order_description:'',
    pay_address:'',
    pay_currency:'',
    payment_id:'',
    payment_status:''})
  const [currencies, setCurrencies] = useState<any[]>([
    { value: "crypto", label: "criptomonedas" },
  ]);


  const [amount, setAmount] = useState(1);
  const [payOptions] = useState([
    {
      value: "crypto",
      label: "Criptomonedas",
    },
    {
      value: "card",
      label: " Tarjetas de crédito / débito",
      icons: [],
      isDisabled: true,
    },
  ]);

  const cleanAll = ()=>{
    setTransactionCrypto({pay_amount:0,
      created_at:'',
      expiration_estimate_date:'',
      network:'',
      pay_currency_format:'',
      order_description:'',
      pay_address:'',
      pay_currency:'',
      payment_id:'',
      payment_status:''})
    setShowModalCrypto(false)
  }



  const [currencieFormat, setCurrencieFormat] = useState("");

  const [criptoTransaction, setCriptoTransaction] = useState({
    price_amount: amount,
    price_currency: "usd",
    pay_currency: "",
    pay_currency_format:"",
    ipn_callback_url: "https://nowpayments.io",
    is_fee_paid_by_user: false,
    is_fixed_rate: false,
    order_id: `${localStorage.getItem("email") || "rafa"}`,
    order_description: `${localStorage.getItem("email") || "rafa"}`,
  });

  const handleFormCrypto = async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(activeTransaction) return
    setActiveTransaction(true)
    if (criptoTransaction.pay_currency === "") {
        setActiveTransaction(false)
        return toast.error("Debes seleccionar una moneda de pago");
      }

      if (Number(amount) < 10) {
        setActiveTransaction(false)
        return toast.error("El deposito debe de ser mayor o igual a $10");
      }

      const toastId = toast.loading("Generando transaccion")


      try {

        const res = await createCrypto({...criptoTransaction,price_amount:String(amount),user_id:userId,
            is_fee_paid_by_user: false,country:customerInfo.country})
  
        if (res.status > 400) {
          toast.update(toastId, {render: "Error al crear la transaccion, intenta con otra moneda", type: "error", isLoading: false, closeOnClick:true, autoClose:3000});
          setActiveTransaction(false)
          return console.log(
            "Error al crear la transaccion, intenta con otra moneda"
          );
        }
        const response = await res.data.payment;
        console.log('RESPONSE',response)

        setTransactionCrypto({pay_amount:response.pay_amount,
          created_at:response.created_at,
          expiration_estimate_date:response.expiration_estimate_date,
          network:response.network,
          order_description:response.order_description,
          pay_address:response.pay_address,
          pay_currency:response.pay_currency,
          pay_currency_format:criptoTransaction.pay_currency_format,
          payment_id:response.payment_id,
          payment_status:response.payment_status})
          setShowModalCrypto(true)
          setActiveTransaction(false)
          toast.update(toastId, {render: "Transaccion generada", type: "success", isLoading: false, closeOnClick:true, autoClose:3000});
      } catch (err) {
        setActiveTransaction(false)
        return toast.update(toastId, {render: "Error al crear la transaccion, intenta con otra moneda", type: "error", isLoading: false, closeOnClick:true, autoClose:6000});
      }
  }

  const { Option, SingleValue } = components;

  const IconOption = (props: any) => (
    <Option
      {...props}
      isOptionDisabled={props.data.isDisabled}
      isDisabled={props.data.isDisabled}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {props.data.label}

        {props.data.icons
          ? props.data.icons.map((el: any, index: number) => {
              return (
                <img
                  key={index}
                  src={el}
                  style={{
                    objectFit: "contain",
                    height: 24,
                    marginLeft: "5px",
                  }}
                  alt={props.data.label}
                />
              );
            })
          : ""}
      </div>
    </Option>
  );

  const ValueOption = (props: any) => (
    <SingleValue {...props}>
      {props.data.label}{" "}
      {props.data.icons
        ? props.data.icons.map((el: any, index: number) => {
            return (
              <img
                key={index}
                src={el}
                style={{
                  objectFit: "contain",
                  height: 22,
                  marginLeft: "7px",
                  marginTop: "-3px",
                }}
                alt={props.data.label}
              />
            );
          })
        : ""}
    </SingleValue>
  );

  const handleSelectCountry = (data: any) => {
    setCustomerInfo({ ...customerInfo, country: data.value });
  };

  const handleCurrencySelected = (data: any) => {
    setCurrencieFormat(data.label);
    setCriptoTransaction({ ...criptoTransaction, pay_currency: data.value, pay_currency_format:data.label });
  };

  const selectStyle = {
    control: (provided: any, state: any) => ({
      ...provided,
      background: "#1c253b",
      textColor: "#ffffff",
      color: "#ffffff !important",
      border: state.isFocused ? "1px solid #3e69c9" : "1px solid #4f969c",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "none" : "none",
      "&:hover": {
        border: state.isFocused ? "1px solid #3e69c9" : "1px solid #4f969c",
      },
      "&:focus": {
        border: state.isFocused ? "1px solid #3e69c9" : "1px solid #4f969c",
      },
    }),

    input: (provided: any) => ({
      ...provided,
      color: "white",
    }),

    placeholder: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "white", // Custom colour
    }),
    option:  (provided: any, state:any) => ({
        ...provided,
        padding:10,
        margin:0,
        color:'#fff',
        background: state.isFocused ? "#3e69c9" : '#293041',
        zIndex: 1
    }),
  };

  const selectStylePayments = {
    control: (provided: any, state: any) => ({
      ...provided,
      background: "#1c253b",
      textColor: "white",
      color: "white !important",
      border: state.isFocused ? "1px solid #3e69c9" : "1px solid #4f969c",
      borderRadius: "8px",
      boxShadow: state.isFocused ? "none" : "none",
      "&:hover": {
        border: state.isFocused ? "1px solid #3e69c9" : "1px solid #4f969c",
      },
      "&:focus": {
        border: state.isFocused ? "1px solid #3e69c9" : "1px solid #4f969c",
      },
    }),

    option:  (provided: any, state:any) => ({
        ...provided,
        padding:10,
        margin:0,
        background: state.isFocused ? "#3e69c9" : '#293041',
        color: state.isDisabled ? '#959595' : '#ffffff',
        zIndex: 1
    }),

    input: (provided: any) => ({
      ...provided,
      color: "white",
    }),

    placeholder: (provided: any) => ({
      ...provided,
      color: "white",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: "white", // Custom colour
    }),
  };

  useEffect(() => {
    //Obtain all currencies on the list
    const getAllCurrency = async () => {
      const list = {
        currencies: [
          {
            code: "USDTTRC20",
            network: "trx",
            ticker: "usdt - trc20",
          },
          {
            code: "BTC",
            ticker: "btc",
            network: "btc",
          },
          {
            code: "ETH",
            ticker: "eth",
            network: "eth",
          },
          {
            code: "USDTERC20",
            network: "eth",
            ticker: "usdt - erc20",
          },
        ],
      };
      const data = list.currencies.map((el) => {
        return {
          value: el.code,
          label: `${el.ticker?.toUpperCase()}  ${
            el.ticker?.toUpperCase() === el.network?.toUpperCase()
              ? ""
              : `- ${el.network?.toUpperCase()}`
          }`,
        };
      });
      setCurrencies(data);
    };

    getAllCurrency();
  }, []);

  return (
    <div className="d-flex flex-column gap-3 position-relative">
    <ModalCrypto paymentId={transactionCrypto.payment_id} timeStart={transactionCrypto.created_at} timeEnd={transactionCrypto.expiration_estimate_date} show={showModalCrypto} transaction={transactionCrypto} cleanAll={cleanAll}/>
    <div className="d-flex flex-column text-white">

      <div className="d-flex flex-column">


        <div className="d-flex flex-column">
          <p style={{    fontSize: '18px',
    fontWeight: '600',
    marginTop: '12px'}}>Seleccione una forma de pago</p>
        
          <div className="container-paymethods mt-2">
            <label className="mb-1" style={{fontWeight:'600'}}>Métodos de pago</label>
            <Select
              options={payOptions}
              styles={selectStylePayments}
              onChange={(e: any) => {
                //console.log(e);
                if (e.disabled) {
                  return;
                }
                setPaymentMethod(e.value);
              }}
              defaultValue={paymentMethod}
              components={{ Option: IconOption, SingleValue: ValueOption }}
              placeholder={
                <div>
                  {payOptions[0].label}{" "}
                  {payOptions[0].icons
                    ? payOptions[0].icons.map((el, index) => {
                        return (
                          <img
                            key={index}
                            src={el}
                            style={{
                              objectFit: "contain",
                              height: 22,
                              marginLeft: "7px",
                              marginTop: "-3px",
                            }}
                            alt={payOptions[0].label}
                          />
                        );
                      })
                    : ""}
                </div>
              }
              theme={(theme) => ({
                ...theme,
                borderRadius: 10,
                colors: {
                  ...theme.colors,
                  //after select dropdown option
                  primary50: "#1c253b",

                  //Text color
                  neutral80: "#F4FFFD",
                },
              })}
            />
          </div>

          {paymentMethod === "crypto" && (
            <form className="form-crypto" onSubmit={handleFormCrypto}>
              <div className="container-input-field">
                <label className="mt-2 mb-1" style={{fontWeight:'600'}} htmlFor="price-currency">
                  Moneda de pago
                </label>

                <Select
                  options={currencies}
                  styles={selectStyle}
                  onChange={handleCurrencySelected}
                  defaultValue={criptoTransaction.pay_currency}
                  placeholder={<div>Elige una moneda</div>}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 10,
                    colors: {
                      ...theme.colors,
                      //after select dropdown option
                      primary50: "#fff",

                      //Text color
                      neutral80: "#fff",
                    },
                  })}
                />

                <div className="d-flex flex-column mt-2">
                  <label style={{fontWeight:'600'}}>
                    Introduce la cantidad a depositar (USD)
                  </label>
                  <input
                    className="form-control mt-1"
                    type="number"
                    min={1}
                    maxLength={3}
                    value={amount}
                    onKeyDown={(evt) =>
                      ["e", "E", "+", "-"].includes(evt.key) &&
                      evt.preventDefault()
                    }
                    style={{background: '#1c253b',
                      color: 'white',
                      boxShadow: 'none'}}
                    onChange={(e) => {
                      const value = e.target.value;

                      // Validate the input
                      if (value === "") {
                        setAmount(1); // Set to 1 if input is empty
                      } else {
                        const value = e.target.value;
                        // Validate the input against the regex pattern
                        if (numberPattern.test(value) || value === "") {
                          setAmount(parseFloat(value));
                        }
                      }
                    }}
                  ></input>
                  <small>Cantidad minima de deposito: $10</small>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-4" style={{maxWidth:'unset'}}>
                  Pagar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>


    </div>
  );
};


const mapStateToProps = (state:any) => ({
  balance_demo:state.balance_demo,
  userId:state.userId,
  balance_user:state.balance_user
});

const mapDispatchToProps = (dispatch:Dispatch) => ({
  updateStatus(balance_type:number,demo:string,real:string){
      dispatch({
        type:'UPDATE_STATUS_USER',
        balance_type,
        demo,
        real
      })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Deposit);
