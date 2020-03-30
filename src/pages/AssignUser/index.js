import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import EnhancedTable from "../../components/molecules/EnhancedTable";
import "../../assets/css/zeplin.css";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import TextField from "@material-ui/core/TextField";
import ReactFileReader from "react-file-reader";
import { createUsers, getAllUsers } from "../../services/UserMgmtService";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { csvToObject } from "../../utils/helper";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  tableHeading: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0)",
    boxShadow: "0 1px 0 0 #eaedf3",
    display: "flex",
    flexDirection: "row"
  },
  headingText: {
    width: "22px",
    height: "28px",
    fontFamily: "Roboto",
    fontSize: "18px",
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: 1.56,
    letterSpacing: "normal",
    color: "#3e3f42",
    flexGrow: 1,
    marginTop: "25px",
    textAlign: "left",
    paddingLeft: "4%",
    paddingBottom: "10px"
  },
  button: {
    width: "138px",
    height: "38px",
    borderRadius: "4px",
    boxShadow:
      "0 1px 1px 0 rgba(22, 29, 37, 0.1), inset 0 2px 0 0 rgba(255, 255, 255, 0.06)",
    border: "solid 1px #1461d2",
    backgroundImage: "linear-gradient(to top, #1665d8, #1f6fe5)",
    color: "#fff",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "30px",
    marginBottom: "20px",
    marginTop: "25px",
    display: "flex",
    flexDirection: "row",
    fontSize: "14px"
  },
  searchBox: {
    border: "solid 0px #e2e5ed",
    background: "#fff",
    color: "#3e3f42"
  }
}));

const AssignUser = props => {
  const classes = useStyles();
  const [fname, setFname] = useState(true);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [failedImport, setFailedImport] = useState(false);

  const handleFailedImport = () => {
    setFailedImport(true);
  };

  const handleCloseFailedImport = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFailedImport(false);
  };
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const renderUsers = async () => {
    let data = await getAllUsers();
    let records = [];
    console.log(data);
    if (!data.message) {
      data.map(row => {
        if (row.hardwareId === null)
          records.push({
            empName: row.userEmail,
            empId: row.employeeId !== "" ? row.employeeId : "NA",
            dateOfJoining: row.dateOfJoining.substring(0, 10),
            action: "A",
            userId: row.userId
          });
      });
    }
    if (records.length !== rows.length) {
      setRows(records);
    }
  };

  useEffect(() => {
    renderUsers();
  }, [fname]);

  const handleFiles = files => {
    const reader = new FileReader();
    reader.onload = function(e) {
      let obj = csvToObject(e.target.result, setFailedImport);
      if (obj !== null)
        createUsers(obj, setFname, fname, handleClick, handleFailedImport);
    };
    reader.readAsText(files[0]);
  };
  return (
    <div>
      <div className={classes.tableHeading}>
        <div className={classes.headingText}></div>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            The users imported successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={failedImport}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
          onClose={handleCloseFailedImport}
        >
          <Alert severity="error" onClose={handleCloseFailedImport}>
            Some thing went wrong please check your csv file!
          </Alert>
        </Snackbar>
        <Autocomplete
          style={{ width: "240px", marginRight: "30px" }}
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={rows.map(option => option.empName)}
          renderInput={params => (
            <TextField
              {...params}
              label="Search"
              margin="normal"
              variant="outlined"
              className={classes.searchBox}
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          )}
        />
        <ReactFileReader handleFiles={handleFiles} fileTypes={".csv"}>
          <button className={classes.button}>
            <ControlPointIcon style={{ marginRight: "5px" }} />
            Upload csv
          </button>
        </ReactFileReader>
      </div>
      <EnhancedTable
        type="assign"
        rows={rows}
        fname={fname}
        setFname={setFname}
        headerType="userAssign"
      />
    </div>
  );
};

export default AssignUser;
