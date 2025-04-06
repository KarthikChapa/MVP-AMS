"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';

interface CareerFormProps {
  onSubmit: (data: CareerFormData) => void;
  isLoading: boolean;
}

export interface CareerFormData {
  currentSport: string;
  yearsExperience: number;
  age: number;
  achievements: string[];
  skills: {
    technical: number;
    tactical: number;
    physical: number;
    mental: number;
  };
  education: {
    level: string;
    sportsRelated: boolean;
  };
  preferences: {
    coaching: boolean;
    management: boolean;
    analytics: boolean;
    media: boolean;
    business: boolean;
  };
  injuryHistory: {
    hasMajorInjury: boolean;
    recoveryStatus: number;
  };
  financialGoals: {
    expectedIncome: string;
    investmentCapacity: boolean;
  };
  physicalAttributes?: {
    height?: number;
    weight?: number;
    bodyComposition?: string;
    flexibility?: number;
  };
  personality?: {
    leadership?: boolean;
    teamwork?: boolean;
    adaptability?: boolean;
  };
  geographicalPreferences?: string;
  availability?: {
    relocate?: boolean;
  };
  certifications?: string;
}

const sportsList = [
  'Football', 'Basketball', 'Cricket', 'Tennis', 'Swimming',
  'Athletics', 'Volleyball', 'Boxing', 'Martial Arts', 'Hockey',
  'Rugby', 'Baseball', 'Golf', 'Other'
];

export default function CareerForm({ onSubmit, isLoading }: CareerFormProps) {
  const [formData, setFormData] = useState<CareerFormData>({
    currentSport: '',
    yearsExperience: 0,
    age: 18,
    achievements: [],
    skills: {
      technical: 50,
      tactical: 50,
      physical: 50,
      mental: 50,
    },
    education: {
      level: 'high_school',
      sportsRelated: false,
    },
    preferences: {
      coaching: false,
      management: false,
      analytics: false,
      media: false,
      business: false,
    },
    injuryHistory: {
      hasMajorInjury: false,
      recoveryStatus: 100,
    },
    financialGoals: {
      expectedIncome: 'moderate',
      investmentCapacity: false,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Current Sport</Label>
              <Select
                value={formData.currentSport}
                onValueChange={(value) => setFormData({...formData, currentSport: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your sport" />
                </SelectTrigger>
                <SelectContent>
                  {sportsList.map((sport) => (
                    <SelectItem key={sport} value={sport.toLowerCase()}>
                      {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Years of Experience</Label>
                <Input
                  type="number"
                  min="0"
                  max="50"
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData({...formData, yearsExperience: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label>Age</Label>
                <Input
                  type="number"
                  min="15"
                  max="60"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Assessment */}
        <Card>
          <CardHeader>
            <CardTitle>Skills Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Technical Skills</Label>
              <Slider
                value={[formData.skills.technical]}
                onValueChange={(value) => setFormData({
                  ...formData,
                  skills: {...formData.skills, technical: value[0]}
                })}
                min={0}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label>Tactical Understanding</Label>
              <Slider
                value={[formData.skills.tactical]}
                onValueChange={(value) => setFormData({
                  ...formData,
                  skills: {...formData.skills, tactical: value[0]}
                })}
                min={0}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label>Physical Condition</Label>
              <Slider
                value={[formData.skills.physical]}
                onValueChange={(value) => setFormData({
                  ...formData,
                  skills: {...formData.skills, physical: value[0]}
                })}
                min={0}
                max={100}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label>Mental Strength</Label>
              <Slider
                value={[formData.skills.mental]}
                onValueChange={(value) => setFormData({
                  ...formData,
                  skills: {...formData.skills, mental: value[0]}
                })}
                min={0}
                max={100}
                step={1}
              />
            </div>
          </CardContent>
        </Card>

        {/* Career Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Career Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.preferences.coaching}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    preferences: {...formData.preferences, coaching: checked as boolean}
                  })}
                />
                <Label>Coaching</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.preferences.management}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    preferences: {...formData.preferences, management: checked as boolean}
                  })}
                />
                <Label>Management</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.preferences.analytics}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    preferences: {...formData.preferences, analytics: checked as boolean}
                  })}
                />
                <Label>Sports Analytics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.preferences.media}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    preferences: {...formData.preferences, media: checked as boolean}
                  })}
                />
                <Label>Sports Media</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={formData.preferences.business}
                  onCheckedChange={(checked) => setFormData({
                    ...formData,
                    preferences: {...formData.preferences, business: checked as boolean}
                  })}
                />
                <Label>Sports Business</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Physical Attributes */}
        <Card>
          <CardHeader>
            <CardTitle>Physical Attributes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Height (cm)</Label>
                <Input
                  type="number"
                  min="100"
                  max="250"
                  placeholder="Enter your height"
                  value={formData.physicalAttributes?.height || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    physicalAttributes: {
                      ...formData.physicalAttributes,
                      height: parseInt(e.target.value),
                    },
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Weight (kg)</Label>
                <Input
                  type="number"
                  min="30"
                  max="200"
                  placeholder="Enter your weight"
                  value={formData.physicalAttributes?.weight || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    physicalAttributes: {
                      ...formData.physicalAttributes,
                      weight: parseInt(e.target.value),
                    },
                  })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Body Composition</Label>
              <Select
                value={formData.physicalAttributes?.bodyComposition || ''}
                onValueChange={(value) => setFormData({
                  ...formData,
                  physicalAttributes: {
                    ...formData.physicalAttributes,
                    bodyComposition: value,
                  },
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select body composition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ectomorph">Ectomorph</SelectItem>
                  <SelectItem value="mesomorph">Mesomorph</SelectItem>
                  <SelectItem value="endomorph">Endomorph</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Flexibility Level</Label>
              <Slider
                value={[formData.physicalAttributes?.flexibility || 50]}
                onValueChange={(value) => setFormData({
                  ...formData,
                  physicalAttributes: {
                    ...formData.physicalAttributes,
                    flexibility: value[0],
                  },
                })}
                min={0}
                max={100}
                step={1}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Personality Traits</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.personality?.leadership || false}
                    onCheckedChange={(checked) => setFormData({
                      ...formData,
                      personality: { ...formData.personality, leadership: checked as boolean }
                    })}
                  />
                  <Label>Leadership</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.personality?.teamwork || false}
                    onCheckedChange={(checked) => setFormData({
                      ...formData,
                      personality: { ...formData.personality, teamwork: checked as boolean }
                    })}
                  />
                  <Label>Teamwork</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.personality?.adaptability || false}
                    onCheckedChange={(checked) => setFormData({
                      ...formData,
                      personality: { ...formData.personality, adaptability: checked as boolean }
                    })}
                  />
                  <Label>Adaptability</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Preferred Regions</Label>
              <Input
                type="text"
                placeholder="e.g., North America, Europe"
                value={formData.geographicalPreferences || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  geographicalPreferences: e.target.value
                })}
              />
            </div>

            <div className="space-y-2">
              <Label>Willingness to Relocate</Label>
              <Checkbox
                checked={formData.availability?.relocate || false}
                onCheckedChange={(checked) => setFormData({
                  ...formData,
                  availability: { ...formData.availability, relocate: checked as boolean }
                })}
              />
            </div>

            <div className="space-y-2">
              <Label>Certifications or Training</Label>
              <Input
                type="text"
                placeholder="e.g., Coaching Certification, Data Analytics Training"
                value={formData.certifications || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  certifications: e.target.value
                })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Get Career Prediction'}
        </Button>
      </div>
    </form>
  );
}
