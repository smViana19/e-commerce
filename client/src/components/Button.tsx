import { ReactNode } from "react";

interface ButtonProps {
  text?: string;
  onClick?: () => void;
  isLoading?: boolean;
  type?: "button" | "submit";
  icon?: ReactNode;
  size?: "small" | "medium" | "large";
  variant?: "filled" | "outline";
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  isLoading,
  type = "button",
  icon,
  size = "medium",
  variant = "filled",
  width = "full",
}) => {
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    filled: "bg-black text-white hover:bg-black/90",
    outline:
      "bg-transparent text-black border-2 border-black hover:bg-black/90 hover:text-white",
  };
  const widthStyle = width === "full" ? "w-full" : width;

  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded-lg font-medium ${sizeClasses[size]} ${variantClasses[variant]} ${widthStyle} flex items-center justify-center gap-2 transition duration-200`}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {text && <span>{text}</span>}
        </>
      )}
    </button>
  );
};

export { Button };
