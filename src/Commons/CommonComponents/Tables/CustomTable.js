import React from "react";
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
import moment from "moment";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import getComponentForEditing from "../SpecialFormatComponentsForEditing";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CustomTable({
  header,
  handleRemove,
  startEditing,
  editIdx,
  handleChange,
  stopEditing,
  disableUpdate,
  disableDelete,
  title,
  data,
}) {
  const classes = useStyles();

  const getDataForDisplayingForSpecialFormat = (format, name, field) => {
    if (format === "date") return moment.unix(field).format("DD/MM/YYYY");
    if (format === "jobAvailability")
      return field ? "Available" : "Not available";
    if (format === "photoUrl") return <Avatar alt="avatar" src={field} />;
    if (format === "url")
      return (
        <Link href={"https://" + `${field}`} target="_blank" color="inherit">
          {field}
        </Link>
      );
  };

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
            {(() => {
              switch (true) {
                case !currentlyEditing:
                  switch (true) {
                    case y.specialFormatForDisplaying !== undefined:
                      return getDataForDisplayingForSpecialFormat(
                        y.specialFormatForDisplaying,
                        y.prop,
                        x[y.prop]
                      );

                    default:
                      return x[y.prop];
                  }

                case currentlyEditing:
                  switch (true) {
                    case y && y.disableUpdate:
                      return x[y.prop];

                    case y &&
                      !y.disableUpdate &&
                      y.componentForEditing !== undefined:
                      return getComponentForEditing(
                        y.prop,
                        x[y.prop],
                        y.componentForEditing,
                        i,
                        handleChange
                      );

                    case y && !y.disableUpdate:
                      return (
                        <TextField
                          name={y.prop}
                          onChange={(e) => {
                            e.preventDefault();
                            handleChange({
                              value: e.target.value,
                              name: y.prop,
                              index: i,
                            });
                          }}
                          value={x[y.prop]}
                        />
                      );

                    default:
                      return null;
                  }
              }
            })()}
          </TableCell>
        ))}
        <TableCell>
          {(() => {
            switch (true) {
              case currentlyEditing:
                return (
                  <CheckIcon
                    onClick={(e) => {
                      e.preventDefault();
                      stopEditing(i);
                    }}
                  />
                );
              case !currentlyEditing && !disableUpdate:
                return (
                  <EditIcon
                    onClick={(e) => {
                      e.preventDefault();
                      startEditing(i);
                    }}
                  />
                );
              default:
                return null;
            }
          })()}
        </TableCell>
        <TableCell>
          {!disableDelete ? (
            <DeleteIcon
              onClick={() => {
                handleRemove(i);
              }}
            />
          ) : null}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      <h2>{title}</h2>
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
            {data &&
              data.map((row, key) =>
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
