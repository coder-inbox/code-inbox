import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  useTheme,
} from "@mui/material";

const AppSelectBox = (props) => {
  const {
    data,
    renderRow,
    placeholder,
    name,
    id,
    fullWidth,
    displayEmpty,
    size,
    value,
    required,
    onChange,
    helperText,
    variant,
    error,
    valueKey,
    labelKey,
    label,
    ...rest
  } = props;

  const theme = useTheme();

  return (
    <FormControl
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      required={required}
      sx={{
        "& .MuiOutlinedInput-input": {
          paddingTop: 10.5,
          paddingBottom: 10.5,
          backgroundColor: "transparent",
          borderRadius: 4,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.grey[400],
        },
      }}
    >
      {label && <InputLabel id={"label-" + (id || name)}>{label}</InputLabel>}
      <Select
        {...rest}
        name={name}
        labelId={"label-" + (id || name)}
        id={id || name}
        value={value}
        onChange={onChange}
        label={label ? (required ? label + " *" : label) : null}
        error={error || helperText !== ""}
        displayEmpty={displayEmpty}
        sx={{ "& .MuiSelectSelect": theme.palette.grey[400] }}
      >
        {placeholder && displayEmpty && (
          <MenuItem value="">{placeholder}</MenuItem>
        )}
        {data.map((item, index) =>
          renderRow ? (
            renderRow(item, index)
          ) : (
            <MenuItem key={index} value={valueKey ? item[valueKey] : item}>
              {item[labelKey]}
            </MenuItem>
          ),
        )}
      </Select>
      {helperText && (
        <FormHelperText error={error || helperText !== ""}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

AppSelectBox.propTypes = {
  data: PropTypes.array.isRequired,
  renderRow: PropTypes.node,
  placeholder: PropTypes.string,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  fullWidth: PropTypes.bool,
  displayEmpty: PropTypes.bool,
  required: PropTypes.bool,
  value: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

AppSelectBox.defaultProps = {
  data: [],
  fullWidth: true,
  displayEmpty: true,
  required: false,
  size: "small",
  error: false,
  helperText: "",
  valueKey: "id",
  labelKey: "title",
  backgroundColor: "transparent",
};

export default AppSelectBox;
