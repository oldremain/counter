import React from "react";
import Decimal from "decimal.js";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
//WARN try use CSS modules
import { formControlStyles, inputStyles, arrowStyles } from "./styles";

type TextFieldProps = {
  value?: number;
  error?: boolean;
  precision?: number;
  setValue: (v: number | string) => void;
};

export const TextField = ({
  value,
  precision,
  error,
  setValue,
}: TextFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value ? +e.currentTarget.value : "");
  };

  const handleClick = (type: "inc" | "dec") => {
    let newValue = new Decimal(value || 0);
    const step = 1 / Math.pow(10, precision || 0);

    if (type === "inc") {
      newValue = newValue.plus(step);
    } else {
      newValue = newValue.minus(step);
    }

    setValue(newValue.toNumber());
  };

  return (
    <FormControl variant="outlined" sx={formControlStyles}>
      <OutlinedInput
        value={value}
        type="number"
        autoComplete="off"
        sx={inputStyles}
        endAdornment={
          <InputAdornment position="end">
            <Stack fontSize={"18px"}>
              <IconButton
                sx={{ width: "18px", height: "18px" }}
                onClick={() => handleClick("inc")}
                onMouseDown={(e) => e.preventDefault()}
                onMouseUp={(e) => e.preventDefault()}
              >
                <ArrowDropUpIcon sx={arrowStyles} fontSize="inherit" />
              </IconButton>
              <IconButton
                sx={{ width: "18px", height: "18px" }}
                onClick={() => handleClick("dec")}
                onMouseDown={(e) => e.preventDefault()}
                onMouseUp={(e) => e.preventDefault()}
              >
                <ArrowDropDownIcon sx={arrowStyles} fontSize="inherit" />
              </IconButton>
            </Stack>
          </InputAdornment>
        }
        error={error}
        onChange={handleChange}
      />
    </FormControl>
  );
};
