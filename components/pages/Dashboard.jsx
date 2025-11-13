"use client"

import { TrendingUp, FileText, Clock, BarChart3, Upload } from "lucide-react"

const translations = {
  uz: {
    title: "Bosh sahifa",
    totalVideos: "Jami videolar",
    totalLetters: "Jami xatlar",
    pending: "Kutilayotgan",
    recentActivity: "So'nggi faoliyat",
    videoProcessed: "Video qayta ishlandi",
    letterExported: "Xat eksport qilindi",
  },
  uzc: {
    title: "Бош сахифа",
    totalVideos: "Жами видеолар",
    totalLetters: "Жами хатлар",
    pending: "Кутилаётган",
    recentActivity: "Сўнгги фаолият",
    videoProcessed: "Видео қайта ишланди",
    letterExported: "Хат экспорт қилинди",
  },
  ru: {
    title: "Главная",
    totalVideos: "Всего видео",
    totalLetters: "Всего писем",
    pending: "В ожидании",
    recentActivity: "Недавняя активность",
    videoProcessed: "Видео обработано",
    letterExported: "Письмо экспортировано",
  },
}

const chartData = [
  { month: "Янв", videos: 12, letters: 8 },
  { month: "Фев", videos: 19, letters: 14 },
  { month: "Мар", videos: 15, letters: 11 },
  { month: "Апр", videos: 22, letters: 18 },
  { month: "Май", videos: 28, letters: 24 },
  { month: "Июн", videos: 35, letters: 31 },
]

const recentActivities = [
  { id: 1, type: "video", message: "Meeting_2024_06_15.mp4 processed", time: "2 hours ago" },
  { id: 2, type: "letter", message: "Official Report exported as PDF", time: "4 hours ago" },
  { id: 3, type: "video", message: "Board_Meeting_Q2.mp4 uploaded", time: "1 day ago" },
  { id: 4, type: "letter", message: "Financial Summary letter generated", time: "2 days ago" },
]

function SimpleChart({ data }) {
  const maxValue = Math.max(...data.flatMap((d) => [d.videos, d.letters]))
  const chartHeight = 250
  const barWidth = 40
  const spacing = 20

  return (
    <svg
      width="100%"
      height={chartHeight}
      viewBox={`0 0 ${data.length * (barWidth * 2 + spacing) + 40} ${chartHeight}`}
      className="w-full"
    >
      {data.map((item, idx) => {
        const x = idx * (barWidth * 2 + spacing) + 20
        const videoHeight = (item.videos / maxValue) * 200
        const letterHeight = (item.letters / maxValue) * 200

        return (
          <g key={idx}>
            {/* Video bar */}
            <rect x={x} y={220 - videoHeight} width={barWidth - 5} height={videoHeight} fill="#2563eb" rx="4" />
            {/* Letter bar */}
            <rect
              x={x + barWidth}
              y={220 - letterHeight}
              width={barWidth - 5}
              height={letterHeight}
              fill="#d97706"
              rx="4"
            />
            {/* Month label */}
            <text x={x + barWidth - 2} y={240} fontSize="12" fill="#64748b" textAnchor="middle">
              {item.month}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function Dashboard({ language }) {
  const t = translations[language]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t.title}</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{t.totalVideos}</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">156</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <TrendingUp size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{t.totalLetters}</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">89</p>
            </div>
            <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-lg">
              <FileText size={24} className="text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">{t.pending}</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">12</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Clock size={24} className="text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <BarChart3 size={20} />
          Statistics
        </h2>
        <SimpleChart data={chartData} />
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">{t.recentActivity}</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    activity.type === "video" ? "bg-blue-100 dark:bg-blue-900" : "bg-amber-100 dark:bg-amber-900"
                  }`}
                >
                  {activity.type === "video" ? (
                    <Upload
                      size={16}
                      className={
                        activity.type === "video"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-amber-600 dark:text-amber-400"
                      }
                    />
                  ) : (
                    <FileText
                      size={16}
                      className={
                        activity.type === "video"
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-amber-600 dark:text-amber-400"
                      }
                    />
                  )}
                </div>
                <p className="text-slate-700 dark:text-slate-300">{activity.message}</p>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
