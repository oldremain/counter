import React from "react";
import type { SxProps, Theme } from "@mui/material/styles";
import { grey, red } from "@mui/material/colors";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type TextFieldProps = {
  value?: number;
  error?: boolean;
  setValue: (v: number | string) => void;
};

const formControlStyles = {
  minWidth: "230px",
  transition: "all 0.15s ease",
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "gray",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#1976d2",
  },
  ".MuiInputAdornment-root": {
    display: "none",
  },
  ".Mui-focused .MuiInputAdornment-root": {
    display: "flex",
  },
} as SxProps<Theme>;

const inputStyles = {
  backgroundColor: "#fff",
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "&.Mui-error": {
    backgroundColor: red[100],
  },
} as SxProps<Theme>;

const arrowStyles = {
  cursor: "pointer",
  transition: "all 0.15s ease",
  "&:hover": {
    backgroundColor: grey[100],
  },
} as SxProps<Theme>;

export const TextField = ({ value, error, setValue }: TextFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value ? +e.currentTarget.value : "");
  };

  const handleClick = (type: "inc" | "dec") => {
    let newValue = value || 0;
    newValue = type === "inc" ? ++newValue : --newValue;
    setValue(newValue);
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
