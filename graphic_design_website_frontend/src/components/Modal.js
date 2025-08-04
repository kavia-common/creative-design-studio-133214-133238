import React from "react";
import "./Modal.css";

/**
 * PUBLIC_INTERFACE
 * A generic modal/dialog.
 * @param {boolean} open - Is modal open
 * @param {function} onClose - Callback to close modal
 * @param {string} title - Modal title
 * @param {React.ReactNode} children - Content
 */
export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-dialog"
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className="modal-titlebar">
          <span>{title}</span>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}
