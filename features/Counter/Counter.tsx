import Decimal from "decimal.js";
import type { Settings, Sheet } from "@common/types";
import Card from "@mui/material/Card";
import { BorderBox } from "@common/components/BorderBox";
import { Button } from "@common/components/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { lightBlue, red } from "@mui/material/colors";
import * as s from "./Counter.styles";

type Props = {
  counter: number;
  settings: Settings;
  sheet: Sheet;
  error: boolean;
  setCount: (v: number) => void;
  setSheet: (v: Sheet) => void;
};

export const Counter = (props: Props) => {
  const { counter, settings, sheet, error, setCount, setSheet } = props;

  const isDisabledCounter = error || sheet === "settings";
  const isDisabledIncrement = counter >= settings.max;
  const isDisabledReset = counter === settings.min;

  let boxContent;
  if (error) {
    boxContent = "Incorrect value!";
  } else if (sheet === "settings") {
    boxContent = 'Enter values and press "set"';
  } else {
    boxContent = counter;
  }

  const handleIncrement = () => {
    if (isDisabledCounter || isDisabledIncrement) return;
    const c = new Decimal(counter);
    const nextValue = c.plus(settings.step).toNumber();
    setSheet("counter");
    setCount(nextValue);
  };

  const handleReset = () => {
    if (isDisabledCounter) return;
    setSheet("counter");
    setCount(settings.min);
  };

  return (
    <Card sx={s.card} raised>
      <BorderBox sx={s.boxWrp}>
        <BorderBox
          sx={{
            ...s.counterWrp,
            color: isDisabledIncrement || error ? red.A700 : lightBlue.A400,
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
