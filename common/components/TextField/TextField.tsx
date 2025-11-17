import React from "react";
import Decimal from "decimal.js";
import type { SxProps } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import * as s from "./TextField.styles";

type Props = {
  value?: number;
  error?: boolean;
  sx?: SxProps<Theme>;
  setValue: (v: number | string) => void;
};

export const TextField = ({ value, error, setValue, sx = {} }: Props) => {
  const precision = new Decimal(value || 0).decimalPlaces();

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
    <FormControl variant="outlined" sx={Object.assign(s.formControl || {}, sx)}>
      <OutlinedInput
        value={value}
        type="number"
        autoComplete="off"
        sx={s.input}
        endAdornment={
          <InputAdornment position="end">
            <Stack fontSize={"18px"}>
              <IconButton
                sx={s.iconBtn}
                onClick={() => handleClick("inc")}
                onMouseDown={(e) => e.preventDefault()}
                onMouseUp={(e) => e.preventDefault()}
              >
                <ArrowDropUpIcon sx={s.arrow} fontSize="inherit" />
              </IconButton>
              <IconButton
                sx={s.iconBtn}
                onClick={() => handleClick("dec")}
                onMouseDown={(e) => e.preventDefault()}
                onMouseUp={(e) => e.preventDefault()}
              >
                <ArrowDropDownIcon sx={s.arrow} fontSize="inherit" />
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
