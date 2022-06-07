import React, { useState, useEffect } from "react";
import "./Employeehome.css";
import axios from "axios";
const apiUrl = process.env.REACT_APP_lms_url;
export const Employeehome = (props) => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    // console.log('useEffect called')
    getLeaveBalance();

    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const getLeaveBalance = async () => {
    await axios
      .get(
        `${apiUrl}/leave-application-emp/` +
          props.data["_id"] +
          "/leave-balance",
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log("Leave balance")
        // console.log("res",res.data.leaveBalance)
        localStorage.setItem("leaveBalance", res.data.leaveBalance);
        // console.log('leave bal fetched')
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="home">
      <div className="home-card">
        <p className="date"> Date : {date.toLocaleDateString()}</p>
        <p className="time"> Time : {date.toLocaleTimeString()}</p>
      </div>
      <div className="leave-card">
        <p className="leave-balance">
          Leave Balance{" "}
          <span className="balance-count">{props.leaveBalance}</span>
        </p>
      </div>
    </div>
  );
};

export default Employeehome;
