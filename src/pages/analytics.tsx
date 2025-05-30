
import { useState } from "react";
import { Calendar, Download, Filter, RefreshCw } from "lucide-react";
import { Header } from "@/components/layout/header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ChartCard } from "@/components/dashboard/chart-card";
import { AnalyticsAreaChart } from "@/components/charts/area-chart";
import { AnalyticsLineChart } from "@/components/charts/line-chart";
import { AnalyticsBarChart } from "@/components/charts/bar-chart";

export function Analytics() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    console.log("Refreshing analytics data...");
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    console.log("Exporting analytics data...");
    // Create a simple CSV export
    const csvData = "Page,Views,Change\n/dashboard,12.4K,+5.2%\n/analytics,8.7K,+3.1%\n/settings,6.2K,-1.4%";
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDateRange = () => {
    const ranges = ["Last 7 days", "Last 30 days", "Last 90 days", "Last year"];
    const currentIndex = ranges.indexOf(dateRange);
    const nextIndex = (currentIndex + 1) % ranges.length;
    setDateRange(ranges[nextIndex]);
    console.log("Date range changed to:", ranges[nextIndex]);
  };

  const handleFilters = () => {
    const availableFilters = ["Mobile", "Desktop", "Tablet", "Organic", "Paid"];
    const newFilter = availableFilters[Math.floor(Math.random() * availableFilters.length)];
    
    if (activeFilters.includes(newFilter)) {
      setActiveFilters(prev => prev.filter(f => f !== newFilter));
    } else {
      setActiveFilters(prev => [...prev, newFilter]);
    }
    console.log("Filters updated:", activeFilters);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Header />
      
      {/* Controls */}
      <GlassCard className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Advanced Analytics</h2>
          <p className="text-white/60">Deep dive into your data insights</p>
          {activeFilters.length > 0 && (
            <div className="flex gap-2 mt-2">
              {activeFilters.map(filter => (
                <span key={filter} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                  {filter}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant="outline" 
            size="sm" 
            className="glass-button"
            onClick={handleDateRange}
          >
            <Calendar className="h-4 w-4 mr-2" />
            {dateRange}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="glass-button"
            onClick={handleFilters}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters ({activeFilters.length})
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="glass-button"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button 
            size="sm" 
            className="glass-button"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </GlassCard>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Traffic Trends" className="lg:col-span-2">
          <AnalyticsAreaChart />
        </ChartCard>
        
        <ChartCard title="User Behavior">
          <AnalyticsLineChart />
        </ChartCard>
        
        <ChartCard title="Revenue Analysis">
          <AnalyticsBarChart />
        </ChartCard>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard hover>
          <h4 className="font-semibold text-white mb-4">Top Pages</h4>
          <div className="space-y-3">
            {[
              { page: "/dashboard", views: "12.4K", change: "+5.2%" },
              { page: "/analytics", views: "8.7K", change: "+3.1%" },
              { page: "/settings", views: "6.2K", change: "-1.4%" },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-white/80">{item.page}</span>
                <div className="text-right">
                  <div className="text-white font-medium">{item.views}</div>
                  <div className={`text-xs ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {item.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard hover>
          <h4 className="font-semibold text-white mb-4">Traffic Sources</h4>
          <div className="space-y-3">
            {[
              { source: "Organic Search", percentage: "45.2%" },
              { source: "Direct", percentage: "28.7%" },
              { source: "Social Media", percentage: "16.1%" },
              { source: "Email", percentage: "10.0%" },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-white/80">{item.source}</span>
                <span className="text-white font-medium">{item.percentage}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard hover>
          <h4 className="font-semibold text-white mb-4">Device Types</h4>
          <div className="space-y-3">
            {[
              { device: "Desktop", percentage: "52.3%" },
              { device: "Mobile", percentage: "38.7%" },
              { device: "Tablet", percentage: "9.0%" },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-white/80">{item.device}</span>
                <span className="text-white font-medium">{item.percentage}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
