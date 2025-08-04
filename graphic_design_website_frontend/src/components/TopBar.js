import React from "react";
import { useAuth } from "../auth/AuthContext";
import "./TopBar.css";

// PUBLIC_INTERFACE
/**
 * TopBar component for displaying key actions and user info.
 * @param {Object} props
 * @param {Function} onAction - callback for topbar menu actions
 * @param {String} currentScreen - for optional context display
 */
export default function TopBar({ onAction, currentScreen }) {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div className="topbar-section">
        {currentScreen === "editor" && (
          <button className="topbar-btn" onClick={() => onAction("export")}>
            <span role="img" aria-label="export">⤓</span> Export
          </button>
        )}
        <button className="topbar-btn" onClick={() => onAction("settings")}>
          <span role="img" aria-label="settings">⚙️</span>
        </button>
      </div>
      <div className="topbar-section right">
        {user ? (
          <>
            <span className="user-avatar">{user.username.charAt(0).toUpperCase()}</span>
            <button className="topbar-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <button className="topbar-btn" onClick={() => onAction("auth")}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}
