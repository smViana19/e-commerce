import { useEffect, useState } from "react";
import InputField from "./InputField";

interface FormField {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  required?: boolean;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  renderButton: ({ isSubmitting }: { isSubmitting: boolean }) => JSX.Element;
  initialValues: Record<string, any>;
}

const Form = ({ fields, onSubmit, renderButton, initialValues }: FormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) =>
        field.type === "select" && field.options ? (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            <select
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm py-1 cursor-pointer"
            >
              <option value="">Selecione</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type || "text"}
            onChange={handleChange}
            value={formData[field.name] || ""}
            required={field.required}
          />
        )
      )}
      {renderButton({ isSubmitting })}
    </form>
  );
};

export default Form;
