import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { AssetAdmin } from "../../../types";
interface Props{
    show:boolean,
    handleClose:()=>void,
    onEdit:boolean,
    requestAssets:(...args:any)=>void,
    selectedAsset:AssetAdmin | null | undefined
}

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { createAssetApi, editAssetApi } from "../../API/AssetApi";
import Cookies from "js-cookie";



const CreateAssetModal = ({show,handleClose,onEdit,selectedAsset,requestAssets}:Props) =>{
    const [asset,setAsset]=useState<AssetAdmin>({
        id:'',
        profit:'',
        active_id:'',
        name:'',
        type:'crypto',
        custom_profit:1,
        available_broker:'',
        in_custom:'fixed',
        created_at:'',
        updated_at:'',
        
    })

    const handleForm = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        withReactContent(Swal).fire({
            title: <b>{onEdit ? '¿Estas seguro de modificar el activo?' : '¿Estas seguro de crear el activo?'}</b>,
            showConfirmButton:true,
            showDenyButton: true,
            confirmButtonText: onEdit ? "Editar" : "Crear",
            denyButtonText: `Cancelar`
            
          }).then(async(res)=>{
            if(res.isConfirmed){
                //If create call function
                // Calculate the value based on the percentage
                const value = 1 + (Number(asset.custom_profit) / 100);
                if(onEdit === false){
                    // Try create the asset
                    const {data,status} = await createAssetApi({asset:{...asset, custom_profit:String(value), in_custom:asset.in_custom == 'fixed' ? true : false,available_broker: asset.available_broker == 'active' ? true : false  }, token:Cookies.get('token')})
                    if(status >= 400){
                        Swal.fire({
                            title: "Error",
                            text:"No se pudo agregar el activo",
                            icon: "error"
                        });
                        return
                    }else{
                        Swal.fire({
                            title: "Creado",
                            text:"Activo añadido con exito",
                            icon: "success"
                        });
                        requestAssets()
                        handleClose()
                        setAsset({
                            id:'',
                            profit:'',
                            active_id:'',
                            name:'',
                            type:'crypto',
                            custom_profit:1,
                            available_broker:'',
                            in_custom:'fixed',
                            created_at:'',
                            updated_at:'',
                        })
                        return
                    }
                }

                if(onEdit === true){
                    const {data,status} = await editAssetApi({asset:{...asset, custom_profit:String(value), in_custom:asset.in_custom == 'fixed' ? true : false,available_broker: asset.available_broker == 'active' ? true : false  }, token:Cookies.get('token')})
                    if(status >= 400){
                        Swal.fire({
                            title: "Error",
                            text:"No se pudo editar el activo",
                            icon: "error"
                        });
                        return
                    }else{
                        Swal.fire({
                            title: "Actualizado",
                            text:"Activo editado con exito",
                            icon: "success"
                        });
                        requestAssets()
                        handleClose()
                        setAsset({
                            id:'',
                            profit:'',
                            active_id:'',
                            name:'',
                            type:'crypto',
                            custom_profit:1,
                            available_broker:'',
                            in_custom:'fixed',
                            created_at:'',
                            updated_at:'',
                        })
                        return
                    }
                }


            }
          })
    
    }

    const handleField = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target
        
        setAsset({...asset,[name]:value})
    }

    useEffect(()=>{
        if(onEdit && selectedAsset){
            console.log(selectedAsset)
            setAsset({
                id:selectedAsset.id,
                profit:selectedAsset.profit,
                active_id:selectedAsset.active_id,
                name:selectedAsset.name,
                type:selectedAsset.type,
                custom_profit:Math.round((Number(selectedAsset.custom_profit) - 1) * 100),
                available_broker:selectedAsset.available_broker ? 'active' : 'inactive',
                in_custom:selectedAsset.in_custom ? 'fixed' : 'auto',
                created_at:selectedAsset.created_at,
                updated_at:selectedAsset.updated_at,
            })
        }
    },[selectedAsset,onEdit])

    useEffect(()=>{
        console.log(asset)
    },[asset])
    return(
        <Modal show={show} onHide={handleClose} className="form-modal-asset">
        <Modal.Header closeButton>
          <Modal.Title>{onEdit ? 'Editar Activo' : 'Registrar activo'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleForm} className="form-assets-admin">
                <div className="row">
                    <div className="col-lg-6">
                        <label className="form-label">Nombre</label>
                        <input className="form-control" type="text" name="name" value={asset.name} placeholder="" onChange={(e)=>{handleField(e)}}/>
                    </div>
                    <div className="col-lg-6">
                        <label className="form-label mt-2 mt-lg-0">Tipo</label>
                        <select className="form-control" defaultValue={asset.type} onChange={(e)=>{setAsset({...asset,type:e.target.value})}}>
                            <option value="crypto">Crypto</option>
                            <option value="forex">Forex</option>
                            <option value="binary">Binaria</option>
                        </select>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-lg-12">
                        <label className="form-label">Identificador de activo</label>
                        <input className="form-control" type="text" name="active_id" value={asset.active_id}  onChange={(e)=>{handleField(e)}} placeholder=""/>
                        <small className="text-white">Debe ser igual al mercado</small>
                    </div>
                </div>


                <div className="row mt-2">
                    <div className="col-lg-6">
                        <label className="form-label">Porcentage de ganacia fija</label>
                        <input className="form-control" value={asset.custom_profit} name="custom_profit" type="number" min={1} max={100}  onChange={(e)=>{handleField(e)}} placeholder=""/>
                    </div>
                    <div className="col-lg-6 d-flex flex-column align-items-start">
                        <label className="form-label mt-2 mt-lg-0">Estado del activo</label>
                        <select className="form-control" value={asset.available_broker}  name="status" onChange={(e)=>{setAsset({...asset,available_broker:e.target.value})}}>
                            <option value="active">Disponible</option>
                            <option value="inactive">No disponible</option>
                        </select>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-lg-12">
                        <label className="form-label">Comportamiento de ganacia</label>
                        <select className="form-control" value={asset.in_custom}  onChange={(e)=>{setAsset({...asset,available_broker:e.target.value})}}>
                            <option value="fixed">Fija</option>
                            <option value="auto" disabled>Automatica</option>
                        </select>
                    </div>
                </div>

                <div className="d-flex justify-content-end align-items-end mt-2">
                <Button variant="primary" type="submit" className="w-100">
                   {onEdit ?  'Actualizar datos' : 'Guardar datos'}
                </Button>
                </div>
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

export default CreateAssetModal