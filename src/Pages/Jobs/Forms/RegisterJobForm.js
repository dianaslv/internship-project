import React from "react";
import { useState } from "react";

export default function RegisterJobForm({ handleSubmitData }) {
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
    handleSubmitData(job);
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event);
        }}
      >
        <label>
          Job Name
          <input
            name="name"
            type="text"
            value={job.name}
            onChange={(event) => {
              event.preventDefault();
              handleChange(event);
            }}
          />
        </label>

        <label>
          Job Description
          <input
            name="description"
            type="text"
            value={job.description}
            onChange={(event) => {
              event.preventDefault();
              handleChange(event);
            }}
          />
        </label>
        <button type="submit">Add job</button>
      </form>
    </div>
  );
}
