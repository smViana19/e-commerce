import { ChangeEventHandler } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
}

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
}: InputFieldProps) => {
  return (
    <div>
      <label
        htmlFor="{name}"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full rounded-md border-gray-300 border shadow-sm p-1 "
      />
    </div>
  );
};
export default InputField;
