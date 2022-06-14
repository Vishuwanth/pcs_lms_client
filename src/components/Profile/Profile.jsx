import React from "react";
import "./Profile.css";

import axios from "axios";
import "./Profile.css";
import { useEffect, useState } from "react";
import FemaleImg from "../Images/female.jpg";
import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { GiCancel } from "react-icons/gi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const apiUrl = process.env.REACT_APP_lms_url;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "230px",
  },
};

function Profile(props) {
  const [profileData, setProfileData] = useState({
    EmpName: "",
    EmpEmail: "",
    EmpPassword: "",
    EmpGender: "",
    EmpDOB: "",
    EmpContact: "",
  });
  const [modalIsOpen, setIsOpen] = useState(false);

  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    loadProfileDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const verifyPassword = () => {
    if (oldPassword === profileData.EmpPassword) {
      console.log("correct password");
      return setIsPasswordVerified(true);
    } else {
      window.alert("Incorrect Password");
      return setIsPasswordVerified(false);
    }
  };

  const handleModal = (value) => {
    console.log("value=", value);

    setIsOpen(true);
  };
  const handlePasswordUpdate = (newPassword) => {
    if (!newPassword) {
      window.alert("Enter New Password");
      return;
    } else {
      let body = {
        Password: newPassword,
      };
      axios
        .put(
          `${apiUrl}/employee/` +
            props.data["_id"] +
            "/profile/update-password",
          body
        )
        .then((res) => console.log(res));
    }
    window.alert("Password has been Successfully Updated");
    closeModal();
  };
  function closeModal() {
    setOldPassword("");
    setIsPasswordVerified(false);
    setIsOpen(false);
  }

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
                  {/* <p className="text-secondary mb-1">Role : </p> */}
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
              <div className="row align-items-center">
                <div className="col-sm-3">
                  <h6 className="mb-0">Password</h6>
                </div>
                <div className="col-sm-9 ">
                  <div className="box">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input-search"
                      value={profileData.EmpPassword}
                      disabled={true}
                    />

                    {showPassword ? (
                      <AiFillEye
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <AiFillEyeInvisible
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </div>

                  <button
                    className="button"
                    // style={{ marginLeft: "15px" }}
                    onClick={(event) => handleModal(event.target.value)}
                  >
                    Change
                  </button>
                  <Modal
                    isOpen={modalIsOpen}
                    // onAfterOpen={afterOpenModal}
                    style={customStyles}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <div>
                        <GiCancel
                          size={25}
                          onClick={closeModal}
                          style={{
                            marginLeft: "92%",
                            marginBottom: "10",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <div>
                        {!isPasswordVerified && (
                          <div>
                            <div>Enter Your Current Password:</div>
                            <div>
                              <input
                                style={{
                                  width: "100%",
                                  borderRadius: "7px",
                                  marginTop: "10px",
                                }}
                                type="password"
                                onChange={(event) =>
                                  setOldPassword(event.target.value)
                                }
                              />
                            </div>
                            <button
                              className="button "
                              onClick={() => verifyPassword()}
                              style={{ marginLeft: "30px" }}
                            >
                              Verify
                            </button>
                          </div>
                        )}
                        <div>
                          {isPasswordVerified && (
                            <div>
                              <div>New Password : </div>
                              <div>
                                <input
                                  type="password"
                                  style={{
                                    borderRadius: "7px",
                                    height: "30px",
                                  }}
                                  onChange={(event) =>
                                    setNewPassword(event.target.value)
                                  }
                                />
                              </div>
                              <button
                                className="button"
                                style={{ marginLeft: "30px" }}
                                onClick={() =>
                                  handlePasswordUpdate(newPassword)
                                }
                              >
                                Update
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
                {/* <div className="col-sm-9 text-secondary">
                  {profileData.EmpPassword}
                </div> */}
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
