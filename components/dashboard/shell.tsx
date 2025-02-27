"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  Home,
  BarChart2,
  Settings,
  HelpCircle,
  Menu,
  X,
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  Clock,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Logo } from "@/components/ui/logo"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home, disabled: false },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart2, disabled: true },
  { name: "History", href: "/dashboard/history", icon: Clock, disabled: false },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, disabled: true },
  { name: "Help", href: "/dashboard/help", icon: HelpCircle, disabled: false },
]

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Sidebar */}
      <motion.div
        initial={{ width: sidebarOpen ? 240 : 0 }}
        animate={{ width: sidebarOpen ? 240 : 0 }}
        transition={{ duration: 0.2 }}
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-gray-900 ${
          sidebarOpen ? "border-r border-gray-800" : ""
        }`}
      >
        <div className="flex h-16 items-center px-4">
          <Link href="/dashboard" className="flex items-center">
            <Logo className="w-32 h-8" />
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden">
            <X className="h-6 w-6 text-gray-400" />
          </Button>
        </div>
        <ScrollArea className="flex-1 px-3 py-2">
          <nav className="space-y-1">
            <TooltipProvider>
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.disabled ? "#" : item.href}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isActive ? "bg-gray-800 text-white" : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                        } ${item.disabled ? "cursor-not-allowed opacity-50" : ""}`}
                        onClick={(e) => {
                          if (item.disabled) {
                            e.preventDefault()
                          }
                        }}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                        {item.disabled && <Lock className="ml-auto h-4 w-4" />}
                      </Link>
                    </TooltipTrigger>
                    {item.disabled && (
                      <TooltipContent side="right">
                        <p>Coming soon</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                )
              })}
            </TooltipProvider>
          </nav>
        </ScrollArea>
      </motion.div>

      {/* Main content */}
      <div className={`flex-1 ${sidebarOpen ? "lg:pl-60" : ""}`}>
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-gray-800 bg-gray-900 px-4 shadow-sm">
          {!sidebarOpen && (
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6 text-gray-400" />
            </Button>
          )}
          <div className="flex flex-1 items-center gap-4">
            <div className="flex h-9 w-full max-w-lg items-center gap-2 rounded-full bg-gray-800 px-3">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search..."
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5 text-gray-400" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessageSquare className="h-5 w-5 text-gray-400" />
            </Button>
            <Button variant="ghost" className="flex items-center gap-2 rounded-full">
              <div className="h-6 w-6 rounded-full bg-purple-500" />
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  )
}

