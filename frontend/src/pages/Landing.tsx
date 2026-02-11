import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code2, 
  Brain, 
  Zap, 
  Users, 
  Trophy, 
  Target,
  Play,
  Sparkles,
  Rocket,
  Star,
  CheckCircle,
  ArrowRight,
  Book,
  Cpu,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  console.log('Landing page is rendering...');
  const features = [
    {
      icon: Code2,
      title: "Interactive Compiler",
      description: "Write, run, and debug code in real-time with support for multiple programming languages",
      color: "text-primary"
    },
    {
      icon: Brain,
      title: "AI Code Explainer",
      description: "Get instant explanations for complex code snippets with detailed breakdowns",
      color: "text-accent"
    },
    {
      icon: Zap,
      title: "Code Generation",
      description: "Generate optimized code from natural language descriptions using advanced AI",
      color: "text-warning"
    },
    {
      icon: Book,
      title: "Structured Learning",
      description: "Follow curated learning paths tailored to your skill level and goals",
      color: "text-info"
    },
    {
      icon: Target,
      title: "Practice Arena",
      description: "Solve coding challenges that adapt to your skill level and track your progress",
      color: "text-success"
    },
    {
      icon: Trophy,
      title: "Skill Assessment",
      description: "Take AI-generated tests to advance through skill levels and earn achievements",
      color: "text-primary"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Learners" },
    { number: "50+", label: "Coding Challenges" },
    { number: "5", label: "Programming Languages" },
    { number: "95%", label: "Success Rate" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      content: "This platform helped me transition from beginner to advanced level in just 6 months!",
      avatar: "SC"
    },
    {
      name: "Mark Johnson",
      role: "Computer Science Student",
      content: "The AI explanations make complex algorithms so much easier to understand.",
      avatar: "MJ"
    },
    {
      name: "Alex Rodriguez",
      role: "Full-Stack Developer",
      content: "Perfect for practicing coding interviews and improving problem-solving skills.",
      avatar: "AR"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg border-b border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">CodeMaster</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="fade-in">
            <Badge className="mb-6 px-4 py-2 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Learning Platform
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Master Coding
              <br />
              <span className="animate-gradient bg-gradient-to-r from-accent to-primary bg-clip-text">
                With AI
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your coding skills with our interactive platform featuring AI-powered explanations, 
              real-time compilation, and personalized learning paths designed for every skill level.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="btn-hero text-white">
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Learning Free
                </Button>
              </Link>
              <Button variant="outline" className="px-8 py-4 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need to become a coding expert</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-feature group">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">Join thousands of developers who've accelerated their learning</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-feature">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that fits your learning journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="card-feature">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="text-3xl font-bold mb-4">$0<span className="text-lg text-muted-foreground">/month</span></div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />5 Challenges per day</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Basic compiler access</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Community support</li>
                </ul>
                <Link to="/signup">
                  <Button className="w-full" variant="outline">Get Started</Button>
                </Link>
              </div>
            </Card>

            {/* Pro Plan */}
            <Card className="card-feature border-primary relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-3xl font-bold mb-4">$19<span className="text-lg text-muted-foreground">/month</span></div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Unlimited challenges</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />AI code explanations</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Code generation</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Priority support</li>
                </ul>
                <Link to="/signup">
                  <Button className="w-full btn-primary text-white">Upgrade to Pro</Button>
                </Link>
              </div>
            </Card>

            {/* Enterprise Plan */}
            <Card className="card-feature">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <div className="text-3xl font-bold mb-4">$99<span className="text-lg text-muted-foreground">/month</span></div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Everything in Pro</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Team collaboration</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Advanced analytics</li>
                  <li className="flex items-center"><CheckCircle className="w-5 h-5 text-success mr-2" />Dedicated support</li>
                </ul>
                <Button className="w-full" variant="outline">Contact Sales</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="card-glass p-12">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Your Coding Journey?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers who are already improving their skills with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button className="btn-hero text-white">
                  Start Learning Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" className="px-8 py-4 text-lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Talk to Sales
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">CodeMaster</span>
              </div>
              <p className="text-muted-foreground">
                Empowering developers with AI-powered learning tools and interactive coding experiences.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border/20 text-center text-muted-foreground">
            <p>&copy; 2024 CodeMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;