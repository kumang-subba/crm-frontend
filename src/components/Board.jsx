import Column from "./Column";
import { useKanbanContext } from "./KanbanBoard";

const Board = () => {
  const { kanBanData } = useKanbanContext();
  const titleBarColors = [
    "bg-amber-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-green-400",
    "bg-lime-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-violet-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-rose-500",
  ];
  return (
    <div className="flex gap-4 justify-center">
      {kanBanData.map((c, i) => (
        <Column key={c.id} leads={c.leads} titleBarColor={titleBarColors[i]} {...c} />
      ))}
    </div>
  );
};

export default Board;
