"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { useMockData } from "@/lib/context/mock-data-context"
import { Button } from "@/components/ui/button"
import { RefreshCw, ChevronDown } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"

const COLORS = ["#10b981", "#f59e0b", "#ef4444"]

// Calculate risk levels based on performance metrics
const calculateRiskLevels = (performanceData: any) => {
  // Use injuryRisk as base value to determine distribution
  const baseRisk = performanceData.injuryRisk || 20;
  
  // Higher base risk means more medium and high risk, lower means more low risk
  const highRisk = Math.min(40, Math.max(15, baseRisk - 5 + Math.floor(Math.random() * 10) - 5));
  const mediumRisk = Math.min(60, Math.max(25, baseRisk + 15 + Math.floor(Math.random() * 15) - 7));
  const lowRisk = 100 - highRisk - mediumRisk;
  
  return [
    { name: "Low Risk", value: lowRisk },
    { name: "Medium Risk", value: mediumRisk },
    { name: "High Risk", value: highRisk },
  ];
};

export function InjuryRiskChart() {
  const { performanceData, refreshPerformanceData } = useMockData();
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [bodyPart, setBodyPart] = useState("All Body Parts");
  const [successMessage, setSuccessMessage] = useState("");
  
  const bodyParts = [
    "All Body Parts", 
    "Knee", 
    "Ankle", 
    "Shoulder", 
    "Lower Back", 
    "Hamstring"
  ];

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    setTimeout(() => {
      setChartData(calculateRiskLevels(performanceData));
      setLoading(false);
    }, 600);
  }, [performanceData]);

  const handleRefresh = () => {
    setRefreshing(true);
    setSuccessMessage("");
    
    // Simulate API call delay
    setTimeout(() => {
      setChartData(calculateRiskLevels(performanceData));
      setRefreshing(false);
      setSuccessMessage("Injury risk data refreshed");
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 1200);
  };

  const handleBodyPartChange = (part: string) => {
    setBodyPart(part);
    setLoading(true);
    
    // Simulate API call for different body part
    setTimeout(() => {
      // Adjust the risk levels based on the body part
      // This is simulated data, but could be based on athlete-specific risk factors
      if (part === "All Body Parts") {
        setChartData(calculateRiskLevels(performanceData));
      } else {
        // Generate slightly different values for each body part
        const seed = part.charCodeAt(0) + part.length;
        const variance = (seed % 20) - 10;
        
        const baseRisk = performanceData.injuryRisk || 20;
        const adjustedRisk = Math.min(40, Math.max(5, baseRisk + variance));
        
        const highRisk = Math.min(50, Math.max(10, adjustedRisk - 5 + Math.floor(Math.random() * 10) - 5));
        const mediumRisk = Math.min(70, Math.max(20, adjustedRisk + 20 + Math.floor(Math.random() * 10) - 5));
        const lowRisk = 100 - highRisk - mediumRisk;
        
        setChartData([
          { name: "Low Risk", value: lowRisk },
          { name: "Medium Risk", value: mediumRisk },
          { name: "High Risk", value: highRisk },
        ]);
      }
      
      setLoading(false);
    }, 800);
  };

  // Function to determine risk level description and advice
  const getRiskAdvice = () => {
    const highRiskValue = chartData.find(item => item.name === "High Risk")?.value || 0;
    
    if (highRiskValue >= 30) {
      return {
        level: "High",
        advice: "Recommend reduced training load and focused recovery protocols."
      };
    } else if (highRiskValue >= 20) {
      return {
        level: "Moderate",
        advice: "Monitor closely and incorporate preventative exercises."
      };
    } else {
      return {
        level: "Low",
        advice: "Continue with standard injury prevention protocols."
      };
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" disabled={loading || refreshing}>
              {bodyPart} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {bodyParts.map(part => (
              <DropdownMenuItem 
                key={part} 
                onClick={() => handleBodyPartChange(part)}
              >
                {part}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleRefresh} 
          disabled={refreshing || loading}
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      
      {successMessage && (
        <Alert className="bg-blue-50 text-blue-800 border-blue-200">
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}
      
      {loading ? (
        <Skeleton className="h-[250px] w-full rounded-xl" />
      ) : (
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {!loading && (
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mt-2">
          <div className="text-sm font-medium">Risk Assessment for {bodyPart}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {getRiskAdvice().level} injury risk. {getRiskAdvice().advice}
          </div>
        </div>
      )}
    </div>
  )
}

