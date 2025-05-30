
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/ui/glass-card";

interface WorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workflow: any) => void;
}

export function WorkflowModal({ isOpen, onClose, onSave }: WorkflowModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    schedule: "daily",
    enabled: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newWorkflow = {
      id: Date.now().toString(),
      ...formData,
      status: formData.enabled ? "scheduled" : "stopped",
      lastRun: "Never",
      nextRun: formData.enabled ? "In 1 hour" : "Disabled"
    };
    onSave(newWorkflow);
    onClose();
    setFormData({ name: "", description: "", schedule: "daily", enabled: true });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md mx-4">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Create New Workflow</h2>
            <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-white/10">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white/80">Workflow Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 bg-white/10 border-white/20 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-white/80">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 bg-white/10 border-white/20 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="schedule" className="text-white/80">Schedule</Label>
              <select
                id="schedule"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                className="mt-1 w-full rounded-md bg-white/10 border border-white/20 text-white px-3 py-2"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="enabled"
                checked={formData.enabled}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="enabled" className="text-white/80">Enable workflow</Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1 glass-button">
                <Plus className="h-4 w-4 mr-2" />
                Create Workflow
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="glass-button">
                Cancel
              </Button>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
