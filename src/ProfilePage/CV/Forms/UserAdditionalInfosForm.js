import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from "@material-ui/core/Divider";
import DateTimePicker from "../../../Commons/DateTimePicker";
import moment from "moment";

export default function UserAdditionalInfosForm(props) {
  const [inputList, setInputList] = useState([
    { id: "", institution: "", description: "", startDate: "", endDate: "" },
  ]);

  const handleChange = (e, index) => {
    console.log(e.target.name, e.target.value, index);
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleChangeDate = (field, rowNo, date) => {
    console.log(field, rowNo, date);
    let convertedDate =
      moment(date).format("YYYY") +
      "-" +
      moment(date).format("M") +
      "-" +
      moment(date).format("D");
    console.log("convertedDate", convertedDate);
    const list = [...inputList];
    list[rowNo][field] = convertedDate;
    setInputList(list);
    console.log(inputList);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { id: "", institution: "", description: "", startDate: "", endDate: "" },
    ]);
  };

  const handleSubmit = () => {
    console.log(inputList);
    props.handleSubmit(inputList);
  };

  return (
    <>
      {inputList.map((info, i) => {
        console.log(info);
        return (
          <>
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
