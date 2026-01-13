import { useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef();
  useOutsideClick(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-md rounded-lg shadow-lg p-6"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#0A1F44]">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#0A1F44]"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="text-[#6B7280] text-sm">{children}</div>
      </div>
    </div>
  );
}
