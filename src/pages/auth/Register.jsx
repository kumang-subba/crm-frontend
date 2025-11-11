import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import RegisterSchema from "../../validators/register";
import z from "zod";
import axiosInstance from "../../lib/axiosInstance";
import FormField from "../../components/FormField";
import { useNotificationContext } from "../../providers/NotificationProvider";

const Register = () => {
  const { addNotification } = useNotificationContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (errors) {
      const parseResult = RegisterSchema.safeParse({ ...form, [e.target.name]: e.target.value });
      if (!parseResult.success) {
        const formattedErrors = z.treeifyError(parseResult.error);
        setErrors({ ...formattedErrors.properties });
      } else {
        setErrors(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      const parseResult = RegisterSchema.safeParse(data);
      if (!parseResult.success) {
        const formattedErrors = z.treeifyError(parseResult.error);
        setErrors({ ...formattedErrors.properties });
        return;
      }
      await axiosInstance.post("/auth/register", { username: data.username, password: data.password });
      addNotification("User registered successfully", "success");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setErrors({
        confirmPassword: {
          errors: ["Invalid username or password"],
        },
      });
    }
  };

  return (
    <motion.div layout className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-20 bg-stone-300 rounded-md">
      <div className="sm:mx-auto sm:w-100">
        <h2 className="my-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Register an account</h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <FormField
            name="username"
            required
            placeholder="Enter your username..."
            onChange={handleChange}
            value={form.username}
            errors={errors?.username?.errors}
          />
          <FormField
            name="password"
            type="password"
            required
            placeholder="Enter your password..."
            onChange={handleChange}
            value={form.password}
            errors={errors?.password?.errors}
          />
          <FormField
            name="confirmPassword"
            type="password"
            required
            placeholder="Enter your password again..."
            onChange={handleChange}
            value={form.confirmPassword}
            errors={errors?.confirmPassword?.errors}
          />
          <div>
            <button
              type="submit"
              className="flex w-full cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?{" "}
          <Link to={"/login"} className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
