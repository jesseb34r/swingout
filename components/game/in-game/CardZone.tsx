import * as React from "react";
import { Box } from "@mui/material";
import { useDrop } from "react-dnd";
import { useCallback } from "react";
import update from "immutability-helper";

export interface renderProps {
  cardIndexes: Array<number>;
  removeCard: (toRemove: number) => void;
  sortCard?: (toMove: number, toIndex: number) => void;
}
interface CardZoneProps {
  bgcolor: { main: string; bright: string };
  initialCards?: Array<number>;
  sortable?: boolean;
  render: ({ cardIndexes, removeCard, sortCard }: renderProps) => any;
}

const CardZone = ({
  bgcolor,
  initialCards = [],
  render,
  sortable = false,
}: CardZoneProps) => {
  const [cardIndexes, setCardIndexes] = React.useState<number[]>(initialCards);

  const removeCard = useCallback((toRemove: number) => {
    setCardIndexes((prevCardIndexes: number[]) =>
      update(prevCardIndexes, { $splice: [[cardIndexes.indexOf(toRemove), 1]] })
    );
  }, []);

  const addCard = useCallback((toPush: number) => {
    setCardIndexes((prevCardIndexes: number[]) =>
      update(prevCardIndexes, { $push: [toPush] })
    );
  }, []);

  const sortCard = useCallback((toMove: number, toIndex: number) => {
    setCardIndexes((prevCardIndexes: number[]) =>
      update(prevCardIndexes, {
        $splice: [
          [cardIndexes.indexOf(toMove), 1],
          [toIndex, 0, toMove],
        ],
      })
    );
  }, []);

  const [{ isOver, canDrop }, dropRef] = useDrop(
    () => ({
      accept: "CARD",
      canDrop: (item: { deckIndex: number }) => {
        return !cardIndexes.includes(item.deckIndex);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver({ shallow: true }),
        canDrop: !!monitor.canDrop(),
      }),
      drop: (item: { deckIndex: number }) => addCard(item.deckIndex),
    }),
    [cardIndexes]
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
      {sortable
        ? render({ cardIndexes, removeCard, sortCard })
        : render({ cardIndexes, removeCard })}
    </Box>
  );
};

export default CardZone;
