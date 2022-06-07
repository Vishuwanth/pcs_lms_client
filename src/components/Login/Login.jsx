import React, { useState } from "react";
import "./Login.css";
import { ScaleLoader } from "react-spinners";
import { css } from "@emotion/core";
import pcs_logo from "../Images/pcs_logo.png";
import sign_up from "../Images/signup.svg";
import sign_in from "../Images/sign_in.svg";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Login(props) {
  const [signUpMode, setSignUpMode] = useState(false);

  return (
    <React.Fragment>
      <div>
        {/* singin and signup forms container */}
        <div className="forms-container">
          <div className="signin-signup">
            {/* sign in container */}
            <form action="" className="sign-in-form" onSubmit={props.onSubmit}>
              <img className="title" src={pcs_logo} alt="pcs Logo" />
              {/* <h2 className="title">LOG IN</h2> */}
              {/* uer mail container */}
              <div className="input-field">
                <i className="fas fa-user input-icon"></i>
                <input
                  type="text"
                  placeholder="PCS EMAIL"
                  name="USER_MAIL"
                  id=""
                  required="required"
                />
              </div>
              {/* password container */}
              <div className="input-field">
                <i className="fas fa-lock input-icon"></i>
                <input
                  type="password"
                  placeholder="PASSWORD"
                  name=""
                  id=""
                  required="required"
                />
              </div>
              <input
                type="submit"
                value="Login"
                className={`button solid ${
                  props.loading ? "hide-submit-button" : "show-submit-button"
                }`}
              />
              <div className="loading">
                <ScaleLoader
                  css={override}
                  sizeUnit={"px"}
                  size={150}
                  color={"#5569dc"}
                  loading={props.loading}
                />
              </div>
              {!props.pass
                ? // <p className="alert">Invalid UserName or Password</p>
                  window.alert("Invalid Credentials")
                : ""}
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
