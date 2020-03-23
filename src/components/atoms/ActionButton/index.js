import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Divider } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    actionButton: {
        background: '#9ea0a5',
        color: '#fff',
        width: '40px',
        height: '30px'
    },
    disableBoxShadow: {
        boxShadow: 'none'
    },
}))

const ActionButton=(props)=>{
    const classes=useStyles();
    const mapper= new Map([
        ['assign',<Fab classes={{ root: classes.disableBoxShadow }} onClick={()=>props.handleClickOpen(props.row)} className={classes.actionButton}>{props.row.action}</Fab>]
    ])
return (<div>
    {mapper.get('assign')}
</div>)
}

export default ActionButton;