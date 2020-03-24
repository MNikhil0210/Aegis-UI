import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EnhancedTable from '../../components/molecules/EnhancedTable';
import '../../assets/css/zeplin.css';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { Toolbar } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getAllCards } from '../../services/CardMgmtService';
import AddCardToList from '../AddCardToList';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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
  button: {
    width: '138px',
    height: '38px',
    borderRadius: '4px',
    boxShadow: '0 1px 1px 0 rgba(22, 29, 37, 0.1), inset 0 2px 0 0 rgba(255, 255, 255, 0.06)',
    border: 'solid 1px #1461d2',
    backgroundImage: 'linear-gradient(to top, #1665d8, #1f6fe5)',
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '30px',
    marginBottom: '20px',
    marginTop: '25px',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '14px'
  },
}));

function createData(cardId, dateOfCardIssued, status, empName_Id, action) {
  return { cardId, dateOfCardIssued, status, empName_Id, action };
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const CardManagement = (props) => {
  const classes = useStyles();
  const [addCard, setAddCard] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [render, setRender] = useState(false)
  const renderCards = async () => {
    const cards = await getAllCards();
    let records = []
    cards.map(data => {
      records.push(createData(data.hardwareId, data.modifiedAt, data.status, data.userId, "B"))
    })
    console.log(records)
    setRows(records);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    renderCards()
  }, [render]);

  return (
    <div>

      <Toolbar />
      <Snackbar open={open} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          card is successfully added
        </Alert>
      </Snackbar>
      {addCard ? <AddCardToList setRender={setRender} render={render} addCard={setAddCard} setOpen={setOpen} /> :
        <div >
          <div>
            <div className={classes.tableHeading}>
              <div className={classes.headingText}>All</div>
              <Autocomplete
                style={{ width: '240px', marginRight: '30px' }}
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={rows.map(option => option.hardwareId)}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Search"
                    margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search' }}
                  />
                )}
              />
              <button className={classes.button} onClick={() => setAddCard(true)}>
                <ControlPointIcon style={{ marginRight: '8px' }} />
                Add New</button>
            </div>
            <EnhancedTable rows={rows} headerType="card" />
          </div>
        </div>}
    </div>)
}

export default CardManagement;