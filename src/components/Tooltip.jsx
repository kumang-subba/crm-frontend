import { motion } from "framer-motion";
import { useState, useRef, useLayoutEffect } from "react";

const Tooltip = ({ content, position = "bottom", children, offset = 8 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [posStyle, setPosStyle] = useState({});
  const wrapperRef = useRef(null);
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    if (!isHovered || !wrapperRef.current || !tooltipRef.current) return;
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    let x = 0;
    let y = 0;
    if (position === "top") {
      x = wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2;
      y = wrapperRect.top - tooltipRect.height - offset;
    } else if (position === "bottom") {
      x = wrapperRect.left + wrapperRect.width / 2 - tooltipRect.width / 2;
      y = wrapperRect.bottom + offset;
    }
    const maxX = window.innerWidth - tooltipRect.width - 8;
    const minX = 20;
    x = Math.min(Math.max(x, minX), maxX);
    const maxY = window.innerHeight - tooltipRect.height - 8;
    const minY = 20;
    y = Math.min(Math.max(y, minY), maxY);
    setPosStyle({
      top: `${y}px`,
      left: `${x}px`,
    });
  }, [isHovered, position, offset]);

  return (
    <div
      ref={wrapperRef}
      className="relative inline-flex items-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <motion.div
        ref={tooltipRef}
        initial={{ opacity: 0, y: 4 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 0 : 4,
          pointerEvents: isHovered ? "auto" : "none",
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        style={{
          position: "fixed",
          zIndex: 9999,
          ...posStyle,
        }}
        className="rounded-md bg-gray-800 px-2 py-1 text-xs text-white shadow-md max-w-80 break-all"
      >
        {content}
        <div
          className="absolute w-2 h-2 bg-gray-800 rotate-45"
          style={{
            top: position === "bottom" ? 0 : undefined,
            left: "50%",
            bottom: position === "top" ? -8 : undefined,
            transform: "translateX(-80%)",
          }}
        />
      </motion.div>
    </div>
  );
};

export default Tooltip;
