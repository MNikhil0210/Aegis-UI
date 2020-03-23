import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import EnhancedTable from '../../components/molecules/EnhancedTable';
import '../../assets/css/zeplin.css';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Toolbar, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ReactFileReader from "react-file-reader";
import { createUsers, getAllUsers } from '../../services/UserMgmtService';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {csvToObject} from '../../utils/helper';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
    orientation: {
        display: 'flex',
        height: '100%'
    },
    tableHeading: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        boxShadow: '0 1px 0 0 #eaedf3',
        display: 'flex',
        flexDirection: 'row',
    },
    headingText: {
        width: '22px',
        height: '28px',
        fontFamily: 'Roboto',
        fontSize: '18px',
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.56,
        letterSpacing: 'normal',
        color: '#3e3f42',
        flexGrow: 1,
        marginTop: '25px',
        textAlign: 'left',
        paddingLeft: '4%',
        paddingBottom: '10px'
    },
    button: {
        width: '200px',
        height: '55px',
        borderRadius: '4px',
        border: 'solid 1px #e2e5ed',
        background: '#fff',
        color: '#3e3f42',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '30px',
        marginBottom: '20px',
        marginTop: '16px',
        display: 'flex',
        flexDirection: 'row',
        fontSize: '14px'
    },
    searchBox: {
        border: 'solid 0px #e2e5ed',
        background: '#fff',
        color: '#3e3f42',
    },
    root: {
        flexGrow: 1,
    },
    padding: {
        padding: theme.spacing(3),
    },
    demo1: {
        backgroundColor: theme.palette.background.paper,
    },
    tabText: {
        height: '24px',
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.5,
        letterSpacing: 'normal',
        color: '#3e3f42',
    },
    tabPanel: {
        paddingLeft: '20px',
        paddingTop: '10px'
    },
}))

const AssignUser = (props) => {
    const classes = useStyles();
    const [fname, setFname] = useState(true);
    const [rows, setRows] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [failedImport, setFailedImport] = useState(false);


    const handleFailedImport = () => {
        setFailedImport(true)
    }

    const handleCloseFailedImport = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setFailedImport(false)
    }
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const renderUsers=async ()=>{
       let data=await getAllUsers();
       console.log(data);
       let records=[]
       data.map(row=>{
           records.push({empName:row.username,empId:row.userId.substring(0,7).toUpperCase(),dateOfJoining:row.createdAt,action:"A"})
       })
       if(records.length!==rows.length){
       setRows(records)    
   }
    }

    useEffect(() => {
            renderUsers()
    }, [fname]);

    const handleFiles = files => {
        const reader = new FileReader();
        reader.onload = function (e) {
            console.log(e.target.result)
            let obj = csvToObject(e.target.result,setFailedImport)
            console.log(obj);
            if (obj !== null)
                createUsers(obj, setFname, fname, handleClick);
        };
        reader.readAsText(files[0]);


    };
    return (<div>
        <div className={classes.tableHeading}>
            <div className={classes.headingText}>All</div>

            <Snackbar open={open} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    the users imported successfully
        </Alert>
            </Snackbar>

            <Snackbar open={failedImport} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={6000} onClose={handleCloseFailedImport}>
                <Alert severity="error" onClose={handleCloseFailedImport}>
                    some thing went wrong please check your csv file!
          </Alert>
            </Snackbar>
            <Autocomplete
                style={{ width: '240px', marginRight: '30px' }}
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
                        InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                )}
            />
            <ReactFileReader handleFiles={handleFiles} fileTypes={".csv"}>
                <button className={classes.button}>
                    <RefreshIcon style={{ marginRight: '5px', opacity: 0.5 }} />
                    Add Csv File
                                </button>
            </ReactFileReader>
        </div>
        <EnhancedTable rows={rows} headerType="userAssign"/>
    </div>
    )
}

export default AssignUser;