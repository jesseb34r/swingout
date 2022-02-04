import * as React from "react";
import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import { useCallback } from "react";
import update from "immutability-helper";

import type { Card } from "@swingout/components/game/in-game/MTGCard";

interface CardZoneProps {
  bgcolor: { main: string; bright: string };
  initialCards?: Array<Card>;
  sortable?: boolean;
  render: (
    cards: Array<Card>,
    removeCard: (toRemove: Card) => void,
    sortCard?: (toMove: Card, toIndex: number) => void
  ) => any;
}

const CardZone = ({
  bgcolor,
  initialCards = [],
  render,
  sortable = false,
}: CardZoneProps) => {
  const [cards, setCards] = React.useState<Card[]>(initialCards);

  const removeCard = useCallback((toRemove: Card) => {
    setCards((prevCards: Card[]) =>
      update(prevCards, { $splice: [[cards.indexOf(toRemove), 1]] })
    );
  }, []);

  const addCard = useCallback((toPush: Card) => {
    setCards((prevCards: Card[]) => update(prevCards, { $push: [toPush] }));
  }, []);

  const sortCard = useCallback((toMove: Card, toIndex: number) => {
    setCards((prevCards: Card[]) =>
      update(prevCards, {
        $splice: [
          [cards.indexOf(toMove), 1],
          [toIndex, 0, toMove],
        ],
      })
    );
  }, []);

  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: "CARD",
    canDrop: (item: Card) => {
      return !cards.includes(item);
    },
    drop: (item: Card) => addCard(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
      canDrop: !!monitor.canDrop(),
    }),
  }));

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
      {sortable
        ? render(cards, removeCard, sortCard)
        : render(cards, removeCard)}
    </Box>
  );
};

export default CardZone;
