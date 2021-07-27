import React, { Component } from "react";
import "./LeaveApplicationEmpForm.css";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

function LeaveApplicationEmpForm(props) {
    // state = {
    // };
    // componentWillMount() {

    // }
    const name = localStorage.getItem("Name")


    return (
        <div>
            <div className="form-container">
                <h2 id="role-form-title">Apply Leave</h2>
                <div id="role-form-outer-div">
                    <Form id="form" onSubmit={props.onLeaveApplicationEmpSubmit}>
                        <div className='label-option-container'>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Name
                                </Form.Label>
                                <Col sm={10} className="form-input">
                                    <Form.Control type="Text" placeholder={name} value={name} required disabled />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className='label-option-container'>
                            <Form.Group as={Row} >
                                <Form.Label column sm={2}>
                                    Leave Type
                                </Form.Label>
                                <Col sm={10} className="form-input">
                                    <Form.Control as="select" required>
                                        <option value="DEAFAULT" disabled>
                                            Select your option
                                        </option>
                                        <option value="Sick Leave">Sick Leave</option>
                                        <option value="Casual Leave">Casual Leave</option>
                                        <option value="Privilege Leave">Privilege Leave</option>
                                    </Form.Control>
                                </Col>

                            </Form.Group>
                        </div>

                        <div className='label-option-container'>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    FromDate
                                </Form.Label>
                                <Col sm={10} className="form-input">
                                    <Form.Control type="date" required />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className='label-option-container'>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    ToDate
                                </Form.Label>
                                <Col sm={10} className="form-input">
                                    <Form.Control type="date" placeholder="ToDate" required />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className='label-option-container'>
                            <Form.Group as={Row}>
                                <Form.Label column sm={2}>
                                    Reason for leave
                                </Form.Label>
                                <Col sm={10} className="form-input">
                                    <Form.Control type="Text" placeholder="Reason for leave" required />
                                </Col>
                            </Form.Group>
                        </div>
                        <div className='label-option-container'>
                            <Form.Group as={Row} >
                                <Form.Label column sm={2}>
                                    Leave Status
                                </Form.Label>
                                <Col sm={10} className="form-input">
                                    <Form.Control as="select" required>
                                        <option value="1" selected>Pending</option>
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </div>

                        <div className="submit-and-cancel-button">
                            <Form.Group as={Row} id="form-submit-button">
                                <Col sm={{ span: 10, offset: 2 }}>
                                    <Button type="submit">Submit</Button>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} id="form-cancel-button">
                                <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
                                    <Button type="reset" className="cancel-button" onClick={props.onFormClose}>Cancel</Button>
                                </Col>
                            </Form.Group>
                        </div>
                    </Form></div>
            </div>
        </div>
                   
       
    );

}
export default LeaveApplicationEmpForm;
