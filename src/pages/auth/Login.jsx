import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import LoginSchema from "../../validators/login";
import z from "zod";
import axiosInstance from "../../lib/axiosInstance";
import { useAuthContext } from "../../providers/AuthProvider";
import FormField from "../../components/FormField";

const Login = () => {
  const { refetch } = useAuthContext();
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
      const parseResult = LoginSchema.safeParse({ ...form, [e.target.name]: e.target.value });
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
      const parseResult = LoginSchema.safeParse(data);
      if (!parseResult.success) {
        const formattedErrors = z.treeifyError(parseResult.error);
        setErrors({ ...formattedErrors.properties });
        return;
      }
      await axiosInstance.post("/auth/login", data);
      refetch();
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrors({
        password: {
          errors: ["Invalid username or password"],
        },
      });
    }
  };
  return (
    <motion.div layout className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-20 bg-stone-300 rounded-md">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="my-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <div className="sm:mx-auto sm:min-w-[20vw] sm:w-full sm:max-w-lg">
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
          <div>
            <button
              type="submit"
              className="flex w-full justify-center cursor-pointer rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{" "}
          <Link to={"/register"} className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
