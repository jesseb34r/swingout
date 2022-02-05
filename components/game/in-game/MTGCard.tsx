import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useDrag } from "react-dnd";
import Image from "next/image";

interface MTGCardProps {
  id: number;
  card: { name: string; imageUrl: string };
  removeCard: (toRemove: Card) => void;
  sortCard?: (toMove: Card, toIndex: number) => void; // if defined card is sortable
}

export interface Card {
  id: number;
  card: { name: string; imageUrl: string };
}

const MTGCard = ({ id, card, removeCard, sortCard }: MTGCardProps) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "CARD",
    item: {
      id: id,
      card: card,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      monitor.didDrop() && removeCard(item);
    },
  }));

  // const [, dropRef] = useDrop(() => ({
  //   type: "Card",
  //   hover: (item: Card, monitor)
  // }));

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
};

export default MTGCard;
