import * as React from "react";
import { Box } from "@mui/material";

import CardZone from "@swingout/components/game/in-game/CardZone";
import MTGCard from "@swingout/components/game/in-game/MTGCard";
import type { Card } from "@swingout/components/game/in-game/MTGCard";

const Battlefield = () => {
  const render = (
    cards: Array<Card>,
    removeCard: (toRemove: Card) => void,
    sortCard?: (toMove: Card, toIndex: number) => void
  ): any => (
    <Box
      sx={{
        display: "flex",
        gap: "5px",
        ml: "5px",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {cards.map((card) => (
        <MTGCard
          key={card.id}
          id={card.id}
          card={card.card}
          removeCard={removeCard}
          sortCard={sortCard}
        ></MTGCard>
      ))}
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
