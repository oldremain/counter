import Decimal from "decimal.js";
import type { AppState } from "@/common/types";
import Card from "@mui/material/Card";
import { BorderBox } from "@/common/components/BorderBox";
import { Button } from "@/common/components/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { lightBlue, red } from "@mui/material/colors";
import * as s from "./Counter.styles";

type Props = {
  appState: AppState;
  setCount: (v: number) => void;
};

export const Counter = (props: Props) => {
  const { appState, setCount } = props;

  const isDisabledCounter =
    appState.error || appState.activeSheet === "settings";
  const isDisabledIncrement = appState.counter >= appState.max;
  const isDisabledReset = appState.counter === appState.min;

  let boxContent;
  if (appState?.error) {
    boxContent = "Incorrect value!";
  } else if (appState.activeSheet === "settings") {
    boxContent = 'Enter values and press "set"';
  } else {
    boxContent = appState.counter;
  }

  const handleIncrement = () => {
    if (isDisabledCounter || isDisabledIncrement) return;
    const c = new Decimal(appState.counter);
    const nextValue = c.plus(appState.step).toNumber();
    setCount(nextValue);
  };

  const handleReset = () => {
    if (isDisabledCounter) return;
    setCount(appState.min);
  };

  return (
    <Card sx={s.card} raised>
      <BorderBox sx={s.boxWrp}>
        <BorderBox
          sx={{
            ...s.counterWrp,
            color:
              isDisabledIncrement || appState?.error
                ? red.A700
                : lightBlue.A400,
            fontSize: isDisabledCounter ? 30 : 80,
          }}
        >
          {boxContent}
        </BorderBox>
        <BorderBox sx={s.btnWrp}>
          <Stack direction={"row"} gap={2}>
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              disableElevation
              sx={{ flexGrow: 1 }}
              disabled={isDisabledCounter || isDisabledIncrement}
              onClick={handleIncrement}
            >
              inc
            </Button>
            <Box sx={s.resetBtnWrp}>
              <Button
                variant="contained"
                color="error"
                endIcon={<DeleteIcon />}
                disableElevation
                sx={{ width: "100%" }}
                disabled={isDisabledCounter || isDisabledReset}
                onClick={handleReset}
              >
                reset
              </Button>
            </Box>
          </Stack>
        </BorderBox>
      </BorderBox>
    </Card>
  );
};
