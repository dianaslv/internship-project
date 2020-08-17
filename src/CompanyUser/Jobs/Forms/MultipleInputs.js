import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default  function MultipleInputs(props) {
    const [inputList, setInputList] = useState([{ name:"" }]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    const handleAddClick = () => {
        setInputList([...inputList, { name: "" }]);
    };


    const handleSubmit = () => {
        props.handleSubmit(inputList);
    };

    return (
        <div className="App">
            {inputList.map((x, i) => {
                return (
                    <div className="box">
                        <TextField name="name"
                                   placeholder="Enter Name"
                                   value={x.name}
                                   onChange={e => handleInputChange(e, i)}/>
                        <span className="btn-box">
                            {inputList.length !== 1 && <Button onClick={() => handleRemoveClick(i)}>Delete</Button>}
                            {inputList.length - 1 === i && <Button onClick={handleAddClick}>+</Button>}
                        </span>
                    </div>
                );
            })}
            <Button onClick={() => handleSubmit()}>Submit</Button>
            <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
        </div>
    );
}
