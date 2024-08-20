"use client";

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Bell, Grid, Home, Moon, Search, Settings, Sun, Users, 
  File, Clock, Database, TrendingUp
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isInitialRender, setIsInitialRender] = useState(true)

  useEffect(() => {
    setIsInitialRender(false)
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    // In a real app, you'd apply the theme change here
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: Users, label: 'Team', href: '/team' },
    { icon: File, label: 'Projects', href: '/projects' },
    { icon: Clock, label: 'Time Tracking', href: '/time-tracking' },
    { icon: Database, label: 'Resources', href: '/resources' },
    { icon: TrendingUp, label: 'Analytics', href: '/analytics' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        {isSidebarOpen && (
          <motion.aside
            initial={isInitialRender ? false : { width: 0 }}
            animate={{ width: 240 }}
            exit={{ width: 0 }}
            transition={{ duration: isInitialRender ? 0 : 0.3 }}
            className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
          >
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">TechNexus</h2>
            </div>
            <nav className="mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.aside>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                  <Grid className="h-5 w-5" />
                </Button>
                <div className="ml-4 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-6 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}