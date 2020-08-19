import React from 'react';
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {AddJob} from "../../../Apollo/Queries/JobQueries/JobQueries";


export default function GeneralInfoForm(props) {
    const [job, setJob] = useState({
        name: '',
        description: '',
        availability: ''
    });


    const handleChange = (event) => {
        setJob({
            ...job,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleSubmit(job.name, job.description);

    }


    return (
        <form onSubmit={handleSubmit}>
            <label>Job Name</label>
            <input
                name="name"
                type="text"
                value={job.name}
                onChange={handleChange}/>
            <label>Job Description</label>
            <input
                name="description"
                type="text"
                value={job.description}
                onChange={handleChange}/>
            <button type="submit">Save Info</button>
        </form>
    );
}
