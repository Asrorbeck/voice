"use client"

import { LayoutDashboard, Upload, FileText, Archive, Users, Settings } from "lucide-react"

const translations = {
  uz: {
    dashboard: "Bosh sahifa",
    upload: "Video yuklash",
    letter: "Xat generatori",
    archive: "Hujjatlar arxivi",
    users: "Foydalanuvchilar",
    settings: "Sozlamalar",
  },
  uzc: {
    dashboard: "Бош сахифа",
    upload: "Видео юклаш",
    letter: "Хат генератори",
    archive: "Ҳужжатлар архиви",
    users: "Фойдаланувчилар",
    settings: "Созламалар",
  },
  ru: {
    dashboard: "Главная",
    upload: "Загрузка видео",
    letter: "Генератор писем",
    archive: "Архив документов",
    users: "Пользователи",
    settings: "Настройки",
  },
}

const menuItems = [
  { id: "dashboard", icon: LayoutDashboard, key: "dashboard" },
  { id: "upload", icon: Upload, key: "upload" },
  { id: "letter", icon: FileText, key: "letter" },
  { id: "archive", icon: Archive, key: "archive" },
  { id: "users", icon: Users, key: "users" },
  { id: "settings", icon: Settings, key: "settings" },
]

export default function Sidebar({ language, sidebarOpen, onNavigate, currentPage }) {
  const t = translations[language]

  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-slate-900 dark:bg-slate-950 text-white transition-all duration-300 flex flex-col border-r border-slate-800`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-center">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-bold text-lg">
          CB
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-blue-600 text-white border-l-4 border-blue-400"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{t[item.key]}</span>}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-400 text-center">
        {sidebarOpen && <p>v1.0.0</p>}
      </div>
    </aside>
  )
}
