"use client"

import { useState } from "react"
import { Upload, Download, Loader } from "lucide-react"

const translations = {
  uz: {
    title: "Video yuklash va transkriptsiya",
    dragDrop: "Videoni shu yerga torting yoki",
    selectFile: "faylni tanlang",
    supportedFormats: "Qo'llab-quvvatlanadigan formatlar: MP4, MOV",
    uploadBtn: "Yuklash",
    transcribing: "Transkriptsiya qilinmoqda...",
    transcript: "Transkriptsiya",
    generateLetter: "Xat yaratish",
    downloadTranscript: "Transkriptsiyani yuklab olish",
    noFile: "Hech qanday fayl tanlanmagan",
  },
  uzc: {
    title: "Видео юклаш ва транскрипция",
    dragDrop: "Видеони шу ерга торинг ёки",
    selectFile: "файлни танланг",
    supportedFormats: "Қўллаб-қувватланадиган форматлар: MP4, MOV",
    uploadBtn: "Юклаш",
    transcribing: "Транскрипция қилинмоқда...",
    transcript: "Транскрипция",
    generateLetter: "Хат ярату",
    downloadTranscript: "Транскрипцияни юклаб олиш",
    noFile: "Ҳеч қандай файл танланмаган",
  },
  ru: {
    title: "Загрузка видео и транскрипция",
    dragDrop: "Перетащите видео сюда или",
    selectFile: "выберите файл",
    supportedFormats: "Поддерживаемые форматы: MP4, MOV",
    uploadBtn: "Загрузить",
    transcribing: "Транскрибирование...",
    transcript: "Транскрипция",
    generateLetter: "Создать письмо",
    downloadTranscript: "Скачать транскрипцию",
    noFile: "Файл не выбран",
  },
}

export default function VideoUpload({ language }) {
  const [file, setFile] = useState(null)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [transcript, setTranscript] = useState("")
  const t = translations[language]

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.type === "video/mp4" || droppedFile.type === "video/quicktime")) {
      setFile(droppedFile)
    }
  }

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setIsTranscribing(true)
    setTimeout(() => {
      setTranscript(
        `Meeting Transcript - ${file.name}\n\nThis is a sample transcript of the uploaded video. In a real implementation, this would be generated using speech-to-text technology.\n\nParticipants discussed quarterly financial reports, budget allocations, and strategic initiatives for the upcoming fiscal year. Key decisions were made regarding monetary policy adjustments and regulatory compliance measures.`,
      )
      setIsTranscribing(false)
    }, 2000)
  }

  const handleDownloadTranscript = () => {
    const element = document.createElement("a")
    const file = new Blob([transcript], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "transcript.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t.title}</h1>

      {/* Upload Section */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-12 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition"
        >
          <Upload size={48} className="mx-auto text-slate-400 dark:text-slate-500 mb-4" />
          <p className="text-slate-700 dark:text-slate-300 mb-2">
            {t.dragDrop}{" "}
            <label className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">{t.selectFile}</label>
            <input type="file" accept="video/mp4,video/quicktime" onChange={handleFileSelect} className="hidden" />
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t.supportedFormats}</p>
        </div>

        {file && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <span className="font-semibold">Selected:</span> {file.name}
            </p>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || isTranscribing}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
        >
          {isTranscribing ? (
            <>
              <Loader size={20} className="animate-spin" />
              {t.transcribing}
            </>
          ) : (
            t.uploadBtn
          )}
        </button>
      </div>

      {/* Transcript Section */}
      {transcript && (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{t.transcript}</h2>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            className="w-full h-64 p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-4 mt-6">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
              {t.generateLetter}
            </button>
            <button
              onClick={handleDownloadTranscript}
              className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Download size={20} />
              {t.downloadTranscript}
            </button>
          </div>
        </div>
      )}

      {!transcript && !isTranscribing && (
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 text-center">
          <p className="text-slate-500 dark:text-slate-400">{t.noFile}</p>
        </div>
      )}
    </div>
  )
}
