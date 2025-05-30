
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";

export function Header() {
  return (
    <GlassCard className="flex items-center justify-between p-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
        <p className="text-white/60">Welcome back, John Doe</p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
          <Input
            placeholder="Search..."
            className="pl-10 w-80 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative hover:bg-white/10">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 animate-pulse" />
        </Button>

        {/* Profile */}
        <Button variant="ghost" size="sm" className="hover:bg-white/10">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </GlassCard>
  );
}
