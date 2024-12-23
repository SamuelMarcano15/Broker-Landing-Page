import axios, { AxiosError } from "axios"
import Cookies from "js-cookie"
const API_ASSETS = '/api/assets'
export const createAssetApi = async (data:any) =>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.post(API_ASSETS + `/create`, data, config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}

export const editAssetApi = async (data:any) =>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.put(API_ASSETS + `/update/${data.asset.id}`, data, config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}

export const listAssetApi = async (offset:number,limit:number) =>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.get(API_ASSETS + `/read/list?token=${Cookies.get('token')}&offset=${offset}&limit=${limit}`, config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}