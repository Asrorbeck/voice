import { Users } from "lucide-react"

const translations = {
  uz: {
    title: "Foydalanuvchilar boshqaruvi",
    placeholder: "Bu sahifa kelajakda ishlatiladi",
  },
  uzc: {
    title: "Фойдаланувчилар бошқаруви",
    placeholder: "Бу сахифа кажакда ишлатилади",
  },
  ru: {
    title: "Управление пользователями",
    placeholder: "Эта страница будет использоваться в будущем",
  },
}

export default function UserManagement({ language }) {
  const t = translations[language]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t.title}</h1>
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-12 text-center">
        <Users size={48} className="mx-auto text-slate-400 dark:text-slate-500 mb-4" />
        <p className="text-slate-500 dark:text-slate-400">{t.placeholder}</p>
      </div>
    </div>
  )
}
