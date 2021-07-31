import { HashRouter as Router, Route, Link, NavLink } from "react-router-dom";
import React, { useState } from 'react'
import pcs_logo from "../../Images/pcs_logo.png"

// components import
import styled from "styled-components"

const Container = styled.div`
    position: fixed;
    .active{
        border-right: 6px solid #444;
        border-top-right-radius:5px;
        border-bottom-right-radius:5px;
    }
`

const Button = styled.button`
    background-color:#33d98f;
    border:none;
    width:2.5rem;
    height:2.5rem;
    border-radius:50%;
    margin:0.5rem 0 0 0.5rem;
    cursor:pointer;
    color: #444;

    display:flex;
    justify-content:center;
    align-items:center;

    position:relative;

    &::before,
    &::after{
        content:"";
        background-color:#444;
        height:2px;
        width:1rem;
        position:absolute;
        transition:all 0.3s ease;
        color: #444;
    }

    &::before{
        color: #444;
        top:${props => props.clicked ? "1.5" : "1rem"};
        transform:${props => props.clicked ? "rotate(135deg)" : "rotate(0)"}
    }

    &::after{
        color: #444;
        top:${props => props.clicked ? "1.1" : "1.5rem"};
        transform:${props => props.clicked ? "rotate(-135deg)" : "rotate(0)"}
    }
`
const SidebarContainer = styled.div`
    background-color: #33d98f;
    width: 3.5rem;
    height: 80vh;
    margin-top: 1rem;
    border-radius: 0 30px 30px 0;
    padding: 1rem 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    position: relative;
`
// const Logo = styled.div`
//     width: 2.5rem;

//     img{
//         width: 100%;
//         height: auto;
//         background-color: #fff;
//     }
// `
const SlickBar = styled.ul`
    color: #fff;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #33d98f;

    padding: 2rem 0;

    position: absolute;
    top: 6rem;
    left: 0;

    width: ${props=>(props.clicked ? "12rem":"3.5rem")};
    transition: all 0.5s ease;
    border-radius: 0 30px 30px 0;

`
const Item = styled(NavLink)`
    text-decoration: none;
    width: 100%;
    padding: 1rem 0;
    cursor: pointer;

    display: flex;
    align-items: center;
    padding-left: 1rem;

    &:hover{
        border-right: 6px solid #5569dc;
        border-top-right-radius:5px;
        border-bottom-right-radius:5px;
    }

    i{
        font-size: 1.2rem ;
        /* height: auto; */
        color: #444;

        &:hover{
            font-size: 1.3rem;
            color: #5569dc;
        }
    }


`
const Text = styled.span`
    width: ${props=>(props.clicked ? "100%":"0")};
    overflow: hidden;
    margin-left:${props=>(props.clicked ? "3rem":"0")};
    transition: all 0.3s ease-in-out;
    font-weight: bold;
    color: #444;
`
const Profile = styled.div`
    width: ${props=>(props.clicked ? "12rem":"3rem")};
    height: 4rem;

    padding: 1rem 1rem;
    /* border: 2px solid #fff; */
    border-radius: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: ${props => props.clicked ? "9rem" : "0"};

    background-color: #33d98f;

    transition: all 0.3s ease;

    img{
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        cursor: pointer;

        &:hover{
            border: 2px solid #5569dc;
            color: #fff;
        }
    }

`
const Details = styled.div`
    display: ${props => (props.clicked ? "flex":"none")};
    justify-content: space-between;
    align-items: center;
    min-width: auto;
`
const Name = styled.div`
    padding: 1rem;

    color: #5569dc;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h4{
        display: inline-block;
    }

    a{
        font-size: 0.8rem;
        text-decoration: none;
        color: #fff;

        &:hover{
            text-decoration: underline;
        }
    }
`
const Logout = styled.button`
    border: none;
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    cursor: pointer;

    i{
        width: 100%;
        font-size: xx-large;
        height: auto;
        color: #fff;

        &:hover{
            border: none;
            padding: 0;
            opacity: 0.5;
            color: #5569dc;
        }
    }
`

const Sidebar = (props) => {

    const [click, setClick] = useState(false)
    const [profileClick, setProfileClick] = useState(false)


    const handleClick = () => setClick(!click)
    const handleProfileClick = () => setProfileClick(!profileClick)

    return (
        <Router>
            <Container>
            <Button clicked={click} onClick={() => handleClick()}></Button>
            {/* <button className="menu-button" onClick={()=>handleClick()}></button> */}
            <SidebarContainer>

                {/* <Logo>
                    <img src={pcs_logo} alt="logo" />
                </Logo> */}
                <SlickBar clicked={click}>
                    <Item onClick={() => setClick(false)} exact activeClassName="active" to="/">
                        <i className="fas fa-home"></i>
                        <Text clicked={click}>Home</Text>
                    </Item>
                    <Item onClick={() => setClick(false)} activeClassName="active" to="/leave">
                        <i className="fas fa-pen-fancy"></i>
                        <Text clicked={click}>Leave</Text>
                    </Item>
                    <Item onClick={() => setClick(false)} activeClassName="active" to="/holidays">
                        <i className="fas fa-umbrella-beach"></i>
                        <Text clicked={click}>Holidays</Text>
                    </Item>
                    <Item onClick={() => setClick(false)} activeClassName="active" to="/calender">
                        <i className="fas fa-user"></i>
                        <Text clicked={click}>Calender</Text>
                    </Item>
                    <Item onClick={() => setClick(false)} activeClassName="active" to="/about">
                        <i className="fas fa-user"></i>
                        <Text clicked={click}>About</Text>
                    </Item>
                </SlickBar>
                <Profile clicked={profileClick}>
                    {/* <i className="fas fa-power-off"></i> */}
                    <img onClick={()=>handleProfileClick()} src="https://picsum.photos/200" alt="profile" />
                    <Details clicked={profileClick}>
                        <Name>
                            <h4>Admin</h4>
                            <a href="/#">View Profile</a>
                        </Name>
                        <Logout>
                            <i className="fas fa-power-off"></i>
                        </Logout>
                    </Details>
                </Profile>



            </SidebarContainer>
            </Container>
        </Router>
    )
}

export default Sidebar
