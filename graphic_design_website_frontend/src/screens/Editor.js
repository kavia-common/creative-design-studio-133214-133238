import React, { useState } from "react";
import "./Editor.css";

/**
 * PUBLIC_INTERFACE
 * Online Graphic Design Editor Canvas
 * Props:
 *   - project (object) - Project info (stub)
 *   - onExport (format: string) - trigger export
 */
export default function Editor({ project, onExport }) {
  const [shapes] = useState([
    { type: "rect", x: 70, y: 80, w: 140, h: 80, color: "#00b894" },
    { type: "circle", x: 300, y: 160, r: 50, color: "#fdcb6e" }
  ]);

  // Placeholder canvas + sidebar
  return (
    <div className="editor-root">
      <div className="editor-toolbar">
        <button className="editor-btn" title="Add rectangle">▭</button>
        <button className="editor-btn" title="Add circle">◯</button>
        <div style={{ flex: 1 }} />
        <button className="editor-btn export" onClick={() => onExport("png")}>Export PNG</button>
        <button className="editor-btn" onClick={() => onExport("jpg")}>JPG</button>
        <button className="editor-btn" onClick={() => onExport("svg")}>SVG</button>
      </div>
      <div className="editor-canvas-area">
        <div className="editor-canvas-panel">
          <svg width="100%" height="340" className="editor-canvas" viewBox="0 0 520 340">
            <rect x="0" y="0" width="520" height="340" fill="#242528" rx="19" />
            {shapes.map((s, idx) =>
              s.type === "rect" ? (
                <rect
                  key={idx}
                  x={s.x}
                  y={s.y}
                  width={s.w}
                  height={s.h}
                  fill={s.color}
                  rx="8"
                  opacity={0.85}
                />
              ) : (
                <circle
                  key={idx}
                  cx={s.x}
                  cy={s.y}
                  r={s.r}
                  fill={s.color}
                  opacity={0.78}
                />
              )
            )}
          </svg>
        </div>
        <aside className="editor-sidepanel">
          <div className="sidepanel-group">
            <div>Layers</div>
            <ul>
              <li>Rectangle</li>
              <li>Circle</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
