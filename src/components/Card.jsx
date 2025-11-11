import { motion } from "framer-motion";
import { FaPen, FaTrash } from "react-icons/fa";
import { useKanbanContext } from "./KanbanBoard";
import DropIndicator from "./DropIndicator";

const Card = ({ ...card }) => {
  const { handleDrag, handleDragEnd, handleDeleteCard } = useKanbanContext();
  return (
    <>
      <DropIndicator beforeId={card.id} />
      <motion.div
        layout
        layoutId={card.id}
        drag
        dragMomentum={false}
        onDrag={handleDrag}
        onDragEnd={(e) => {
          handleDragEnd(e, card);
        }}
        animate={{ x: 0, y: 0, scale: 1 }}
        dragSnapToOrigin
        whileDrag={{
          scale: 1.05,
          boxShadow: "0px 8px 16px rgba(0,0,0,0.3)",
        }}
        className="cursor-grab gap-2 rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing hover:bg-neutral-900 transition-colors flex"
      >
        <p className="text-sm flex-1 text-neutral-100">{card.name}</p>
        <button className="text-neutral-100 cursor-pointer">
          <FaPen />
        </button>
        <button className="text-red-600 cursor-pointer" onClick={() => handleDeleteCard(card.id, card.column)}>
          <FaTrash />
        </button>
      </motion.div>
    </>
  );
};

export default Card;
