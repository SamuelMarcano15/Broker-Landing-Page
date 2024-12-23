import axios, { AxiosError } from "axios"
const API = '/api/user'
const API_WITHDRAW = '/api/withdraw'
const API_OPERATION = '/api/operation'
import Cookies from "js-cookie"
export const CheckAccount = async (user_id:string) =>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.post(API + `/verify/token`,{user_id}, config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
} 

export const CheckAccountAdmin = async () =>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.post('/api/assets' + `/validate/token/admin`,Cookies.get('token'), config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
} 


export const createAccount = async (data:any) =>{
    try {
        const res = await axios.post(API + `/register`, data)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
} 

export const listUsersAdmin = async (offset:string, limit:string,email:string)=>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.get(API + `/list/?offset=${offset}&limit=${limit}${email ? `&email=${email}` : ''}&token=${Cookies.get('token')}`, config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}

export const listWithdrawAdmin = async (offset:string, limit:string,email:string)=>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.get(API_WITHDRAW + `/list/?offset=${offset}&limit=${limit}${email ? `&email=${email}` : ''}&token=${Cookies.get('token')}`, config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}

export const updateWithdraw = async (data:any)=>{
    try {
        const res = await axios.post(API_WITHDRAW + `/update`, data)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}

export const loginAccount = async (data:any) =>{
    try {
        const res = await axios.post(API + `/login`, data)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
} 

export const CheckBalance = async (user_id:string) =>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        console.log(user_id)
        const res = await axios.get(API_OPERATION + `/${user_id}/balance`, config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
} 


export const ChangeBalance = async (user_id:string,mode:string) =>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.get(API_OPERATION + `/${user_id}/change/mode/${mode}`, config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
} 


export const RefillDemo = async (user_id:string)=>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.get(API_OPERATION + `/${user_id}/balance/demo/refill`,config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}


export const infoUser = async(user_id:string)=>{
    try {
        const config = {headers:{"Authorization":`Bearer ${Cookies.get('token')}`}}
        const res = await axios.get(API + `/data/admin?user_id=${user_id}&token=${Cookies.get('token')}`,config)
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}

export const createUserAdmin = async (user:any)=>{
    try {
        const res = await axios.post(API + `/create`, {user:user, token:Cookies.get("token")})
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}

export const updateUser = async (user:any,user_id:string) =>{
    try {
        const res = await axios.put(API + `/update/user/?user_id=${user_id}`, {...user, token:Cookies.get("token")})
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}

export const updateUserAdmin = async (user:any,user_id:string) =>{
    try {
        const res = await axios.put(API + `/update/admin/?user_id=${user_id}`, {...user, token:Cookies.get("token")})
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}

export const blockUserAdmin = async (block:any,user_id:string)=>{
    try {
        const res = await axios.put(API + `/update/user/block/?user_id=${user_id}`, {...block, token:Cookies.get("token")})
        return {data:res.data, status:res.status}
    } catch (error) {
        const err = error as AxiosError
        console.log(err.response?.data)
        return {data:err.response, status:500}
    }
}