import * as React from "react";
import { Box } from "@mui/material";
import { useDrop } from "react-dnd";

import { zoneProps } from "@swingout/components/game/PlaySpace";
import { Card } from "@swingout/components/game/in-game/MTGCard";

interface CardZoneProps {
  bgcolor: { main: string; bright: string };
  zone: zoneProps["zone"];
  moveCard: zoneProps["moveCard"];
  sortable?: boolean;
  render: () => any;
}

const CardZone = ({
  bgcolor,
  zone,
  moveCard,
  render,
  sortable = false,
}: CardZoneProps) => {
  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: "CARD",
      canDrop: (item: Card) => {
        return sortable ? sortable : zone.index !== item.inZone;
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver({ shallow: true }),
        canDrop: !!monitor.canDrop(),
      }),
      drop: (item: Card) => {
        moveCard(item.cardID, item.inZone, zone.index, zone.cardIDs.length);
      },
    }),
    [zone]
  );

  return (
    <Box
      id="cardzone"
      ref={dropRef}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        bgcolor: isOver && canDrop ? bgcolor.bright : bgcolor.main,
      }}
    >
      {render()}
    </Box>
  );
};

export default CardZone;
