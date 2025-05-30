
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ChartLine,
  Settings,
  User,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Analytics", href: "/analytics", icon: ChartLine },
  { name: "Workflows", href: "/workflows", icon: Settings },
  { name: "Profile", href: "/profile", icon: User },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useTheme();
  const location = useLocation();

  const SidebarContent = () => (
    <div className="flex h-full flex-col glass-card border-0 rounded-none lg:rounded-2xl m-0 lg:m-4">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-6 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex-shrink-0" />
          {!sidebarCollapsed && (
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
              DataVision
            </span>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="hover:bg-white/10 flex-shrink-0 text-foreground"
        >
          {sidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
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
              className={cn(
                "flex items-center space-x-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-foreground border border-blue-500/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/10",
                sidebarCollapsed && "justify-center"
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", sidebarCollapsed ? "" : "mr-0")} />
              {!sidebarCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-border p-4">
        <div className={cn("flex items-center space-x-3", sidebarCollapsed && "justify-center")}>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 flex-shrink-0" />
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "hidden lg:flex lg:flex-col transition-all duration-300 flex-shrink-0",
        sidebarCollapsed ? "lg:w-20" : "lg:w-64"
      )}
    >
      <SidebarContent />
    </div>
  );
}
