"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom"; // <-- Vite-friendly

const navigationLinks = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/view/PatientManagement", label: "Patient Management", icon: "📁" },
  // { href: "/FMS-Assessments", label: "FMS Assessments", icon: "⚙️" },
];

function Sidebar() {
  const location = useLocation(); 
  const pathname = location.pathname;

  return (
    <div className="w-64 h-screen bg-card border-r border-border flex flex-col">
      {/* Logo and Title Section */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/generic-company-logo.png" alt="Logo" />
            <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
              MA
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-lg text-foreground">My App</h1>
            <p className="text-sm text-muted-foreground">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === link.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
