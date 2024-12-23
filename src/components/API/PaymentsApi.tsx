import axios, { AxiosError } from "axios"
import Cookies from "js-cookie"
const API_PAYMENTS = '/api/payments'
const API_WITHDRAW = '/api/withdraw'
export const createCrypto = async(data:any) =>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.post(API_PAYMENTS + `/crypto/create/`, {payment:{...data},token:Cookies.get('token')}, config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}

export const verifyCrypto = async(id:string) =>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.get(API_PAYMENTS + `/crypto/updated/${id}/?token=${Cookies.get('token')}`, config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}


export const listPayments = async(id:string, offset:number, limit:number) =>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.get(API_PAYMENTS + `/${id}/list/?token=${Cookies.get('token')}`, config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}

export const checkAllPayments = async(id:string) =>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.get(API_PAYMENTS + `/${id}/check/all/?token=${Cookies.get('token')}`, config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}

export const cancelCrypto = async (id:string) =>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.get(API_PAYMENTS + `/${id}/reject/?token=${Cookies.get('token')}`, config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}

export const createWithdraw = async(data:any) =>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.post(API_WITHDRAW + `/create`, data, config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}


export const listWithdraw = async(id:string, offset:number, limit:number) =>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.get(API_WITHDRAW + `/${id}/list/?token=${Cookies.get('token')}`, config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}
