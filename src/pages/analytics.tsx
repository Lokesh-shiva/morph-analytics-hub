
import { useState } from "react";
import { Filter, Download, RotateCcw, Calendar } from "lucide-react";
import { Header } from "@/components/layout/header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Analytics() {
  const [dateRange, setDateRange] = useState("last7days");
  const [customStartDate, setCustomStartDate] = useState<Date>();
  const [customEndDate, setCustomEndDate] = useState<Date>();
  const [selectedFilters, setSelectedFilters] = useState({
    source: "all",
    category: "all",
    status: "all"
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleRefresh = () => {
    console.log("Refreshing analytics data...");
    // Simulate refresh
  };

  const handleExport = () => {
    console.log("Exporting analytics data...");
    // Simulate export functionality
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    console.log(`Filter ${filterType} changed to:`, value);
  };

  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).filter(value => value !== "all").length;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Header />
      
      {/* Analytics Controls */}
      <GlassCard className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Analytics Overview</h2>
          <p className="text-muted-foreground">Track your key performance metrics</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Range Selector */}
          <div className="relative" style={{ zIndex: 50000 }}>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40 glass-button">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent className="z-[99999] bg-white dark:bg-slate-800 backdrop-blur-lg shadow-xl border border-border">
                <SelectItem value="last7days">Last 7 days</SelectItem>
                <SelectItem value="last30days">Last 30 days</SelectItem>
                <SelectItem value="last90days">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Custom Date Range */}
          {dateRange === "custom" && (
            <div className="flex items-center gap-2" style={{ zIndex: 50000 }}>
              <DatePicker
                date={customStartDate}
                onDateChange={setCustomStartDate}
                placeholder="Start date"
                className="w-36"
              />
              <span className="text-muted-foreground">to</span>
              <DatePicker
                date={customEndDate}
                onDateChange={setCustomEndDate}
                placeholder="End date"
                className="w-36"
              />
            </div>
          )}

          {/* Filters */}
          <div style={{ zIndex: 50000 }}>
            <Popover open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="relative glass-button">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {getActiveFiltersCount() > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                      {getActiveFiltersCount()}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 z-[99999] bg-white dark:bg-slate-800 backdrop-blur-lg shadow-xl border border-border" align="end">
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Filter Analytics</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Data Source</label>
                      <Select value={selectedFilters.source} onValueChange={(value) => handleFilterChange('source', value)}>
                        <SelectTrigger className="bg-background text-foreground border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="z-[99999] bg-white dark:bg-slate-800 border border-border">
                          <SelectItem value="all" className="text-foreground hover:bg-muted">All Sources</SelectItem>
                          <SelectItem value="web" className="text-foreground hover:bg-muted">Web Analytics</SelectItem>
                          <SelectItem value="mobile" className="text-foreground hover:bg-muted">Mobile App</SelectItem>
                          <SelectItem value="api" className="text-foreground hover:bg-muted">API Calls</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                      <Select value={selectedFilters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                        <SelectTrigger className="bg-background text-foreground border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="z-[99999] bg-white dark:bg-slate-800 border border-border">
                          <SelectItem value="all" className="text-foreground hover:bg-muted">All Categories</SelectItem>
                          <SelectItem value="revenue" className="text-foreground hover:bg-muted">Revenue</SelectItem>
                          <SelectItem value="users" className="text-foreground hover:bg-muted">Users</SelectItem>
                          <SelectItem value="performance" className="text-foreground hover:bg-muted">Performance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Status</label>
                      <Select value={selectedFilters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                        <SelectTrigger className="bg-background text-foreground border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="z-[99999] bg-white dark:bg-slate-800 border border-border">
                          <SelectItem value="all" className="text-foreground hover:bg-muted">All Status</SelectItem>
                          <SelectItem value="active" className="text-foreground hover:bg-muted">Active</SelectItem>
                          <SelectItem value="inactive" className="text-foreground hover:bg-muted">Inactive</SelectItem>
                          <SelectItem value="pending" className="text-foreground hover:bg-muted">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      setSelectedFilters({ source: "all", category: "all", status: "all" });
                    }}>
                      Clear All
                    </Button>
                    <Button size="sm" onClick={() => setIsFiltersOpen(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Action Buttons */}
          <Button variant="outline" className="glass-button" onClick={handleRefresh}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button className="glass-button-primary" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </GlassCard>

      {/* Active Filters Display */}
      {getActiveFiltersCount() > 0 && (
        <GlassCard className="p-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Active filters:</span>
            {Object.entries(selectedFilters).map(([key, value]) => 
              value !== "all" && (
                <span key={key} className="px-2 py-1 bg-primary/10 text-primary rounded-md capitalize">
                  {key}: {value}
                </span>
              )
            )}
          </div>
        </GlassCard>
      )}

      {/* Sample Analytics Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Sample KPI Cards */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground">$45,231</p>
              <p className="text-green-500 text-sm">+12.5% from last month</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Active Users</p>
              <p className="text-2xl font-bold text-foreground">2,350</p>
              <p className="text-green-500 text-sm">+8.3% from last month</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Conversion Rate</p>
              <p className="text-2xl font-bold text-foreground">3.2%</p>
              <p className="text-red-500 text-sm">-2.1% from last month</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Avg. Session</p>
              <p className="text-2xl font-bold text-foreground">4m 32s</p>
              <p className="text-green-500 text-sm">+0.8% from last month</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Sample Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Trend</h3>
          <div className="h-64 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Chart placeholder</p>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">User Activity</h3>
          <div className="h-64 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Chart placeholder</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
