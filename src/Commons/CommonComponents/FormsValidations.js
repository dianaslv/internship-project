export function cleanErrorsForInputList(inputList) {
  let inputListUpdated = [...inputList];
  inputListUpdated.map((input) => {
    input.error = "";
  });
  return inputListUpdated;
}

export function validateInputList(inputList) {
  let validForm = true;
  let errors = [];
  inputList.map((input, index) => {
    for (const [key, value] of Object.entries(input)) {
      console.log(`${key}: ${value}`);
      if (key !== "id" && key !== "error") {
        if (value === "") {
          if (errors[index]) {
            errors[index] +=
              key.toString().charAt(0).toUpperCase() + key.toString().slice(1);
            validForm = false;
          } else
            errors[index] =
              key.toString().charAt(0).toUpperCase() + key.toString().slice(1);
          errors[index] += " cannot be null.";
          validForm = false;
        }
      }
    }
  });
  return { validForm: validForm, errors: errors };
}

export function updateInputListErrors(inputList, errors) {
  let inputListUpdated = [...inputList];
  errors.map((error, index) => {
    if (error !== "") {
      inputListUpdated[index]["error"] = error;
    }
  });
  return inputListUpdated;
}
