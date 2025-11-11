import { FaPen, FaTrash } from "react-icons/fa";
import { cn } from "../lib/utils";
import AddCard from "./AddCard";
import Card from "./Card";
import DropIndicator from "./DropIndicator";
import { useKanbanContext } from "./KanbanBoard";
import Tooltip from "./Tooltip";
import { useState } from "react";
import { motion } from "framer-motion";
import ColumnFormModal from "./ColumnFormModal";

const Column = ({ name, id, description, leads, titleBarColor }) => {
  const { title, handleUpdateColumn, handleDeleteColumn } = useKanbanContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className={cn("flex-1 rounded-md pb-10 bg-stone-300")} data-column={title} data-columnid={id}>
      <ColumnFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        layoutId={id}
        titleBarColor={titleBarColor}
        data={{ name, description }}
        handleSubmit={handleUpdateColumn}
      />
      {!isEditModalOpen && (
        <motion.div
          layout
          layoutId={id}
          className={cn("flex items-center group justify-between px-4 py-2 rounded-t-md", titleBarColor)}
        >
          <div className="flex gap-2">
            <Tooltip content={description} position="top">
              <h2 className={"font-medium uppercase"}>{name}</h2>
            </Tooltip>
            <button
              className="text-stone-200 cursor-pointer opacity-0 transition-all group-hover:opacity-100"
              onClick={() => setIsEditModalOpen(true)}
            >
              <FaPen />
            </button>

            <button
              className="text-red-600 cursor-pointer opacity-0 transition-all group-hover:opacity-100"
              onClick={() => handleDeleteColumn(id)}
            >
              <FaTrash />
            </button>
          </div>
          <span className="rounded text-2xl text-black-600">{leads.length}</span>
        </motion.div>
      )}
      <div className={cn("w-full h-full px-2 pt-2 pb-4 rounded-b-md")}>
        {leads.map((l) => {
          return <Card key={`${id}-${l.id}`} {...l} />;
        })}
        <DropIndicator beforeId={null} />
        <AddCard columnId={id} />
      </div>
    </div>
  );
};

export default Column;
