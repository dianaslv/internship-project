import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import {useMutation, useQuery} from "@apollo/client";
import {AddSkill, Skills} from "../../../Apollo/Queries/SkillsQueries";
import {AddJobSkill} from "../../../Apollo/Queries/JobQueries/JobSkillsQueries";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    }
}));

export default function SkillsForm(props) {
    const classes = useStyles();
    const [existingSkill, setExistingSkill] = React.useState("");
    const [skillId, setSkillId] = React.useState(-1);
    const [rating, setRating] = React.useState("");
    const {data, loading} = useQuery(Skills);
    const [addJobSkill, {data: addedJobSkill}] = useMutation(AddJobSkill);
    const [addSkill, {data: addedSkill}] = useMutation(AddSkill);

    if (loading) return null;
    if (data) data.skills.map((skill) => console.log(skill))


    const handleChange = (event) => {
        console.log(event.target.name, event.target.key)
        if (event.target.name === "existingSkill") {
            if (event.target.options) {
                const selectedIndex = event.target.options.selectedIndex;
                const key = event.target.options[selectedIndex].getAttribute('data-key');
                setSkillId(key);
            } else {
                setSkillId(-1);
            }
            setExistingSkill(event.target.value);
        }
        if (event.target.name === "rating")
            setRating(event.target.value);
    };

    const handleSubmit = () => {
        if (skillId === -1) {
            console.log("will add a new skill with value", existingSkill, "for job with id:", props.jobId)
            addSkill({
                variables: {
                    name: existingSkill
                }
            })
                .then(r => {
                    console.log(r.data.createSkill.id);
                    addJobSkill({
                        variables: {
                            skillId: r.data.createSkill.id,
                            jobId: parseInt(props.jobId),
                            rating: parseInt(rating)
                        }
                    }).then(r => console.log(r))
                });
        } else {
            console.log("will add an existing skill with id", skillId, " and with value", existingSkill, "for job with id:", props.jobId)
            addJobSkill({
                variables: {
                    skillId: parseInt(skillId),
                    jobId: parseInt(props.jobId),
                    rating: parseInt(rating)
                }
            }).then(r => {
                console.log(addedJobSkill);
            });

        }
    };


    return (
        data &&
        <form className={classes.container}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="demo-dialog-native">Skill</InputLabel>
                <Select
                    name="existingSkill"
                    native
                    value={existingSkill}
                    onChange={handleChange}
                    input={<Input id="demo-dialog-native"/>}
                >
                    <option aria-label="None" value=""/>
                    {data.skills.map((skill) => (
                        <option data-key={skill.id} value={skill.name}>{skill.name}</option>))}
                </Select>
                <TextField name="existingSkill" value={existingSkill} onChange={handleChange}/>
                <TextField name="rating" value={rating} onChange={handleChange}/>
            </FormControl>
            <Button onClick={handleSubmit} color="primary">
                Add Skill
            </Button>
        </form>
    );
}
