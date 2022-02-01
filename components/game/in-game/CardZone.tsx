import * as React from "react";
import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import { useCallback } from "react";

import type { Card } from "@swingout/components/game/in-game/MTGCard";

interface CardZoneProps {
  initialCards: Array<Card>;
  render: (
    cards: Array<Card>,
    removeCard: (toRemove: Card) => void,
    sortCard?: (toMove: Card, toIndex: number) => void
  ) => any;
  sortable: boolean;
}

const CardZone = ({
  initialCards,
  render,
  sortable = false,
}: CardZoneProps) => {
  const [cards, setCards] = React.useState<Card[]>(initialCards);

  const removeCard = useCallback(
    (toRemove: Card) => {
      setCards(cards.splice(cards.indexOf(toRemove), 1));
    },
    [cards, setCards]
  );

  const addCard = useCallback(
    (toAdd: Card, atIndex?: number) => {
      atIndex
        ? setCards(cards.splice(atIndex, 0, toAdd))
        : setCards(cards.concat(toAdd));
    },
    [cards, setCards]
  );

  const sortCard = useCallback((toMove: Card, toIndex: number) => {
    const prevIndex = cards.indexOf(toMove);
    addCard(toMove, toIndex);
    setCards(cards.splice(prevIndex, 1));
  }, []);

  const [, dropRef] = useDrop(() => ({
    accept: "CARD",
    drop: (item: Card) => {
      addCard(item);
    },
  }));

  return (
    <Box ref={dropRef}>
      {sortable
        ? render(cards, removeCard, sortCard)
        : render(cards, removeCard)}
    </Box>
  );
};

export default CardZone;
