import * as React from "react";
import { Box } from "@mui/material";
import { useDrag } from "react-dnd";

interface MTGCardProps {
  id: number;
  card: { name: string; imageUrl: string };
  removeCard: () => void;
  sortCard?: (toIndex: number) => void; // if defined card is sortable
}

// interface Card {
//   id: number;
//   card: { name: string; imageUrl: string };
// }

const MTGCard = ({ id, card, removeCard, sortCard }: MTGCardProps) => {
  const [, dragRef] = useDrag(() => ({
    type: "CARD",
    item: {
      id: id,
      card: card,
    },
    end: () => {},
  }));

  // const [, dropRef] = useDrop(() => ({
  //   type: "Card",
  //   hover: (item: Card, monitor)
  // }));

  return <Box ref={dragRef} sx={{}}></Box>;
};

export default MTGCard;
