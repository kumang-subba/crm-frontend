import { Link } from "react-router";
import { cn } from "../lib/utils";

const StyledLink = ({ className, children, ...props }) => {
  return (
    <Link
      className={cn(
        "rounded-md transition-all bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default StyledLink;
