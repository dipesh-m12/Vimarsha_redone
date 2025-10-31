"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Home, Search, Plus, MessageCircle, Compass, Menu } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/explore", icon: Search, label: "Explore" },
    { href: "/create", icon: Plus, label: "Create" },
    { href: "/messages", icon: MessageCircle, label: "Messages" },
    { href: "/notifications", icon: Heart, label: "Notifications" },
    { href: "/profile", icon: Compass, label: "Profile" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-64 border-r border-border bg-card flex-col p-4">
        <div className="text-2xl font-bold mb-8 text-foreground">Instagram</div>
        <div className="flex flex-col gap-4 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                isActive(item.href) ? "bg-muted text-foreground font-semibold" : "text-foreground hover:bg-muted"
              }`}
            >
              <item.icon size={24} />
              <span className="text-lg">{item.label}</span>
            </Link>
          ))}
        </div>
        <div className="border-t border-border pt-4">
          <Button variant="outline" className="w-full justify-start gap-4 bg-transparent">
            <Menu size={24} />
            <span>More</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex justify-center py-3 transition-colors ${
                isActive(item.href) ? "border-t-2 border-primary text-primary" : "text-foreground"
              }`}
            >
              <item.icon size={24} />
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile - Add padding to body when nav is visible */}
      <div className="md:hidden h-16" />
    </>
  )
}
