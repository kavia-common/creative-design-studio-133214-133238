import React, { useState } from "react";
import "./Dashboard.css";

/**
 * PUBLIC_INTERFACE
 * Dashboard: List and manage graphic design projects.
 * Props:
 * - onOpenProject: (id) => void
 * - onNewProject: () => void
 */
export default function Dashboard({ onOpenProject, onNewProject }) {
  // For demo: static stub
  const [projects] = useState([
    { id: "p1", name: "Flyer Sample", updated: "2024-05-02" },
    { id: "p2", name: "Logo Concept", updated: "2024-03-28" }
  ]);
  return (
    <section className="dashboard">
      <h2>Your Projects</h2>
      <button className="accent-btn" onClick={onNewProject}>
        + New Project
      </button>
      <div className="projects-list">
        {projects.length === 0 && (
          <div className="empty">No projects found. Start creating!</div>
        )}
        {projects.map(proj => (
          <button
            className="project-card"
            key={proj.id}
            onClick={() => onOpenProject(proj.id)}
          >
            <div>{proj.name}</div>
            <div className="project-updated">Updated: {proj.updated}</div>
          </button>
        ))}
      </div>
    </section>
  );
}
