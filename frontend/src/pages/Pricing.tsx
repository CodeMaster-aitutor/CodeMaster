import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, Sparkles, ArrowRight, Loader2, Code2 } from 'lucide-react';

const Pricing = () => {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    try {
      document.title = 'Pricing | CodeMaster';
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
      upsertMeta('name', 'description', 'Compare CodeMaster plans and choose the right tier for your learning journey.');
      upsertMeta('property', 'og:title', 'CodeMaster Pricing');
      upsertMeta('property', 'og:description', 'Transparent pricing with powerful features for learners and teams.');
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
        <span className="ml-3 text-muted-foreground">Loading pricing...</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2">Unable to load pricing</h1>
          <p className="text-muted-foreground mb-6">Please refresh and try again.</p>
          <Button onClick={() => setStatus('ready')}>Try Again</Button>
        </Card>
      </div>
    );
  }

  const tiers = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started.',
      features: ['5 challenges per day', 'Basic compiler access', 'Community support', 'Progress tracking'],
      cta: 'Get Started',
      variant: 'outline' as const
    },
    {
      name: 'Pro',
      price: '$19',
      description: 'Accelerate your learning with AI.',
      features: ['Unlimited challenges', 'AI code explanations', 'Code generation', 'Priority support', 'Advanced analytics'],
      cta: 'Start Pro',
      variant: 'default' as const,
      highlight: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      description: 'Best for teams and organizations.',
      features: ['Everything in Pro', 'Team workspaces', 'Custom learning paths', 'Dedicated support', 'SLA coverage'],
      cta: 'Contact Sales',
      variant: 'outline' as const
    }
  ];

  const comparisons = [
    { name: 'Daily challenges', free: '5', pro: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'AI explanations', free: false, pro: true, enterprise: true },
    { name: 'Code generation', free: false, pro: true, enterprise: true },
    { name: 'Analytics dashboard', free: 'Basic', pro: 'Advanced', enterprise: 'Advanced + Team' },
    { name: 'Support', free: 'Community', pro: 'Priority', enterprise: 'Dedicated' }
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
              <span className="text-foreground font-medium">Pricing</span>
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
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
          <Badge className="mb-6 px-4 py-2 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Transparent Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Choose a plan that grows with you</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Start for free, upgrade when you are ready, and scale to enterprise with advanced collaboration and insights.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <Card key={tier.name} className={`card-feature ${tier.highlight ? 'border-primary relative' : ''}`}>
              {tier.highlight ? (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              ) : null}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{tier.name}</h2>
                <div className="text-4xl font-bold mb-3">
                  {tier.price}
                  <span className="text-base text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-success mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/signup">
                  <Button className={`w-full ${tier.highlight ? 'btn-primary text-white' : ''}`} variant={tier.variant}>
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Compare features</h2>
            <p className="text-muted-foreground">See exactly what you get at every tier.</p>
          </div>
          <Card className="card-glass">
            <div className="p-6 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Feature</TableHead>
                    <TableHead>Free</TableHead>
                    <TableHead>Pro</TableHead>
                    <TableHead>Enterprise</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comparisons.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell>
                        {typeof row.free === 'boolean' ? (
                          row.free ? <CheckCircle className="w-4 h-4 text-success" /> : <XCircle className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          row.free
                        )}
                      </TableCell>
                      <TableCell>
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? <CheckCircle className="w-4 h-4 text-success" /> : <XCircle className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          row.pro
                        )}
                      </TableCell>
                      <TableCell>
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? <CheckCircle className="w-4 h-4 text-success" /> : <XCircle className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          row.enterprise
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="card-glass p-10">
            <h2 className="text-3xl font-bold mb-4">Ready to upgrade your learning?</h2>
            <p className="text-muted-foreground mb-6">
              Start with Pro and unlock AI-powered insights that accelerate your progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="btn-hero text-white">
                  Start Pro Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline">Learn More About Us</Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
