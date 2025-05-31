
import { useState } from "react";
import { Play, Pause, Plus, Settings, Trash2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { WorkflowTimeline } from "@/components/workflow/workflow-timeline";
import { WorkflowModal } from "@/components/workflow/workflow-modal";

export function Workflows() {
  const [workflows, setWorkflows] = useState([
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
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleWorkflow = (id: string) => {
    setWorkflows(prev => prev.map(workflow => 
      workflow.id === id 
        ? { 
            ...workflow, 
            status: workflow.status === 'running' ? 'stopped' : 'running',
            nextRun: workflow.status === 'running' ? 'Stopped' : 'In 1 hour'
          }
        : workflow
    ));
  };

  const deleteWorkflow = (id: string) => {
    if (confirm('Are you sure you want to delete this workflow?')) {
      setWorkflows(prev => prev.filter(workflow => workflow.id !== id));
      console.log('Deleted workflow:', id);
    }
  };

  const openSettings = (id: string) => {
    console.log('Opening settings for workflow:', id);
    // Implement settings modal here
  };

  const addWorkflow = (newWorkflow: any) => {
    setWorkflows(prev => [...prev, newWorkflow]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Header />
      
      {/* Workflow Controls */}
      <GlassCard className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Workflow Management</h2>
          <p className="text-muted-foreground">Automate your data processing pipelines</p>
        </div>
        
        <Button className="glass-button-primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Workflow
        </Button>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workflow List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Active Workflows</h3>
          
          {workflows.map((workflow) => (
            <GlassCard key={workflow.id} hover className="transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    workflow.status === 'running' ? 'bg-green-400 animate-pulse' : 
                    workflow.status === 'scheduled' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`} />
                  <h4 className="font-semibold text-foreground">{workflow.name}</h4>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="hover:bg-white/10 text-foreground"
                    onClick={() => toggleWorkflow(workflow.id)}
                  >
                    {workflow.status === 'running' ? 
                      <Pause className="h-4 w-4" /> : 
                      <Play className="h-4 w-4" />
                    }
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="hover:bg-white/10 text-foreground"
                    onClick={() => openSettings(workflow.id)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all duration-200 hover:scale-105"
                    onClick={() => deleteWorkflow(workflow.id)}
                    title="Delete workflow"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-3">{workflow.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Last Run:</span>
                  <div className="text-foreground">{workflow.lastRun}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Next Run:</span>
                  <div className="text-foreground">{workflow.nextRun}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Timeline */}
        <WorkflowTimeline />
      </div>

      <WorkflowModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={addWorkflow}
      />
    </div>
  );
}
