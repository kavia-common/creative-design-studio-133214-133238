import React from "react";
import "./TemplateGallery.css";

/**
 * PUBLIC_INTERFACE
 * Template gallery: Browse design templates.
 * @param {Function} onSelectTemplate
 */
const TEMPLATES = [
  { id: "t1", name: "Modern Poster", thumb: "🖼️" },
  { id: "t2", name: "Minimal Resume", thumb: "📄" },
  { id: "t3", name: "Social Media Card", thumb: "💬" }
];

export default function TemplateGallery({ onSelectTemplate }) {
  return (
    <section className="template-gallery">
      <h2>Templates</h2>
      <div className="gallery-grid">
        {TEMPLATES.map(t => (
          <button
            className="template-tile"
            key={t.id}
            onClick={() => onSelectTemplate(t.id)}
          >
            <div className="thumb">{t.thumb}</div>
            <div>{t.name}</div>
          </button>
        ))}
      </div>
    </section>
  );
}
