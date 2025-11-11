import { useState } from "react";
import { cn } from "../lib/utils";
import Modal from "./Modal";
import FormField from "./FormField";
import { ColumnSchema } from "../validators/column";
import z from "zod";

const ColumnFormModal = ({ isOpen, onClose, layoutId, titleBarColor, data, handleSubmit }) => {
  const [form, setForm] = useState({
    name: data ? data.name : "",
    description: data ? data.description : "",
  });
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (errors) {
      const parseResult = ColumnSchema.safeParse({ ...form, [e.target.name]: e.target.value });
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
    const parseResult = ColumnSchema.safeParse(data);
    if (!parseResult.success) {
      const formattedErrors = z.treeifyError(parseResult.error);
      setErrors({ ...formattedErrors.properties });
      return;
    }
    handleSubmit(form, layoutId);
    setForm({ name: "", description: "" });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} layoutId={layoutId}>
      <div className="rounded-lg bg-white ">
        <div className={cn("rounded-t-lg px-4 py-2 font-medium text-lg", titleBarColor)}>
          {data ? `Edit column ${data.name.toUpperCase()}` : "Add a new column"}
        </div>

        <div className="px-4 py-8">
          <form onSubmit={handleFormSubmit}>
            <FormField
              name="name"
              required
              placeholder={data ? "Enter new name..." : " Enter a name for the column"}
              onChange={handleChange}
              value={form.name}
              errors={errors?.name?.errors}
            />
            <div className="h-5 w-full" aria-hidden />
            <FormField
              name="description"
              required
              placeholder={data ? "Enter new description..." : "Enter description for the column"}
              onChange={handleChange}
              value={form.description}
              errors={errors?.description?.errors}
            />
            <div className="mt-8 mb-4">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-emerald-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              >
                {data ? "Save Changes" : "Add column"}
              </button>
            </div>
            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-rose-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-rose-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700"
                onClick={() => {
                  setForm({
                    name: data ? data.name : "",
                    description: data ? data.description : "",
                  });
                  setErrors(null);
                  onClose();
                }}
              >
                {data ? "Discard Changes" : "Cancel"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ColumnFormModal;
