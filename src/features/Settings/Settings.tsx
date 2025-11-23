import { useState } from "react";
import Card from "@mui/material/Card";
import type { AppState } from "@/common/types";
import {
  validateMax,
  validateMin,
  validateSettings,
  validateStep,
} from "@/common/lib";
import {
  type UpdateSettingsPayload,
  type UpdateErrorPayload,
} from "@/model/appReducer";
import { BorderBox } from "@/common/components/BorderBox";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Button } from "@/common/components/Button";
import DoneIcon from "@mui/icons-material/Done";
import { TextField } from "@/common/components/TextField/TextField";
import * as s from "./Settings.styles";

type Props = {
  appState?: AppState;
  setSettings: (v: UpdateSettingsPayload) => void;
  saveSettings: (v: AppState) => void;
  setError: (v: UpdateErrorPayload) => void;
};

export const Settings = (props: Props) => {
  const { appState, setSettings, saveSettings, setError } = props;

  const [isEditing, setIsEditing] = useState(false);

  const isValidMax = validateMax(appState as AppState);
  const isValidMin = validateMin(appState as AppState);
  const isValidStep = validateStep(appState as AppState);

  const handleChange = (obj: {
    key: "max" | "min" | "step";
    value: number;
  }) => {
    setIsEditing(true);

    const newValue = {
      [obj.key]: obj.value,
    } as UpdateSettingsPayload;

    setSettings(newValue);

    setError({
      error: !validateSettings({
        ...appState,
        ...newValue,
      } as AppState),
    });
  };

  const handleSaveSettings = () => {
    saveSettings(appState as AppState);
  };

  return (
    <Card sx={s.cardWrp} raised>
      <BorderBox sx={s.settingsWrp}>
        <BorderBox sx={{ mb: 2 }}>
          <Stack spacing={2}>
            <Grid container spacing={{ xs: 0, sm: 2 }}>
              <Grid sx={s.settings} size={{ xs: 12, sm: 6 }}>
                max value:
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  value={appState?.max}
                  error={!isValidMax}
                  setValue={(v) =>
                    handleChange({ key: "max", value: v as number })
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              sx={{ alignItems: "center" }}
              spacing={{ xs: 0, sm: 2 }}
            >
              <Grid sx={s.settings} size={{ xs: 12, sm: 6 }}>
                min value:
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  value={appState?.min}
                  error={!isValidMin}
                  setValue={(v) =>
                    handleChange({ key: "min", value: v as number })
                  }
                />
              </Grid>
            </Grid>
            <Grid
              container
              sx={{ alignItems: "center" }}
              spacing={{ xs: 0, sm: 2 }}
            >
              <Grid sx={s.settings} size={{ xs: 12, sm: 6 }}>
                inc size:
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  value={appState?.step}
                  error={!isValidStep}
                  setValue={(v) =>
                    handleChange({ key: "step", value: v as number })
                  }
                />
              </Grid>
            </Grid>
          </Stack>
        </BorderBox>
        <BorderBox textAlign={"center"}>
          <Button
            variant="contained"
            endIcon={
              isEditing && !appState?.error && <DoneIcon sx={s.doneIcon} />
            }
            sx={s.setBtn}
            disabled={
              !isEditing ||
              appState?.error ||
              appState?.activeSheet === "counter"
            }
            onClick={handleSaveSettings}
          >
            set
          </Button>
        </BorderBox>
      </BorderBox>
    </Card>
  );
};
