import React from "react";
import Modal from "../components/Modal";

/**
 * PUBLIC_INTERFACE
 * Modal dialog for exporting design in chosen format.
 * @param {boolean} open
 * @param {function} onClose
 * @param {function} onExport - callback(format: string)
 */
export default function ExportModal({ open, onClose, onExport }) {
  return (
    <Modal open={open} onClose={onClose} title="Export Design">
      <div style={{ minWidth: 220 }}>
        <div>Select format:</div>
        <div style={{ display: "flex", gap: "1em", margin: "1.2em 0" }}>
          <button className="accent-btn" onClick={() => onExport("png")}>PNG</button>
          <button className="accent-btn" onClick={() => onExport("jpg")}>JPG</button>
          <button className="accent-btn" onClick={() => onExport("svg")}>SVG</button>
        </div>
      </div>
    </Modal>
  );
}
