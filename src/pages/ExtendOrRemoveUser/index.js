import React, { useEffect } from 'react';
import EnhancedTable from '../../components/molecules/EnhancedTable';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { getAllUsers } from '../../services/UserMgmtService';

const useStyles = makeStyles(theme => ({
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
  searchBox: {
    border: 'solid 0px #e2e5ed',
    background: '#fff',
    color: '#3e3f42',
  },
}))

const ExtendOrRemoveUser = () => {
  const classes = useStyles();
  let record = []
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    const getCardHolders = async () => {
      const users = await getAllUsers();
      const cardHolders = users.filter(user => user.hardwareId !== null)
      cardHolders.map(user => {
        let id;
        if (user.employeeId !== null)
          id = user.employeeId
        else
          id = 'NA';
        record.push({ empName: user.username, empId: id, cardId: user.hardwareId, dateOfJoining: "2020-03-24", typeOfEmployee: user.userType, action: "A" });
      })
      setRows(record);
    }
    getCardHolders();
  }, [record])

  return (<div>
    <div className={classes.tableHeading}>
      <div className={classes.headingText}></div>
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
    </div>
    <EnhancedTable rows={rows} /></div>)
}

export default ExtendOrRemoveUser;