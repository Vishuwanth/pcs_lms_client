import React from 'react'

import { Form, Button, Col, Row } from 'react-bootstrap'
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import { Link } from 'react-router-dom'

function NewEmpForm(props) {
	return (
		<>
			<CBreadcrumb style={{ '--cui-breadcrumb-divider': "'';" }}>
				<CBreadcrumbItem>
					<Link to='/'>Home</Link>
				</CBreadcrumbItem>
				<CBreadcrumbItem active>Employees list</CBreadcrumbItem>
				<CBreadcrumbItem active>Add Employee</CBreadcrumbItem>
			</CBreadcrumb>
			<Form
				id='form'
				className='leave-app-form'
				onSubmit={(e) => props.handleNewEmployee(e)}>
				<h2>Add Employee</h2>
				<div className='label-option-container'>
					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							First Name*
						</Form.Label>
						<Col sm={10} className='form-input'>
							<Form.Control
								type='Text'
								placeholder='Enter your First Name'
								// value={}
								required
							/>
						</Col>
					</Form.Group>
				</div>
				<div className='label-option-container'>
					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Middle Name
						</Form.Label>
						<Col sm={10} className='form-input'>
							<Form.Control
								type='Text'
								placeholder='Enter your Middle Name'
								// value={name}
							/>
						</Col>
					</Form.Group>
				</div>
				<div className='label-option-container'>
					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Last Name*
						</Form.Label>
						<Col sm={10} className='form-input'>
							<Form.Control
								type='Text'
								placeholder='Enter your Last Name'
								// value={name}
								required
							/>
						</Col>
					</Form.Group>
				</div>
				<div className='label-option-container'>
					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Email*
						</Form.Label>
						<Col sm={10} className='form-input'>
							<Form.Control
								type='email'
								placeholder='Enter your PCS EMAIL'
								// value={name}
								required
							/>
						</Col>
					</Form.Group>
				</div>
				<div className='label-option-container'>
					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Password*
						</Form.Label>
						<Col sm={10} className='form-input'>
							<Form.Control
								type='password'
								placeholder='Password of min 6 Character with an symbol(.@#$) and An upper case'
								// value={name}
								required
							/>
						</Col>
					</Form.Group>
				</div>
				<div className='label-option-container'>
					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Re-Enter*
						</Form.Label>
						<Col sm={10} className='form-input'>
							<Form.Control
								type='password'
								placeholder='Re enter your password'
								// value={name}
								required
							/>
						</Col>
					</Form.Group>
				</div>
				<div className='label-option-container'>
					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Gender*
						</Form.Label>
						<Col sm={10} className='form-input'>
							<Form.Control as='select' required>
								<option value='DEAFAULT'>Select your option</option>
								<option value='Male'>Male</option>
								<option value='Female'>Female</option>
							</Form.Control>
						</Col>
					</Form.Group>
				</div>

				<div className='label-option-container'>
					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							DOB
						</Form.Label>
						<Col sm={10} className='form-input'>
							<Form.Control type='date' />
						</Col>
					</Form.Group>
				</div>
				<div className='label-option-container'>
					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Contact No
						</Form.Label>
						<Col sm={10} className='form-input'>
							<Form.Control type='tel' placeholder='Enter your Mobile Number' />
						</Col>
					</Form.Group>
				</div>
				<div className='label-option-container'>
					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Account Type*
						</Form.Label>
						<Col sm={10} className='form-input'>
							<Form.Control as='select' required>
								<option value='DEAFAULT'>Select your option</option>
								<option value='1'>Admin</option>
								<option value='2'>Hr</option>
								<option value='3' defaultValue='3'>
									Employee
								</option>
							</Form.Control>
						</Col>
					</Form.Group>
				</div>

				<div className='submit-and-cancel-button'>
					<Form.Group as={Row} id='form-submit-button'>
						<Col sm={{ span: 10, offset: 2 }}>
							<Button type='submit'>Submit</Button>
						</Col>
					</Form.Group>
					<Form.Group as={Row} id='form-cancel-button'>
						<Col sm={{ span: 10, offset: 2 }} id='form-cancel-button-inner'>
							<Button type='reset' className='cancel-button'>
								Reset
							</Button>
						</Col>
					</Form.Group>
					<Form.Group as={Row} id='form-cancel-button'>
						<Col sm={{ span: 10, offset: 2 }} id='form-cancel-button-inner'>
							<Button
								type='button'
								className='cancel-button'
								onClick={props.handleCancelButton}>
								Cancel
							</Button>
						</Col>
					</Form.Group>
				</div>
			</Form>
		</>
	)
}

export default NewEmpForm
