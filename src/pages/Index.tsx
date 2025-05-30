
import { Dashboard } from "./dashboard";
import { Analytics } from "./analytics";
import { Workflows } from "./workflows";
import { Profile } from "./profile";
import { Sidebar } from "@/components/layout/sidebar";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

export default function Index() {
  const location = useLocation();
  const { sidebarCollapsed } = useTheme();
  
  const renderContent = () => {
    switch (location.pathname) {
      case "/analytics":
        return <Analytics />;
      case "/workflows":
        return <Workflows />;
      case "/profile":
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar />
      <main className={`flex-1 p-4 md:p-6 overflow-auto transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-0'
      }`}>
        {renderContent()}
      </main>
    </div>
  );
}
