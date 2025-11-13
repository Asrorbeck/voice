import { Upload, FileText, Volume2 } from "lucide-react";

const translations = {
  uz: {
    recentActivity: "So'nggi faoliyat",
  },
  uzc: {
    recentActivity: "Сўнгги фаолият",
  },
  ru: {
    recentActivity: "Недавняя активность",
  },
};

export default function RecentActivitySidebar({ language, activities }) {
  const t = translations[language] || translations.uz;

  const getIcon = (type) => {
    switch (type) {
      case "video":
        return <Upload size={16} className="text-slate-600 dark:text-slate-400" />;
      case "audio":
        return <Volume2 size={16} className="text-slate-600 dark:text-slate-400" />;
      default:
        return <FileText size={16} className="text-slate-600 dark:text-slate-400" />;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6">
        {t.recentActivity}
      </h2>
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-100 dark:border-slate-600"
            >
              <div className="p-2 bg-slate-100 dark:bg-slate-600 rounded-md flex-shrink-0">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activity.message}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
            Hozircha faoliyat yo'q
          </p>
        )}
      </div>
    </div>
  );
}

