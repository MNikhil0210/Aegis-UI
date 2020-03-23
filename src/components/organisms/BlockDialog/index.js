import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Fab, Divider } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    actionButton: {
        background: '#9ea0a5',
        color: '#fff',
        width: '40px',
        height: '30px'
    },
    disableBoxShadow: {
        boxShadow: 'none'
    },
    dialogWidth: {
        width: '560px'
    },
    tableColumnHeading: {
        width: '170px',
        height: '18px',
        fontFamily: 'Roboto',
        fontSize: '12px',
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 1.56,
        letterSpacing: 'normal',
        color: '#9ea0a5',
    },
    dialog: {
        width: '552px',
        height: '352px',
    },
}));
function BlockDialog(props) {
    const classes = useStyles();
    return (
        <div>
            <Dialog classes={{paperWidthSm: classes.dialogWidth}} open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.empName}</DialogTitle>
                <Divider variant="fullWidth"/>
                <DialogTitle id="form-dialog-title">Card ID: {props.cardId}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Reason for blocking
                    </DialogContentText>
                    <TextField
                        autoFocus
                        style={{width: '515px'}}
                        margin="dense"
                        variant="outlined"
                        multiline
                        rows="5"
                    />
                </DialogContent>
                <DialogActions>
                    <Button disableElevation onClick={props.handleClose} variant="contained">
                        Cancel
                    </Button>
                    <Button disableElevation onClick={props.handleClose} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BlockDialog;