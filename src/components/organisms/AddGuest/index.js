import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { TextField, FormControlLabel, Radio, FormControl, NativeSelect } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import InputBase from '@material-ui/core/InputBase';
import { postUserToDB } from '../../../services/UserMgmtService';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    radio: {
        color: "#2d9c3c",
    },
    margin: {
        width: '300px',
        height: '40px'
    },
    radioButton: {
        marginLeft: '230px',
        marginTop: '25px'
    },
    text: {
        alignSelf: 'center',
        marginRight: '150px'
    },
    selectCard: {
        alignSelf: 'center',
        marginRight: '90px'
    },
    date: {
        alignSelf: 'center',
        marginRight: '120px'
    },
    names: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: '30px',
        marginTop: '40px',
    },
    saveButton: {
        width: '75px',
        height: '38px',
        borderRadius: '4px',
        boxShadow: '0 1px 1px 0 rgba(19, 31, 21, 0.1), inset 0 2px 0 0 rgba(255, 255, 255, 0.06)',
        border: 'solid 1px #2d9c3c',
        backgroundImage: 'linear-gradient(to top, #34aa44, #38b249)',
        color: '#fff',
        marginLeft: '225px',
        marginTop: '40px'
    },
}));

const BootstrapInput = withStyles(theme => ({
    input: {
        borderRadius: 4,
        position: 'relative',
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

export default function AddGuest() {
    const classes = useStyles();
    const [type, setType] = useState("");
    const [startDate, handleStartDateChange] = useState(new Date());
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [endDate, handleEndDateChange] = useState(new Date());
    const [cardNo, setCardNo] = useState();
    const addUser = async () => {
        postUserToDB(cardNo, fullName, startDate, endDate, type, phone)
    }

    const handleName = event => {
        setName(event.target.value);
    }
    const handleLastName = event => {
        setLastName(event.target.value);
        setFullName(name + " " + event.target.value);
    }
    const handleChange = event => {
        setType(event.target.value);
    }
    const handlePhone = event => {
        setPhone(event);
    }
    const handleCard = event => {
        setCardNo(event.target.value);
    }

    return (
        <div className={classes.root}>
            <div className={classes.names}>
                <div className={classes.text}>NAME:</div>
                <TextField
                    style={{ marginRight: '10px' }}
                    label="FirstName"
                    margin="normal"
                    variant="outlined"
                    value={name}
                    onChange={handleName}
                />
                <TextField
                    label="LastName"
                    margin="normal"
                    variant="outlined"
                    value={lastName}
                    onChange={handleLastName}
                />
            </div>
            <div className={classes.names}>
                <div className={classes.text}>PHONE:</div>
                <PhoneInput
                    country={'in'}
                    onlyCountries={['in', 'gb']}
                    value={phone}
                    onChange={handlePhone}
                />
            </div>
            <div className={classes.radioButton}>
                <FormControlLabel
                    checked={type === 'Guest'}
                    value="Guest"
                    onChange={handleChange}
                    control={<Radio classes={{ colorPrimary: classes.radio, colorSecondary: classes.radio, checked: classes.radio }} />} label="Guest"
                />
                <FormControlLabel
                    checked={type === 'Contractor'}
                    value="Contractor"
                    onChange={handleChange}
                    control={<Radio classes={{ colorSecondary: classes.radio, checked: classes.radio }} />} label="Contractor"
                />
            </div>
            <div className={classes.names}>
                <div className={classes.date}>DURATION:</div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        disablePast
                        variant="inline"
                        format="yyyy/MM/dd"
                        margin="normal"
                        id="date-picker-inline"
                        label="STARTS"
                        value={startDate}
                        onChange={handleStartDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        disableToolbar
                        disablePast
                        variant="inline"
                        format="yyyy/MM/dd"
                        margin="normal"
                        id="date-picker-inline"
                        label="ENDS"
                        value={endDate}
                        onChange={handleEndDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>
            <div className={classes.names}>
                <div className={classes.selectCard}>ASSIGN CARD:</div>
                <FormControl className={classes.margin}>
                    <NativeSelect
                        id="demo-customized-select-native"
                        value={cardNo}
                        onChange={handleCard}
                        input={<BootstrapInput />}
                    >
                        <option value="" >Select Any</option>
                        <option value={'CTPO130'}>CTPO130</option>
                        <option value={'CTPO131'}>CTPO131</option>
                        <option value={'CTPO132'}>CTPO132</option>
                    </NativeSelect>
                </FormControl>
            </div>
            <button className={classes.saveButton} onClick={addUser}>Save</button>
        </div>
    );
}