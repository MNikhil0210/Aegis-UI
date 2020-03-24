import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import '../../assets/css/zeplin.css';

const useStyles = makeStyles(theme => ({
  Addcard: {
    marginLeft: '5%',
    marginRight: '5%',
    width: '260px',
    height: '220px',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '4px',
    background: 'linear-gradient(to right, #1991eb 2%, #2da1f8 98%)',
    alignItems: 'center',
    flexDirection: 'column'
  },
  cards: {
    marginTop: '4%',
    display: 'flex',
    justifyContent: 'space-around'

  },
  cardContainer: {
    display: 'flex',
    marginTop: '4%'

  },
}));

const DashBoard = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.cardContainer}>
      <div className={classes.cards}>
        <div className={classes.Addcard} onClick={() => props.setValue(2)} >
          <ControlPointIcon fontSize="large" style={{ color: "white" }} />
          <div className="card">Add new card</div>
        </div>
        <div className="assign" onClick={() => props.setValue(3)}>
          <AssignmentIndIcon fontSize="large" style={{ color: "white" }} />
          <div className="card">Assign Card</div>
        </div>
        <div className="block" onClick={() => props.setValue(3)}>
          <AssignmentLateIcon fontSize="large" style={{ color: "white" }} />
          <div className="card">Block a card</div>
        </div>
        <div className="extend" onClick={() => props.setValue(2)}>
          <CalendarTodayIcon fontSize="large" style={{ color: "white" }} />
          <div className="card">Remove/extend</div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard;


