import * as React from "react";
import { Box } from "@mui/material";

import CardZone, {
  renderProps,
} from "@swingout/components/game/in-game/CardZone";
import MTGCard from "@swingout/components/game/in-game/MTGCard";

const Hand = () => {
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
      bgcolor={{ main: "hsl(60, 75%, 50%)", bright: "hsl(60, 75%, 70%)" }}
      render={render}
      initialCards={[0, 1, 2]}
      sortable
    />
  );
};

export default Hand;
