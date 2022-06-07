import React from "react";
import "./EmployeesListTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
// import { Button } from 'react-bootstrap'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid/dist/styles/theme-blue.css";
import { format } from "date-fns";
import EmployeeProfile from "./EmployeeProfile";

import { useState } from "react";
import { useEffect } from "react";
import NewEmpForm from "./NewEmpForm";
import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";
import { Link, Route } from "react-router-dom";
const apiUrl = process.env.REACT_APP_lms_url;

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

function EmployeesListTable() {
  // const [employeeList, setemployeeList] = useState([])
  const [showEmpDetails, setShowEmpDetails] = useState(true);
  const [loading, setloading] = useState(true);
  const [showEmpProfile, setShowEmpProfile] = useState(false);
  // eslint-disable-next-line no-unused-vars

  // eslint-disable-next-line no-unused-vars
  const [columnDefs, setcolumnDefs] = useState([
    {
      headerName: "Id",
      field: "Id",
      sortable: true,
    },
    {
      headerName: "Employee Name",
      field: "Employee Name",
      sortable: true,
    },
    {
      headerName: "Email",
      field: "Email",
      sortable: true,
    },
    {
      headerName: "Contact Number",
      field: "Contact Number",
      sortable: false,
    },
    {
      headerName: "DOB",
      field: "DOB",
      sortable: true,
    },
    {
      headerName: "Gender",
      field: "Gender",
      sortable: true,
    },
    {
      headerName: "",
      field: "View Leave Histosty",
      filter: false,
      width: 30,
      cellRendererFramework: renderEmpProfileButton.bind(this),
    },
    {
      headerName: "",
      field: "Delete Employee",
      filter: false,
      width: 30,
      cellRendererFramework: renderDeleteButton.bind(this),
    },
  ]);

  var [rowData, setrowData] = useState([]);
  const [emp, setEmp] = useState({});

  useEffect(() => {
    loadEmployeeListTable();
    return () => {
      setloading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEmpDetails]);

  var employeeListObj = [];
  var rowDataT = [];

  // eslint-disable-next-line no-unused-vars
  const [defaultColDef, setdefaultColDef] = useState({
    resizable: true,
    width: 200,
    filter: "agTextColumnFilter",
    // filter: true ,
  });

  function renderEmpProfileButton(params) {
    return (
      <FontAwesomeIcon
        icon={faHistory}
        onClick={() => handleEmpProfile(params.data.data)}
      />
    );
  }
  function renderDeleteButton(params) {
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => handleDeleteProfile(params.data.data)}
      />
    );
  }

  const handleEmpProfile = (empObj) => {
    setShowEmpDetails(!showEmpDetails);
    setShowEmpProfile(!showEmpProfile);
    console.log(empObj);
    return setEmp(empObj);
  };

  const handleCancelButton = () => {
    console.log("Cancel");
    setShowEmpProfile(false);
    setShowEmpDetails(true);
  };

  const handleDeleteProfile = (empObj) => {
    console.log(empObj);
  };

  const loadEmployeeListTable = () => {
    axios
      .get(`${apiUrl}/hr/all-emp-details`, {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        // console.log('all emp details', response.data)
        employeeListObj = response.data;
        //   rowData=response.data

        setloading(false);
        rowDataT = [];

        employeeListObj.map((data, index) => {
          let temp = {
            data,
            Id: index + 1,
            "Employee Name": data["FirstName"] + " " + data["LastName"],
            Email: data["Email"],
            "Contact Number": data["ContactNo"],
            DOB: format(new Date(data["DOB"]), "dd/MM/yyyy"),
            Gender: data["Gender"],
          };
          return rowDataT.push(temp);
        });
        // console.log('row data temp', rowDataT)
        setrowData(rowDataT);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const onAddNewEmp = () => {
    // console.log('false')
    setShowEmpDetails(false);
  };

  const handleNewEmployee = async (e) => {
    e.preventDefault();

    if (e.target[4].value !== e.target[5].value) {
      window.alert("passwords doesn't match");
    } else {
      let body = {
        FirstName: e.target[0].value,
        MiddleName: e.target[1].value,
        LastName: e.target[2].value,
        Email: e.target[3].value,
        Password: e.target[4].value,
        Gender: e.target[6].value,
        DOB: e.target[7].value,
        ContactNo: e.target[8].value,
        Account: e.target[9].value,
      };
      // console.log(body)

      await axios.post(`${apiUrl}/employee`, body).then((res) => {
        setloading(false);
        setShowEmpDetails(true);
      });
    }
  };

  return (
    <React.Fragment>
      {showEmpDetails ? (
        <div id="table-outer-div-scroll">
          {!loading ? (
            <>
              <CBreadcrumb style={{ "--cui-breadcrumb-divider": "'';" }}>
                <CBreadcrumbItem>
                  <Link to="/hr">Home</Link>
                </CBreadcrumbItem>
                <CBreadcrumbItem active>Employee List</CBreadcrumbItem>
              </CBreadcrumb>
              <div
                id="table-div"
                className="ag-blue"
                style={{ height: "550px", width: "100%", padding: "10px" }}
              >
                <div className="heading-and-button">
                  <div>
                    <span id="role-title">Employee</span>
                  </div>

                  <Button
                    variant="primary"
                    id="add-button"
                    onClick={onAddNewEmp}
                  >
                    <FontAwesomeIcon icon={faPlus} id="plus-icon" />
                  </Button>
                </div>

                <AgGridReact
                  columnDefs={columnDefs}
                  defaultColDef={defaultColDef}
                  // columnTypes={columnTypes}
                  rowData={rowData}
                  pagination={true}
                  paginationPageSize={20}
                  // getRowHeight={getRowHeight}
                />
              </div>
            </>
          ) : (
            <div id="loading-bar">
              <RingLoader
                css={override}
                sizeUnit={"px"}
                size={50}
                color={"#0000ff"}
                loading={true}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          {showEmpProfile ? (
            <EmployeeProfile
              emp={emp}
              handleCancelButton={handleCancelButton}
            />
          ) : (
            <NewEmpForm
              handleNewEmployee={handleNewEmployee}
              handleCancelButton={handleCancelButton}
            />
          )}
        </div>
      )}
    </React.Fragment>
  );
}

export default EmployeesListTable;
