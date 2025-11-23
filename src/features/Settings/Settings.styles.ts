import { blueGrey, green, lightBlue } from "@mui/material/colors";
import type { SxProps } from "@mui/material/styles";

export const cardWrp: SxProps = { background: blueGrey[900] };

export const settingsWrp: SxProps = {
  padding: { xs: 0, sm: 2 },
  borderWidth: { xs: "0", sm: "2px" },
};

export const settings: SxProps = {
  color: lightBlue.A400,
  fontWeight: 500,
  fontSize: 40,
  marginRight: "auto",
};

export const doneIcon: SxProps = { color: green.A700 };

export const setBtn: SxProps = {
  width: { xs: "100%", sm: "50%" },
  margin: "auto",
};
