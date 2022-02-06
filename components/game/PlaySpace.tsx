/* eslint-disable no-unused-vars */
import * as React from "react";
import { Box } from "@mui/material";
import update from "immutability-helper";

import Battlefield from "@swingout/components/game/in-game/Battlefield";
import Graveyard from "@swingout/components/game/in-game/Graveyard";
import Hand from "@swingout/components/game/in-game/Hand";
import Stack from "@swingout/components/game/in-game/Stack";
import UserHud from "@swingout/components/game/in-game/UserHud";
import { Card } from "@swingout/components/game/in-game/MTGCard";
import testDeck from "@swingout/public/testDeck";

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

interface zone {
  index: number;
  zoneName: string;
  cardIDs: number[];
}

export interface zoneProps {
  zone: zone;
  fetchCard: (toFetch: number) => Card["card"];
  moveCard: (
    toMove: number, // cardID being passed
    fromZone: number,
    toZone: number,
    toIndex: number
  ) => void;
}

const PlaySpace = () => {
  const deck = testDeck;
  const initialZones: zone[] = [
    {
      index: 0,
      zoneName: "stack",
      cardIDs: [],
    },
    {
      index: 1,
      zoneName: "battlefield",
      cardIDs: [],
    },
    {
      index: 2,
      zoneName: "hand",
      cardIDs: [0, 1, 2],
    },
  ];
  const [zones, setZones] = React.useState<zone[]>(initialZones);

  const fetchCard = React.useCallback(
    (toFetch: number): Card["card"] => {
      return deck[toFetch];
    },
    [deck]
  );

  const moveCard = React.useCallback(
    (
      toMove: number,
      fromZone: number,
      toZone: number,
      toIndex: number // index to add at
    ): void => {
      const removeCard = (
        prevZones: zone[],
        toRemove: number,
        fromZone: number
      ): zone[] => {
        const newZone: zone = update(prevZones[fromZone], {
          cardIDs: {
            $splice: [[prevZones[fromZone].cardIDs.indexOf(toRemove), 1]],
          },
        });
        return update(prevZones, {
          $splice: [[fromZone, 1, newZone]],
        });
      };

      const addCard = (
        prevZones: zone[],
        toAdd: number,
        toZone: number,
        atIndex: number
      ): zone[] => {
        const newZone: zone = update(prevZones[toZone], {
          cardIDs: {
            $splice: [[atIndex, 0, toAdd]],
          },
        });
        return update(prevZones, {
          $splice: [[toZone, 1, newZone]],
        });
      };

      setZones((prevZones: zone[]) => {
        const zonesWithoutCard = removeCard(prevZones, toMove, fromZone);
        return addCard(zonesWithoutCard, toMove, toZone, toIndex);
      });
    },
    [zones]
  );

  return (
    <Box
      id="playspace"
      sx={{
        display: "grid",
        height: "100%",
        gridTemplate: `
          "userbar stack battlefield" 3fr
          "userbar hand hand" 1fr / 0px 1fr 5.5fr
        `,
      }}
    >
      {/* <Box id="userbar" sx={{ gridArea: "userbar", bgcolor: "success.main" }}>
        <UserBar />
      </Box> */}
      <Box id="stack" sx={{ gridArea: "stack", bgcolor: "error.main" }}>
        <Stack zone={zones[0]} fetchCard={fetchCard} moveCard={moveCard} />
      </Box>
      <Box id="battlefield" sx={{ gridArea: "battlefield", bgcolor: "gray" }}>
        <Battlefield
          zone={zones[1]}
          fetchCard={fetchCard}
          moveCard={moveCard}
        />
      </Box>
      <Box id="hand" sx={{ gridArea: "hand" }}>
        <Hand zone={zones[2]} fetchCard={fetchCard} moveCard={moveCard} />
      </Box>
    </Box>
  );
};

export default PlaySpace;
