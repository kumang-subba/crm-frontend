import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaX } from "react-icons/fa6";

export default function Modal({ isOpen, onClose, children, layoutId }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div
            key="modal"
            layout
            layoutId={layoutId}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 z-50 max-w-lg w-full rounded-lg shadow-lg -translate-x-1/2 -translate-y-1/2"
          >
            {children}
            <button
              onClick={onClose}
              className="absolute top-2 text-sm right-2 text-gray-800 hover:text-gray-900 hover:bg-stone-400 transition-colors cursor-pointer bg-stone-200/80 p-1 rounded-full"
            >
              <FaX />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
