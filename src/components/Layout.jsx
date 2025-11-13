"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({
  children,
  language,
  setLanguage,
  theme,
  setTheme,
  rightSidebar,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar language={language} sidebarOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-950">
            <div className="p-8">{children}</div>
          </main>
          {rightSidebar && (
            <aside className="w-80 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 overflow-auto">
              {rightSidebar}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
