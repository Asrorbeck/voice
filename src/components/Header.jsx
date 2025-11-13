"use client";

import { Menu, Globe, Moon, Sun } from "lucide-react";

const translations = {
  uz: {
    title: "O'zbekiston Respublikasi Markaziy Banki",
  },
  uzc: {
    title: "Ўзбекистон Республикаси Марказий Банки",
  },
  ru: {
    title: "Центральный Банк Республики Узбекистан",
  },
};

export default function Header({
  language,
  setLanguage,
  theme,
  setTheme,
  onMenuClick,
}) {
  const t = translations[language] || translations.uz;

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
        >
          <Menu size={22} className="text-slate-600 dark:text-slate-400" />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {t.title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Internal Administration System
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <div className="flex items-center gap-1 px-2 py-1 bg-slate-50 dark:bg-slate-800 rounded-md">
          <Globe
            size={16}
            className="text-slate-500 dark:text-slate-400 mr-2"
          />
          <button
            onClick={() => setLanguage("uz")}
            className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
              language === "uz"
                ? "bg-slate-700 dark:bg-slate-600 text-white"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            O'zb
          </button>
          <button
            onClick={() => setLanguage("uzc")}
            className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
              language === "uzc"
                ? "bg-slate-700 dark:bg-slate-600 text-white"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            Ўзб
          </button>
          <button
            onClick={() => setLanguage("ru")}
            className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
              language === "ru"
                ? "bg-slate-700 dark:bg-slate-600 text-white"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            Рус
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          title={
            theme === "light" ? "Switch to dark mode" : "Switch to light mode"
          }
        >
          {theme === "light" ? (
            <Moon size={18} className="text-slate-600 dark:text-slate-400" />
          ) : (
            <Sun size={18} className="text-slate-400" />
          )}
        </button>
      </div>
    </header>
  );
}
