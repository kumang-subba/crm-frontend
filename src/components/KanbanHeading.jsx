import { FaPlus } from "react-icons/fa";
import Tooltip from "./Tooltip";
import { useState } from "react";
import { motion } from "framer-motion";
import ColumnFormModal from "./ColumnFormModal";
import { useKanbanContext } from "./KanbanBoard";

const KanbanHeading = () => {
  const { title, boardId, handleAddColumn } = useKanbanContext();
  const [addModalOpen, setAddModalOpen] = useState(false);
  return (
    <div className="flex gap-2 items-end">
      <ColumnFormModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        layoutId={boardId}
        titleBarColor={"text-green-700"}
        handleSubmit={handleAddColumn}
      />
      <h1 className="py-5 text-black font-bold text-6xl">{title}</h1>
      <div className="py-5">
        <Tooltip content={"Add new column"} position="top">
          <motion.button
            className="cursor-pointer rounded-full transition-all text-green-700 hover:bg-neutral-400/50 p-1"
            layoutId={boardId}
            onClick={() => setAddModalOpen(true)}
          >
            <FaPlus />
          </motion.button>
        </Tooltip>
      </div>
    </div>
  );
};

export default KanbanHeading;
