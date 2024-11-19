interface ButtonProps {
  text: string;
  onClick: () => void;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full text-white bg-black hover:bg-black/90 font-medium rounded-lg text-sm px-6 py-3"
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export { Button };
