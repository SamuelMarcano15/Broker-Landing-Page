import { useState,useEffect } from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";
import ClockIcon from "../icons/ClockIcon";
import { Button, Modal } from "react-bootstrap";
import { cancelCrypto, verifyCrypto } from "../API/PaymentsApi";


type Props ={
    paymentId:string
    cleanAll:(...args:any)=>void
    timeStart:string
    timeEnd:string
    show:boolean
    transaction:{
      pay_amount:number,
      created_at:string,
      expiration_estimate_date:string,
      network:string,
      order_description:string,
      pay_address:string,
      pay_currency:string,
      payment_id:string,
      payment_status:string
    }
}

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



const ModalCrypto = ({paymentId, cleanAll,timeStart,timeEnd, show, transaction}:Props) =>{
  const [timeRestant, setTimeRestant] = useState(new Date(timeEnd).getTime() - new Date(timeStart).getTime());
  const [inRequest,setInRequest] = useState(false)


  const [status,setStatus] = useState({lastUpdated:new Date()})
  const CHECK_TRANSACTIONS = ["waiting", "failed", "expired", "refunded","sending","confirming","partially_pay"]; // Not call functions if exists this states


  const STATES_TRANSACTIONS:TransactionStates = {
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
  const [transactionFinished,setTransactionFinished] = useState(false)
  const minutes = Math.floor(timeRestant / (1000 * 60));
  const seconds = Math.floor((timeRestant % (1000 * 60)) / 1000);
  const padL = (nr: any, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

  const checkPayment = async () => {

   if(inRequest) return
   setInRequest(true)
   try {
     const {data, status} = await verifyCrypto(paymentId)

     setStatus({lastUpdated: new Date() });
     if (status > 400) {
       setInRequest(false)
       return toast.error("No se pudo obtener el estado de la transaccion, intente de nuevo.");
     }

     const response = await data.payment;

     if(!CHECK_TRANSACTIONS.includes(response.payment_status)){
      toast.success("Deposito completado con exito!")
     }

     //console.log('Data al servidor', sendDataNew)



     setInRequest(false)
     //console.log(sendData);
   } catch (err) {
     setInRequest(false)
     toast.error("Ocurrio un error al comprobar su pago, intente nuevamente")
   }
 };

  useEffect(() => {
    //console.log(props);
    if(show){
      setStatus({lastUpdated: new Date() });
    }
  }, [show]);


  useEffect(() => {
    let intervalId: number | undefined;

    if (show) {
      intervalId = setInterval(() => {
        checkPayment()
      }, 30000); // Every 30 seg check the status from the pay
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [show]);

  useEffect(() => {
    // Countdown timer
    if (timeStart && timeEnd) {
      setTimeRestant(new Date(timeEnd).getTime() - new Date(timeStart).getTime());

      const countdown = setInterval(() => {
        setTimeRestant((prevTime) => {
          if (prevTime === 0) {
            checkPayment();
          }
          return prevTime - 1000;
        });
      }, 1000);

      return () => {
        clearInterval(countdown);
      };
    }
  }, [timeStart,timeEnd]);
  const handleClose = async ()=>{
    if (
      window.confirm(
        "Estas seguro de cerrar la ventana? esto eliminara el proceso de pago si aun no has hecho el deposito"
      )
    ) {
      await cancelCrypto(paymentId)
      cleanAll()
    }
  }
  return (
    <>
     <Modal show={show} onHide={handleClose} className="modal-crypto">
        <Modal.Header closeButton>
          <Modal.Title>Proceso de deposito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-column text-start text-lg-center gap-2 mb-1" style={{fontSize:'14px'}}>
              <p>
              Tienes una cierta cantidad de tiempo para realizar el deposito de la
              transacción. según la siguiente información.
            </p>
            <p>
              Es importante que verifiques los datos antes de realizar la
              transferencia, Si comete un error, es posible que pierda sus fondos.
            </p>
            </div>
         
          <div className="d-flex flex-lg-row flex-column text-start">
            <div className="d-flex flex-column col-12 col-lg-6">
              <label style={{fontWeight:'600'}}>Estado de la transaccion</label>
              <p>{STATES_TRANSACTIONS[transaction.payment_status as keyof TransactionStates]}</p>
            </div>
            <div className="d-flex flex-column col-12 col-lg-6">
              <label style={{fontWeight:'600'}}>Moneda para pagar</label>
              <p style={{textTransform:'uppercase'}}>{transaction.pay_currency}</p>
            </div>
          </div>
          <div className="d-flex flex-lg-row flex-column text-start ">
            <div className="d-flex flex-column col-12 col-lg-6">
              <label style={{fontWeight:'600'}}>Monto de pago</label>
              <p>{transaction.pay_amount}</p>
              <small>¡Solo envie el monto indicado!</small>
            </div>
            <div className="d-flex flex-column col-12 col-lg-6">
              <label style={{fontWeight:'600'}}>Descripción</label>
              <p>{transaction.order_description}</p>
            </div>
          </div>
          <div className="col-12 d-flex flex-column">
            <p className="label mb-1 text-center">Dirección de envio del pago:</p>
            <div className="d-flex flex-column justify-content-center gap-2">
            <div style={{padding:'20px', background:'white',  maxWidth: 'max-content', margin:'auto'}}>
            <QRCode size={175} value={`${transaction.pay_address}`} />
            </div>
              <p
                id="wallet_direction"
                style={{
                  wordBreak: "break-word",
                  marginBottom: "4px",
                  fontWeight: "600",
                  textAlign:'center'
                }}
              >
                {transaction.pay_address}
              </p>
              <button
                className="button-send btn btn-primary"
                style={{ fontWeight: "600", display:'flex', justifyContent:'center', gap:'6px' }}
                onClick={async () => {
                  // Get the text field
                  await navigator.clipboard.writeText(transaction.pay_address);
                  alert("Direccion copiada: " + transaction.pay_address);
                }}
              >
                Copiar dirección 
              </button>
            </div>
          </div>

            <div className="col-12 d-flex flex-column">
            <p className="label mb-1 text-center">
              Tiempo restante para completar la transacción:
            </p>
            <div className="d-flex flex-wrap gap-2 text-center align-items-center justify-content-center">
            <ClockIcon style={{fill:'#fff'}}/><p
                style={{
                  display: minutes <= 0 && seconds <= 0 ? "none" : "flex",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                {minutes < 10 ? "0" + minutes : minutes}:
                {seconds < 10 ? "0" + seconds : seconds}
              </p>
              <p
                style={{
                  display: minutes <= 0 && seconds <= 0 ? "flex" : "none",
                  fontWeight: "600",
                }}
              >
                Tiempo expirado, pero puede seguir consultado el estado de su
                transaccion
              </p>
            </div>

            <div className="d-flex flex-column">
            <button
                className="button-send mt-2 btn btn-primary"
                style={{ fontWeight: "600", display:'flex', justifyContent:'center', gap:'6px' }}
                onClick={async () => {
                  await checkPayment()
                }}
              >
                Comprobar estado del pago
              </button>
            </div>
          </div>

          <div className="col-12">
            <p className="text-center text-white mb-1">
              El estado de su transacción es:
              <span style={{ textTransform: "capitalize", fontWeight: "600" }}>
                {" "}
                {STATES_TRANSACTIONS[transaction.payment_status as keyof TransactionStates]}
              </span>
            </p>
            <p
              className="text-center text-white mb-1"
              style={{ fontWeight: "600" }}
            >
              Última actualización:{" "}
              {`${padL(status.lastUpdated.getMonth() + 1)}/${padL(
                status.lastUpdated.getDate()
              )}/${status.lastUpdated.getFullYear()} ${padL(
                status.lastUpdated.getHours()
              )}:${padL(status.lastUpdated.getMinutes())}:${padL(
                status.lastUpdated.getSeconds()
              )}`}
            </p>
          </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar transaccion
          </Button>
 
        </Modal.Footer>
      </Modal>
      
 
    </>
  );

}


export default ModalCrypto