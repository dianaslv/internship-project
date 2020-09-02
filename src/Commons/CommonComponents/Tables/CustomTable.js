import React, { useState } from "react";
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
  stopEditing,
  disableUpdate,
  disableDelete,
  title,
  data,
}) {
  const classes = useStyles();
  const [editedData, setEditedData] = useState({});
  const [index, setIndex] = useState(-1);

  const startEditing = (i) => {
    setIndex(i);
    console.log("start editing", index, data[i]);
    setEditedData({ ...data[i] });
    console.log(editedData);
  };

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

  function handleChange(options) {
    console.log(options, editedData);
    const updatedEditedData = { ...editedData };
    if (options.name === "countryName") {
      let { country } = updatedEditedData;
      console.log(country);
      let updatedCountry = { ...country };
      updatedCountry["name"] = options.value;
      updatedEditedData["country"] = updatedCountry;
    } else {
      if (options.name === "userName") {
        let { user } = updatedEditedData;
        console.log(user);
        let updatedCountry = { ...user };
        updatedCountry["username"] = options.value;
        updatedEditedData["user"] = updatedCountry;
      } else {
        updatedEditedData[options.name] = options.value;
      }
    }
    if (options.options) {
      const selectedIndex = options.options.selectedIndex;
      const key = options.options[selectedIndex].getAttribute("data-key");
      if (options.name === "countryName")
        updatedEditedData["country"]["id"] = parseInt(key);
      if (options.name === "userName")
        updatedEditedData["user"]["id"] = parseInt(key);
      console.log(selectedIndex, key);
    }
    console.log(updatedEditedData);
    setEditedData(updatedEditedData);
  }

  function getFieldName(prop) {
    console.log("getFieldName", prop.split("."));
    return prop.split(".");
  }

  function getFieldValue(x, prop) {
    let res = prop.split(".");
    console.log("x", x, "prop", prop, prop.split("."));
    let obj = { ...x };
    for (let i = 0; i < res.length - 1; i++) {
      obj = { ...obj[res[i]] };
      console.log("obj", obj);
    }
    console.log("getFieldValue", obj[res[res.length - 1]]);
    return obj[res[res.length - 1]];
  }

  const newRow = (x, i, header, handleRemove, stopEditing) => {
    const currentlyEditing = index === i;

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
                        getFieldName(y.prop),
                        getFieldValue(x, y.prop)
                      );

                    default:
                      return getFieldValue(x, y.prop);
                  }

                case currentlyEditing:
                  switch (true) {
                    case y && y.disableUpdate:
                      return getFieldValue(x, y.prop);

                    case y &&
                      !y.disableUpdate &&
                      y.componentForEditing !== undefined:
                      return getComponentForEditing(
                        getFieldName(y.prop),
                        getFieldValue(x, y.prop),
                        y.componentForEditing,
                        i,
                        handleChange
                      );

                    case y && !y.disableUpdate:
                      return (
                        <TextField
                          name={getFieldName(y.prop)}
                          onChange={(e) => {
                            e.preventDefault();
                            handleChange({
                              value: e.target.value,
                              name: getFieldName(y.prop),
                              index: i,
                            });
                          }}
                          value={getFieldValue(editedData, y.prop)}
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
                      setIndex(-1);
                      console.log(editedData);
                      stopEditing(i, editedData);
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
                newRow(row, key, header, handleRemove, stopEditing)
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
