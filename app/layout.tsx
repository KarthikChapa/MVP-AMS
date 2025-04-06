import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { MockDataProvider } from "@/lib/context/mock-data-context"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Athlete Management Platform",
  description: "Advanced athlete lifecycle platform",
  generator: 'Karthikch.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Making it client-side to avoid hydration issues
  // Fixed value instead of relying on cookie
  const defaultOpen = true

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <MockDataProvider>
            <SidebarProvider defaultOpen={defaultOpen}>
              <div className="flex h-screen w-full">
                <AppSidebar />
                <main className="flex-1 overflow-auto w-full">{children}</main>
              </div>
            </SidebarProvider>
          </MockDataProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}