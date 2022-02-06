import * as React from "react";
import { Box } from "@mui/material";

import MTGCard, { Card } from "@swingout/components/game/in-game/MTGCard";
import CardZone from "@swingout/components/game/in-game/CardZone";
import { zoneProps } from "@swingout/components/game/PlaySpace";

const Battlefield = ({ zone, fetchCard, moveCard }: zoneProps) => {
  const render = (): any => (
    <Box
      sx={{
        display: "flex",
        gap: "5px",
        ml: "5px",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      {zone.cardIDs.map((cardID) => {
        const cardData: Card = {
          cardID: cardID,
          inZone: zone.index,
          card: fetchCard(cardID),
        };
        return (
          <MTGCard
            key={cardID}
            cardData={cardData}
            moveCard={moveCard}
          ></MTGCard>
        );
      })}
    </Box>
  );

  return (
    <CardZone
      bgcolor={{ main: "hsl(0, 0%, 50%)", bright: "hsl(0, 0%, 70%)" }}
      zone={zone}
      moveCard={moveCard}
      render={render}
    />
  );
};

export default Battlefield;
