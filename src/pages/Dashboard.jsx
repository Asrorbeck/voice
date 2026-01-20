import { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  Download,
  Play,
  CheckCircle,
  Maximize2,
  Minimize2,
  X,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";
import jsPDF from "jspdf";

// API Configuration
const API_CONFIG = {
  baseURL: "https://sst.xazna.uz",
  endpoint: "/api/stt/generate/",
  token: "adfc77c2-ccfe-4a06-9183-bacd4d43515e",
  csrfToken: "uGi9pwjhMUkyksrDMexNUEKUbpx3NJvTN9ArMgDh1exM57UU2MJemwRe9IwyyDuM",
};

const translations = {
  uz: {
    title: "Video Yuklash va Transkripsiya",
    subtitle: "Yig'ilish yozuvlarini yuklang va rasmiy xatlar yarating",
    uploadArea: "Video faylni bu yerga sudrab olib keling yoki tanlang",
    selectFile: "Fayl tanlash",
    supportedFormats:
      "Qo'llab-quvvatlanadigan formatlar: MP4, MOV, AVI, WAV, MP3",
    recentActivity: "So'nggi faoliyat",
    videoProcessed: "Video qayta ishlandi",
    letterExported: "Xat eksport qilindi",
    generateLetter: "Xat yaratish",
    downloadTranscript: "Transkriptni yuklab olish",
    processing: "Video qayta ishlanmoqda...",
    generatingTranscript: "Transkript yaratilmoqda...",
    generatingLetter: "Xat yaratilmoqda...",
    letterGenerated: "Xat muvaffaqiyatli yaratildi!",
    downloadLetter: "Xatni yuklab olish",
    letterPreview: "Xat ko'rinishi",
    letterContent: "Xat matni",
    uploadError: "Fayl yuklashda xatolik yuz berdi",
    transcriptionError: "Transkripsiya yaratishda xatolik yuz berdi",
  },
  uzc: {
    title: "Видео Юклаш ва Транскрипсия",
    subtitle: "Йиғилиш ёзувларини юкланг ва расмий хатлар яратинг",
    uploadArea: "Видео файлни бу ерга судраб олиб келинг ёки танланг",
    selectFile: "Файл танлаш",
    supportedFormats:
      "Қўллаб-қувватланадиган форматлар: MP4, MOV, AVI, WAV, MP3",
    recentActivity: "Сўнгги фаолият",
    videoProcessed: "Видео қайта ишланди",
    letterExported: "Хат экспорт қилинди",
    generateLetter: "Хат яратиш",
    downloadTranscript: "Транскриптни юклаб олиш",
    processing: "Видео қайта ишланмоқда...",
    generatingTranscript: "Транскрипт яратилмоқда...",
    generatingLetter: "Хат яратилмоқда...",
    letterGenerated: "Хат муваффақиятли яратилди!",
    downloadLetter: "Хатни юклаб олиш",
    letterPreview: "Хат кўриниши",
    letterContent: "Хат матни",
    uploadError: "Файл юклашда хатолик юз берди",
    transcriptionError: "Транскрипсия яратишда хатолик юз берди",
  },
  ru: {
    title: "Загрузка видео и транскрипция",
    subtitle: "Загружайте записи совещаний и создавайте официальные письма",
    uploadArea: "Перетащите видео файл сюда или выберите файл",
    selectFile: "Выбрать файл",
    supportedFormats: "Поддерживаемые форматы: MP4, MOV, AVI, WAV, MP3",
    recentActivity: "Недавняя активность",
    videoProcessed: "Видео обработано",
    letterExported: "Письмо экспортировано",
    generateLetter: "Создать письмо",
    downloadTranscript: "Скачать транскрипт",
    processing: "Видео обрабатывается...",
    generatingTranscript: "Создается транскрипт...",
    generatingLetter: "Создается письмо...",
    letterGenerated: "Письмо успешно создано!",
    downloadLetter: "Скачать письмо",
    letterPreview: "Предварительный просмотр письма",
    letterContent: "Содержание письма",
    uploadError: "Ошибка при загрузке файла",
    transcriptionError: "Ошибка при создании транскрипции",
  },
};

export default function Dashboard({ language, setActivities }) {
  const t = translations[language] || translations.uz;
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingTranscript, setIsGeneratingTranscript] = useState(false);
  const [isGeneratingLetter, setIsGeneratingLetter] = useState(false);
  const [letterGenerated, setLetterGenerated] = useState(false);
  const [letterContent, setLetterContent] = useState("");
  const [processingProgress, setProcessingProgress] = useState(0);
  const [transcriptProgress, setTranscriptProgress] = useState(0);
  const [letterProgress, setLetterProgress] = useState(0);
  const [toastShown, setToastShown] = useState(false);
  const [transcriptFullscreen, setTranscriptFullscreen] = useState(false);
  const [letterFullscreen, setLetterFullscreen] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    setUploadedFile(file);
    setIsProcessing(true);
    setProcessingProgress(0);
    // Clear previous transcript and letter data
    setTranscript("");
    setLetterContent("");
    setLetterGenerated(false);
    setIsGeneratingLetter(false);
    setLetterProgress(0);

    try {
      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 90) {
            clearInterval(uploadInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Create FormData for the API request
      const formData = new FormData();
      formData.append("audio_file", file);

      // Make API request to backend
      setIsGeneratingTranscript(true);
      setTranscriptProgress(0);

      const response = await fetch(
        "http://79.116.177.128:55701/api/v1/transcribe_call?is_stereo=false&word_timestamps=false",
        {
          method: "POST",
          // Let the browser set the multipart boundary automatically
          body: formData,
        }
      );

      clearInterval(uploadInterval);
      setProcessingProgress(100);
      setIsProcessing(false);

      if (!response.ok) {
        console.log(response);
        throw new Error("Transkripsiya xatosi");
      }

      const data = await response.json();

      // Update transcript progress
      setTranscriptProgress(100);
      setIsGeneratingTranscript(false);

      if (data.text) {
        setTranscript(data.text);
        toast.success("Transkript muvaffaqiyatli yaratildi!");

        // Add activity to recent activities
        const newActivity = {
          id: Date.now(),
          type: "video",
          message: `${file.name} transkripsiya qilindi`,
          time: new Date().toLocaleString("uz-UZ"),
        };
        setActivities((prev) => [newActivity, ...prev].slice(0, 10)); // Keep only last 10

        // Save transcript to archived documents
        try {
          const archivedDocs = JSON.parse(
            localStorage.getItem("archivedDocuments") || "[]"
          );
          const newDoc = {
            id: Date.now(),
            title: `${file.name.replace(/\.[^/.]+$/, "")} - Transkript`,
            date: new Date().toISOString().split("T")[0],
            type: "Transkript",
            author: "System",
            content: data.text,
            fileName: file.name,
          };
          archivedDocs.unshift(newDoc);
          localStorage.setItem(
            "archivedDocuments",
            JSON.stringify(archivedDocs.slice(0, 50))
          ); // Keep last 50
        } catch (error) {
          console.error("Failed to save transcript to archive:", error);
        }
      } else {
        throw new Error("Javobda matn topilmadi");
      }
    } catch (error) {
      console.error("Transkripsiya xatosi:", error);
      setIsProcessing(false);
      setIsGeneratingTranscript(false);

      // Check if it's a CORS error
      if (
        error instanceof TypeError &&
        error.message.includes("Failed to fetch")
      ) {
        toast.error(
          "CORS xatosi: Backend server localhost ni qo'llab-quvvatlamaydi. Backend admin bilan bog'laning!"
        );
      } else {
        toast.error(t.transcriptionError);
      }
    }
  };

  const handleGenerateLetter = () => {
    setIsGeneratingLetter(true);
    setLetterProgress(0);
    setToastShown(false);

    // Simulate letter generation with progress
    const letterInterval = setInterval(() => {
      setLetterProgress((prev) => {
        if (prev >= 100) {
          clearInterval(letterInterval);
          setIsGeneratingLetter(false);
          setLetterGenerated(true);
          setLetterContent(`O'ZBEKISTON RESPUBLIKASI MARKAZIY BANKI

RASMIY XAT

Sana: ${new Date().toLocaleDateString("uz-UZ")}

Hurmatli rahbarlar,

Yuqorida ko'rsatilgan yig'ilish transkripti asosida quyidagi rasmiy xat tayyorlandi:

${transcript}

Bu xat Central Bank of Uzbekistan tomonidan avtomatik ravishda yaratilgan va rasmiy hujjat sifatida ishlatilishi mumkin.

Hurmat bilan,
Central Bank of Uzbekistan
Internal Administration System`);

          if (!toastShown) {
            toast.success(t.letterGenerated);
            setToastShown(true);

            // Add activity for letter generation
            const newActivity = {
              id: Date.now(),
              type: "letter",
              message: "Rasmiy xat yaratildi",
              time: new Date().toLocaleString("uz-UZ"),
            };
            setActivities((prev) => [newActivity, ...prev].slice(0, 10));

            // Save letter to archived documents
            try {
              const archivedDocs = JSON.parse(
                localStorage.getItem("archivedDocuments") || "[]"
              );
              const letterContentToSave = `O'ZBEKISTON RESPUBLIKASI MARKAZIY BANKI

RASMIY XAT

Sana: ${new Date().toLocaleDateString("uz-UZ")}

Hurmatli rahbarlar,

Yuqorida ko'rsatilgan yig'ilish transkripti asosida quyidagi rasmiy xat tayyorlandi:

${transcript}

Bu xat Central Bank of Uzbekistan tomonidan avtomatik ravishda yaratilgan va rasmiy hujjat sifatida ishlatilishi mumkin.

Hurmat bilan,
Central Bank of Uzbekistan
Internal Administration System`;

              const newDoc = {
                id: Date.now(),
                title: `Rasmiy Xat - ${new Date().toLocaleDateString("uz-UZ")}`,
                date: new Date().toISOString().split("T")[0],
                type: "Rasmiy Xat",
                author: "System",
                content: letterContentToSave,
              };
              archivedDocs.unshift(newDoc);
              localStorage.setItem(
                "archivedDocuments",
                JSON.stringify(archivedDocs.slice(0, 50))
              ); // Keep last 50
            } catch (error) {
              console.error("Failed to save letter to archive:", error);
            }
          }
          return prev;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Set font and add content
    doc.setFontSize(12);
    doc.text(letterContent, 20, 20, { maxWidth: 170 });

    // Save the PDF
    doc.save(`xat_${new Date().toISOString().split("T")[0]}.pdf`);
    toast.success("PDF fayl yuklab olindi!");

    // Add activity
    const newActivity = {
      id: Date.now(),
      type: "letter",
      message: "PDF fayl yuklab olindi",
      time: new Date().toLocaleString("uz-UZ"),
    };
    setActivities((prev) => [newActivity, ...prev].slice(0, 10));
  };

  const handleDownloadWord = () => {
    const element = document.createElement("a");
    const file = new Blob([letterContent], { type: "application/msword" });
    element.href = URL.createObjectURL(file);
    element.download = `xat_${new Date().toISOString().split("T")[0]}.doc`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Word fayl yuklab olindi!");

    // Add activity
    const newActivity = {
      id: Date.now(),
      type: "letter",
      message: "Word fayl yuklab olindi",
      time: new Date().toLocaleString("uz-UZ"),
    };
    setActivities((prev) => [newActivity, ...prev].slice(0, 10));
  };

  const handleDownloadTranscript = () => {
    const element = document.createElement("a");
    const file = new Blob([transcript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `transkript_${
      new Date().toISOString().split("T")[0]
    }.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Transkript yuklab olindi!");
  };

  const handleRereadTranscript = async () => {
    if (!uploadedFile) {
      toast.error("Fayl topilmadi!");
      return;
    }

    setIsGeneratingTranscript(true);
    setTranscriptProgress(0);

    try {
      // Create FormData for the API request
      const formData = new FormData();
      formData.append("audio_file", uploadedFile);

      // Make API request to backend
      const response = await fetch(
        "http://79.116.177.128:55701/api/v1/transcribe_call?is_stereo=false&word_timestamps=false",
        {
          method: "POST",
          // Let the browser set the multipart boundary automatically
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Transkripsiya xatosi");
      }

      const data = await response.json();

      // Update transcript progress
      setTranscriptProgress(100);
      setIsGeneratingTranscript(false);

      if (data.text) {
        setTranscript(data.text);
        toast.success("Transkript qayta o'qildi!");
      } else {
        throw new Error("Javobda matn topilmadi");
      }
    } catch (error) {
      console.error("Transkripsiya xatosi:", error);
      setIsGeneratingTranscript(false);
      toast.error(t.transcriptionError);
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

      {/* Video Upload Section */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 shadow-sm">
        <div className="text-center">
          <div
            className={`border-2 border-dashed rounded-lg p-12 transition-colors ${
              dragActive
                ? "border-slate-400 bg-slate-50 dark:bg-slate-700"
                : "border-slate-300 dark:border-slate-600"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {isProcessing ? (
              <div className="flex flex-col items-center">
                <Upload
                  size={48}
                  className="text-slate-400 dark:text-slate-500 mb-4"
                />
                <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t.processing}
                </h3>
                <div className="w-full max-w-xs">
                  <div className="bg-slate-200 dark:bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-slate-600 dark:bg-slate-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${processingProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 text-center">
                    {processingProgress}%
                  </p>
                  <div className="flex justify-center mt-3">
                    <div className="w-6 h-6 border-2 border-slate-300 dark:border-slate-600 border-t-slate-600 dark:border-t-slate-400 rounded-full animate-spin"></div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Upload
                  size={48}
                  className="mx-auto text-slate-400 dark:text-slate-500 mb-4"
                />
                <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t.uploadArea}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                  {t.supportedFormats}
                </p>
                <label className="inline-flex items-center px-6 py-3 bg-slate-700 dark:bg-slate-600 text-white rounded-md hover:bg-slate-800 dark:hover:bg-slate-500 transition-colors cursor-pointer">
                  <FileText size={20} className="mr-2" />
                  {t.selectFile}
                  <input
                    type="file"
                    accept="video/*,audio/*,.mp4,.mov,.avi,.wav,.mp3,.m4a"
                    onChange={handleFileInput}
                    className="hidden"
                    disabled={isProcessing}
                  />
                </label>
              </>
            )}
          </div>

          {uploadedFile && (
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Play
                  size={20}
                  className="text-slate-600 dark:text-slate-400"
                />
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {uploadedFile.name}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>

              {isGeneratingTranscript && (
                <div className="space-y-3 p-4 bg-slate-100 dark:bg-slate-600 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText
                      size={20}
                      className="text-slate-600 dark:text-slate-400"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {t.generatingTranscript}
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="bg-slate-200 dark:bg-slate-500 rounded-full h-2">
                      <div
                        className="bg-slate-600 dark:bg-slate-300 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${transcriptProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center">
                      {transcriptProgress}%
                    </p>
                  </div>
                </div>
              )}

              {transcript && !isGeneratingTranscript && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Transkript:
                    </label>
                    <button
                      onClick={() => setTranscriptFullscreen(true)}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                      title="To'liq ekranda ko'rish"
                    >
                      <Maximize2
                        size={16}
                        className="text-slate-600 dark:text-slate-400"
                      />
                    </button>
                  </div>
                  <textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    className="w-full h-32 p-3 border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 resize-none"
                    placeholder="Transkript bu yerda ko'rsatiladi..."
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleGenerateLetter}
                      disabled={isGeneratingLetter}
                      className="px-4 py-2 bg-slate-700 dark:bg-slate-600 text-white rounded-md hover:bg-slate-800 dark:hover:bg-slate-500 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGeneratingLetter ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>{t.generatingLetter}</span>
                        </div>
                      ) : (
                        <>
                          <FileText size={16} />
                          {t.generateLetter}
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleRereadTranscript}
                      disabled={isGeneratingTranscript}
                      className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGeneratingTranscript ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
                          <span>Qayta o'qilmoqda...</span>
                        </div>
                      ) : (
                        <>
                          <RotateCcw size={16} />
                          Qayta o'qish
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleDownloadTranscript}
                      className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                    >
                      <Download size={16} />
                      {t.downloadTranscript}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Letter Preview */}
          {letterGenerated && (
            <div className="mt-6 p-6 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  {t.letterPreview}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setLetterFullscreen(true)}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                    title="To'liq ekranda ko'rish"
                  >
                    <Maximize2
                      size={16}
                      className="text-slate-600 dark:text-slate-400"
                    />
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-600 p-4">
                <textarea
                  value={letterContent}
                  onChange={(e) => setLetterContent(e.target.value)}
                  className="w-full h-60 p-3 border-none bg-transparent text-slate-700 dark:text-slate-300 resize-none focus:outline-none"
                  placeholder="Xat matni bu yerda ko'rsatiladi..."
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleDownloadPDF}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <FileText size={16} />
                  PDF yuklab olish
                </button>
                <button
                  onClick={handleDownloadWord}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <FileText size={16} />
                  Word yuklab olish
                </button>
                <button
                  onClick={() => {
                    setLetterGenerated(false);
                    setLetterContent("");
                    setToastShown(false);
                  }}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Yana xat yaratish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Transcript Modal */}
      {transcriptFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Transkript - To'liq ko'rinish
              </h2>
              <button
                onClick={() => setTranscriptFullscreen(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
              >
                <X size={20} className="text-slate-600 dark:text-slate-400" />
              </button>
            </div>
            <div className="flex-1 p-4">
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                className="w-full h-full p-4 border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 resize-none focus:outline-none"
                placeholder="Transkript bu yerda ko'rsatiladi..."
              />
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex gap-3">
              <button
                onClick={handleDownloadTranscript}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
              >
                <Download size={16} />
                {t.downloadTranscript}
              </button>
              <button
                onClick={() => setTranscriptFullscreen(false)}
                className="px-4 py-2 bg-slate-700 dark:bg-slate-600 text-white rounded-md hover:bg-slate-800 dark:hover:bg-slate-500 transition-colors"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Letter Modal */}
      {letterFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-lg w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Xat ko'rinishi - To'liq ko'rinish
              </h2>
              <button
                onClick={() => setLetterFullscreen(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
              >
                <X size={20} className="text-slate-600 dark:text-slate-400" />
              </button>
            </div>
            <div className="flex-1 p-4">
              <textarea
                value={letterContent}
                onChange={(e) => setLetterContent(e.target.value)}
                className="w-full h-full p-4 border border-slate-200 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 resize-none focus:outline-none"
                placeholder="Xat matni bu yerda ko'rsatiladi..."
              />
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex gap-3">
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <FileText size={16} />
                PDF yuklab olish
              </button>
              <button
                onClick={handleDownloadWord}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FileText size={16} />
                Word yuklab olish
              </button>
              <button
                onClick={() => setLetterFullscreen(false)}
                className="px-4 py-2 bg-slate-700 dark:bg-slate-600 text-white rounded-md hover:bg-slate-800 dark:hover:bg-slate-500 transition-colors"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
