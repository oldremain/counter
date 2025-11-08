import { styled } from "@mui/material/styles";
import Box, { type BoxProps } from "@mui/material/Box";
import { lightBlue } from "@mui/material/colors";

export const BorderBox = styled(Box)<BoxProps>(({ theme }) => ({
  border: `2px solid ${lightBlue.A400}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
}));
