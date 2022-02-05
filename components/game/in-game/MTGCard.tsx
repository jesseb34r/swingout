import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useDrag } from "react-dnd";
import Image from "next/image";

import deck from "@swingout/public/testDeck";

interface MTGCardProps {
  deckIndex: number;
  removeCard: (toRemove: number) => void;
  sortCard?: (toMove: number, toIndex: number) => void; // if defined card is sortable
}

export interface Card {
  deckIndex: number;
}

const MTGCard = React.memo(function MTGCard({
  deckIndex,
  removeCard,
  sortCard,
}: MTGCardProps) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "CARD",
    item: {
      deckIndex: deckIndex,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      monitor.didDrop() && removeCard(item.deckIndex);
    },
  }));

  // const [, dropRef] = useDrop(() => ({
  //   type: "Card",
  //   hover: (item: Card, monitor)
  // }));

  const card = deck[deckIndex];
  return (
    <Box
      id="card"
      ref={dragRef}
      sx={{
        height: "200px",
        width: "142px",
        display: "grid",
        gridTemplate: `"card" 2fr / 1fr`,
        cursor: "grab",
        opacity: isDragging ? 0 : 1,
      }}
    >
      <Box
        id="cardname"
        sx={{
          gridArea: "card",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            bgcolor: "hsla(0, 0%, 70%, 80%)",
            pl: "5px",
            pr: "5px",
            borderRadius: "5px",
            zIndex: "100",
          }}
        >
          {card.name}
        </Typography>
      </Box>
      <Box id="cardimage" sx={{ gridArea: "card", position: "relative" }}>
        <Image
          src={card.imageUrl}
          alt={card.name}
          layout="fill"
          objectFit="contain"
        />
      </Box>
    </Box>
  );
});

export default MTGCard;
