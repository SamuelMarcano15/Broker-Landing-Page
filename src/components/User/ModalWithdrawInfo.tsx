import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { Withdraw } from "../../types";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { updateWithdraw } from "../API/UserApi";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
interface Props{
    show:boolean,
    handleClose:()=>void,
    onEdit:boolean,
    selectedWithdraw:Withdraw | undefined
    isAdmin:boolean
}




const ModalWithdrawInfo = ({show,handleClose,onEdit,selectedWithdraw, isAdmin}:Props) =>{
    const [withdraw,setWithdraw]=useState<Withdraw>({
        user:null,
        amount: "",
        id: "",
        network: "",
        status: "",
        updated_at: "",
        user_id: "",
        type: "",
        reason:"",
        address: "",
        created_at: ""
    })

    const sendWithdraw = (e:FormEvent) =>{
        e.preventDefault()

        withReactContent(Swal).fire({
            title: <b>{'¿Estas seguro de actualizar los datos?'}</b>,
            showConfirmButton:true,
            showDenyButton: true,
            confirmButtonText: "Actualizar",
            denyButtonText: `Cancelar`
            
          }).then(async(res)=>{
            console.log(withdraw.status)
            if(res.isConfirmed){
                const {status,data} = await updateWithdraw({...withdraw,status:withdraw.status,admin_id:Cookies.get("user_id"), token:Cookies.get("token"), withdraw_id:withdraw.id})
                console.log('DATA',data)
                if(status === 200){
                Swal.fire({
                    title: "Actualizado",
                    text:"Informacion actualizada con exito",
                    icon: "success"
                });
                handleClose()
            }else{
                toast.error("Ocurrio un error al procesar el retiro")
            }
            }
          })
    }


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
        if(selectedWithdraw && show){
            console.log(selectedWithdraw)
            setWithdraw({
                user:null,
                amount: selectedWithdraw.amount,
                id: selectedWithdraw.id,
                network: selectedWithdraw.network,
                status: selectedWithdraw.status,
                updated_at: selectedWithdraw.updated_at,
                user_id: selectedWithdraw.user_id,
                type: selectedWithdraw.type,
                reason:selectedWithdraw?.reason || "",
                address: selectedWithdraw.address,
                created_at: selectedWithdraw.created_at
            })
        }
    },[selectedWithdraw,show])

  
    return(
        <Modal show={show} onHide={handleClose} className="form-modal-asset ">
        <Modal.Header closeButton>
          <Modal.Title>Informacion del retiro</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{color:'white'}}>
            <form onSubmit={sendWithdraw} className="form-withdraw-admin">
                <div className="row">
                    <div className="col-lg-6">
                        <label className="form-label m-0">Monto</label>
                        <p>${withdraw.amount}</p>
                    </div>
                    <div className="col-lg-6 mt-2 mt-lg-0">
                        <label className="form-label m-0">Estado</label>
                        <p>{STATES_TRANSACTIONS[withdraw.status as keyof TransactionStates]}</p>
                    </div>
                </div>

                <div className="row mt-0 mt-lg-2">
                    <div className="col-lg-6 col-12 mt-2 mt-lg-0">
                        <label className="form-label m-0">Red</label>
                        <p>{withdraw.network}</p>
                    </div>
                    <div className="col-lg-6 mt-2 mt-lg-0">
                        <label className="form-label m-0">Tipo</label>
                        <p style={{wordBreak:'break-all', textTransform:'capitalize'}}>{withdraw.type}</p>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-lg-12 col-12">
                        <label className="form-label mb-0">Direccion de wallet</label>
                        <p>{withdraw.address}</p>
                    </div>
                    <div className="col-lg-12 col-12 mt-2">
                        <label className="form-label mb-0">Identificador</label>
                        <p>{withdraw.id}</p>
                    </div>
                </div>
            { isAdmin ?
                <div className="row mt-2">
                    <div className="col-lg-12 col-12">
                        <label className="form-label mb-0">Estado de la solicitud</label>
                        <select className="form-control field" onChange={(e)=>{setWithdraw({...withdraw,status:e.target.value})}} value={withdraw.status}>
                            <option value="approved">Aprobado</option>
                            <option value="pending">En espera</option>
                            <option value="reject">Rechazado</option>
                        </select>
                    </div>
                    <div className="col-lg-12 col-12 mt-2 d-flex flex-column">
                        <label className="form-label mb-0">Razon (uso administrativo)</label>
                        <textarea className="form-control" value={withdraw?.reason} onChange={(e)=>{setWithdraw({...withdraw,reason:e.target.value})}}>{withdraw?.reason}</textarea>
                    </div>
                </div> : ''
        }

         <button type="submit" className="btn btn-primary w-100 mt-4">Actualizar</button>
         </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{width:'100%'}}>
            Cerrar
          </Button>
          
        </Modal.Footer>
      </Modal>
    )
}

export default ModalWithdrawInfo