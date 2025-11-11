import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiCheckSquare, FiCodepen, FiX } from "react-icons/fi";
import { cn } from "../lib/utils";

const Notification = ({ text, id, timer, removeNotif, variant }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, timer);
    return () => clearTimeout(timeoutRef);
  }, []);

  return (
    <motion.div
      layout
      initial={{ y: 15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "p-2 flex items-start rounded gap-2 text-sm font-medium shadow-lg text-white bg-indigo-500 pointer-events-auto",
        variant === "success" && "bg-emerald-600",
        variant === "error" && "bg-rose-600",
      )}
    >
      {variant === "primary" && <FiCodepen className=" mt-0.5" />}
      {variant === "success" && <FiCheckSquare className=" mt-0.5" />}
      {variant === "error" && <FiAlertTriangle className=" mt-0.5" />}
      <span>{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};

export default Notification;
