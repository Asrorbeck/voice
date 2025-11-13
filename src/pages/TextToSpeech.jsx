import { useState } from "react";
import {
  Volume2,
  Download,
  RefreshCw,
  Loader,
} from "lucide-react";
import toast from "react-hot-toast";

// API Configuration
const TTS_API_CONFIG = {
  baseURL: "https://sst.xazna.uz",
  endpoint: "/api/tts/generate/",
  token: "adfc77c2-ccfe-4a06-9183-bacd4d43515e",
  csrfToken: "uGi9pwjhMUkyksrDMexNUEKUbpx3NJvTN9ArMgDh1exM57UU2MJemwRe9IwyyDuM",
  format: "wav",
};

const translations = {
  uz: {
    title: "Matnni Ovozga Aylantirish",
    subtitle: "Matn kiriting va audio fayl sifatida oling",
    inputLabel: "Matn kiriting",
    inputPlaceholder: "Bu yerga audio qilish uchun matn yozing...",
    generate: "Audio yaratish",
    downloading: "Yuklab olinmoqda...",
    generatingAudio: "Audio yaratilmoqda...",
    audioGenerated: "Audio muvaffaqiyatli yaratildi!",
    audioGenerationError: "Audio yaratishda xatolik yuz berdi",
    downloadAudio: "Audio yuklab olish",
    format: "Format",
    charactersCount: "Belgilar soni",
  },
  uzc: {
    title: "Матнни Овозга Айлантириш",
    subtitle: "Матн киритинг ва аудио файл сифатида олинг",
    inputLabel: "Матн киритинг",
    inputPlaceholder: "Бу ерга аудио қилиш учун матн ёзинг...",
    generate: "Аудио яратиш",
    downloading: "Юклаб олинмоқда...",
    generatingAudio: "Аудио яратилмоқда...",
    audioGenerated: "Аудио муваффақиятли яратилди!",
    audioGenerationError: "Аудио яратишда хатолик юз берди",
    downloadAudio: "Аудио юклаб олиш",
    format: "Формат",
    charactersCount: "Белгилар сони",
  },
  ru: {
    title: "Преобразование текста в речь",
    subtitle: "Введите текст и получите его в виде аудио файла",
    inputLabel: "Введите текст",
    inputPlaceholder: "Введите текст для преобразования в аудио...",
    generate: "Создать аудио",
    downloading: "Загрузка...",
    generatingAudio: "Создание аудио...",
    audioGenerated: "Аудио успешно создано!",
    audioGenerationError: "Ошибка при создании аудио",
    downloadAudio: "Скачать аудио",
    format: "Формат",
    charactersCount: "Количество символов",
  },
};

export default function TextToSpeech({ language, setActivities }) {
  const t = translations[language] || translations.uz;
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleGenerateAudio = async () => {
    if (!text.trim()) {
      toast.error("Iltimos, matn kiriting!");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch(`${TTS_API_CONFIG.baseURL}${TTS_API_CONFIG.endpoint}`, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFTOKEN": TTS_API_CONFIG.csrfToken,
        },
        body: JSON.stringify({
          text: text,
          format: TTS_API_CONFIG.format,
          token: TTS_API_CONFIG.token,
        }),
      });

      if (!response.ok) {
        throw new Error("Audio yaratish xatosi");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      toast.success(t.audioGenerated);
      
      // Add activity for audio generation
      const newActivity = {
        id: Date.now(),
        type: "audio",
        message: `Audio yaratildi (${text.length} belgi)`,
        time: new Date().toLocaleString("uz-UZ"),
      };
      setActivities((prev) => [newActivity, ...prev].slice(0, 10));
    } catch (error) {
      console.error("Audio yaratish xatosi:", error);
      
      // Check if it's a CORS error
      if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        toast.error("CORS xatosi: Backend server localhost ni qo'llab-quvvatlamaydi. Backend admin bilan bog'laning!");
      } else {
        toast.error(t.audioGenerationError);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadAudio = async () => {
    if (!audioUrl) return;

    setIsDownloading(true);

    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `audio_${new Date().toISOString().split("T")[0]}.${TTS_API_CONFIG.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
      toast.success(t.downloadAudio + " muvaffaqiyatli!");
    } catch (error) {
      console.error("Yuklab olish xatosi:", error);
      toast.error("Yuklab olishda xatolik yuz berdi");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleReset = () => {
    setText("");
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
          {t.title}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.subtitle}
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
        <div className="space-y-6">
          {/* Format Selector */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t.format}:
            </label>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md text-sm font-medium">
              WAV
            </span>
          </div>

          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {t.inputLabel}:
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-48 p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={t.inputPlaceholder}
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.charactersCount}: {text.length}
              </p>
            </div>
          </div>

          {/* Audio Player */}
          {audioUrl && (
            <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
              <div className="flex items-center gap-3 mb-3">
                <Volume2
                  size={24}
                  className="text-slate-600 dark:text-slate-400"
                />
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Audio tayyor
                </span>
              </div>
              <audio controls className="w-full">
                <source src={audioUrl} type={`audio/${TTS_API_CONFIG.format}`} />
                Brauzeringiz audio ni qo'llab-quvvatlamaydi.
              </audio>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleGenerateAudio}
              disabled={isGenerating || !text.trim()}
              className="flex-1 px-6 py-3 bg-slate-700 dark:bg-slate-600 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span>{t.generatingAudio}</span>
                </>
              ) : (
                <>
                  <Volume2 size={20} />
                  <span>{t.generate}</span>
                </>
              )}
            </button>

            {audioUrl && (
              <button
                onClick={handleDownloadAudio}
                disabled={isDownloading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    <span>{t.downloading}</span>
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    <span>{t.downloadAudio}</span>
                  </>
                )}
              </button>
            )}

            {audioUrl && (
              <button
                onClick={handleReset}
                className="px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
              >
                <RefreshCw size={20} />
                <span>Yangilash</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

