"use client";

import { useState, useEffect } from "react";
import { Search, Download, Trash2, Filter } from "lucide-react";

const translations = {
  uz: {
    title: "Hujjatlar arxivi",
    search: "Qidirish...",
    filter: "Filtr",
    download: "Yuklab olish",
    delete: "O'chirish",
    noDocuments: "Hujjatlar topilmadi",
    date: "Sana",
    type: "Turi",
    author: "Muallif",
  },
  uzc: {
    title: "Ҳужжатлар архиви",
    search: "Қидириш...",
    filter: "Филтр",
    download: "Юклаб олиш",
    delete: "Ўчириш",
    noDocuments: "Ҳужжатлар топилмади",
    date: "Сана",
    type: "Тури",
    author: "Муаллиф",
  },
  ru: {
    title: "Архив документов",
    search: "Поиск...",
    filter: "Фильтр",
    download: "Скачать",
    delete: "Удалить",
    noDocuments: "Документы не найдены",
    date: "Дата",
    type: "Тип",
    author: "Автор",
  },
};

export default function DocumentsArchive({ language }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [documents, setDocuments] = useState(() => {
    try {
      const saved = localStorage.getItem("archivedDocuments");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const t = translations[language];

  // Save documents to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("archivedDocuments", JSON.stringify(documents));
  }, [documents]);

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc.id !== id));
  };

  const handleDownload = (doc) => {
    if (doc.content) {
      const element = document.createElement("a");
      let fileType = "text/plain";
      let extension = ".txt";
      
      // Determine file type based on document type
      if (doc.type === "Rasmiy Xat") {
        fileType = "application/msword";
        extension = ".doc";
      }
      
      const file = new Blob([doc.content], { type: fileType });
      element.href = URL.createObjectURL(file);
      element.download = `${doc.title}${extension}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        {t.title}
      </h1>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-3 text-slate-400"
            />
            <input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg transition flex items-center gap-2">
            <Filter size={20} />
            {t.filter}
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        {filteredDocuments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    {t.date}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    {t.type}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    {t.author}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                  >
                    <td className="px-6 py-4 text-slate-900 dark:text-white">
                      {doc.title}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {doc.date}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {doc.author}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleDownload(doc)}
                        className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition text-blue-600 dark:text-blue-400"
                        title={t.download}
                      >
                        <Download size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition text-red-600 dark:text-red-400"
                        title={t.delete}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-slate-500 dark:text-slate-400">
              {t.noDocuments}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
