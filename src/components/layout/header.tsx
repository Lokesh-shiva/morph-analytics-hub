
import { Search, User, Moon, Sun } from "lucide-react";
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
        <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, John Doe</p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search analytics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`pl-10 w-80 bg-background/50 border-border text-foreground placeholder:text-muted-foreground transition-all duration-200 ${
              isSearchFocused ? 'bg-background/80 border-primary/40' : 'hover:bg-background/70'
            }`}
          />
        </form>

        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="hover:bg-white/10 text-foreground p-2"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? 
            <Sun className="h-5 w-5 text-yellow-400" /> : 
            <Moon className="h-5 w-5 text-blue-600" />
          }
        </Button>

        {/* Notifications */}
        <NotificationsDropdown />

        {/* Profile */}
        <Button variant="ghost" size="sm" className="hover:bg-white/10 text-foreground">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </GlassCard>
  );
}
