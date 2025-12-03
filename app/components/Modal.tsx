"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/20 p-5 backdrop-blur-xs"
      onClick={handleBackdropClick}
      style={{ isolation: "isolate" }}
    >
      {/* Modal content */}
      <div className="relative bg-black drop-shadow-xl rounded-lg shadow-lg max-w-xl w-full h-auto max-h-[90dvh]">
        <div className="flex flex-row-reverse w-full items-center p-5 border-b border-white/30">
          <X
            onClick={onClose}
            className="w-7 h-7 text-white/70 cursor-pointer hover:text-white hover:rotate-180 transition-all duration-300"
          />

          {/** Title */}
          {title && <div className="w-full font-bold">{title}</div>}
        </div>
        <div className="p-5 max-h-[83dvh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );

  // Render the modal at the document body level
  return createPortal(modalContent, document.body);
};

export default Modal;
