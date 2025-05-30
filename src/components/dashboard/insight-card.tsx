
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";

interface InsightCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  priority: "high" | "medium" | "low";
  tags?: string[];
  action?: ReactNode;
}

export function InsightCard({ title, description, icon: Icon, priority, tags, action }: InsightCardProps) {
  const priorityColors = {
    high: "bg-red-500/20 text-red-400 border-red-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    low: "bg-green-500/20 text-green-400 border-green-500/30",
  };

  return (
    <GlassCard hover className="animate-slide-up">
      <div className="flex items-start space-x-4">
        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
          <Icon className="h-5 w-5 text-blue-400" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-white">{title}</h4>
            <Badge variant="outline" className={priorityColors[priority]}>
              {priority}
            </Badge>
          </div>
          
          <p className="text-white/70 text-sm mb-3">{description}</p>
          
          {tags && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/10 text-white/80 hover:bg-white/20">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {action && (
            <div className="mt-3">
              {action}
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
