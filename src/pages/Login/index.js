import React from 'react';
import zemoso from '../../assets/images/zemoso_logo.png';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import GoogleButton from '../../components/molecules/GoogleButton';
const useStyles = makeStyles(theme => ({
    Layout: {
        display: 'flex',
        borderRadius: '15px',
    },
    Left: {
        background: '#C0C0C0',
        flexGrow: 1,
        paddingBottom: '100vh'
    },
    Right: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column'
    },
    logo: {
        alignSelf: 'flex-end',
        padding: '15px',
        marginBottom: theme.spacing(30)
    },
    text: {
        alignSelf: 'flex-start',
        marginLeft: theme.spacing(5),
        marginBottom: theme.spacing(3),
        color: '#737373'
    },
    text2: {
        alignSelf: 'flex-start',
        marginLeft: theme.spacing(5),
        marginBottom: theme.spacing(3),
        color: '#737373'
    },
    Button: {
        alignSelf: 'flex-start',
        marginLeft: theme.spacing(5),
        marginBottom: theme.spacing(3)
    },
}))
const Login = () => {
    const classes = useStyles();
    return (
        <div className={classes.Layout}>
            <div className={classes.Left}></div>
            <div className={classes.Right}>
                <img src={zemoso} alt="Zemoso Logo" height="110" width="110" className={classes.logo} />
                <div className={classes.text}><Typography variant="h3">Hi There!</Typography></div>
                <Typography variant="h4" className={classes.text2}>We are happy to have you here</Typography>
                <div className={classes.Button}><GoogleButton /></div>
            </div>
        </div>);
}

export default Login;