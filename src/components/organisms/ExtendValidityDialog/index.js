import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider, DialogContentText, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles(theme => ({
  dialogWidth: {
    width: "560px"
  },
  dialogDropdown: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "30px"
  },
  bottom: {
    marginBottom: "30px"
  },
  datePicker: {
    width: "200px",
    marginRight: "30px"
  },
  title: {
    padding: "30px"
  },
  margin: {
    width: "280px",
    height: "40px",
    marginTop: "10px"
  },
  saveButton: {
    width: "75px",
    height: "38px",
    borderRadius: "4px",
    boxShadow:
      "0 1px 1px 0 rgba(19, 31, 21, 0.1), inset 0 2px 0 0 rgba(255, 255, 255, 0.06)",
    border: "solid 1px #2d9c3c",
    backgroundImage: "linear-gradient(to top, #34aa44, #38b249)",
    color: "#fff"
  }
}));

export default function ExtendValidityDialog(props) {
  const classes = useStyles();
  const [startDate, handleStartDateChange] = useState(new Date());
  const [endDate, handleEndDateChange] = useState(new Date());

  return (
    <div>
      <Dialog
        classes={{ paperWidthSm: classes.dialogWidth }}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={classes.title}>
          Extend Validity
        </DialogTitle>
        <Divider variant="fullWidth" light className={classes.bottom} />
        <DialogContent className={classes.bottom}>
          <div className={classes.dialogDropdown}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                className={classes.datePicker}
                disablePast
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="STARTS"
                value={startDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                className={classes.datePicker}
                disablePast
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="ENDS"
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <DialogContentText>Reason for extension</DialogContentText>
          <TextField
            autoFocus
            style={{ width: "515px" }}
            margin="dense"
            variant="outlined"
            multiline
            rows="5"
          />
        </DialogContent>
        <DialogActions>
          <Button
            disableElevation
            onClick={props.handleClose}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            disableElevation
            className={classes.saveButton}
            onClick={props.handleClose}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
