import * as React from "react";
import { Box } from "@mui/material";

import CardZone from "@swingout/components/game/in-game/CardZone";
import MTGCard from "@swingout/components/game/in-game/MTGCard";
import type { Card } from "@swingout/components/game/in-game/MTGCard";

const Hand = () => {
  const render = (
    cards: Array<Card>,
    removeCard: (toRemove: Card) => void,
    sortCard?: (toMove: Card, toIndex: number) => void
  ): any => (
    <Box sx={{ display: "flex" }}>
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

  return <CardZone render={render} sortable />;
};

export default Hand;
