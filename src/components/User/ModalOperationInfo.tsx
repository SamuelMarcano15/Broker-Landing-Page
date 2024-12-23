import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { TradeHistory, Withdraw } from "../../types";
import { formatTime } from "../../utils/formatTimeDate";
interface Props{
    show:boolean,
    handleClose:()=>void,
    onEdit:boolean,
    selectedOperation:TradeHistory | undefined
}


const ModalOperationInfo = ({show,handleClose,onEdit,selectedOperation}:Props) =>{
    const [operation,setOperation]=useState<TradeHistory>({
        asset:{
            name: '',
            status: false,
            active_id: "",
            id: "",
            type: "",
            image: "",
            profit: 0,
            show: false
        },
        asset_name:'',
        time_start: 0,
        entry:'',
        close: '',
        operation_id: '',
        winner: false,
        amount: '',
        type_asset: '',
        user_id: '',
        time_end: 0,
        asset_id: '',
        direction: '',
        income: '',
        is_verified: false,
        created_at:'',
        closed_at:'',
    })

    type TransactionStates = {
        approved: string;
        reject: string;
        pending: string;
        waiting:string;
      };

      const STATES_TRANSACTIONS:TransactionStates = {
        approved: "Aprobado",
        reject: "Rechazado",
        waiting:"En espera",
        pending: "En espera",
      };



    useEffect(()=>{
        if(selectedOperation && show){
            console.log(selectedOperation)
            setOperation({
                asset:selectedOperation.asset,
                asset_name:selectedOperation.asset_name,
                time_start: selectedOperation.time_start,
                entry:selectedOperation.entry,
                close: selectedOperation.close,
                operation_id: selectedOperation.operation_id,
                winner: selectedOperation.winner,
                amount: selectedOperation.amount,
                type_asset: selectedOperation.type_asset,
                user_id: selectedOperation.user_id,
                time_end: selectedOperation.time_end,
                asset_id: selectedOperation.asset_id,
                direction: selectedOperation.direction,
                income: selectedOperation.income,
                is_verified: selectedOperation.is_verified,
                created_at:selectedOperation.created_at,
                closed_at:selectedOperation.closed_at,
            })
        }
    },[selectedOperation,show])

  
    return(
        <Modal show={show} onHide={handleClose} className="form-modal-asset ">
        <Modal.Header closeButton>
          <Modal.Title>Informacion de la operacion</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{color:'white'}}>
                <div className="row">
                    <div className="col-lg-6">
                        <label className="form-label m-0">Activo</label>
                        <p>{operation.asset.name} - {operation.asset.type}</p>
                    </div>
                    <div className="col-lg-6 mt-2 mt-lg-0">
                        <label className="form-label m-0">Monto</label>
                        <p>${operation.amount}</p>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-lg-6 col-12">
                        <label className="form-label m-0">Entrada</label>
                        <p>{operation.entry}</p>
                    </div>
                    <div className="col-lg-6 mt-2 mt-lg-0">
                        <label className="form-label m-0">Cerrada</label>
                        <p style={{wordBreak:'break-all'}}>{operation.close}</p>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-lg-6 col-12">
                        <label className="form-label m-0">Fecha de Apertura</label>
                        <p>{formatTime(operation.created_at)}</p>
                    </div>
                    <div className="col-lg-6 col-12 mt-2 mt-lg-0">
                        <label className="form-label m-0">Fecha de Cierre</label>
                        <p>{formatTime(operation.closed_at)}</p>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-lg-6 col-12">
                        <label className="form-label m-0">Direccion</label>
                        <p>{operation.direction === "up" ? "Arriba" : "Abajo"}</p>
                    </div>
                    <div className="col-lg-6 col-12 mt-2 mt-lg-0">
                        <label className="form-label m-0">Ingreso</label>
                        <p>${operation.income}</p>
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

export default ModalOperationInfo