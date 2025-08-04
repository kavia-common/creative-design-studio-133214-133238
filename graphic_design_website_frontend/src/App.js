import React, { useState, useEffect } from "react";
import { AuthProvider } from "./auth/AuthContext";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Dashboard from "./screens/Dashboard";
import TemplateGallery from "./screens/TemplateGallery";
import Editor from "./screens/Editor";
import Modal from "./components/Modal";
import AuthModal from "./screens/AuthModal";
import ExportModal from "./screens/ExportModal";
import ProjectSettingsModal from "./screens/ProjectSettingsModal";
import "./App.css";
import "./components/Sidebar.css";
import "./components/TopBar.css";
import "./components/Modal.css";
import "./screens/Dashboard.css";
import "./screens/TemplateGallery.css";
import "./screens/Editor.css";
import "./screens/AuthModal.css";

/**
 * PUBLIC_INTERFACE
 * Root application component, orchestrates authentication
 * and the main UI/feature navigation for the graphic design app.
 */
function MainApp() {
  // Theme: respect system setting OR persist in local storage
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("gfx-theme") ||
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "dark")
  );
  const [currentScreen, setCurrentScreen] = useState("dashboard"); // dashboard/templates/editor
  const [modals, setModals] = useState({ auth: false, export: false, projectSettings: false });
  const [currentProject, setCurrentProject] = useState(null);

  // Apply color variables for dark theme on root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.style.setProperty("--bg-primary", "#18191b");
      document.documentElement.style.setProperty("--bg-secondary", "#232528");
      document.documentElement.style.setProperty("--text-primary", "#fff");
      document.documentElement.style.setProperty("--button-bg", "#fdcb6e");
      document.documentElement.style.setProperty("--button-text", "#2d3436");
      document.documentElement.style.setProperty("--border-color", "#32323a");
      document.documentElement.style.setProperty("--color-primary", "#2d3436");
      document.documentElement.style.setProperty("--color-secondary", "#00b894");
      document.documentElement.style.setProperty("--color-accent", "#fdcb6e");
      document.documentElement.style.setProperty("--sidebar", "#232528");
      document.documentElement.style.setProperty("--panel", "#232528");
      document.documentElement.style.setProperty("--canvas-bg", "#242528");
    }
    localStorage.setItem("gfx-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  function toggleTheme() {
    setTheme((old) => (old === "dark" ? "light" : "dark"));
  }

  // Handle TopBar action clicks (settings, export, auth)
  function handleTopBarAction(action) {
    if (action === "export") setModals(m => ({ ...m, export: true }));
    if (action === "settings") setModals(m => ({ ...m, projectSettings: true }));
    if (action === "auth") setModals(m => ({ ...m, auth: true }));
  }

  // For now, fake opening project always loads editor
  function handleOpenProject(pid) {
    setCurrentScreen("editor");
    setCurrentProject({ id: pid || "new", name: "Untitled Project" });
  }
  function handleNewProject() {
    setCurrentScreen("editor");
    setCurrentProject({ id: "new", name: "Untitled Project" });
  }
  function handleSelectTemplate(tid) {
    setCurrentScreen("editor");
    setCurrentProject({ id: "from-template", name: "New From Template #" + tid });
  }
  function handleCloseModals() {
    setModals({ auth: false, export: false, projectSettings: false });
  }

  // Export action (placeholder)
  function handleExport(format) {
    // Would render/export canvas to chosen format (use toDataURL, js libraries, etc.)
    alert(
      `Design would be exported as .${format.toUpperCase()} (demo only).` +
        "\nFor real PNG/JPG/SVG export, integrate canvas/svg renderer."
    );
    setModals(m => ({ ...m, export: false }));
  }

  // Layout: Sidebar + content grid
  return (
    <div className="App" style={{ display: "flex", minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Sidebar active={currentScreen} onNavigate={setCurrentScreen} />
      <div className="main-layout" style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <TopBar
          onAction={handleTopBarAction}
          currentScreen={currentScreen}
        />
        <div style={{ flex: 1, width: "100%", minHeight: 0, overflow: "auto" }}>
          {currentScreen === "dashboard" && (
            <Dashboard onOpenProject={handleOpenProject} onNewProject={handleNewProject} />
          )}
          {currentScreen === "templates" && (
            <TemplateGallery onSelectTemplate={handleSelectTemplate} />
          )}
          {currentScreen === "editor" && (
            <Editor project={currentProject} onExport={format => setModals(m => ({ ...m, export: true }))} />
          )}
        </div>
        {/* Theme toggle in bottom-right */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          style={{
            position: "fixed",
            bottom: 18,
            right: 26,
            zIndex: 3000,
            background: "var(--sidebar, #232528)",
            color: "var(--accent, #fdcb6e)",
            fontSize: "1.1em"
          }}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
      <AuthModal open={modals.auth} onClose={handleCloseModals} />
      <ExportModal
        open={modals.export}
        onClose={handleCloseModals}
        onExport={handleExport}
      />
      <ProjectSettingsModal
        open={modals.projectSettings}
        onClose={handleCloseModals}
      />
    </div>
  );
}

// App wraps all with AuthProvider
function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
