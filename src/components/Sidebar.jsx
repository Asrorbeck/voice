import { useLocation, Link } from "react-router-dom";
import { LayoutDashboard, Archive, Volume2 } from "lucide-react";
// import { Settings } from "lucide-react"; // Commented out - not needed for now

const translations = {
  uz: {
    dashboard: "Bosh sahifa",
    archive: "Hujjatlar arxivi",
    textToSpeech: "Matnni Ovozga Aylantirish",
    // settings: "Sozlamalar", // Commented out - not needed for now
  },
  uzc: {
    dashboard: "Бош сахифа",
    archive: "Ҳужжатлар архиви",
    textToSpeech: "Матнни Овозга Айлантириш",
    // settings: "Созламалар", // Commented out - not needed for now
  },
  ru: {
    dashboard: "Главная",
    archive: "Архив документов",
    textToSpeech: "Текст в речь",
    // settings: "Настройки", // Commented out - not needed for now
  },
};

const menuItems = [
  { path: "/", icon: LayoutDashboard, key: "dashboard" },
  { path: "/text-to-speech", icon: Volume2, key: "textToSpeech" },
  { path: "/archive", icon: Archive, key: "archive" },
  // { path: "/settings", icon: Settings, key: "settings" }, // Commented out - not needed for now
];

export default function Sidebar({ language, sidebarOpen }) {
  const location = useLocation();
  const t = translations[language] || translations.uz;

  return (
    <aside
      className={`${
        sidebarOpen ? "w-72" : "w-20"
      } bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 transition-all duration-300 flex flex-col border-r border-slate-200 dark:border-slate-700 shadow-sm`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-center">
        <div className="w-14 h-14 rounded-md overflow-hidden flex items-center justify-center">
          <img
            src="/logo.png"
            alt="Central Bank Logo"
            className="w-full h-full object-contain"
          />
        </div>
        {sidebarOpen && (
          <div className="ml-4">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
              Markaziy Bank
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ichki Sistemasi
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-l-4 border-slate-600 dark:border-slate-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon size={20} className="flex-shrink-0" />
              {sidebarOpen && (
                <span className="text-sm font-medium">{t[item.key]}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 text-center">
        {sidebarOpen && (
          <div>
            <p className="font-bold">O'zbekiston Respublikasi Markaziy Banki</p>
            <p className="text-xs mt-1">Axborot Texnologiyalari Departamenti</p>
            <p className="text-xs mt-2 opacity-75">Version 0.0.1</p>
          </div>
        )}
      </div>
    </aside>
  );
}
