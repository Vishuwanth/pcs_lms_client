import React, { useState} from 'react'
import "./Login.css";
import { ScaleLoader } from "react-spinners";
import { css } from "@emotion/core";
import pcs_logo from "../Images/pcs_logo.png"
import sign_up from "../Images/signup.svg"
import sign_in from "../Images/sign_in.svg"


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Login(props) {
  const [signUpMode, setSignUpMode] = useState(false)


  return (
    <React.Fragment>
      <div className={`container${signUpMode ? " sign-up-mode" : ""}`}>
        {/* singin and signup forms container */}
        <div className="forms-container">
          <div className="signin-signup">
            {/* sign in container */}
            <form action="" className="sign-in-form" onSubmit={props.onSubmit}>

              <img className="title" src={pcs_logo} alt="pcs Logo" />
              {/* <h2 className="title">LOG IN</h2> */}
              {/* uer mail container */}
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="PCS EMAIL" name="USER_MAIL" id="" required="required" />
              </div>
              {/* password container */}
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="PASSWORD" name="" id="" required="required" />
              </div>
              <input type="submit" value="Login"  className={`button solid ${props.loading ? "hide-submit-button" : "show-submit-button"}`} />
              <div className="loading">
                <ScaleLoader
                  css={override}
                  sizeUnit={"px"}
                  size={150}
                  color={"#33d98f"}
                  loading={props.loading}
                />
              </div>
              {!props.pass ? (
                // <p className="alert">Invalid UserName or Password</p>
                window.alert("Invalid Credentials")
              ) : (
                ""
              )}
              <p className="social-text">or Sign In With Social Platforms</p>
              <div className="social-media">
                <a href="/#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="/#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="/#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="/#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>

            {/* sign up from */}
            <form action="" className="sign-up-form" >
              <img className="title" src={pcs_logo} alt="pcs Logo" />

              {/* user Name container */}
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="User Name" name="USER_NAME" id="" required="required" />
              </div>
              {/* uer mail container */}
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="text" placeholder="PCS EMAIL" name="USER_MAIL" id="" required="required" />
              </div>
              {/* password container */}
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="PASSWORD" name="" id="" required="required" />
              </div>
              <input type="submit" value="SIGN UP" className="button solid" />
              <div className="loading">
                <ScaleLoader
                  css={override}
                  sizeUnit={"px"}
                  size={150}
                  color={"#123abc"}
                  loading={props.loading}
                />
              </div>
              <p className="social-text">or Sign Up With Social Platforms</p>
              <div className="social-media">
                <a href="/#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="/#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="/#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="/#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                ex ratione. Aliquid!
              </p>
              <button className="button transparent" id="sign-up-btn"
                onClick={() => {
                  setSignUpMode(true)
                }}>
                Sign up
              </button>
            </div>
            <img src={sign_in} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrums
                laboriosam ad deleniti.
              </p>
              <button className="button transparent" id="sign-in-btn"
                onClick={() => {
                  setSignUpMode(false)
                }}>

                Sign in
              </button>
            </div>
            <img src={sign_up} className="image" alt="sign up" />
          </div>
        </div>

      </div>

    </React.Fragment>

  )
}

export default Login