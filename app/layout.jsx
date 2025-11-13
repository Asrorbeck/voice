import "./globals.css"

export const metadata = {
  title: "Central Bank of Uzbekistan - Admin Dashboard",
  description: "Professional admin dashboard for the Central Bank of the Republic of Uzbekistan",
    generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
