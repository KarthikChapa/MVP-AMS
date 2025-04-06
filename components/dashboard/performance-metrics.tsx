"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useMockData } from "@/lib/context/mock-data-context"
import { Button } from "@/components/ui/button"
import { RefreshCw, DownloadCloud, Filter } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

// Generate monthly data based on performance data
const generateMonthlyData = (performanceData: any) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = new Date().getMonth();
  
  // Use the last 8 months
  const recentMonths = [...months.slice(currentMonth - 7 >= 0 ? currentMonth - 7 : 0, currentMonth + 1)];
  if (recentMonths.length < 8) {
    recentMonths.unshift(...months.slice(months.length - (8 - recentMonths.length)));
  }
  
  return recentMonths.map((month, index) => {
    // Generate somewhat random but progressive values based on overall performance score
    const performance = Math.min(100, Math.max(50, 
      performanceData.performance - 10 + 
      index * 3 + 
      Math.floor(Math.random() * 8) - 4
    ));
    
    // League average always slightly below but following the same trend
    const average = Math.min(95, Math.max(45, performance - 5 - Math.floor(Math.random() * 8)));
    
    return { month, performance, average };
  });
};

export function PerformanceMetrics() {
  const { performanceData, refreshPerformanceData, athleteData } = useMockData();
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [timeframe, setTimeframe] = useState("8m");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      setChartData(generateMonthlyData(performanceData));
      setLoading(false);
    }, 800);
  }, [performanceData]);

  const handleRefresh = () => {
    setRefreshing(true);
    setSuccessMessage("");
    
    // Simulate API call delay
    setTimeout(() => {
      refreshPerformanceData();
      setChartData(generateMonthlyData(performanceData));
      setRefreshing(false);
      setSuccessMessage("Performance data refreshed successfully");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 1500);
  };

  const handleDownload = () => {
    // Simulate downloading data
    setSuccessMessage("Performance report downloaded");
    
    // Create and download a simple JSON file with the data
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      athlete: athleteData.name,
      sport: athleteData.sport,
      data: chartData,
      metrics: performanceData,
      generatedAt: new Date().toISOString()
    }));
    
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `performance-metrics-${athleteData.name.replace(' ', '-').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
    setSuccessMessage("");
    setLoading(true);
    
    // Simulate API call for different timeframes
    setTimeout(() => {
      const months = parseInt(value.replace('m', ''));
      
      // Generate different data based on timeframe
      const newData = generateMonthlyData(performanceData).slice(8 - months);
      setChartData(newData);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={handleTimeframeChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Timeframe</SelectLabel>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="8m">8 Months</SelectItem>
                <SelectItem value="12m">1 Year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={refreshing || loading}>
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleDownload} disabled={loading}>
            <DownloadCloud className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {successMessage && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}
      
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-[350px] w-full rounded-xl" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[40, 100]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="performance"
              stroke="#3b82f6"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name="Your Performance"
            />
            <Line
              type="monotone"
              dataKey="average"
              stroke="#9ca3af"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="League Average"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-[60px] w-full rounded-lg" />
          ))
        ) : (
          Object.entries(performanceData)
            .filter(([key]) => !['injuryRisk', 'battingAverage', 'bowlingEconomy', 'fieldingEfficiency', 'bowlingSpeed', 'passingAccuracy', 'shotPrecision', 'tacticalAwareness', 'sprintSpeed'].includes(key))
            .slice(0, 4)
            .map(([key, value]) => (
              <div key={key} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <div className="text-sm text-muted-foreground capitalize">{key}</div>
                <div className="text-2xl font-bold">{key === 'speed' ? (value as number).toFixed(2) : value as number}</div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
