"use client"

import { Menu, LogOut, Globe, Moon, Sun } from "lucide-react"

const translations = {
  uz: {
    title: "O'zbekiston Markaziy Banki",
    logout: "Chiqish",
    profile: "Profil",
  },
  uzc: {
    title: "Ўзбекистон Марказий Банки",
    logout: "Чиқиш",
    profile: "Профил",
  },
  ru: {
    title: "Центральный Банк Республики Узбекистан",
    logout: "Выход",
    profile: "Профиль",
  },
}

export default function Header({ language, setLanguage, theme, setTheme, onMenuClick }) {
  const t = translations[language]

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition">
          <Menu size={24} className="text-slate-700 dark:text-slate-300" />
        </button>
        <h1 className="text-xl font-semibold text-slate-900 dark:text-white">{t.title}</h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <Globe size={20} className="text-slate-600 dark:text-slate-400" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer focus:outline-none"
          >
            <option value="uz">Ўзбек</option>
            <option value="uzc">Ўзбек (Кирилл)</option>
            <option value="ru">Русский</option>
          </select>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
        >
          {theme === "light" ? (
            <Moon size={20} className="text-slate-600" />
          ) : (
            <Sun size={20} className="text-slate-400" />
          )}
        </button>

        {/* Profile & Logout */}
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-700">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">CB</span>
          </div>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition" title={t.logout}>
            <LogOut size={20} className="text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  )
}
