import * as React from "react";
import { Box } from "@mui/material";

import CardZone, {
  renderProps,
} from "@swingout/components/game/in-game/CardZone";
import MTGCard from "@swingout/components/game/in-game/MTGCard";

const Battlefield = () => {
  const render = ({ cardIndexes, removeCard, sortCard }: renderProps): any => (
    <Box
      sx={{
        display: "flex",
        gap: "5px",
        ml: "5px",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {cardIndexes.map((deckIndex) => {
        return (
          <MTGCard
            key={deckIndex}
            deckIndex={deckIndex}
            removeCard={removeCard}
            sortCard={sortCard}
          ></MTGCard>
        );
      })}
    </Box>
  );

  return (
    <CardZone
      bgcolor={{ main: "hsl(0, 0%, 50%)", bright: "hsl(0, 0%, 70%)" }}
      render={render}
      sortable
    />
  );
};

export default Battlefield;
