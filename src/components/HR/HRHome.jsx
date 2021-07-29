import  React, { useState , useEffect } from 'react'
import './HRHome.css'
export const HRHome = (props) => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    console.log(date.getDate())

    return(
        <div className="home">
            <div className="home-card">
                <p className="date"> Date : {date.toLocaleDateString()}</p>
                <p className="time"> Time : {date.toLocaleTimeString()}</p>
            </div>
        </div>
    )
}

export default HRHome