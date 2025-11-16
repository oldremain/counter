import Decimal from "decimal.js";
import type { Settings, Sheet } from "@/types";
import Card from "@mui/material/Card";
import { BorderBox } from "@/components/BorderBox";
import { Button } from "@/components/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { lightBlue, red } from "@mui/material/colors";
import * as s from "./Counter.styles";

type CounterProps = {
  counter: number;
  settings: Settings;
  sheet: Sheet;
  error: boolean;
  setCount: (v: number) => void;
  setSheet: (v: Sheet) => void;
};

export const Counter = (props: CounterProps) => {
  const { counter, settings, sheet, error, setCount, setSheet } = props;

  const isDisabledCounter = error || sheet === "settings";

  let boxContent;
  if (error) {
    boxContent = "Incorrect value!";
  } else if (sheet === "settings") {
    boxContent = 'Enter values and press "set"';
  } else {
    boxContent = counter;
  }

  const handleIncrement = () => {
    if (isDisabledCounter) return;
    const c = new Decimal(counter);
    const nextValue = c.plus(settings.step).toNumber();
    if (nextValue <= settings.max) {
      setSheet("counter");
      setCount(nextValue);
    }
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
            color:
              counter === settings.max || error ? red.A700 : lightBlue.A400,
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
              disabled={isDisabledCounter || counter === settings.max}
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
                disabled={isDisabledCounter || counter === settings.min}
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
