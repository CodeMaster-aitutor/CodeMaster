import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Trophy, Circle, CheckCircle, AlertCircle, BookOpen, Search, Star, CheckCircle2, Target, Play, ExternalLink, ArrowRight } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';

interface Problem {
  id: string;
  title: string;
  difficulty: 'Basic' | 'Medium' | 'Advanced' | 'easy';
  status: 'not-started' | 'attempted' | 'solved';
  tags: string[];
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  tutorialUrl?: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  modules: number;
  completed: number;
  topics: string[];
}

const Practice = () => {
  const [activeTab, setActiveTab] = useState('learning-paths');
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Get user level from localStorage or default to beginner
  const getUserLevel = (): string => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        const level = user.skill_level || 'beginner';
        return level.charAt(0).toUpperCase() + level.slice(1); // Capitalize first letter
      }
    } catch (e) {
      console.error('Error reading user from localStorage:', e);
    }
    return 'Beginner';
  };
  
  const userLevel = getUserLevel();
  const userLevelLower = userLevel.toLowerCase();
  const solvedCount = 45;
  const attemptedCount = 12;
  const notStartedCount = 143;
  
  const handleStartProblem = (problem: Problem) => {
    console.log('Starting problem:', problem.id);
    // Navigate to compiler with problem
  };

  // Beginner Learning Paths problems (simple videos/tutorials)
  const beginnerLearningPathsProblems: Problem[] = [
    {
      id: 'blp1',
      title: 'Hello World Program',
      difficulty: 'easy',
      status: 'not-started',
      tags: ['basics', 'output'],
      description: 'Learn to write your first Java program that prints "Hello World".',
      level: 'beginner',
      tutorialUrl: '#'
    },
    {
      id: 'blp2',
      title: 'Variables and Data Types',
      difficulty: 'easy',
      status: 'not-started',
      tags: ['variables', 'basics'],
      description: 'Understand how to declare variables and use different data types in Java.',
      level: 'beginner',
      tutorialUrl: '#'
    },
    {
      id: 'blp3',
      title: 'Input and Output',
      difficulty: 'easy',
      status: 'not-started',
      tags: ['io', 'console'],
      description: 'Learn to read user input and display output in Java programs.',
      level: 'beginner',
      tutorialUrl: '#'
    },
    {
      id: 'blp4',
      title: 'If-Else Statements',
      difficulty: 'easy',
      status: 'not-started',
      tags: ['conditionals', 'control-flow'],
      description: 'Master conditional statements to make decisions in your code.',
      level: 'beginner',
      tutorialUrl: '#'
    },
    {
      id: 'blp5',
      title: 'Loops in Java',
      difficulty: 'easy',
      status: 'not-started',
      tags: ['loops', 'iterations'],
      description: 'Learn to use for loops, while loops, and do-while loops.',
      level: 'beginner',
      tutorialUrl: '#'
    },
    {
      id: 'blp6',
      title: 'Arrays Introduction',
      difficulty: 'easy',
      status: 'not-started',
      tags: ['arrays', 'collections'],
      description: 'Introduction to arrays: creating, accessing, and modifying array elements.',
      level: 'beginner',
      tutorialUrl: '#'
    }
  ];

  // Intermediate Learning Paths problems (like in screenshot)
  const intermediateLearningPathsProblems: Problem[] = [
    {
      id: 'ilp1',
      title: 'Two Sum',
      difficulty: 'easy',
      status: 'not-started',
      tags: ['arrays', 'hash-map'],
      description: 'Find indices of two numbers that add up to target. Assume exactly one solution.',
      level: 'intermediate',
      tutorialUrl: '#'
    },
    {
      id: 'ilp2',
      title: 'Reverse String',
      difficulty: 'easy',
      status: 'not-started',
      tags: ['strings'],
      description: 'Return the reverse of a given string.',
      level: 'intermediate',
      tutorialUrl: '#'
    },
    {
      id: 'ilp3',
      title: 'Valid Parentheses',
      difficulty: 'easy',
      status: 'not-started',
      tags: ['stack'],
      description: 'Determine if parentheses string is valid.',
      level: 'intermediate',
      tutorialUrl: '#'
    },
    {
      id: 'ilp4',
      title: 'Max of Array',
      difficulty: 'easy',
      status: 'not-started',
      tags: ['arrays'],
      description: 'Return the maximum element in an array.',
      level: 'intermediate',
      tutorialUrl: '#'
    },
    {
      id: 'ilp5',
      title: 'Palindrome Number',
      difficulty: 'easy',
      status: 'not-started',
      tags: ['numbers', 'strings'],
      description: 'Determine if an integer is a palindrome.',
      level: 'intermediate',
      tutorialUrl: '#'
    },
    {
      id: 'ilp6',
      title: 'Fibonacci (Iterative)',
      difficulty: 'easy',
      status: 'not-started',
      tags: ['algorithms', 'dynamic-programming'],
      description: 'Calculate Fibonacci numbers using iterative approach.',
      level: 'intermediate',
      tutorialUrl: '#'
    },
    {
      id: 'ilp7',
      title: 'Counting Characters',
      difficulty: 'easy',
      status: 'not-started',
      tags: ['strings', 'hash-map'],
      description: 'Count the frequency of each character in a string.',
      level: 'intermediate',
      tutorialUrl: '#'
    },
    {
      id: 'ilp8',
      title: 'Remove Duplicates',
      difficulty: 'easy',
      status: 'not-started',
      tags: ['arrays', 'hash-set'],
      description: 'Remove duplicate elements from an array.',
      level: 'intermediate',
      tutorialUrl: '#'
    }
  ];

  // Show problems based on user level
  const learningPathsProblems = userLevelLower === 'beginner' 
    ? beginnerLearningPathsProblems 
    : intermediateLearningPathsProblems;

  // Learning Paths/Courses
  const learningPaths: LearningPath[] = [
    {
      id: 'java-fundamentals',
      title: 'Java Fundamentals',
      description: 'Master the basics of Java programming including syntax, variables, and control structures.',
      modules: 4,
      completed: 0,
      topics: ['Variables and Data Types', 'Control Flow', 'Methods and Functions', 'Arrays and Collections']
    },
    {
      id: 'data-structures',
      title: 'Data Structures in Java',
      description: 'Learn essential data structures like arrays, lists, stacks, and queues.',
      modules: 5,
      completed: 0,
      topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees']
    }
  ];

  // Practice Arena problems (existing structure)
  const problems: Problem[] = [
    // Beginner Level Problems
    {
      id: 'b1',
      title: 'Hello World Program',
      difficulty: 'Basic',
      status: 'solved',
      tags: ['basics', 'output'],
      description: 'Write a simple program that prints "Hello World" to the console.',
      level: 'beginner'
    },
    {
      id: 'b2',
      title: 'Variable Declaration',
      difficulty: 'Basic',
      status: 'attempted',
      tags: ['variables', 'basics'],
      description: 'Declare variables of different data types and print their values.',
      level: 'beginner'
    },
    {
      id: 'b3',
      title: 'Simple Calculator',
      difficulty: 'Medium',
      status: 'not-started',
      tags: ['arithmetic', 'functions'],
      description: 'Create a calculator that performs basic arithmetic operations.',
      level: 'beginner'
    },
    {
      id: 'b4',
      title: 'Number Guessing Game',
      difficulty: 'Medium',
      status: 'not-started',
      tags: ['loops', 'conditions'],
      description: 'Build a game where users guess a randomly generated number.',
      level: 'beginner'
    },
    {
      id: 'b5',
      title: 'Array Sum Calculator',
      difficulty: 'Advanced',
      status: 'not-started',
      tags: ['arrays', 'loops'],
      description: 'Calculate the sum of all elements in an array.',
      level: 'beginner'
    },
    // Intermediate Level Problems
    {
      id: 'i1',
      title: 'Binary Search Implementation',
      difficulty: 'Basic',
      status: 'solved',
      tags: ['algorithms', 'search'],
      description: 'Implement binary search algorithm for sorted arrays.',
      level: 'intermediate'
    },
    {
      id: 'i2',
      title: 'Linked List Operations',
      difficulty: 'Medium',
      status: 'attempted',
      tags: ['data-structures', 'linked-list'],
      description: 'Create a linked list with insert, delete, and search operations.',
      level: 'intermediate'
    },
    {
      id: 'i3',
      title: 'Stack Implementation',
      difficulty: 'Medium',
      status: 'not-started',
      tags: ['data-structures', 'stack'],
      description: 'Implement a stack data structure with push, pop, and peek operations.',
      level: 'intermediate'
    },
    // Advanced Level Problems
    {
      id: 'a1',
      title: 'Graph Traversal (DFS/BFS)',
      difficulty: 'Basic',
      status: 'attempted',
      tags: ['algorithms', 'graphs'],
      description: 'Implement depth-first and breadth-first search algorithms.',
      level: 'advanced'
    },
    {
      id: 'a2',
      title: 'Dynamic Programming - Fibonacci',
      difficulty: 'Medium',
      status: 'not-started',
      tags: ['dynamic-programming', 'optimization'],
      description: 'Solve Fibonacci sequence using dynamic programming approach.',
      level: 'advanced'
    }
  ];

  const filteredProblems = problems.filter(problem => {
    const searchMatch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const difficultyMatch = difficultyFilter === 'All' || problem.difficulty === difficultyFilter;
    const statusMatch = statusFilter === 'All' || problem.status === statusFilter;
    return searchMatch && difficultyMatch && statusMatch;
  });

  return (
    <AppLayout>
      <div className="p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Practice Arena
            </h1>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="px-3 py-1">
                <Target className="w-4 h-4 mr-2" />
                {userLevel} Level
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                <Trophy className="w-4 h-4 mr-2" />
                {solvedCount} Solved
              </Badge>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="learning-paths" className="text-base">Learning Paths</TabsTrigger>
              <TabsTrigger value="practice-arena" className="text-base">Practice Arena</TabsTrigger>
            </TabsList>

            {/* Learning Paths Tab */}
            <TabsContent value="learning-paths" className="space-y-6 mt-6">
              {/* Learning Paths Problems List */}
              <div className="space-y-4">
                {learningPathsProblems.map((problem) => (
                  <Card key={problem.id} className="border-border/20 bg-gradient-card hover:border-primary/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">{problem.title}</h3>
                            <Badge 
                              variant="outline"
                              className={`${
                                problem.difficulty === 'easy' 
                                  ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                                  : problem.difficulty === 'Medium'
                                  ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                  : 'bg-red-500/10 text-red-500 border-red-500/20'
                              }`}
                            >
                              {problem.difficulty}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{problem.description}</p>
                          {problem.tutorialUrl && (
                            <a 
                              href={problem.tutorialUrl} 
                              className="text-primary hover:underline text-sm inline-flex items-center gap-1"
                              onClick={(e) => {
                                e.preventDefault();
                                // Handle tutorial link
                              }}
                            >
                              Watch tutorial <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        <Button
                          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-10 h-10 p-0"
                          onClick={() => handleStartProblem(problem)}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Learning Paths/Courses Section */}
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Featured Courses</h2>
                <div className="grid gap-6">
                  {learningPaths.map((path) => (
                    <Card key={path.id} className="border-border/20 bg-gradient-card">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-2">{path.title}</CardTitle>
                            <p className="text-muted-foreground text-sm mb-4">{path.description}</p>
                            <div className="flex items-center space-x-4 mb-4">
                              <div className="text-sm text-muted-foreground">
                                {path.completed} / {path.modules} modules completed
                              </div>
                              <Trophy className="w-4 h-4 text-primary" />
                            </div>
                            <Progress value={(path.completed / path.modules) * 100} className="h-2 mb-4" />
                            <div className="flex flex-wrap gap-2">
                              {path.topics.slice(0, 4).map((topic, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground ml-4">
                            <Play className="w-4 h-4 mr-2" />
                            Start
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Practice Arena Tab */}
            <TabsContent value="practice-arena" className="space-y-4 mt-6">
              {/* Progress Overview */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-primary" />
                    Your Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">{solvedCount}</div>
                      <div className="text-sm text-muted-foreground">Problems Solved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-warning">{attemptedCount}</div>
                      <div className="text-sm text-muted-foreground">Attempted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-muted-foreground">{notStartedCount}</div>
                      <div className="text-sm text-muted-foreground">Not Started</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{Math.round((solvedCount / (solvedCount + attemptedCount + notStartedCount)) * 100)}%</span>
                    </div>
                    <Progress value={(solvedCount / (solvedCount + attemptedCount + notStartedCount)) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Filters */}
              <Card className="border-muted">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Search problems..."
                          className="pl-10"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Difficulties</SelectItem>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="solved">Solved</SelectItem>
                        <SelectItem value="attempted">Attempted</SelectItem>
                        <SelectItem value="not-started">Not Started</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Problems List */}
              <div className="grid gap-4">
                {filteredProblems.map((problem) => (
                  <Card key={problem.id} className="border-muted hover:border-primary/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {problem.status === 'solved' ? (
                              <CheckCircle2 className="w-5 h-5 text-success" />
                            ) : problem.status === 'attempted' ? (
                              <AlertCircle className="w-5 h-5 text-warning" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold">{problem.title}</h3>
                              <Badge 
                                variant={
                                  problem.difficulty === 'Basic' ? 'default' :
                                  problem.difficulty === 'Medium' ? 'secondary' : 'destructive'
                                }
                                className="text-xs"
                              >
                                {problem.difficulty}
                              </Badge>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm text-muted-foreground">4.5/5</span>
                              </div>
                            </div>
                            
                            <p className="text-muted-foreground text-sm mb-3">{problem.description}</p>
                            
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>30 min</span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {problem.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            onClick={() => handleStartProblem(problem)}
                          >
                            {problem.status === 'solved' ? 'Review' : 
                             problem.status === 'attempted' ? 'Continue' : 'Start'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProblems.length === 0 && (
                <Card className="border-muted">
                  <CardContent className="p-12 text-center">
                    <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No problems found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search criteria or filters.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default Practice;
