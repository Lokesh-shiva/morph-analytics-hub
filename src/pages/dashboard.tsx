
import { TrendingUp, Users, DollarSign, BarChart3, Lightbulb, Target, Zap } from "lucide-react";
import { Header } from "@/components/layout/header";
import { KPICard } from "@/components/dashboard/kpi-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { InsightCard } from "@/components/dashboard/insight-card";
import { AnalyticsAreaChart } from "@/components/charts/area-chart";
import { AnalyticsLineChart } from "@/components/charts/line-chart";
import { AnalyticsBarChart } from "@/components/charts/bar-chart";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Header />
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value="$127.5K"
          change="+12.5% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <KPICard
          title="Active Users"
          value="14.2K"
          change="+8.3% from last month"
          changeType="positive"
          icon={Users}
        />
        <KPICard
          title="Conversion Rate"
          value="3.24%"
          change="-2.1% from last month"
          changeType="negative"
          icon={TrendingUp}
        />
        <KPICard
          title="Avg. Session"
          value="4m 32s"
          change="+0.8% from last month"
          changeType="positive"
          icon={BarChart3}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Traffic Overview">
          <AnalyticsAreaChart />
        </ChartCard>
        <ChartCard title="User Engagement">
          <AnalyticsLineChart />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard title="Revenue Analytics">
            <AnalyticsBarChart />
          </ChartCard>
        </div>
        
        {/* AI Insights */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">AI Insights</h3>
          
          <InsightCard
            title="Revenue Opportunity"
            description="Customer segment A shows 23% higher conversion potential. Consider targeted campaigns."
            icon={Target}
            priority="high"
            tags={["Revenue", "Conversion"]}
            action={
              <Button size="sm" className="glass-button text-white">
                View Details
              </Button>
            }
          />
          
          <InsightCard
            title="Performance Alert"
            description="Page load times increased by 15% this week. Infrastructure optimization recommended."
            icon={Zap}
            priority="medium"
            tags={["Performance", "UX"]}
            action={
              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Investigate
              </Button>
            }
          />
          
          <InsightCard
            title="Growth Pattern"
            description="User engagement peaks at 2-4 PM. Schedule content updates accordingly."
            icon={Lightbulb}
            priority="low"
            tags={["Engagement", "Timing"]}
          />
        </div>
      </div>
    </div>
  );
}
