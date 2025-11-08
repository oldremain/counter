import React from "react";
import type { Settings, Sheet } from "@/types";
import Card from "@mui/material/Card";
import { BorderBox } from "@/components/BorderBox";
import { Button } from "./Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { blueGrey, lightBlue, red } from "@mui/material/colors";

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
    const nextValue = counter + Number(settings.step);
    if (nextValue <= settings.max) {
      setSheet("counter");
      setCount(nextValue);
    }
  };

  const handleReset = () => {
    setSheet("counter");
    setCount(settings.min);
  };

  return (
    <Card sx={{ background: blueGrey[900], height: "100%" }} raised>
      <BorderBox
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BorderBox
          sx={{
            mb: 2,
            flexGrow: 1,
            minHeight: "172px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color:
              counter === settings.max || error ? red.A700 : lightBlue.A400,
            fontWeight: 500,
            fontSize: isDisabledCounter ? 30 : 80,
            textAlign: "center",
          }}
        >
          {boxContent}
        </BorderBox>
        <BorderBox>
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
            <Box sx={{ flexGrow: 1, cursor: "not-allowed" }}>
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
