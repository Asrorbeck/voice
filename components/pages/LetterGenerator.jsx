"use client"

import { useState } from "react"
import { Download, Eye } from "lucide-react"

const translations = {
  uz: {
    title: "Xat generatori",
    template: "Shablonni tanlang",
    meetingSummary: "Uchrashuvning xulosasi",
    report: "Hisobot",
    financialDiscussion: "Moliyaviy muhokama",
    preview: "Ko'rib chiqish",
    downloadPDF: "PDF sifatida yuklab olish",
    downloadWord: "Word sifatida yuklab olish",
    letterContent: "Xat mazmuni",
  },
  uzc: {
    title: "Хат генератори",
    template: "Шаблонни танланг",
    meetingSummary: "Учрашувнинг хулосаси",
    report: "Ҳисобот",
    financialDiscussion: "Молияавий муҳокама",
    preview: "Кўриб чиқиш",
    downloadPDF: "PDF сифатида юклаб олиш",
    downloadWord: "Word сифатида юклаб олиш",
    letterContent: "Хат мазмуни",
  },
  ru: {
    title: "Генератор писем",
    template: "Выберите шаблон",
    meetingSummary: "Резюме встречи",
    report: "Отчет",
    financialDiscussion: "Финансовое обсуждение",
    preview: "Предпросмотр",
    downloadPDF: "Скачать как PDF",
    downloadWord: "Скачать как Word",
    letterContent: "Содержание письма",
  },
}

const letterTemplates = {
  summary: `OFFICIAL MEETING SUMMARY

Date: [Date]
Participants: [Participants]

AGENDA ITEMS:
1. Opening remarks and approval of previous minutes
2. Financial review and quarterly performance
3. Strategic initiatives and policy updates
4. Risk assessment and compliance measures
5. Closing remarks and next steps

DECISIONS MADE:
- Key monetary policy adjustments approved
- Budget allocations finalized for Q3
- New regulatory compliance framework adopted

ACTION ITEMS:
- Follow-up meetings scheduled for implementation
- Documentation to be prepared by [Date]
- Reports to be submitted to relevant departments

Respectfully submitted,
Central Bank Administration`,

  report: `OFFICIAL REPORT

EXECUTIVE SUMMARY:
This report provides a comprehensive overview of recent activities and performance metrics.

KEY FINDINGS:
- Overall performance metrics show positive trends
- Compliance with regulatory requirements maintained
- Operational efficiency improved by 15%

RECOMMENDATIONS:
1. Continue current strategic initiatives
2. Implement suggested process improvements
3. Schedule quarterly review meetings

CONCLUSION:
The organization continues to meet its objectives and maintain high standards of governance.

Prepared by: [Department]
Date: [Date]`,

  financial: `FINANCIAL DISCUSSION SUMMARY

MEETING DATE: [Date]
PARTICIPANTS: [Participants]

FINANCIAL OVERVIEW:
- Total assets: [Amount]
- Revenue growth: [Percentage]
- Operational expenses: [Amount]

BUDGET ALLOCATION:
- Infrastructure: [Amount]
- Personnel: [Amount]
- Operations: [Amount]
- Reserve: [Amount]

FINANCIAL RECOMMENDATIONS:
1. Optimize resource allocation
2. Implement cost-saving measures
3. Strengthen financial controls

NEXT STEPS:
- Detailed budget review scheduled
- Financial forecasts to be updated
- Stakeholder briefing planned

Respectfully submitted,
Finance Department`,
}

export default function LetterGenerator({ language }) {
  const [template, setTemplate] = useState("summary")
  const [letterContent, setLetterContent] = useState(letterTemplates.summary)
  const [showPreview, setShowPreview] = useState(false)
  const t = translations[language]

  const handleTemplateChange = (newTemplate) => {
    setTemplate(newTemplate)
    setLetterContent(letterTemplates[newTemplate])
  }

  const handleDownloadPDF = () => {
    const element = document.createElement("a")
    const file = new Blob([letterContent], { type: "application/pdf" })
    element.href = URL.createObjectURL(file)
    element.download = "letter.pdf"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleDownloadWord = () => {
    const element = document.createElement("a")
    const file = new Blob([letterContent], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    })
    element.href = URL.createObjectURL(file)
    element.download = "letter.docx"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t.title}</h1>

      {/* Template Selection */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-4">{t.template}</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: "summary", label: t.meetingSummary },
            { id: "report", label: t.report },
            { id: "financial", label: t.financialDiscussion },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleTemplateChange(opt.id)}
              className={`p-4 rounded-lg border-2 transition font-medium ${
                template === opt.id
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                  : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Letter Content */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
        <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-4">{t.letterContent}</label>
        <textarea
          value={letterContent}
          onChange={(e) => setLetterContent(e.target.value)}
          className="w-full h-96 p-4 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
        >
          <Eye size={20} />
          {t.preview}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
        >
          <Download size={20} />
          {t.downloadPDF}
        </button>
        <button
          onClick={handleDownloadWord}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
        >
          <Download size={20} />
          {t.downloadWord}
        </button>
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">{t.preview}</h2>
          <div className="prose dark:prose-invert max-w-none">
            <pre className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg overflow-auto text-sm text-slate-900 dark:text-white whitespace-pre-wrap">
              {letterContent}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
