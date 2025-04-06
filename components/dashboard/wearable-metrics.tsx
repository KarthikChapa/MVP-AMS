"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { WearableData, DeviceType, DeviceConfig } from '@/lib/wearables';

interface WearableMetricsProps {
  athleteId: string;
}

export default function WearableMetrics({ athleteId }: WearableMetricsProps) {
  const [wearableData, setWearableData] = useState<WearableData | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType | ''>('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');

  useEffect(() => {
    const fetchWearableData = async () => {
      try {
        const response = await fetch(`/api/wearables?athleteId=${athleteId}`);
        const data = await response.json();
        if (data.success) {
          setWearableData(data.data);
        }
      } catch (error) {
        console.error('Error fetching wearable data:', error);
      }
    };

    // Fetch initial data
    fetchWearableData();

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchWearableData, 30000);

    return () => clearInterval(interval);
  }, [athleteId]);

  const handleConnectDevice = async () => {
    setIsConnecting(true);
    try {
      const deviceConfig: DeviceConfig = {
        type: deviceType as DeviceType,
        apiKey,
        apiSecret,
      };

      const response = await fetch('/api/wearables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          athleteId,
          deviceConfig,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error);
      }

      // Reset form
      setDeviceType('');
      setApiKey('');
      setApiSecret('');

      // Refresh data
      const newDataResponse = await fetch(`/api/wearables?athleteId=${athleteId}`);
      const newData = await newDataResponse.json();
      if (newData.success) {
        setWearableData(newData.data);
      }
    } catch (error) {
      console.error('Error connecting device:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Wearable Metrics</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
<Button variant="outline" className="visible block">Connect Device</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect Wearable Device</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Select
                value={deviceType}
                onValueChange={(value) => setDeviceType(value as DeviceType)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fitbit">Fitbit</SelectItem>
                  <SelectItem value="garmin">Garmin</SelectItem>
                  <SelectItem value="apple_watch">Apple Watch</SelectItem>
                  <SelectItem value="samsung_watch">Samsung Watch</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <Input
                placeholder="API Secret"
                type="password"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
              />
              <Button
                className="w-full"
                onClick={handleConnectDevice}
                disabled={isConnecting || !deviceType}
              >
                {isConnecting ? 'Connecting...' : 'Connect'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {wearableData ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {wearableData.heartRate && (
              <div className="space-y-1">
                <p className="text-sm font-medium">Heart Rate</p>
                <p className="text-2xl">{wearableData.heartRate} bpm</p>
              </div>
            )}
            {wearableData.steps && (
              <div className="space-y-1">
                <p className="text-sm font-medium">Steps</p>
                <p className="text-2xl">{wearableData.steps.toLocaleString()}</p>
              </div>
            )}
            {wearableData.calories && (
              <div className="space-y-1">
                <p className="text-sm font-medium">Calories</p>
                <p className="text-2xl">{wearableData.calories} kcal</p>
              </div>
            )}
            {wearableData.stress && (
              <div className="space-y-1">
                <p className="text-sm font-medium">Stress Level</p>
                <p className="text-2xl">{wearableData.stress}/100</p>
              </div>
            )}
            {wearableData.oxygenSaturation && (
              <div className="space-y-1">
                <p className="text-sm font-medium">Blood Oxygen</p>
                <p className="text-2xl">{wearableData.oxygenSaturation}%</p>
              </div>
            )}
            {wearableData.sleepData && (
              <div className="space-y-1">
                <p className="text-sm font-medium">Sleep Score</p>
                <p className="text-2xl">{wearableData.sleepData.quality}/100</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No wearable data available. Connect a device to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
