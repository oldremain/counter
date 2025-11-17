import MaterialButton, { type ButtonProps } from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const Button = styled(MaterialButton)<ButtonProps>(() => ({
  "&.Mui-disabled": {
    cursor: "not-allowed",
    pointerEvents: "auto",
    color: grey[500],
  },
}));
