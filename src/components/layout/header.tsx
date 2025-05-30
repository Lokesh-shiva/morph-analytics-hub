
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import { NotificationsDropdown } from "./notifications-dropdown";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Implement search functionality here
    }
  };

  return (
    <GlassCard className="flex items-center justify-between p-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
        <p className="text-white/60">Welcome back, John Doe</p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
          <Input
            placeholder="Search analytics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`pl-10 w-80 bg-white/10 border-white/20 text-white placeholder:text-white/60 transition-all duration-200 ${
              isSearchFocused ? 'bg-white/20 border-white/40' : 'hover:bg-white/15'
            }`}
          />
        </form>

        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="hover:bg-white/10"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </Button>

        {/* Notifications */}
        <NotificationsDropdown />

        {/* Profile */}
        <Button variant="ghost" size="sm" className="hover:bg-white/10">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </GlassCard>
  );
}
