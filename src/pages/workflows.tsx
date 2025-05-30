
import { Play, Pause, Plus, Settings } from "lucide-react";
import { Header } from "@/components/layout/header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { WorkflowTimeline } from "@/components/workflow/workflow-timeline";

export function Workflows() {
  const workflows = [
    {
      id: "1",
      name: "Daily Data Sync",
      status: "running",
      lastRun: "2 hours ago",
      nextRun: "In 22 hours",
      description: "Automated data synchronization from all sources"
    },
    {
      id: "2",
      name: "Weekly Report Generation",
      status: "scheduled",
      lastRun: "3 days ago",
      nextRun: "In 4 days",
      description: "Generate comprehensive weekly analytics reports"
    },
    {
      id: "3",
      name: "Alert Monitoring",
      status: "running",
      lastRun: "30 minutes ago",
      nextRun: "In 30 minutes",
      description: "Monitor system metrics and send alerts"
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <Header />
      
      {/* Workflow Controls */}
      <GlassCard className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Workflow Management</h2>
          <p className="text-white/60">Automate your data processing pipelines</p>
        </div>
        
        <Button className="glass-button">
          <Plus className="h-4 w-4 mr-2" />
          New Workflow
        </Button>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workflow List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Active Workflows</h3>
          
          {workflows.map((workflow) => (
            <GlassCard key={workflow.id} hover className="transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    workflow.status === 'running' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                  }`} />
                  <h4 className="font-semibold text-white">{workflow.name}</h4>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" className="hover:bg-white/10">
                    {workflow.status === 'running' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button size="sm" variant="ghost" className="hover:bg-white/10">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-white/70 text-sm mb-3">{workflow.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60">Last Run:</span>
                  <div className="text-white">{workflow.lastRun}</div>
                </div>
                <div>
                  <span className="text-white/60">Next Run:</span>
                  <div className="text-white">{workflow.nextRun}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Timeline */}
        <WorkflowTimeline />
      </div>
    </div>
  );
}
