/* eslint-disable no-unused-vars */
import * as React from "react";
import { Box } from "@mui/material";

import Battlefield from "@swingout/components/game/in-game/Battlefield";
import Graveyard from "@swingout/components/game/in-game/Graveyard";
import Hand from "@swingout/components/game/in-game/Hand";
import Stack from "@swingout/components/game/in-game/Stack";
import UserHud from "@swingout/components/game/in-game/UserHud";

const tempUserData = [
  {
    id: "activePlayer",
    playerId: "jesseb34r",
    profilePicUrl: "",
  },
  {
    id: "opponent",
    playerId: "kactuus",
    profilePicUrl: "",
  },
];

const UserBar = () => {
  return <Box sx={{ display: "flex", flexDirection: "column" }}></Box>;
};

const PlaySpace = () => {
  return (
    <Box
      id="playspace"
      sx={{
        display: "grid",
        height: "100%",
        gridTemplate: `
          "userbar stack battlefield" 3fr
          "userbar hand hand" 1fr / 1fr 1fr 5.5fr
        `,
      }}
    >
      <Box id="userbar" sx={{ gridArea: "userbar", bgcolor: "success.main" }}>
        <UserBar />
      </Box>
      <Box id="stack" sx={{ gridArea: "stack", bgcolor: "error.main" }}>
        <Stack />
      </Box>
      <Box id="battlefield" sx={{ gridArea: "battlefield", bgcolor: "gray" }}>
        <Battlefield />
      </Box>
      <Box id="hand" sx={{ gridArea: "hand" }}>
        <Hand />
      </Box>
    </Box>
  );
};

export default PlaySpace;
