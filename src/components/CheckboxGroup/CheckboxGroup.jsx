import React from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  makeStyles
} from "@material-ui/core";
import { useWatch, useController } from "react-hook-form";
import { FormLabel } from "../";

const useStyles = makeStyles((theme) => ({
  label: {
    marginRight: theme.spacing(3)
  }
}));

const CheckboxGroup = ({
  config,
  control,
  label,
  name,
  options,
  row,
  ...rest
}) => {
  const {
    field: { ref, value, onChange, ...inputProps },
    formState: { errors }
  } = useController({
    name,
    control,
    defaultValue: []
  });

  const checkboxIds = useWatch({ control, name: name }) || [];
  const classes = useStyles();

  const handleChange = (value) => {
    const newArray = [...checkboxIds];
    const item = value;

    //Ensure array isnt empty
    if (newArray.length > 0) {
      //Attempt to find an item in array with matching id
      const index = newArray.findIndex((x) => x === item);

      // If theres no match add item to the array
      if (index === -1) {
        newArray.push(item);
      } else {
        //If there is a match and the value is empty, remove the item from the array
        newArray.splice(index, 1);
      }
    } else {
      //If the array is empty, add the item to the array
      newArray.push(item);
    }

    //Overwrite existing array with newArray}
    onChange(newArray);
  };

  return (
    <div>
      <FormControl className={rest?.className}>
        {label && <FormLabel label={label} />}
        <FormGroup row={row}>
          {options.map((option) => (
            <FormControlLabel
              classes={row && { root: classes.label }}
              control={
                <Checkbox
                  checked={value?.some(
                    (checked) => checked === option[config.value]
                  )}
                  {...inputProps}
                  inputRef={ref}
                  onChange={() => handleChange(option[config.value])}
                  disabled={rest?.disabled}
                />
              }
              label={<p className="body2">{option[config.label]}</p>}
              key={option[config.value]}
            />
          ))}
        </FormGroup>
      </FormControl>
      <FormHelperText error variant="outlined">
        {errors?.[name]?.message || " "}
      </FormHelperText>
    </div>
  );
};

CheckboxGroup.propTypes = {
  control: PropTypes.object.isRequired,
  label: PropTypes.string,
  labelPlacement: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  row: PropTypes.bool,
  setValue: PropTypes.func.isRequired,
  config: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })
};

CheckboxGroup.defaultProps = {
  config: {
    label: "label",
    value: "value"
  }
};

export default CheckboxGroup;
