import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from "@material-ui/core/Divider";
import DateTimePicker from "../Date/DateTimePicker";
import moment from "moment";
import Alert from "@material-ui/lab/Alert";
import {
  validateInputList,
  updateInputListErrors,
  cleanErrorsForInputList,
} from "../Validations/FormsValidations";

export default function UserAdditionalInfosForm(props) {
  const [inputList, setInputList] = useState([
    {
      id: "",
      institution: "",
      description: "",
      startDate: "",
      endDate: "",
      error: "",
    },
  ]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleChangeDate = (options) => {
    let convertedDate =
      moment(options.value).format("YYYY") +
      "-" +
      moment(options.value).format("M") +
      "-" +
      moment(options.value).format("D");
    const list = [...inputList];
    list[options.index][options.name] = convertedDate;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        id: "",
        institution: "",
        description: "",
        startDate: "",
        endDate: "",
        error: "",
      },
    ]);
  };

  const handleSubmit = () => {
    setInputList(cleanErrorsForInputList(inputList));
    let inputListValidation = validateInputList(inputList);
    if (inputListValidation.validForm) {
      props.handleSubmit(inputList);
    } else {
      setInputList(
        updateInputListErrors(inputList, inputListValidation.errors)
      );
    }
  };

  return (
    <>
      {inputList.map((info, i) => {
        return (
          <>
            {info.error !== "" && typeof info.error !== "undefined" ? (
              <Alert severity="warning">{info.error}</Alert>
            ) : null}

            <InputLabel htmlFor="demo-dialog-native">
              Add a new institution
              <TextField
                name="institution"
                value={info.institution}
                onChange={(e) => handleChange(e, i)}
              />
            </InputLabel>

            <br />
            <InputLabel htmlFor="demo-dialog-native">
              Add a new description
              <TextField
                name="description"
                value={info.description}
                onChange={(e) => handleChange(e, i)}
              />
            </InputLabel>

            <br />
            <InputLabel htmlFor="demo-dialog-native">
              Add a new start date
              <DateTimePicker
                field={"startDate"}
                row={i}
                handleChange={handleChangeDate}
              />
            </InputLabel>
            <br />

            <InputLabel htmlFor="demo-dialog-native">
              Add a new end date
              <DateTimePicker
                field={"endDate"}
                row={i}
                handleChange={handleChangeDate}
              />
            </InputLabel>
            <br />

            {inputList.length !== 1 && (
              <Button onClick={() => handleRemoveClick(i)}>
                Delete Skill No {i + 1}
              </Button>
            )}
            <Divider />
            {inputList.length - 1 === i && (
              <Button onClick={handleAddClick}>+</Button>
            )}
          </>
        );
      })}
      <Button onClick={() => handleSubmit()}>Submit</Button>
    </>
  );
}
