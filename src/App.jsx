"use client";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import RecentActivitySidebar from "./components/RecentActivitySidebar";
import Dashboard from "./pages/Dashboard";
import TextToSpeech from "./pages/TextToSpeech";
import DocumentsArchive from "./pages/DocumentsArchive";
// import Settings from "./pages/Settings"; // Commented out - not needed for now

function AppContent() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "uz";
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [activities, setActivities] = useState(() => {
    try {
      const saved = localStorage.getItem("recentActivities");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Save activities to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("recentActivities", JSON.stringify(activities));
  }, [activities]);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "recentActivities") {
        try {
          setActivities(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          setActivities([]);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Layout
      language={language}
      setLanguage={setLanguage}
      theme={theme}
      setTheme={setTheme}
      rightSidebar={
        <RecentActivitySidebar language={language} activities={activities} />
      }
    >
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard language={language} setActivities={setActivities} />
          }
        />
        <Route
          path="/text-to-speech"
          element={
            <TextToSpeech language={language} setActivities={setActivities} />
          }
        />
        <Route
          path="/archive"
          element={<DocumentsArchive language={language} />}
        />
        {/* Settings route commented out - not needed for now
        <Route
          path="/settings"
          element={
            <Settings
              language={language}
              setLanguage={setLanguage}
              theme={theme}
              setTheme={setTheme}
            />
          }
        />
        */}
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1e293b",
            color: "#f1f5f9",
            border: "1px solid #475569",
          },
        }}
      />
    </Router>
  );
}

export default App;
