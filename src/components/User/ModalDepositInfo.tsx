import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { Deposit, Withdraw } from "../../types";
import { formatTime } from "../../utils/formatTimeDate";
interface Props{
    show:boolean,
    handleClose:()=>void,
    onEdit:boolean,
    selectedDeposit:Deposit | undefined
}




const ModalDepositInfo = ({show,handleClose,onEdit,selectedDeposit}:Props) =>{
    const [deposit,setDeposit]=useState<Deposit>({
        created_at: '',
        updated_at:'',
        type: '',
        status: '',
        amount:'',
        currency: '',
        payment_id: '',
        id: ''
    })

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


    useEffect(()=>{
        if(selectedDeposit && show){
            setDeposit({
                created_at: selectedDeposit.created_at,
                updated_at:selectedDeposit.updated_at,
                type: selectedDeposit.type,
                status: selectedDeposit.status,
                amount:selectedDeposit.amount,
                currency: selectedDeposit.currency,
                payment_id: selectedDeposit.payment_id,
                id: selectedDeposit.id
            })
        }
    },[selectedDeposit,show])



  
    return(
        <Modal show={show} onHide={handleClose} className="form-modal-asset ">
        <Modal.Header closeButton>
          <Modal.Title>Informacion del deposito</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{color:'white'}}>
                <div className="row">
                    <div className="col-lg-6">
                    <label className="form-label m-0">Estado del deposito</label>
                    <p>{STATES_TRANSACTIONS[deposit.status as keyof TransactionStates]}</p>
                    </div>
                    <div className="col-lg-6 mt-2 mt-lg-0">
                        <label className="form-label m-0">Monto</label>
                        <p>${deposit.amount}</p>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-lg-6 col-12">
                        <label className="form-label m-0">Forma de pago</label>
                        <p style={{textTransform:'capitalize'}}>{deposit.type}</p>
                    </div>
                    <div className="col-lg-6 mt-2 mt-lg-0">
                        <label className="form-label m-0">Moneda</label>
                        <p style={{wordBreak:'break-all'}}>{deposit.currency}</p>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-lg-6 col-12">
                        <label className="form-label m-0">Fecha de creacion</label>
                        <p>{formatTime(deposit.created_at)}</p>
                    </div>
                    <div className="col-lg-6 col-12">
                        <label className="form-label m-0">Fecha de actualizacion</label>
                        <p>{formatTime(deposit.updated_at)}</p>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-lg-12 col-12">
                        <label className="form-label m-0">Id de la transaccion</label>
                        <p>{deposit.payment_id}</p>
                    </div>
             
                </div>


         

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{width:'100%'}}>
            Cerrar
          </Button>
          
        </Modal.Footer>
      </Modal>
    )
}

export default ModalDepositInfo