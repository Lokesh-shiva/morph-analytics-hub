
import { CheckCircle, Clock, AlertCircle, Circle } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "failed" | "pending";
  timestamp?: string;
}

const mockSteps: TimelineStep[] = [
  {
    id: "1",
    title: "Data Collection",
    description: "Gathering data from multiple sources",
    status: "completed",
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    title: "Data Processing",
    description: "Cleaning and transforming data",
    status: "completed",
    timestamp: "1 hour ago"
  },
  {
    id: "3",
    title: "Analysis",
    description: "Running machine learning models",
    status: "in-progress",
    timestamp: "Started 30 min ago"
  },
  {
    id: "4",
    title: "Report Generation",
    description: "Creating insights and visualizations",
    status: "pending"
  },
];

export function WorkflowTimeline() {
  const getStatusIcon = (status: TimelineStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-400 animate-pulse" />;
      case "failed":
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      case "pending":
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: TimelineStep["status"]) => {
    switch (status) {
      case "completed":
        return "border-green-400";
      case "in-progress":
        return "border-blue-400";
      case "failed":
        return "border-red-400";
      case "pending":
        return "border-gray-400";
    }
  };

  return (
    <GlassCard>
      <h3 className="text-lg font-semibold text-white mb-6">Workflow Progress</h3>
      
      <div className="space-y-6">
        {mockSteps.map((step, index) => (
          <div key={step.id} className="flex items-start space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${getStatusColor(step.status)} bg-white/5`}>
              {getStatusIcon(step.status)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-white">{step.title}</h4>
                {step.timestamp && (
                  <span className="text-xs text-white/60">{step.timestamp}</span>
                )}
              </div>
              <p className="text-sm text-white/70 mt-1">{step.description}</p>
              
              {step.status === "in-progress" && (
                <div className="mt-2">
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse w-3/4" />
                  </div>
                </div>
              )}
            </div>
            
            {index < mockSteps.length - 1 && (
              <div className="absolute left-5 mt-10 w-px h-6 bg-white/20" style={{ marginLeft: '20px' }} />
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
