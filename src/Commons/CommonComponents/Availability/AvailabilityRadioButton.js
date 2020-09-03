import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export default function AvailabilityRadioButton(props) {
  const [value, setValue] = React.useState(props.value);
  console.log(props.value);

  const handleChange = (event) => {
    setValue(event.target.value);
    props.handleChange({
      value: event.target.value,
      name: event.target.name,
    });
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label="availability"
        name="availability"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value="Available"
          control={<Radio />}
          label="Available"
        />
        <FormControlLabel
          value="Not available"
          control={<Radio />}
          label="Not Available"
        />
      </RadioGroup>
    </FormControl>
  );
}
