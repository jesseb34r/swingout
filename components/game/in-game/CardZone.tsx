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

  const removeCard = useCallback(
    (toRemove: Card) => {
      setCards(
        update(cards, {
          $splice: [[cards.indexOf(toRemove), 1]],
        })
      );
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

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "CARD",
    canDrop: (item: Card) => {
      return cards.includes(item);
    },
    drop: (item: Card) => {
      addCard(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
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
        bgcolor: isOver ? bgcolor.bright : bgcolor.main,
      }}
    >
      {sortable
        ? render(cards, removeCard, sortCard)
        : render(cards, removeCard)}
    </Box>
  );
};

export default CardZone;
