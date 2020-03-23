import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Fab } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

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
}));





export default function EnhancedTableHeadUsers(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };
    let headCells=[]
    if(props.headerType==="card"){
        headCells = [
            { id: 'cardId', numeric: false, disablePadding: true, label: 'CARD ID' },
            { id: 'dateOfCardIssued', numeric: true, disablePadding: false, label: 'DATE OF CARD ISSUED' },
            { id: 'status', numeric: true, disablePadding: false, label: 'STATUS' },
            { id: 'empName_Id', numeric: true, disablePadding: false, label: 'EMP NAME/ ID' },
            { id: 'action', numeric: true, disablePadding: false, label: 'ACTION' },
        ];
    }
    else if(props.headerType==="userAssign"){
         headCells = [
            { id: 'empName', numeric: false, disablePadding: true, label: 'EMP NAME' },
            { id: 'empId', numeric: true, disablePadding: false, label: 'EMP ID' },
            { id: 'dateOfJoining', numeric: true, disablePadding: false, label: 'DATE OF JOINING' },
            { id: 'action', numeric: true, disablePadding: false, label: 'ACTION' },
        ];
    }
    else{
        headCells=[
            { id: 'EmpName', numeric: true, disablePadding: false, label: 'EMP NAME' },
            { id: 'empId', numeric: true, disablePadding: false, label: 'EMP ID' },
            { id: 'cardId', numeric: false, disablePadding: true, label: 'CARD ID' },
            { id: 'dateOfCardIssued', numeric: true, disablePadding: false, label: 'DATE OF CARD ISSUED' },
            { id: 'TypeOfEmployee', numeric: true, disablePadding: false, label: 'TYPE OF EMPLOYEE' },
            { id: 'action', numeric: true, disablePadding: false, label: 'ACTION' },
        ]
    }

    return (
        <TableHead>
            <TableRow>
                <TableCell>
                </TableCell>
                {headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        //padding={headCell.disablePadding ? 'none' : 'center'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            className={classes.tableColumnHeading}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHeadUsers.propTypes = {
    classes: PropTypes.object.isRequired,
    //numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    //onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};