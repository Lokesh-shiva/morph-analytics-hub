
import { useState, useRef } from "react";
import { Camera, Mail, MapPin, Calendar, Save } from "lucide-react";
import { Header } from "@/components/layout/header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";

export function Profile() {
  const { theme, toggleTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    profileImage: null as string | null
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    darkMode: theme === 'dark',
    autoRefresh: 5
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({ ...prev, profileImage: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    console.log("Saving profile changes:", profileData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    console.log("Profile saved successfully!");
    alert("Profile updated successfully!");
  };

  const togglePreference = (key: string) => {
    if (key === 'darkMode') {
      toggleTheme();
      setPreferences(prev => ({ ...prev, darkMode: !prev.darkMode }));
    } else if (key === 'emailNotifications') {
      setPreferences(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }));
      console.log("Email notifications toggled:", !preferences.emailNotifications);
    }
  };

  const cycleAutoRefresh = () => {
    const intervals = [1, 5, 15, 30];
    const currentIndex = intervals.indexOf(preferences.autoRefresh);
    const nextIndex = (currentIndex + 1) % intervals.length;
    setPreferences(prev => ({ ...prev, autoRefresh: intervals[nextIndex] }));
    console.log("Auto-refresh interval changed to:", intervals[nextIndex]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Header />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <GlassCard hover className="text-center">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 mx-auto overflow-hidden flex items-center justify-center">
              {profileData.profileImage ? (
                <img 
                  src={profileData.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-2xl font-bold">
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </span>
              )}
            </div>
            <Button 
              size="sm" 
              className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 glass-button"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="h-4 w-4" />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          
          <h3 className="text-xl font-semibold text-foreground">{profileData.firstName} {profileData.lastName}</h3>
          <p className="text-muted-foreground mb-2">Senior Data Analyst</p>
          <p className="text-muted-foreground text-sm mb-4">Admin Role</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{profileData.email}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Joined March 2023</span>
            </div>
          </div>
        </GlassCard>

        {/* Settings */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard>
            <h3 className="text-lg font-semibold text-foreground mb-6">Profile Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                <Input 
                  id="firstName" 
                  value={profileData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="mt-1 bg-background/50 border-border text-foreground" 
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                <Input 
                  id="lastName" 
                  value={profileData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="mt-1 bg-background/50 border-border text-foreground" 
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input 
                  id="email" 
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-1 bg-background/50 border-border text-foreground" 
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-foreground">Phone</Label>
                <Input 
                  id="phone" 
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="mt-1 bg-background/50 border-border text-foreground" 
                />
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                className="glass-button" 
                onClick={handleSaveChanges}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-lg font-semibold text-foreground mb-6">Preferences</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-foreground font-medium">Email Notifications</h4>
                  <p className="text-muted-foreground text-sm">Receive email alerts for important updates</p>
                </div>
                <Switch 
                  checked={preferences.emailNotifications}
                  onCheckedChange={() => togglePreference('emailNotifications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-foreground font-medium">Dark Mode</h4>
                  <p className="text-muted-foreground text-sm">Toggle between light and dark themes</p>
                </div>
                <Switch 
                  checked={preferences.darkMode}
                  onCheckedChange={() => togglePreference('darkMode')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-foreground font-medium">Auto-refresh</h4>
                  <p className="text-muted-foreground text-sm">Automatically refresh dashboard data</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="glass-button"
                  onClick={cycleAutoRefresh}
                >
                  {preferences.autoRefresh} minute{preferences.autoRefresh !== 1 ? 's' : ''}
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
