import React from "react";
import "./Sidebar.css";

// PUBLIC_INTERFACE
/**
 * Sidebar navigation for graphic design website.
 * @param {string} active - The active screen key
 * @param {Function} onNavigate - Callback to change screens
 */
const NAV_ITEMS = [
  { key: "dashboard", label: "Projects", icon: "📁" },
  { key: "templates", label: "Templates", icon: "🗂️" },
  { key: "editor", label: "Editor", icon: "🎨" }
];

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-logo">GFX<span style={{ color: "var(--accent)" }}>•</span></span>
      </div>
      <nav>
        {NAV_ITEMS.map(item => (
          <button
            key={item.key}
            className={"sidebar-item" + (active === item.key ? " active" : "")}
            onClick={() => onNavigate(item.key)}
            aria-label={item.label}
            type="button"
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
