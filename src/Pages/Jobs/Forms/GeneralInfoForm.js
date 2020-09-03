import React from "react";
import { useState } from "react";
import { TextFields } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function GeneralInfoForm(props) {
  const [job, setJob] = useState({
    name: "",
    description: "",
    availability: "",
  });

  const handleChange = (event) => {
    setJob({
      ...job,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(job.name, job.description);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Job Name</label>
      <TextField
        name="name"
        type="text"
        value={job.name}
        onChange={handleChange}
      />
      <label>Job Description</label>
      <TextField
        name="description"
        type="text"
        value={job.description}
        onChange={handleChange}
      />
      <Button type="submit">Save Info</Button>
    </form>
  );
}
