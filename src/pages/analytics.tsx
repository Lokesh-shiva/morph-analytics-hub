
import { Calendar, Download, Filter, RefreshCw } from "lucide-react";
import { Header } from "@/components/layout/header";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ChartCard } from "@/components/dashboard/chart-card";
import { AnalyticsAreaChart } from "@/components/charts/area-chart";
import { AnalyticsLineChart } from "@/components/charts/line-chart";
import { AnalyticsBarChart } from "@/components/charts/bar-chart";

export function Analytics() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Header />
      
      {/* Controls */}
      <GlassCard className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-white">Advanced Analytics</h2>
          <p className="text-white/60">Deep dive into your data insights</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="glass-button">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="outline" size="sm" className="glass-button">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="glass-button">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" className="glass-button">
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
