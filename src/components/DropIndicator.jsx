import { useKanbanContext } from "./KanbanBoard";

const DropIndicator = ({ beforeId }) => {
  const { title } = useKanbanContext();
  return (
    <div data-before={beforeId || "-1"} data-indicator={title} className="my-1 h-0.5 w-full bg-violet-600 opacity-0" />
  );
};

export default DropIndicator;
