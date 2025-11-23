import { blueGrey } from "@mui/material/colors";
import type { SxProps } from "@mui/material/styles";

export const card: SxProps = { background: blueGrey[900], height: "100%" };

export const boxWrp: SxProps = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

export const counterWrp: SxProps = {
  mb: 2,
  flexGrow: 1,
  minHeight: "172px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 500,
  textAlign: "center",
  padding: { xs: 0, sm: 2 },
  borderWidth: { xs: "0", sm: "2px" },
};

export const btnWrp: SxProps = {
  padding: { xs: 0, sm: 2 },
  borderWidth: { xs: "0", sm: "2px" },
};

export const resetBtnWrp: SxProps = { flexGrow: 1, cursor: "not-allowed" };
