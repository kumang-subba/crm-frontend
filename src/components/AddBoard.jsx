import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "./Modal";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";
import FormField from "./FormField";
import { BoardSchema } from "../validators/board";
import z from "zod";

const AddBoard = ({ addBoard }) => {
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
  });
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (errors) {
      const parseResult = BoardSchema.safeParse({ ...form, [e.target.name]: e.target.value });
      if (!parseResult.success) {
        const formattedErrors = z.treeifyError(parseResult.error);
        setErrors({ ...formattedErrors.properties });
      } else {
        setErrors(null);
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const parseResult = BoardSchema.safeParse(data);
    if (!parseResult.success) {
      const formattedErrors = z.treeifyError(parseResult.error);
      setErrors({ ...formattedErrors.properties });
      return;
    }
    addBoard(data);
    setFormModalOpen(false);
  };

  return (
    <div className="text-black rounded-md px-10 my-10">
      {!formModalOpen ? (
        <motion.button
          layoutId="add-board"
          className="flex items-center h-10 cursor-pointer focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 gap-2 transition-colors"
          onClick={() => setFormModalOpen(true)}
        >
          Add new board
          <FaPlus />
        </motion.button>
      ) : (
        <div className="h-10" />
      )}
      <Modal
        isOpen={formModalOpen}
        onClose={() => {
          setForm({ name: "" });
          setFormModalOpen(false);
        }}
      >
        <div className="rounded-lg bg-white ">
          <motion.div
            layoutId="add-board"
            className={cn("rounded-t-lg px-4 py-2 font-medium text-lg text-white", "bg-purple-700")}
          >
            Add new board
          </motion.div>
          <div className="px-4 py-8">
            <form onSubmit={handleFormSubmit}>
              <FormField
                name="name"
                required
                placeholder={"Enter name of the board..."}
                onChange={handleChange}
                value={form.name}
                errors={errors?.name?.errors}
              />
              <div className="mt-8 mb-4">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-emerald-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  Add Board
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="flex w-full justify-center rounded-md bg-rose-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-rose-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700"
                  onClick={() => {
                    setForm({
                      name: "",
                    });
                    setErrors(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default AddBoard;
