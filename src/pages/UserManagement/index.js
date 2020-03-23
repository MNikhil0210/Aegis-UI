import React, { useState,useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import '../../assets/css/zeplin.css';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Toolbar, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ReactFileReader from "react-file-reader";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createUsers ,getAllUsers} from '../../services/UserMgmtService';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AssignUser from '../AssignUser';
import ExtendOrRemoveUser from '../ExtendOrRemoveUser';
import AddGuest from '../../components/organisms/AddGuest';


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
}));


const UserManagement = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(1);
  const [profile, setProfile] = React.useState("");
  const [fname, setFname] = useState(true);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [failedImport,setFailedImport]=useState(false);


  const handleFailedImport=()=>{
    setFailedImport(true)
  }

  const handleCloseFailedImport=(event,reason)=>{
    if (reason === 'clickaway') {
      return;
    }
    setFailedImport(false)
  }
  const handleClick = () => {
    setOpen(true);
  };


    useEffect(() => {
      getAllUsers(rows, setRows);
    }, [fname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const csvToObject=(bufferString)=>{
    let arr;    
    arr = bufferString.split('\n'); 
    var jsonObj = [];
    var headers = arr[0].split(',');
    for(var i = 1; i < arr.length; i++) {
      var data = arr[i].split(',');
      if(data.length<headers.length && data.length!=1){
        console.log(data.length,data);
        setFailedImport(true)
        return null;
      }
      var obj = {};
      for(var j = 0; j < data.length; j++) {
        obj[headers[j].trim()] = data[j].trim();
      }
      if(data.length==headers.length)
      jsonObj.push(obj);

      
}
JSON.stringify(jsonObj);
return jsonObj;
  }
  const handleFiles = files => {
    const reader = new FileReader();
    reader.onload = function (e) {
    console.log(e.target.result)
    let obj=csvToObject(e.target.result)
    console.log(obj);
    if(obj!==null)
   createUsers(obj,setFname,fname,handleClick);
    };
    reader.readAsText(files[0]);

   
  };

  const TabComponents=[<AssignUser/>,<div><AddGuest/></div>,<ExtendOrRemoveUser/>]


  // const rows = [
  //   { empName: "John", empId: "ZTPL001", dateOfJoining: "01-08-2018", action: "A" },
  //   { empName: "Tarun", empId: "ZTPL002", dateOfJoining: "04-10-2018", action: "A" },
  //   { empName: "Nikhil", empId: "ZTPL003", dateOfJoining: "11-08-2018", action: "A" },
  //   { empName: "Sreetej", empId: "ZTPL004", dateOfJoining: "24-06-2019", action: "A" },
  //   { empName: "Bravo", empId: "ZTPL005", dateOfJoining: "01-02-2020", action: "A" },
  //   { empName: "Dave", empId: "ZTPL006", dateOfJoining: "10-10-2017", action: "A" },
  // ];

  return (
    <div>
     
     
      {/* <Snackbar open={open} anchorOrigin={{ vertical:"top", horizontal:"center" }} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          the users imported successfully
        </Alert>
      </Snackbar>

      <Snackbar open={failedImport} anchorOrigin={{ vertical:"top", horizontal:"center" }} autoHideDuration={6000} onClose={handleCloseFailedImport}> 
        <Alert severity="error" onClose={handleCloseFailedImport}>
          some thing went wrong please check your csv file!
          </Alert>
      </Snackbar> */}
     
       
          
            <CustomizedTabs value={value} setValue={setValue}/>
            {/* <div className={classes.tableHeading}>
              <div className={classes.headingText}>All</div>
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
            <EnhancedTableUsers rows={rows} />
         */}
         {TabComponents[value]}
     
 
    </div>)
}

export default UserManagement;

const AntTabs = withStyles({
  root: {
    borderBottom: '0px solid #1665d8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&$selected': {
      color: '#3e3f42',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#3e3f42',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

function CustomizedTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    props.setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.demo1}>
        <AntTabs className={classes.tabPanel} value={props.value} onChange={handleChange} aria-label="ant example">
          <AntTab className={classes.tabText} label="Assign Card" />
          <AntTab className={classes.tabText} label="Add Guest/Contractors" />
          <AntTab className={classes.tabText} label="Remove/Extend" />
        </AntTabs>
      </div>
    </div>
  );
}
