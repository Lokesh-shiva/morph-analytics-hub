
import { Camera, Mail, MapPin, Calendar } from "lucide-react";
import { Header } from "@/components/layout/header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Profile() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Header />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <GlassCard hover className="text-center">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 mx-auto" />
            <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 glass-button">
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          
          <h3 className="text-xl font-semibold text-white">John Doe</h3>
          <p className="text-white/60 mb-2">Senior Data Analyst</p>
          <p className="text-white/60 text-sm mb-4">Admin Role</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-center space-x-2 text-white/70">
              <Mail className="h-4 w-4" />
              <span>john.doe@company.com</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white/70">
              <MapPin className="h-4 w-4" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-white/70">
              <Calendar className="h-4 w-4" />
              <span>Joined March 2023</span>
            </div>
          </div>
        </GlassCard>

        {/* Settings */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-6">Profile Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="text-white/80">First Name</Label>
                <Input id="firstName" defaultValue="John" className="mt-1 bg-white/10 border-white/20 text-white" />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white/80">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" className="mt-1 bg-white/10 border-white/20 text-white" />
              </div>
              <div>
                <Label htmlFor="email" className="text-white/80">Email</Label>
                <Input id="email" defaultValue="john.doe@company.com" className="mt-1 bg-white/10 border-white/20 text-white" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-white/80">Phone</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" className="mt-1 bg-white/10 border-white/20 text-white" />
              </div>
            </div>
            
            <div className="mt-6">
              <Button className="glass-button">Save Changes</Button>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-6">Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Email Notifications</h4>
                  <p className="text-white/60 text-sm">Receive email alerts for important updates</p>
                </div>
                <Button variant="outline" size="sm" className="glass-button">
                  Enabled
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Dark Mode</h4>
                  <p className="text-white/60 text-sm">Toggle between light and dark themes</p>
                </div>
                <Button variant="outline" size="sm" className="glass-button">
                  Dark
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Auto-refresh</h4>
                  <p className="text-white/60 text-sm">Automatically refresh dashboard data</p>
                </div>
                <Button variant="outline" size="sm" className="glass-button">
                  5 minutes
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
