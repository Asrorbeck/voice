"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/Sidebar"
import Header from "@/components/Header"
import Dashboard from "@/components/pages/Dashboard"
import VideoUpload from "@/components/pages/VideoUpload"
import LetterGenerator from "@/components/pages/LetterGenerator"
import DocumentsArchive from "@/components/pages/DocumentsArchive"
import UserManagement from "@/components/pages/UserManagement"
import Settings from "@/components/pages/Settings"
import { usePathname } from "next/navigation"

export default function Home() {
  const [language, setLanguage] = useState("uz")
  const [theme, setTheme] = useState("light")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState("dashboard")
  const pathname = usePathname()

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "uz"
    const savedTheme = localStorage.getItem("theme") || "light"
    setLanguage(savedLanguage)
    setTheme(savedTheme)
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  useEffect(() => {
    localStorage.setItem("theme", theme)
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard language={language} />
      case "upload":
        return <VideoUpload language={language} />
      case "letter":
        return <LetterGenerator language={language} />
      case "archive":
        return <DocumentsArchive language={language} />
      case "users":
        return <UserManagement language={language} />
      case "settings":
        return <Settings language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} />
      default:
        return <Dashboard language={language} />
    }
  }

  return (
    <div className="flex h-screen bg-white dark:bg-slate-950">
      <Sidebar language={language} sidebarOpen={sidebarOpen} onNavigate={setCurrentPage} currentPage={currentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900">
          <div className="p-8">{renderPage()}</div>
        </main>
      </div>
    </div>
  )
}
