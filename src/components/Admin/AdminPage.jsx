import React from 'react'
import { Switch,Route } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'
import styled from "styled-components"

import Home from "./Pages/Home"
import Leave from "./Pages/Leave"
import Calender from "./Pages/Calender"
import About from "./Pages/About"
import Holidays from '../Holidays/Holidays'


const Pages = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    h1{
        font-size: calc(2rem + 2vw);
        background: linear-gradient(to right, #803bec 30%,#1b1b1b 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`

function AdminPage() {
    return (
        <>
            <Sidebar />
            <Pages>
                <Switch>
                    <Route exact path="/admin" component={Home} />
                    <Route exact path="/admin/leave" component={Leave} />
                    <Route exact path="/admin/calender" component={Calender} />
                    <Route exact path="/admin/holidays" component={Holidays} />
                    <Route exact path="/admin/about" component={About} />
                </Switch>
            </Pages>
        </>
    )
}

export default AdminPage
