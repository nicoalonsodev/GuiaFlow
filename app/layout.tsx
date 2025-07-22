import type React from "react"
import type { Metadata } from "next"
import "./globals.css"


export const metadata: Metadata = {
  title: "Flow IA - Automatización con Inteligencia Artificial",
  description: "Automatiza tu negocio con Flow IA. Empleados virtuales que trabajan 24/7 para hacer crecer tu empresa.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={``}>{children}</body>
    </html>
  )
}
