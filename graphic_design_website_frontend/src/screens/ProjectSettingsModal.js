import React from "react";
import Modal from "../components/Modal";

/**
 * PUBLIC_INTERFACE
 * Modal dialog for project settings.
 * @param {boolean} open
 * @param {function} onClose
 */
export default function ProjectSettingsModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Project Settings">
      <div style={{ minWidth: 240 }}>
        <div>
          <label>
            Project Name:<br />
            <input type="text" style={{ width: "99%" }} defaultValue="Untitled Project" />
          </label>
        </div>
        <button className="accent-btn" style={{ marginTop: "2em" }} onClick={onClose}>
          Save
        </button>
      </div>
    </Modal>
  );
}
