
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ChartLine,
  Settings,
  User,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: ChartLine },
  { name: "Workflows", href: "/workflows", icon: Settings },
  { name: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const SidebarContent = () => (
    <div className="flex h-full flex-col glass-card border-0 rounded-none md:rounded-2xl m-0 md:m-4">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600" />
          {!collapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              DataVision
            </span>
          )}
        </div>
        
        {/* Desktop toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex hover:bg-white/10"
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Mobile close */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMobileOpen(false)}
          className="md:hidden hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center space-x-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30"
                  : "text-white/70 hover:text-white hover:bg-white/10",
                collapsed && "justify-center"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-white/10 p-4">
        <div className={cn("flex items-center space-x-3", collapsed && "justify-center")}>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-500" />
          {!collapsed && (
            <div>
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-white/60">Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div
        className={cn(
          "hidden md:flex md:flex-col transition-all duration-300",
          collapsed ? "md:w-20" : "md:w-64"
        )}
      >
        <SidebarContent />
      </div>

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-30 md:hidden glass-button"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </>
  );
}
