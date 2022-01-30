import * as React from "react";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Modal,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useRouter } from "next/router";
import crypto from "crypto";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: "linear-gradient( hsl(30, 75%, 95%), hsl(30, 75%, 75%))",
  border: "2px solid #000",
  borderRadius: "0.5rem",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  alignItems: "center",
  justifyContent: "center",
};

const NewGame = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [publicity, setPublicity] = React.useState<string>("public");
  const [name, setName] = React.useState<string>("");
  const [nameError, setNameError] = React.useState<boolean>(false);
  const [format, setFormat] = React.useState<string>("");
  const [spectate, setSpectate] = React.useState<boolean>(true);
  const handleSpectate = () => setSpectate(!spectate);

  const router = useRouter();

  const handleNewGame = () => {
    const gameid = crypto.randomBytes(3).toString("hex");
    // TODO while gameid === existing gameid generate new gameid

    router.push(`game/${gameid}`);
    // TODO push game to database
  };

  const handlePublicSubmit = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (name === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (name !== "" && event.key === "Enter") {
      handleNewGame();
    }
  };

  const handlePublicity = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    newPublicity: string
  ) => {
    if (newPublicity != null) {
      setPublicity(newPublicity);
    }
  };

  return (
    <>
      <Button variant="text" color="inherit" onClick={handleOpen}>
        New Game
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box id="container" sx={style}>
          <Box id="toggle options" sx={{ display: "flex", gap: "0.5rem" }}>
            <ToggleButtonGroup
              value={publicity}
              exclusive
              onChange={handlePublicity}
              aria-label="Private or Public"
              color="secondary"
            >
              <ToggleButton value="public" aria-lable="public game">
                Public
              </ToggleButton>
              <ToggleButton value="private" aria-lable="private game">
                Private
              </ToggleButton>
            </ToggleButtonGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    onChange={handleSpectate}
                    color="secondary"
                  />
                }
                label="Allow Spectators"
                labelPlacement="top"
              ></FormControlLabel>
            </FormGroup>
          </Box>
          {publicity === "public" && (
            <Box
              id="public form"
              component="form"
              onKeyDown={handlePublicSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                required
                label="Name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                defaultValue={name}
                autoFocus
                autoComplete="off"
              />
              <TextField
                label="Format"
                id="format"
                onChange={(e) => setFormat(e.target.value)}
                defaultValue={format}
                autoComplete="off"
              />
            </Box>
          )}
          <Button variant="contained" color="secondary" onClick={handleNewGame}>
            New Game
          </Button>
        </Box>
      </Modal>
    </>
  );
};

// const JoinGame = () => {
//   return (

//   )
// }

export {
  NewGame,
  // JoinGame
};
