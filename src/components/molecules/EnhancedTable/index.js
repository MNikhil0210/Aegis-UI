import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Fab, Divider } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import AssignCardDialog from '../../organisms/AssignCardDialog';
import EnhancedTableHeadUsers from '../EnhancedTableHeadUsers';
import ActionButton from '../../atoms/ActionButton';


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

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}


export default function EnhancedTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('dateOfCardIssued');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [cardId, setCardId] = useState();
    const [empName, setEmpName] = useState("");

    const handleClickOpen = (x) => {
        setOpen(true);
        setCardId(x.hardwareId);
        setEmpName(x.modifiedBy);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleClick = (event, cardId) => {
        const selectedIndex = selected.indexOf(cardId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, cardId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = cardId => selected.indexOf(cardId) !== -1;

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHeadUsers
                            headerType={props.headerType}
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={props.rows.length}
                        />
                        <TableBody>
                            {stableSort(props.rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.cardId);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => handleClick(event, row.cardId)}
                                            aria-checked={isItemSelected}
                                            key={row.cardId}
                                            style={{ height: '70px' }}

                                            
                                        >
                                            <TableCell></TableCell>
                                            {Object.keys(row).map( (data,idx)=>{
                                                if(idx===0){
                                                    return <TableCell component="th" scope="row" padding="none" >{row[data]}</TableCell>
                                                }
                                                else if(data==="action"){
                                                    return  <TableCell align="right"><ActionButton row={row} handleClickOpen={handleClickOpen}/></TableCell>
                                                }

                                               return <TableCell align="right">{row[data]}</TableCell>
                                            })}
                                         
                                            {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                                                {row.hardwareId}
                                            </TableCell>
                                            <TableCell align="right">{row.assignDate}</TableCell>
                                            <TableCell align="right">{row.status}</TableCell>
                                            <TableCell align="right">{row.modifiedBy}</TableCell>
                                            <TableCell align="right"><Fab classes={{ root: classes.disableBoxShadow }} onClick={()=>handleClickOpen(row)} className={classes.actionButton}>{row.status.charAt(0) === 'B' ? 'UB' : 'B'}</Fab></TableCell> */}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20]}
                    component="div"
                    count={props.rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            {/* <BlockDialog open={open} cardId={cardId} empName={empName} handleClose={handleClose} /> */}
            <AssignCardDialog  open={open} cardId={cardId} empName={empName} handleClose={handleClose}/>
        </div>
    );
}

