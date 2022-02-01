import * as React from "react";
import type { NextPage } from "next";
import { Box } from "@mui/material";

// import DeckView from "@swingout/components/game/DeckView";
import PlaySpace from "@swingout/components/game/PlaySpace";
import SideBar from "@swingout/components/game/SideBar";

const Game: NextPage = () => {
  return (
    <Box
      id="game"
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box id="currentgame" sx={{ flexGrow: 1 }}>
        <PlaySpace />
      </Box>
      <Box id="sidebar">
        <SideBar />
      </Box>
    </Box>
  );
};

export default Game;
