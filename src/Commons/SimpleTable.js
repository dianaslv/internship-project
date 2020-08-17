import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import TextField from "@material-ui/core/TextField";


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function SimpleTable(props) {
    const classes = useStyles();
    // const [data] = useState(props.data);

    const {header, handleRemove, startEditing, editIdx, handleChange, stopEditing} = props;

    if (props.data) {
        console.log("data form simple table", props.data);
    }

    const newRow = (x, i, header, handleRemove, startEditing, editIdx, handleChange, stopEditing) => {
        const currentlyEditing = editIdx === i;
        return (
            <TableRow key={`tr-${i}`}>
                {header.map((y, k) => (
                    <TableCell key={`trc-${k}`}>
                        {currentlyEditing ?
                            y.disableUpdate ? x[y.prop] :
                                <TextField
                                    name={y.prop}
                                    onChange={e => handleChange(e, y.prop, i)}
                                    value={typeof x[y.prop] === "boolean" ? x[y.prop] ? "Available" : "Not available" : x[y.prop]}
                                />

                            :
                            typeof (x[y.prop]) === "boolean" ? x[y.prop] ? "Available" : "Not available" : x[y.prop]
                        }
                    </TableCell>
                ))}
                <TableCell>
                    {currentlyEditing ?
                        <CheckIcon onClick={() => stopEditing(i)}/>
                        :
                        props.disableUpdate ? null : <EditIcon onClick={() => startEditing(i)}/>
                    }
                </TableCell>
                <TableCell>
                    {props.disableDelete ? null : <DeleteIcon onClick={() => {
                        handleRemove(i)
                    }
                    }/>}
                </TableCell>
            </TableRow>
        );
    };

    return (
        <>
            <h2>{props.title}</h2>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {header.map((x, i) => (
                                <TableCell key={`thc-${i}`}>{x.name}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data && props.data.map((row, key) =>
                            (newRow(row, key, header, handleRemove, startEditing, editIdx, handleChange, stopEditing))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
