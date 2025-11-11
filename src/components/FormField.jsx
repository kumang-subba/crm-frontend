import { useState } from "react";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormField = ({ errors, name, type = "text", className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900 capitalize">
        {name}
      </label>
      <div className="mt-2 relative">
        <input
          name={name}
          id={name}
          type={showPassword ? "text" : type}
          className={cn(
            "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6",
            className,
          )}
          {...props}
        />
        {type == "password" &&
          (showPassword ? (
            <FaEye
              className="absolute right-2 top-0 translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaEyeSlash
              className="absolute right-2 top-0 translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ))}
      </div>
      {errors && errors.length > 0 && (
        <motion.div layout>
          {errors.map((err) => (
            <motion.span key={err} layout className="text-sm text-rose-700">
              {err}
            </motion.span>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FormField;
