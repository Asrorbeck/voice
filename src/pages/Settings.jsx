"use client"

import { useState } from "react"
import { Moon, Sun, Globe, RotateCcw } from "lucide-react"

const translations = {
  uz: {
    title: "Sozlamalar",
    language: "Til",
    theme: "Mavzu",
    light: "Yorug'",
    dark: "Qorong'u",
    profile: "Profil ma'lumotlari",
    cache: "Keshni tozalash",
    clearCache: "Keshni tozalash",
    cacheCleared: "Kesh tozalandi",
  },
  uzc: {
    title: "Созламалар",
    language: "Тил",
    theme: "Мавзу",
    light: "Ёруғ",
    dark: "Қоронғу",
    profile: "Профил маълумотлари",
    cache: "Кешни тозалаш",
    clearCache: "Кешни тозалаш",
    cacheCleared: "Кеш тозаланди",
  },
  ru: {
    title: "Настройки",
    language: "Язык",
    theme: "Тема",
    light: "Светлая",
    dark: "Темная",
    profile: "Информация профиля",
    cache: "Очистить кэш",
    clearCache: "Очистить кэш",
    cacheCleared: "Кэш очищен",
  },
}

export default function Settings({ language, setLanguage, theme, setTheme }) {
  const [cacheCleared, setCacheCleared] = useState(false)
  const t = translations[language]

  const handleClearCache = () => {
    localStorage.clear()
    setCacheCleared(true)
    setTimeout(() => setCacheCleared(false), 3000)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t.title}</h1>

      {/* Language Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe size={24} className="text-blue-600 dark:text-blue-400" />
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{t.language}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Select your preferred language</p>
            </div>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="uz">Ўзбек (Latin)</option>
            <option value="uzc">Ўзбек (Кирилл)</option>
            <option value="ru">Русский</option>
          </select>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === "light" ? (
              <Sun size={24} className="text-amber-600" />
            ) : (
              <Moon size={24} className="text-blue-400" />
            )}
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{t.theme}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Choose your preferred theme</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTheme("light")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                theme === "light"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              {t.light}
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                theme === "dark"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              {t.dark}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t.profile}</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-400">Name</label>
            <p className="text-slate-900 dark:text-white font-medium">Administrator</p>
          </div>
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-400">Email</label>
            <p className="text-slate-900 dark:text-white font-medium">admin@centralbank.uz</p>
          </div>
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-400">Role</label>
            <p className="text-slate-900 dark:text-white font-medium">System Administrator</p>
          </div>
        </div>
      </div>

      {/* Cache Management */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RotateCcw size={24} className="text-slate-600 dark:text-slate-400" />
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">{t.cache}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Clear cached data and reset settings</p>
            </div>
          </div>
          <button
            onClick={handleClearCache}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition"
          >
            {t.clearCache}
          </button>
        </div>
        {cacheCleared && (
          <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm">
            {t.cacheCleared}
          </div>
        )}
      </div>
    </div>
  )
}
