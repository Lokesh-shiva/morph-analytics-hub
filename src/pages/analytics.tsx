
import { useState } from "react";
import { Calendar, Download, Filter, RefreshCw, X } from "lucide-react";
import { Header } from "@/components/layout/header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ChartCard } from "@/components/dashboard/chart-card";
import { AnalyticsAreaChart } from "@/components/charts/area-chart";
import { AnalyticsLineChart } from "@/components/charts/line-chart";
import { AnalyticsBarChart } from "@/components/charts/bar-chart";
import { DatePicker } from "@/components/ui/date-picker";

export function Analytics() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);

  const availableFilters = ["Mobile", "Desktop", "Tablet", "Organic", "Paid", "Social", "Email"];
  const dateRanges = ["Last 7 days", "Last 30 days", "Last 90 days", "Last year", "Custom"];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    console.log("Refreshing analytics data...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    console.log("Exporting analytics data...");
    const csvData = "Page,Views,Change\n/dashboard,12.4K,+5.2%\n/analytics,8.7K,+3.1%\n/settings,6.2K,-1.4%";
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analytics-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDateRange = (range: string) => {
    setDateRange(range);
    if (range === "Custom") {
      setShowCustomDatePicker(true);
    } else {
      setShowCustomDatePicker(false);
      setStartDate(undefined);
      setEndDate(undefined);
    }
    console.log("Date range changed to:", range);
  };

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(prev => prev.filter(f => f !== filter));
    } else {
      setActiveFilters(prev => [...prev, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Header />
      
      {/* Controls */}
      <GlassCard className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Advanced Analytics</h2>
            <p className="text-muted-foreground">Deep dive into your data insights</p>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm" 
                className="glass-button"
                onClick={() => {
                  const currentIndex = dateRanges.indexOf(dateRange);
                  const nextIndex = (currentIndex + 1) % dateRanges.length;
                  handleDateRange(dateRanges[nextIndex]);
                }}
              >
                <Calendar className="h-4 w-4 mr-2" />
                {dateRange}
              </Button>
            </div>

            <div className="relative">
              <Button 
                variant="outline" 
                size="sm" 
                className="glass-button"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters ({activeFilters.length})
              </Button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg p-2 z-50 hidden group-hover:block">
                {availableFilters.map(filter => (
                  <button
                    key={filter}
                    onClick={() => toggleFilter(filter)}
                    className={`w-full text-left px-3 py-2 rounded hover:bg-accent transition-colors ${
                      activeFilters.includes(filter) ? 'bg-primary text-primary-foreground' : 'text-foreground'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

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
        </div>

        {/* Custom Date Range Pickers */}
        {showCustomDatePicker && (
          <div className="flex gap-4 items-center">
            <DatePicker
              date={startDate}
              onDateChange={setStartDate}
              placeholder="Start date"
              className="w-40"
            />
            <span className="text-muted-foreground">to</span>
            <DatePicker
              date={endDate}
              onDateChange={setEndDate}
              placeholder="End date"
              className="w-40"
            />
          </div>
        )}

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {activeFilters.map(filter => (
              <div key={filter} className="flex items-center gap-1 px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                {filter}
                <button
                  onClick={() => removeFilter(filter)}
                  className="hover:bg-primary/30 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
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
          <h4 className="font-semibold text-foreground mb-4">Top Pages</h4>
          <div className="space-y-3">
            {[
              { page: "/dashboard", views: "12.4K", change: "+5.2%" },
              { page: "/analytics", views: "8.7K", change: "+3.1%" },
              { page: "/settings", views: "6.2K", change: "-1.4%" },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-muted-foreground">{item.page}</span>
                <div className="text-right">
                  <div className="text-foreground font-medium">{item.views}</div>
                  <div className={`text-xs ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {item.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard hover>
          <h4 className="font-semibold text-foreground mb-4">Traffic Sources</h4>
          <div className="space-y-3">
            {[
              { source: "Organic Search", percentage: "45.2%" },
              { source: "Direct", percentage: "28.7%" },
              { source: "Social Media", percentage: "16.1%" },
              { source: "Email", percentage: "10.0%" },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-muted-foreground">{item.source}</span>
                <span className="text-foreground font-medium">{item.percentage}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard hover>
          <h4 className="font-semibold text-foreground mb-4">Device Types</h4>
          <div className="space-y-3">
            {[
              { device: "Desktop", percentage: "52.3%" },
              { device: "Mobile", percentage: "38.7%" },
              { device: "Tablet", percentage: "9.0%" },
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-muted-foreground">{item.device}</span>
                <span className="text-foreground font-medium">{item.percentage}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
