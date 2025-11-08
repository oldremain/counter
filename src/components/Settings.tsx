import React, { useState } from "react";
import Card from "@mui/material/Card";
import type { Settings as SettingsType, Sheet } from "@/types";
import {
  validateMax,
  validateMin,
  validateSettings,
  validateStep,
} from "@/lib";
import { BorderBox } from "@/components/BorderBox";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Button } from "./Button";
import DoneIcon from "@mui/icons-material/Done";
import { TextField } from "./TextField";
import { blueGrey, lightBlue, green } from "@mui/material/colors";

type SettingsProps = {
  settings?: SettingsType;
  error: boolean;
  sheet: Sheet;
  setSettings: (v: SettingsType) => void;
  saveSettings: (v: SettingsType) => void;
  setError: (v: boolean) => void;
  setSheet: (v: Sheet) => void;
};

const settingStyle = {
  color: lightBlue.A400,
  fontWeight: 500,
  fontSize: 40,
  marginRight: "auto",
};

export const Settings = (props: SettingsProps) => {
  const {
    settings,
    error,
    sheet,
    setSettings,
    saveSettings,
    setError,
    setSheet,
  } = props;

  const [isEditing, setIsEditing] = useState(false);

  const isValidMax = validateMax(settings as SettingsType);
  const isValidMin = validateMin(settings as SettingsType);
  const isValidStep = validateStep(settings as SettingsType);

  const handleChange = (v: number, key: "max" | "min" | "step") => {
    setIsEditing(true);
    const newSettings = {
      ...settings,
      [key]: v,
    } as SettingsType;
    setSettings(newSettings);
    setError(!validateSettings(newSettings));
    setSheet("settings");
  };

  const handleSaveSettings = () => {
    saveSettings(settings as SettingsType);
  };

  return (
    <Card sx={{ background: blueGrey[900] }} raised>
      <BorderBox>
        <BorderBox sx={{ mb: 2 }}>
          <Stack spacing={2}>
            <Grid container spacing={2}>
              <Grid sx={settingStyle}>max value:</Grid>
              <Grid>
                <TextField
                  value={settings?.max}
                  error={!isValidMax}
                  setValue={(v) => handleChange(v as number, "max")}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ alignItems: "center" }} spacing={2}>
              <Grid sx={settingStyle}>min value:</Grid>
              <Grid>
                <TextField
                  value={settings?.min}
                  error={!isValidMin}
                  setValue={(v) => handleChange(v as number, "min")}
                />
              </Grid>
            </Grid>
            <Grid container sx={{ alignItems: "center" }} spacing={2}>
              <Grid sx={settingStyle}>step size:</Grid>
              <Grid>
                <TextField
                  value={settings?.step}
                  error={!isValidStep}
                  setValue={(v) => handleChange(v as number, "step")}
                />
              </Grid>
            </Grid>
          </Stack>
        </BorderBox>
        <BorderBox textAlign={"center"}>
          <Button
            variant="contained"
            endIcon={
              isEditing && !error && <DoneIcon sx={{ color: green.A700 }} />
            }
            sx={{ width: "50%", margin: "auto" }}
            disabled={!isEditing || error || sheet === "counter"}
            onClick={handleSaveSettings}
          >
            set
          </Button>
        </BorderBox>
      </BorderBox>
    </Card>
  );
};
