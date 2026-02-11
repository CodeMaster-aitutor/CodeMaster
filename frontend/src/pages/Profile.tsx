import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Calendar, Trophy, Camera, Upload, Target, BookOpen, CheckCircle2, Flame } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import AppLayout from '@/components/layout/AppLayout';

interface Submission {
  id: string;
  problemName: string;
  submissionDate: string;
  result: 'Passed' | 'Failed';
  language: string;
  difficulty: 'Basic' | 'Medium' | 'Advanced';
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    level: 'Intermediate',
    avatar: '',
    joinDate: new Date('2023-06-15'),
    problemsSolved: 127,
    streak: 15,
    progress: {
      beginner: { solved: 45, total: 50 },
      intermediate: { solved: 32, total: 75 },
      advanced: { solved: 50, total: 100 }
    }
  };

  // Mock submission history
  const submissionHistory: Submission[] = [
    { id: '1', problemName: "Two Sum", submissionDate: "2024-01-15", result: "Passed", language: "Java", difficulty: "Basic" },
    { id: '2', problemName: "Reverse String", submissionDate: "2024-01-14", result: "Passed", language: "Java", difficulty: "Basic" },
    { id: '3', problemName: "Binary Search", submissionDate: "2024-01-13", result: "Failed", language: "Java", difficulty: "Medium" },
    { id: '4', problemName: "Palindrome Check", submissionDate: "2024-01-12", result: "Passed", language: "Java", difficulty: "Basic" },
    { id: '5', problemName: "Factorial", submissionDate: "2024-01-11", result: "Passed", language: "Java", difficulty: "Medium" }
  ];

  const handleAvatarUpload = () => {
    toast({
      title: "Avatar upload",
      description: "Avatar upload functionality will be implemented with backend integration."
    });
  };

  const handleTakeAssessment = () => {
    toast({
      title: "Assessment started", 
      description: "Redirecting to level assessment test..."
    });
  };

  return (
    <AppLayout>
      <div className="p-4">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Profile
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Info Card */}
            <div className="lg:col-span-1">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-primary" />
                    User Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar Upload */}
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => document.getElementById('avatar-upload')?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* User Details */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Name</span>
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Email</span>
                      </div>
                      <span className="font-medium">{user.email}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Level</span>
                      </div>
                      <Badge variant="secondary">{user.level}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Joined</span>
                      </div>
                      <span className="font-medium">{user.joinDate.toDateString()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-muted-foreground">Streak</span>
                      </div>
                      <span className="font-medium text-orange-500">{user.streak} days</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Assessment Button */}
                  <Button 
                    onClick={handleTakeAssessment}
                    className="w-full bg-gradient-primary"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    Take Level Assessment
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Stats and Submission History */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-success/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-success mb-1">{user.progress.beginner.solved}</div>
                    <div className="text-sm text-muted-foreground">Beginner Solved</div>
                  </CardContent>
                </Card>
                
                <Card className="border-warning/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-warning mb-1">{user.progress.intermediate.solved}</div>
                    <div className="text-sm text-muted-foreground">Intermediate Solved</div>
                  </CardContent>
                </Card>
                
                <Card className="border-destructive/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-destructive mb-1">{user.progress.advanced.solved}</div>
                    <div className="text-sm text-muted-foreground">Advanced Solved</div>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Overview */}
              <Card className="border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-accent" />
                    Progress Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Beginner Problems</span>
                        <span>{user.progress.beginner.solved}/{user.progress.beginner.total}</span>
                      </div>
                      <Progress value={(user.progress.beginner.solved / user.progress.beginner.total) * 100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Intermediate Problems</span>
                        <span>{user.progress.intermediate.solved}/{user.progress.intermediate.total}</span>
                      </div>
                      <Progress value={(user.progress.intermediate.solved / user.progress.intermediate.total) * 100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Advanced Problems</span>
                        <span>{user.progress.advanced.solved}/{user.progress.advanced.total}</span>
                      </div>
                      <Progress value={(user.progress.advanced.solved / user.progress.advanced.total) * 100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submission History */}
              <Card className="border-muted">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Submission History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {submissionHistory.map((submission) => (
                      <div key={submission.id} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                        <div className="flex items-center space-x-4">
                          <div className={`w-2 h-2 rounded-full ${
                            submission.result === 'Passed' ? 'bg-success' : 'bg-destructive'
                          }`} />
                          
                          <div>
                            <div className="font-medium">{submission.problemName}</div>
                            <div className="text-sm text-muted-foreground flex items-center space-x-2">
                              <span>{submission.submissionDate}</span>
                              <span>•</span>
                              <Badge 
                                variant={submission.result === 'Passed' ? 'default' : 'destructive'}
                                className="text-xs"
                              >
                                {submission.result}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className={`w-5 h-5 ${
                            submission.result === 'Passed' ? 'text-success' : 'text-destructive'
                          }`} />
                        </div>
                      </div>
                    ))}
                    
                    {submissionHistory.length === 0 && (
                      <div className="text-center py-8">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-medium mb-2">No submissions yet</h3>
                        <p className="text-muted-foreground">
                          Start solving problems to see your submission history here.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;