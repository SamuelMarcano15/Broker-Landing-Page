import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'
import { connect } from "react-redux";
import { Dispatch } from "redux";
type Props ={
    setUserId:(...args:any)=>void
    setEmail:(...args:any)=>void
    setNavId:(...args:any)=>void
  }
const Logout = ({setUserId,setEmail, setNavId}:Props) =>{
    const navigate = useNavigate()
    useEffect(()=>{
        setUserId("")
        setEmail("")
        setNavId("")
        Cookies.remove('role')
        Cookies.remove('user_id')
        Cookies.remove('token')
        Cookies.remove("username")
        navigate('/login')
    },[])
    return(
        <div>

        </div>
    )
}

const mapStateToProps = (state: any) => ({
    userId: state.userId,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
  
  
    setUserId(id:string){
      dispatch({
        type:'SET_USER_ID',
        id
      })
    },

    setEmail(email:string){
        dispatch({
          type:'SET_EMAIL_USER',
          email
        })
      },

      setNavId(id:string){
        dispatch({
            type:'SET_NAV_ID',
            id
          })
      }
  });

export default connect(mapStateToProps, mapDispatchToProps)(Logout)