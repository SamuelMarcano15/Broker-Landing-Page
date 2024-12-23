import axios, { AxiosError } from "axios"
const API = '/api/trades'
const API_USER = '/api/user'
import Cookies from "js-cookie"
export const getHistory = async (id:string, offset:string, limit:string) =>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.get(API_USER + `/trades/list/${id}?offset=${offset}&limit=${limit}&token=${Cookies.get('token')}`, config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
} 

export const updateHistory = async (id:string) =>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.get(API + `/check/${id}`, config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
} 