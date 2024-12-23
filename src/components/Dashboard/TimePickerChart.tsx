import { useEffect, useState } from "react";
import ClockIcon from "../icons/ClockIcon"
import { connect } from "react-redux";
import { Dispatch } from "redux";
type Props = {
    timer:number;
    setTimer:(arg:number)=>void
}
const TimePickerChart = ({timer, setTimer}:Props) =>{
    const [timesAvalaible] = useState([
    {    label:'00:20',
        value:20
    },{
        label:'00:30',
        value:30
    },
    {
        label:'00:50',
        value:50
    },{
        label:'01:30',
        value:90
    },{
        label:'02:00',
        value:120
    },
    {
        label:'03:00',
        value:180
    }
])

const [timerSelected,setTimeSelected] = useState(timesAvalaible.filter((el)=>{ return el.value === timer})[0] || 20)

useEffect(()=>{
    setTimeSelected(timesAvalaible.filter((el)=>{ return el.value === timer})[0] || 20)
},[timer])
    return(
        <div className="amount-field mt-lg-0 position-relative" style={{flex:'1'}}>
                    <label className='label-sidebar'>Tiempo</label>
                    <div className="field d-flex align-items-center">
                        <ClockIcon/>
                        <input type="button" style={{textAlign:'left'}} defaultValue={timerSelected.label}  id="timerdropdown"  data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" />
                        <div className="dropdown-menu dropdown-timer" aria-labelledby="timerdropdown">
                            <div className="d-flex flex-wrap gap-2 justify-content-center">
                            {
                                timesAvalaible.map((el,i)=>{
                                    return(
                                        <button className={`btn-timer ${timer === el.value ? 'selected-timer' : ''}`} type="button" key={i} onClick={()=>{setTimer(el.value)}}>{el.label}</button>
                                    )
                                })
                            }
                            </div>
                        </div>
                    </div>
                </div>
    )
}

const mapStateToProps = (state:any) => ({
  timer: state.timer,
});

const mapDispatchToProps = (dispatch:Dispatch) => ({
    setTimer(timer:number) {
      dispatch({
        type: "SET_TIMER",
        timer,
      });
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(TimePickerChart)