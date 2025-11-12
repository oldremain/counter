import { grey, red } from "@mui/material/colors";
import type { Theme } from "@mui/material/styles";
import type { SxProps } from "@mui/material/styles";

const formControlStyles = {
  minWidth: "230px",
  transition: "all 0.15s ease",
  width: "100%",
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
  fontSize: { xs: "20px", sm: "18px" },
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

export { formControlStyles, inputStyles, arrowStyles };
