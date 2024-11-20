import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {title && (
          <div className="mb-4 flex justify-between items-center font-poppins">
            <h2 className="text-lg font-semibold">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </h2>
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
