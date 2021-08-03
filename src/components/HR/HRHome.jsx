import React, { useState, useEffect } from 'react'
import './HRHome.css'
import axios from 'axios';

export const HRHome = (props) => {

    var [date, setDate] = useState(new Date());
    var [leaveData, setLeaveData] = useState([])
    var [onAccept, setonAccept] = useState()

    useEffect(() => {
        loadPendingLeaveRequests()
        console.log("adfasdfadf", leaveData)
        // var timer = setInterval(() => setDate(new Date()), 1000)
        // return function cleanup() {
        //     clearInterval(timer)
        // }

    }, [leaveData]);


    const loadPendingLeaveRequests = async () => {
        await axios
            .get(
                "https://pcs-lms.herokuapp.com/leave-application-hr/",
                {
                    headers: {
                        authorization: localStorage.getItem("token") || ""
                    }
                }
            ).then(
                response => {
                    setLeaveData(response.data)
                }
            )
    }

    const approveOrReject = (onAccept, _id) => {
        var Status
        if (onAccept) {
            Status = "2"
        }
        else {
            Status = "3"
        }

        let body = {
            Status: Status,
        };
        console.log("Body", body);
        //leave id
        console.log("id", _id)
        axios
            .put(
                "https://pcs-lms.herokuapp.com/leave-application-hr/" + _id,
                body, {
                headers: {
                    authorization: localStorage.getItem("token") || ""
                }
            }
            )
            .then(res => {
                console.log(res)

            })
            .catch(err => {
                console.log(err);
            });



    };



    return (
        <div className="home">
            <div className="emp-card">
                <p className="date"> Date : {date.toLocaleDateString()}</p>
                <p className="time"> Time : {date.toLocaleTimeString()}</p>
            </div>
            {leaveData ? <><h1 className="pending-leaves-heading">Pending Leave Requests :</h1>
                {leaveData.map((user, id) => {
                    if (user.Status == 1) {
                        return (
                            <div className="emp-card" key={id}>
                                <div className="leave-content">
                                    <p><strong>Employee</strong> : {user.EmployeeName}</p>
                                    <p><strong>Reason</strong> :{user.Reasonforleave}</p>
                                    <p><strong>From</strong> :{user.FromDate.slice(0, 10)}</p>
                                    <p><strong>To</strong> :{user.ToDate.slice(0, 10)}</p>
                                    
                                </div>
                                <div className="accept-reject-buttons">
                                    <button className="accept"onClick={() => approveOrReject(true, user._id)}>Approve</button>
                                    <button className="reject" onClick={() => approveOrReject(false, user._id)}>Reject</button>
                                </div>
                            </div>
                        )
                    }
                })}</> : " "}
        </div>
    )
}

export default HRHome