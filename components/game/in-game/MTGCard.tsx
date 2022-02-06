import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useDrag } from "react-dnd";
import Image from "next/image";

import { zoneProps } from "@swingout/components/game/PlaySpace";
export interface Card {
  cardID: number;
  inZone: number;
  card: { name: string; imageUrl: string };
}
interface MTGCardProps {
  cardData: Card;
  moveCard: zoneProps["moveCard"];
  sortable?: boolean;
}

const MTGCard = React.memo(function MTGCard({
  cardData,
  moveCard,
  sortable = false,
}: MTGCardProps) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "CARD",
    item: {
      cardID: cardData.cardID,
      inZone: cardData.inZone,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
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
          {cardData.card.name}
        </Typography>
      </Box>
      <Box id="cardimage" sx={{ gridArea: "card", position: "relative" }}>
        <Image
          src={cardData.card.imageUrl}
          alt={cardData.card.name}
          layout="fill"
          objectFit="contain"
        />
      </Box>
    </Box>
  );
});

export default MTGCard;
