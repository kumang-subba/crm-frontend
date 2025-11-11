import { useState } from "react";
import { useKanbanContext } from "./KanbanBoard";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

const AddCard = ({ columnId }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const { handleAddCard } = useKanbanContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim().length) return;
    const newCard = {
      name: text.trim(),
    };
    handleAddCard(newCard, columnId);
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout layoutId={`add-card-${columnId}`} onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full resize-none rounded border border-violet-400 bg-violet-400/20 p-3 text-sm placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-600 transition-colors hover:text-neutral-800 cursor-pointer"
              type="button"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-200 cursor-pointer"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          layoutId={`add-card-${columnId}`}
          onClick={() => setAdding(true)}
          transition={{ duration: adding ? 0.25 : 0 }} // instant on close
          className="flex items-center justify-start w-full cursor-pointer gap-1.5 px-3 py-1.5 text-xs bg-stone-100 text-neutral-600 rounded-md transition-colors hover:bg-stone-200"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

export default AddCard;
