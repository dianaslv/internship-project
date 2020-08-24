import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import { useQuery } from "@apollo/client";
import { UsersContactInfo } from "../Apollo/Queries/UserQueries/UserQueries";
import { Countries } from "../Apollo/Queries/UserQueries/CountryQueries";
import moment from "moment";
import DateTimePicker from "./DateTimePicker";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();
  const [country, setCountry] = useState({ id: "", name: "" });
  const { data: dataCountries, loading } = useQuery(Countries);

  const {
    header,
    handleRemove,
    startEditing,
    editIdx,
    handleChange,
    stopEditing,
  } = props;

  if (loading) return null;

  const newRow = (
    x,
    i,
    header,
    handleRemove,
    startEditing,
    editIdx,
    handleChange,
    stopEditing
  ) => {
    const currentlyEditing = editIdx === i;

    return (
      <TableRow key={`tr-${i}`}>
        {header.map((y, k) => (
          <TableCell key={`trc-${k}`}>
            {currentlyEditing ? (
              y.disableUpdate ? (
                x[y.prop]
              ) : y.prop === "countryName" ? (
                <Select
                  name="countryName"
                  native
                  value={x[y.prop]}
                  onChange={(e) => handleChange(e, i)}
                  input={<Input id="demo-dialog-native" />}
                >
                  <option aria-label="None" value="" />
                  {dataCountries &&
                    country &&
                    dataCountries.counties.map((dataCountry) => (
                      <option
                        data-key={dataCountry.id}
                        value={dataCountry.name}
                      >
                        {dataCountry.name}
                      </option>
                    ))}
                </Select>
              ) : y.prop === "endDate" || y.prop === "startDate" ? (
                <DateTimePicker
                  field={y.prop}
                  row={i}
                  handleChange={props.handleChangeDate}
                />
              ) : (
                <TextField
                  name={y.prop}
                  onChange={(e) => handleChange(e, y.prop, i)}
                  value={
                    typeof x[y.prop] === "boolean"
                      ? x[y.prop]
                        ? "Available"
                        : "Not available"
                      : x[y.prop]
                  }
                />
              )
            ) : typeof x[y.prop] === "boolean" ? (
              x[y.prop] ? (
                "Available"
              ) : (
                "Not available"
              )
            ) : y.prop === "endDate" || y.prop === "startDate" ? (
              moment.unix(x[y.prop]).format("DD/MM/YYYY")
            ) : (
              x[y.prop]
            )}
          </TableCell>
        ))}
        <TableCell>
          {currentlyEditing ? (
            <CheckIcon onClick={() => stopEditing(i)} />
          ) : props.disableUpdate ? null : (
            <EditIcon onClick={() => startEditing(i)} />
          )}
        </TableCell>
        <TableCell>
          {props.disableDelete ? null : (
            <DeleteIcon
              onClick={() => {
                handleRemove(i);
              }}
            />
          )}
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
            {props.data &&
              props.data.map((row, key) =>
                newRow(
                  row,
                  key,
                  header,
                  handleRemove,
                  startEditing,
                  editIdx,
                  handleChange,
                  stopEditing
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
