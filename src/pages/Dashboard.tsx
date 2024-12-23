import '../assets/styles/dashboard.css'

import NavDashboard from "../components/NavDashboard"
import SidebarDashboard from "../components/Dashboard/SidebarDashboard"
import ChartDashboard from '../components/Dashboard/ChartDashboard'
import SidebarLeft from "../components/Dashboard/SidebarLeft"
import Cookies from 'js-cookie'
const Dashboard = () =>{
    return(
        <>
        <NavDashboard page={'dashboard'} isAdmin={false}/>
        <div className="main-dashboard">
            <SidebarLeft/>
            <div className='w-100 d-flex' style={{height:'100%'}}>
                <ChartDashboard/>
            </div>
            <SidebarDashboard/>
        </div>
        </>
    )
}

export default Dashboard