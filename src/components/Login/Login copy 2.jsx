import React, { useState } from 'react'
import "./Login.css";
import LoginJs from "./Login.js";
import { ScaleLoader } from "react-spinners";
import { css } from "@emotion/core";
import pcs_logo from "../Images/pcs_logo.png"
import home_page from "../Images/home_page.svg"
import press_play from "../Images/press_play.svg"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
// { backgroundImage:`url(${home_page})` }
function Login(props) {

  const [isOpen, setIsOpen] = useState(false)
  const [isButtonActive, setIsButtonActive] = useState("")
  const [isInputActive, setIsInputActive] = useState("")


  var button = document.getElementById('mainButton');
  console.log(button)
  const openForm = () => {
    setIsOpen(true)
    setIsButtonActive("active")
    // button.className = 'active';
  };

  const checkInput = (e) => {
    console.log(e.target.value.length)
    if (e.target.value.length > 0) {
      // input.className = 'active';
      setIsInputActive("active")
    } else {
      setIsInputActive("")
    }
  };
  const closeForm = () => {
    setIsOpen(false)
    setIsButtonActive("")
  };

  document.addEventListener("keyup", (e) => {
    if (e.key == "Escape") {
      closeForm();
    }
  });
  return (
    <>
      <div id="mainButton" className={`${isButtonActive}`}>
        {!isOpen ?
          <div className="btn-text" onClick={openForm}>LOG IN</div> :
          <>
            {isOpen &&
              <div className="modal">
                <form action="" method="" onSubmit={props.onSubmit} >
                  <img src={pcs_logo} alt="" className="pcsLogo" />
                  {/* <div className="form-title">Sign In</div> */}
                  <div className={"close-button"} onClick={closeForm}>x</div>
                  <div className="input-group">
                    {/* <i className="fas fa-user"></i> */}
                    <input
                      className={`${isInputActive}`}
                      required="required"
                      type="text" id="name"
                      name="Username"
                      onChange={checkInput}
                      onBlur={checkInput}
                      
                    />
                    <label htmlFor="name">Username</label>
                  </div>
                  <div className="input-group">
                    {/* <i className="fas fa-lock"></i> */}

                    <input
                      className={`${isInputActive}`}
                      type="password"
                      id="password"
                      required="required"
                      onBlur={checkInput}
                      
                    />
                    <label htmlFor="password">Password</label>

                  </div>
                  <a href="#">Forgot password?</a>
                  <input className="form-button"
                    type="submit"
                    value="LOG IN"
                  />
                </form>
              </div>
            }
          </>
        }

      </div>

    </>
  )
}

export default Login
