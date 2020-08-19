import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import { useQuery } from "@apollo/client";
import { Skills } from "../../../Apollo/Queries/SkillsQueries";
import Divider from "@material-ui/core/Divider";

export default function MultipleSkillsForm(props) {
  const [inputList, setInputList] = useState([
    { id: "", name: "", rating: "" },
  ]);
  const { data, loading } = useQuery(Skills);

  const handleChange = (e, index) => {
    console.log(e.target.name, e.target.value, index);
    const { name, value } = e.target;
    if (name === "skill") {
      if (e.target.options) {
        const selectedIndex = e.target.options.selectedIndex;
        const key = e.target.options[selectedIndex].getAttribute("data-key");
        const list = [...inputList];
        console.log(list[index]);
        list[index]["id"] = key;
        list[index]["name"] = value;
        setInputList(list);
      } else {
        const list = [...inputList];
        list[index]["id"] = -1;
        list[index]["name"] = value;
        setInputList(list);
      }
    }
    if (name === "rating") {
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
    }
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { id: "", name: "", rating: "" }]);
  };

  const handleSubmit = () => {
    console.log(inputList);
    props.handleSubmit(inputList);
  };
  if (loading) return null;

  return (
    <>
      {inputList.map((skill, i) => {
        console.log(skill);
        return (
          <>
            <InputLabel htmlFor="demo-dialog-native">
              Select an existing skill
              <Select
                name="skill"
                native
                value={skill.name}
                onChange={(e) => handleChange(e, i)}
                input={<Input id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                {data.skills.map((dataSkill) => (
                  <option data-key={dataSkill.id} value={dataSkill.name}>
                    {dataSkill.name}
                  </option>
                ))}
              </Select>
            </InputLabel>
            <br />
            <InputLabel htmlFor="demo-dialog-native">
              Add a new skill
              <TextField
                name="skill"
                value={skill.name}
                onChange={(e) => handleChange(e, i)}
              />
            </InputLabel>

            <br />
            <InputLabel htmlFor="demo-dialog-native">
              Set a rating for this job skill
              <TextField
                name="rating"
                value={skill.rating}
                onChange={(e) => handleChange(e, i)}
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
