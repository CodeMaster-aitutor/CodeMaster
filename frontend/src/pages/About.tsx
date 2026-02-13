import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code2, Rocket, Users, Target, Loader2, ArrowRight, Globe, Award, HeartHandshake, BookOpen, ShieldCheck, LineChart, GraduationCap, Star, MessageSquare } from 'lucide-react';

const About = () => {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    try {
      document.title = 'About | CodeMaster';
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
      upsertMeta('name', 'description', 'Learn about CodeMaster, our mission, and the team helping developers learn faster.');
      upsertMeta('property', 'og:title', 'About CodeMaster');
      upsertMeta('property', 'og:description', 'We build AI-powered tools that make coding education accessible and effective.');
      const timer = window.setTimeout(() => setStatus('ready'), 150);
      return () => window.clearTimeout(timer);
    } catch {
      setStatus('error');
    }
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Loading about...</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2">Unable to load about</h1>
          <p className="text-muted-foreground mb-6">Please refresh and try again.</p>
          <Button onClick={() => setStatus('ready')}>Try Again</Button>
        </Card>
      </div>
    );
  }

  const values = [
    {
      icon: Rocket,
      title: 'Accelerate Growth',
      description: 'We focus on tools that help learners move from practice to mastery faster.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We build collaborative spaces that support peer learning and mentorship.'
    },
    {
      icon: Target,
      title: 'Outcome Driven',
      description: 'Every feature is designed to improve real-world coding confidence.'
    },
    {
      icon: ShieldCheck,
      title: 'Trust & Safety',
      description: 'We protect learner data and keep feedback accurate, transparent, and reliable.'
    }
  ];

  const team = [
    { name: 'Tanmay Shinde', role: 'Founder & CEO', focus: 'Learning Experience' },
    { name: 'Jannat Shaikh', role: 'Head of Product', focus: 'AI Curriculum' },
    { name: 'Arshia Chandarki ', role: 'Engineering Lead', focus: 'Platform Scale' },
    { name: 'Ayushi Gautam', role: 'Community Lead', focus: 'Mentorship Programs' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg border-b border-border/20 bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">CodeMaster</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  window.location.assign("/");
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </a>
              <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
              <span className="text-foreground font-medium">About</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="font-medium">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="btn-primary">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 px-4 py-2 bg-primary/10 text-primary border-primary/20">Our Story</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Building the future of coding education</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            CodeMaster exists to make high-quality learning accessible. We combine interactive coding, AI guidance,
            and community support to help developers grow with confidence.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20">Mission</Badge>
            <h2 className="text-3xl font-bold">Make learning practical, personal, and measurable</h2>
            <p className="text-muted-foreground">
              We believe every developer deserves a path from curiosity to confident builder. CodeMaster blends
              interactive practice with AI coaching so learners can progress at their own pace while still
              getting expert-level guidance.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline">Real-world projects</Badge>
              <Badge variant="outline">Structured pathways</Badge>
              <Badge variant="outline">Community support</Badge>
            </div>
          </div>
          <Card className="card-glass p-8">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">120K+</div>
                <p className="text-sm text-muted-foreground mt-2">Active learners worldwide</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">1.8M</div>
                <p className="text-sm text-muted-foreground mt-2">Challenges solved</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">4.9/5</div>
                <p className="text-sm text-muted-foreground mt-2">Average learner rating</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">45+</div>
                <p className="text-sm text-muted-foreground mt-2">Skill pathways available</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <Card key={value.title} className="card-feature p-6">
              <value.icon className="w-10 h-10 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">{value.title}</h2>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">How CodeMaster helps you grow</h2>
            <p className="text-muted-foreground">A full learning loop designed for modern developers.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: 'Learn by doing',
                description: 'Hands-on challenges and guided projects tailored to your level.'
              },
              {
                icon: LineChart,
                title: 'Track mastery',
                description: 'Skill analytics show strengths, gaps, and your next best move.'
              },
              {
                icon: GraduationCap,
                title: 'Career readiness',
                description: 'Interview prep packs, mock assessments, and portfolio-ready work.'
              }
            ].map((item) => (
              <Card key={item.title} className="card-feature p-6">
                <item.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <Card className="card-glass p-8">
            <h2 className="text-2xl font-bold mb-4">Programs built for every learner</h2>
            <div className="space-y-4">
              {[
                {
                  icon: Globe,
                  title: 'Global cohorts',
                  description: 'Time-boxed learning sprints with live sessions and mentor feedback.'
                },
                {
                  icon: HeartHandshake,
                  title: 'Mentor office hours',
                  description: 'Weekly small-group sessions focused on problem-solving strategies.'
                },
                {
                  icon: Award,
                  title: 'Certification tracks',
                  description: 'Validate your skills with capstone assessments and shareable badges.'
                }
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{item.title}</div>
                    <div className="text-muted-foreground">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="card-feature p-8">
            <h2 className="text-2xl font-bold mb-4">Our timeline</h2>
            <div className="space-y-4">
              {[
                { year: '2021', detail: 'Founded with a mission to simplify coding education.' },
                { year: '2022', detail: 'Launched AI-guided learning paths and assessments.' },
                { year: '2023', detail: 'Expanded to global cohorts and mentorship programs.' },
                { year: '2024', detail: 'Introduced analytics dashboards and team learning tools.' }
              ].map((item) => (
                <div key={item.year} className="flex items-start gap-4">
                  <Badge variant="outline" className="min-w-[64px] justify-center">{item.year}</Badge>
                  <div className="text-sm text-muted-foreground">{item.detail}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Meet the team</h2>
            <p className="text-muted-foreground">A multidisciplinary group focused on learner success.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="card-feature p-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-semibold mb-4">
                  {member.name.split(' ').map((chunk) => chunk[0]).join('')}
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-2">{member.focus}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">What our community says</h2>
            <p className="text-muted-foreground">Stories from learners, mentors, and hiring partners.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Anika R.',
                role: 'Frontend Engineer',
                quote: 'The structured pathways gave me confidence to ship projects faster.'
              },
              {
                name: 'Brandon M.',
                role: 'Mentor',
                quote: 'The analytics make it easy to spot where learners need help.'
              },
              {
                name: 'Chen Y.',
                role: 'Engineering Manager',
                quote: 'Our team onboarding time dropped after adopting CodeMaster.'
              }
            ].map((item) => (
              <Card key={item.name} className="card-feature p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{item.role}</span>
                </div>
                <p className="text-sm text-muted-foreground">"{item.quote}"</p>
                <div className="mt-4 font-semibold">{item.name}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <Card className="card-feature p-8">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">FAQs</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: 'Is CodeMaster suitable for beginners?',
                  a: 'Yes. We offer guided pathways that start from fundamentals and build up.'
                },
                {
                  q: 'Do you offer team plans?',
                  a: 'We support teams with shared analytics, cohort tools, and dedicated support.'
                },
                {
                  q: 'How do AI explanations work?',
                  a: 'AI insights are paired with curated curriculum and human-reviewed feedback.'
                }
              ].map((item) => (
                <div key={item.q} className="border border-border/40 rounded-lg p-4 bg-background/50">
                  <div className="font-semibold">{item.q}</div>
                  <div className="text-sm text-muted-foreground mt-2">{item.a}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="card-glass p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to build with us?</h2>
            <p className="text-muted-foreground mb-6">
              Join the community, explore our pricing, or connect with our team to learn how we can help you grow.
            </p>
            <div className="space-y-3">
              <Link to="/signup">
                <Button className="w-full btn-primary text-white">
                  Join CodeMaster
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="w-full">Explore Pricing</Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="card-glass p-10">
            <h2 className="text-3xl font-bold mb-4">Help us shape the future</h2>
            <p className="text-muted-foreground mb-6">
              Partner with CodeMaster to bring modern coding education to your learners or team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="btn-hero text-white">
                  Join the Community
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline">View Pricing</Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
