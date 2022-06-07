import React from "react";
import "./Profile.css";

import axios from "axios";
import "./Profile.css";
import { useEffect, useState } from "react";
import FemaleImg from "../Images/female.jpg";
import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";
import { Link } from "react-router-dom";
const apiUrl = process.env.REACT_APP_lms_url;

function Profile(props) {
  const [profileData, setProfileData] = useState({
    EmpName: "",
    EmpEmail: "",
    EmpPassword: "",
    EmpGender: "",
    EmpDOB: "",
    EmpContact: "",
  });

  useEffect(() => {
    loadProfileDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function loadProfileDetails() {
    axios
      .get(`${apiUrl}/employee/` + props.data["_id"] + "/profile")
      .then((res) => {
        console.log(res.data);

        setProfileData({
          EmpName: res.data.FirstName + " " + res.data.LastName,
          EmpEmail: res.data.Email,
          EmpPassword: res.data.Password,
          EmpGender: res.data.Gender,
          EmpDOB: res.data.DOB.slice(0, 10),
          EmpContact: res.data.ContactNo,
          EmpId: res.data._id,
          EmpLeaveBal: res.data.leaveBalance,
          EmpLeavesApplied: res.data.leaveApplication.length,
        });
      });
  }
  const isMale = profileData.EmpGender;
  const maleImg = "https://bootdey.com/img/Content/avatar/avatar7.png";

  return (
    <div className="main-body">
      <CBreadcrumb style={{ "--cui-breadcrumb-divider": "'';" }}>
        <CBreadcrumbItem>
          <Link to="/hr">Home</Link>
        </CBreadcrumbItem>
        <CBreadcrumbItem active>Profile</CBreadcrumbItem>
      </CBreadcrumb>
      <div className="row gutters-sm">
        <div className="col-md-5 mb-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src={isMale === "Male" ? maleImg : FemaleImg}
                  alt="Admin"
                  className="rounded-circle"
                  width="150"
                />
                <div className="mt-3">
                  <h4>{profileData.EmpName}</h4>
                  <p className="text-secondary mb-1">Role : </p>
                  <p className="text-muted font-size-sm">Address</p>
                  <p className="text-muted font-size-sm">
                    {profileData.EmpEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <div className="card mb-3">
            <div className="card-body">
              {/* <div className='row'>
									<div className='col-sm-3'>
										<h6 className='mb-0'>Full Name</h6>
									</div>
									<div className='col-sm-9 text-secondary'>
										{emp.FirstName} {emp.LastName}
									</div>
								</div>
								<hr /> */}
              {/* <div className='row'>
									<div className='col-sm-3'>
										<h6 className='mb-0'>Email</h6>
									</div>
									<div className='col-sm-9 text-secondary'>{emp.Email}</div>
								</div>
								<hr /> */}
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Id</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {profileData.EmpId}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Phone</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {profileData.EmpContact}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Leave Balance</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {profileData.EmpLeaveBal}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Leaves Applied</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {profileData.EmpLeavesApplied}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">Address</h6>
                </div>
                <div className="col-sm-9 text-secondary">-</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <h6 className="mb-0">DOB</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                  {profileData.EmpDOB}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12">
                  <button className="btn btn-info ">Edit</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row gutters-sm">
            <div className="col-sm-6 mb-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
