import React from 'react'
import './NavBar.css'
import { Navbar, Nav } from 'react-bootstrap'
import pcs_logo from './Images/pcs_logo.png'
import Switch from 'react-switch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

function NavBar(props) {
	// console.log(props.onlogout())
	return (
		<div>
			<Navbar
				bg='light'
				expand='lg'
				className='nav-bar'
				sticky='top'
				id='main-nav'>
				<Navbar.Brand id='logo-anchor'>
					<img id='nav-bar-logo' src={pcs_logo} alt='company logo' />

					<span id='toggle-switch'>
						<Switch
							checked={props.checked}
							onChange={props.handleChange}
							onColor='#5569dc'
							onHandleColor='#ffffff'
							handleDiameter={10}
							uncheckedIcon={false}
							checkedIcon={false}
							boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
							activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
							height={17}
							width={35}
							// className='react-switch'
							// id='material-switch'
						/>
					</span>
				</Navbar.Brand>

				<Navbar.Toggle aria-controls='basic-navbar-nav' />

				<Navbar.Collapse id='logout-navbar-nav'>
					<Nav className='collapse-navbar my-2 my-lg-0'>
						<div onClick={props.onClick} className='navbar-right-content'>
							<span>Signed in as:</span>
							<span className='strong'>{props.loginInfo['Name']}</span>
						</div>
						<div>
							<p
								onClick={props.onlogout}
								style={{ cursor: 'pointer' }}
								className='navbar-right-content'>
								Log Out
								<span>
									<i class='fas fa-sign-out-alt'></i>
								</span>
							</p>
						</div>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	)
}

export default NavBar
