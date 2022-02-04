import * as React from "react";
import { Box } from "@mui/material";

import CardZone from "@swingout/components/game/in-game/CardZone";
import MTGCard from "@swingout/components/game/in-game/MTGCard";
import type { Card } from "@swingout/components/game/in-game/MTGCard";

const testCards: Array<Card> = [
  {
    id: 1,
    card: {
      name: "ragavan",
      imageUrl: "https://i.imgur.com/kQEFqjR.jpg",
    },
  },
  {
    id: 2,
    card: {
      name: "lightning bolt",
      imageUrl: "https://i.imgur.com/jIxIr1l.jpg",
    },
  },
  {
    id: 3,
    card: {
      name: "mountain",
      imageUrl: "https://i.imgur.com/mBmJJJa.png",
    },
  },
];

const Hand = () => {
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

  return <CardZone render={render} initialCards={testCards} sortable />;
};

export default Hand;
