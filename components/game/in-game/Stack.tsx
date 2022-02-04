import * as React from "react";
import { Box } from "@mui/material";

import CardZone from "@swingout/components/game/in-game/CardZone";
import MTGCard from "@swingout/components/game/in-game/MTGCard";
import type { Card } from "@swingout/components/game/in-game/MTGCard";

const Stack = () => {
  const render = (
    cards: Array<Card>,
    removeCard: (toRemove: Card) => void
  ): any => (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {cards.map((card) => (
        <MTGCard
          key={card.id}
          id={card.id}
          card={card.card}
          removeCard={removeCard}
        ></MTGCard>
      ))}
    </Box>
  );

  return <CardZone render={render} />;
};

export default Stack;
