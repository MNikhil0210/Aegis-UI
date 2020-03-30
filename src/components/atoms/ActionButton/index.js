import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import ExtendValidityDialog from "../../organisms/ExtendValidityDialog";
const useStyles = makeStyles(theme => ({
  actionButton: {
    background: "#9ea0a5",
    color: "#fff",
    width: "40px",
    height: "30px"
  },
  disableBoxShadow: {
    boxShadow: "none",
    marginRight: "5px"
  }
}));

const ActionButton = props => {
  const classes = useStyles();
  const [openExtend, setOpenExtend] = useState(false);
  console.log(props.row);
  const handleClick = () => {
    setOpenExtend(true);
  };
  const handleClose = () => {
    setOpenExtend(false);
  };

  const mapper = new Map([
    [
      "assign",
      <Fab
        classes={{ root: classes.disableBoxShadow }}
        onClick={() => props.handleClickOpen(props.row, props.idx)}
        className={classes.actionButton}
      >
        {props.row.action}
      </Fab>
    ],
    [
      "extend",
      <div>
        <Fab
          classes={{ root: classes.disableBoxShadow }}
          //onClick={() => props.handleClickOpen(props.row, props.idx)}
          className={classes.actionButton}
        >
          R
        </Fab>
        <Fab
          classes={{ root: classes.disableBoxShadow }}
          onClick={handleClick}
          className={classes.actionButton}
        >
          E
        </Fab>
      </div>
    ]
  ]);
  return (
    <>
      {openExtend ? (
        <ExtendValidityDialog open={openExtend} handleClose={handleClose} />
      ) : (
        <div>{mapper.get(props.type)}</div>
      )}
    </>
  );
};

export default ActionButton;
