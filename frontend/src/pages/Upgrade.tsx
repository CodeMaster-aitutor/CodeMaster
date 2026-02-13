import React, { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Sparkles, ArrowRight, Loader2, Zap, Brain, Trophy, Users, Target, BookOpen, MessageSquare, Star, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Upgrade = () => {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    try {
      document.title = 'Upgrade to Pro | CodeMaster';
      const upsertMeta = (attr: 'name' | 'property', key: string, value: string) => {
        const selector = `meta[${attr}="${key}"]`;
        const existing = document.querySelector(selector);
        const element = existing ?? document.createElement('meta');
        element.setAttribute(attr, key);
        element.setAttribute('content', value);
        if (!existing) {
          document.head.appendChild(element);
        }
      };
      upsertMeta('name', 'description', 'Upgrade to CodeMaster Pro for unlimited challenges and AI-powered guidance.');
      upsertMeta('property', 'og:title', 'Upgrade to Pro');
      upsertMeta('property', 'og:description', 'Unlock AI explanations, code generation, and advanced analytics.');
      const timer = window.setTimeout(() => setStatus('ready'), 150);
      return () => window.clearTimeout(timer);
    } catch {
      setStatus('error');
    }
  }, []);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-10">
        {status === 'loading' && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Loading upgrade options...</span>
          </div>
        )}

        {status === 'error' && (
          <Card className="p-8 text-center max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-2">Unable to load upgrade page</h1>
            <p className="text-muted-foreground mb-6">Please refresh and try again.</p>
            <Button onClick={() => setStatus('ready')}>Try Again</Button>
          </Card>
        )}

        {status === 'ready' && (
          <>
            <div className="text-center space-y-3">
              <Badge className="px-4 py-2 bg-primary/10 text-primary border-primary/20 inline-flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold">Unlock every tool to learn faster</h1>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Pro removes daily limits and adds AI features, deep analytics, and premium support for your learning journey.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="card-feature p-6">
                <Zap className="w-10 h-10 text-warning mb-4" />
                <h2 className="text-xl font-semibold mb-2">Unlimited practice</h2>
                <p className="text-muted-foreground">Solve as many challenges as you want, any time.</p>
              </Card>
              <Card className="card-feature p-6">
                <Brain className="w-10 h-10 text-accent mb-4" />
                <h2 className="text-xl font-semibold mb-2">AI guidance</h2>
                <p className="text-muted-foreground">Get instant explanations and code generation tailored to your style.</p>
              </Card>
              <Card className="card-feature p-6">
                <Trophy className="w-10 h-10 text-primary mb-4" />
                <h2 className="text-xl font-semibold mb-2">Advanced insights</h2>
                <p className="text-muted-foreground">Track mastery, streaks, and personalized recommendations.</p>
              </Card>
            </div>

            <Card className="card-glass p-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">4x</div>
                  <p className="text-sm text-muted-foreground mt-2">Faster learning cycles with AI feedback</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <p className="text-sm text-muted-foreground mt-2">Always-on guidance and smart hints</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">120+</div>
                  <p className="text-sm text-muted-foreground mt-2">Curated challenges and projects</p>
                </div>
              </div>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="card-feature p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Personalized roadmap</h2>
                    <p className="text-muted-foreground">
                      Pro builds a skill map based on your goals, then recommends next-step challenges, projects, and
                      reviews to keep you progressing steadily.
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="card-feature p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Project playbooks</h2>
                    <p className="text-muted-foreground">
                      Step-by-step guidance for building real-world apps with checkpoints, code reviews, and best
                      practices that match your level.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="card-glass p-8">
              <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Everything in Free, plus:</h2>
                  <ul className="space-y-3">
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-success mr-2" />
                      Unlimited AI explanations and solutions
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-success mr-2" />
                      Code generation for projects and interviews
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-success mr-2" />
                      Advanced analytics and performance reports
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-success mr-2" />
                      Priority support and roadmap access
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-success mr-2" />
                      Team collaboration tools
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-success mr-2" />
                      Interview prep packs and mock assessments
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-success mr-2" />
                      Personalized streak recovery guidance
                    </li>
                  </ul>
                </div>
                <div className="bg-background/70 border border-border/40 rounded-xl p-6 text-center">
                  <div className="text-4xl font-bold mb-2">$19</div>
                  <div className="text-sm text-muted-foreground mb-6">per month, billed monthly</div>
                  <div className="space-y-3">
                    <Link to="/signup">
                      <Button className="w-full btn-primary text-white">
                        Start Pro Trial
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full">Talk to Sales</Button>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
                    <Users className="w-4 h-4" />
                    Trusted by 10K+ learners
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="card-feature p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Priority support</h3>
                </div>
                <p className="text-muted-foreground">
                  Get direct answers, curated resources, and fast turnaround from the CodeMaster team.
                </p>
              </Card>
              <Card className="card-feature p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="w-6 h-6 text-success" />
                  <h3 className="text-lg font-semibold">Reliable & secure</h3>
                </div>
                <p className="text-muted-foreground">
                  Keep your projects and learning history protected with secure storage and privacy-first policies.
                </p>
              </Card>
              <Card className="card-feature p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-warning" />
                  <h3 className="text-lg font-semibold">Always available</h3>
                </div>
                <p className="text-muted-foreground">
                  Learn on your schedule with real-time compiler support and instant feedback.
                </p>
              </Card>
            </div>

            <Card className="card-glass p-8">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">What learners say</h2>
                  <p className="text-muted-foreground">Pro members consistently hit milestones faster.</p>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20">Average rating 4.9</Badge>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    name: 'Samir K.',
                    focus: 'Interview prep',
                    quote: 'The AI explanations helped me finally understand DP patterns.'
                  },
                  {
                    name: 'Lena W.',
                    focus: 'Career switch',
                    quote: 'The roadmap kept me consistent and the projects built my portfolio.'
                  },
                  {
                    name: 'Rafael D.',
                    focus: 'Team lead',
                    quote: 'Analytics made it easy to see where our cohort needed help.'
                  }
                ].map((item) => (
                  <Card key={item.name} className="card-feature p-5">
                    <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      {item.focus}
                    </div>
                    <p className="text-sm text-muted-foreground">"{item.quote}"</p>
                    <div className="mt-4 text-sm font-semibold">{item.name}</div>
                  </Card>
                ))}
              </div>
            </Card>

            <Card className="card-feature p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-3">Upgrade FAQ</h2>
                  <p className="text-muted-foreground">
                    Everything you need to know before upgrading.
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      q: 'Can I cancel anytime?',
                      a: 'Yes. Your plan stays active until the end of the billing period.'
                    },
                    {
                      q: 'Do I keep my progress?',
                      a: 'All your progress, streaks, and analytics are saved when you upgrade.'
                    },
                    {
                      q: 'Is there a team option?',
                      a: 'Yes. Contact sales for team billing and shared analytics.'
                    }
                  ].map((item) => (
                    <div key={item.q} className="border border-border/40 rounded-lg p-4 bg-background/50">
                      <div className="font-semibold">{item.q}</div>
                      <div className="text-sm text-muted-foreground mt-2">{item.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Upgrade;
