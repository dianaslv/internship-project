import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import { useQuery } from "@apollo/client";
import { Countries } from "../../Apollo/Queries/UserQueries/CountryQueries";

export default function CountrySelector(props) {
  const [country, setCountry] = useState({ id: "", name: "" });
  const { data: dataCountries, loading } = useQuery(Countries);

  return (
    <Select
      name="countryName"
      native
      value={props.value}
      onChange={(e) =>
        props.handleChange({
          options: e.target.options,
          value: e.target.value,
          name: e.target.name,
          index: props.i,
        })
      }
      input={<Input id="demo-dialog-native" />}
    >
      <option aria-label="None" value="" />
      {dataCountries &&
        country &&
        dataCountries.counties.map((dataCountry) => (
          <option data-key={dataCountry.id} value={dataCountry.name}>
            {dataCountry.name}
          </option>
        ))}
    </Select>
  );
}
