/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
import React from "react";
import "./LeaveApplicationEmpTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid/dist/styles/theme-blue.css";

import { useState } from "react";
import { useEffect } from "react";
const apiUrl = process.env.REACT_APP_lms_url;

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

function LeaveApplicationEmpTable(props) {
  const [leaveApplicationEmpData, setleaveApplicationEmpData] = useState([]);
  const [loading, setloading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [columnDefs, setcolumnDefs] = useState([
    {
      headerName: "Leave type",
      field: "Leavetype",
      sortable: true,
    },

    {
      headerName: "From Date",
      field: "FromDate",
      sortable: true,
      type: ["dateColumn"],
      filter: "agDateColumnFilter",
    },
    {
      headerName: "To Date",
      field: "ToDate",
      sortable: true,
      type: ["dateColumn"],
      filter: "agDateColumnFilter",
    },
    {
      headerName: "Reason For Leave",
      field: "Reasonforleave",
      sortable: true,
    },
    {
      headerName: "Status",
      field: "Status",
      sortable: true,
    },
    {
      headerName: "",
      field: "edit",
      filter: false,
      width: 30,
      cellRendererFramework: renderEditButton.bind(this),
    },
    {
      headerName: "",
      field: "delete",
      filter: false,
      width: 30,
      cellRendererFramework: renderButton.bind(this),
    },
  ]);

  var [rowData, setrowData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [defaultColDef, setdefaultColDef] = useState({
    resizable: true,
    width: 235,
    filter: "agTextColumnFilter",
    // filter: true ,
  });
  // const [getRowHeight, setgetRowHeight] = useState(
  //   function (params) {
  //     return 35;
  //   })

  var leaveApplicationEmpObj = [];
  var rowDataT = [];
  const getLeaveBalance = async () => {
    await axios
      .get(
        `${apiUrl}/leave-application-emp/` +
          props.data["_id"] +
          "/leave-balance",
        {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log("Leave balance")
        // console.log("res",res.data.leaveBalance)
        localStorage.setItem("leaveBalance", res.data.leaveBalance);
        // console.log('leave bal fetched')
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const loadLeaveApplicationEmpData = async () => {
    await axios
      .get(`${apiUrl}/leave-application-emp/` + props.data["_id"], {
        headers: {
          authorization: localStorage.getItem("token") || "",
        },
      })
      .then((response) => {
        // this.leaveApplicationEmpObj = response.data;
        leaveApplicationEmpObj = response.data;

        // this.setState({ leaveApplicationEmpData: response.data });
        // this.setState({ loading: false });
        // this.rowDataT = [];

        setleaveApplicationEmpData(response.data);

        setloading(false);
        rowDataT = [];

        // let data=this.educationObj.education["0"];  already commented this line
        leaveApplicationEmpObj.leaveApplication
          .sort((a, b) => (b.toDate > a.toDate ? 1 : -1))
          .map((data) => {
            let temp = {
              data,
              Leavetype: data["Leavetype"],
              FromDate: data["FromDate"].slice(0, 10),
              ToDate: data["ToDate"].slice(0, 10),
              Reasonforleave: data["Reasonforleave"],
              // Status: this.status(data["Status"]),  commented by me
              Status: status(data["Status"]), //status() function call
            };

            // this.rowDataT.push(temp);

            rowDataT.push(temp);
          });
        // this.setState({ rowData: this.rowDataT });

        //setrowData(rowDataT)
        // console.log("rowDataT values", rowDataT)
        setrowData(rowDataT);
        // console.log("rowData after setrowData", rowData)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadLeaveApplicationEmpData();
    getLeaveBalance();
    return () => {
      setloading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaveApplicationEmpData]);

  useEffect(() => {
    // console.log('useEffect called')
    getLeaveBalance();
  });

  // function to load leave Balance when dashboard is loaded

  const onLeaveApplicationEmpDelete = async (e1, e2) => {
    console.log(e1, e2);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      await axios
        .delete(`${apiUrl}/leave-application-emp/` + e1 + "/" + e2, {
          headers: {
            authorization: localStorage.getItem("token") || "",
          },
        })
        .then((res) => {
          // this.componentDidMount();
          loadLeaveApplicationEmpData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // componentDidMount() {
  //   this.loadLeaveApplicationEmpData();
  // }

  function renderButton(params) {
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          onLeaveApplicationEmpDelete(
            props.data["_id"],
            params.data.data["_id"]
          )
        }
      />
    );
  }
  function renderEditButton(params) {
    // console.log(params);
    return (
      <FontAwesomeIcon icon={faEdit} onClick={() => onEdit(params.data.data)} />
    );
  }

  const status = (s) => {
    if (s == 1) {
      return "Pending";
    }
    if (s == 2) {
      return "Approved";
    }
    if (s == 3) {
      return "Rejected";
    }
  };
  const onEdit = (data) => {
    if (data["Status"] == 1) {
      props.onEditLeaveApplicationEmp(data);
    } else {
      window.alert(
        "You can not edit application after it approved or rejected"
      );
    }
  };

  // console.log(localStorage.getItem("leaveBalance"))

  return (
    <div id="table-outer-div-scroll">
      <div className="leave-balance">
        {/* leavebalance value has been set in localstorage (DashboardEmp) */}
        <p>Leave Balance:{localStorage.getItem("leaveBalance")}</p>
      </div>
      <div className="heading-and-button">
        <div>
          <span id="role-title">Leave</span>
          <br />
          <span id="role-title">Requests</span>
        </div>

        <Button
          variant="primary"
          id="add-button"
          onClick={props.onAddLeaveApplicationEmp}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
        </Button>
      </div>
      <div id="clear-both" />

      {!loading ? (
        <div
          id="table-div"
          className="ag-blue"
          style={{ height: "400px", width: "100%", padding: "10px" }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            // columnTypes={columnTypes}
            rowData={rowData}
            pagination={true}
            paginationPageSize={20}
            // getRowHeight={getRowHeight}
            // rowClassRules = {rowClassRules}
          />
        </div>
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
  );
}

export default LeaveApplicationEmpTable;
