import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Divider, FormControl, NativeSelect } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import { updateUserWithCard } from "../../../services/UserMgmtService";

const useStyles = makeStyles(theme => ({
  dialogWidth: {
    width: "560px",
    height: "270px"
  },
  dialogDropdown: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "80px"
  },
  margin: {
    width: "280px",
    height: "40px",
    marginTop: "10px"
  }
}));

const BootstrapInput = withStyles(theme => ({
  input: {
    borderRadius: 4,
    position: "relative",
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

export default function AssignCardDialog(props) {
  const classes = useStyles();
  const [cardNo, setCardNo] = useState();
  const [color, setColor] = useState("#e0e0e0");
  const [textColor, setTextColor] = useState("#000");

  const handleCard = event => {
    setCardNo(event.target.value);
    setColor("#2d9c3c");
    setTextColor("#fff");
  };

  const assignCardToUser = async () => {
    await updateUserWithCard(cardNo, props.userId);
    //should add a API call to Card management
    props.handleClose();
    props.setFname(!props.fname);
  };

  return (
    <div>
      <Dialog
        classes={{ paperWidthSm: classes.dialogWidth }}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {props.empName} / {props.cardId}
        </DialogTitle>
        <Divider variant="fullWidth" />
        <div className={classes.dialogDropdown}>
          <DialogTitle id="form-dialog-title">SELECT THE CARD:</DialogTitle>
          <DialogContent>
            <FormControl className={classes.margin}>
              <NativeSelect
                id="demo-customized-select-native"
                value={cardNo}
                onChange={handleCard}
                input={<BootstrapInput />}
              >
                <option value="">Select Any</option>
                <option value={"CTPO130"}>CTPO130</option>
                <option value={"CTPO131"}>CTPO131</option>
                <option value={"CTPO132"}>CTPO132</option>
              </NativeSelect>
            </FormControl>
          </DialogContent>
        </div>
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
            style={{ background: color, color: textColor }}
            onClick={assignCardToUser}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
