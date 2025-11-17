import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, Calendar, Briefcase, MessageSquare, BookOpen, ArrowRight, Sparkles, Target, TrendingUp } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Briefcase,
      title: "Placement Prep",
      description: "Master interviews with company-specific guides and mock tests",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Calendar,
      title: "Campus Events",
      description: "Never miss workshops, tech talks, and placement drives",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      title: "Alumni Network",
      description: "Connect with industry professionals for mentorship",
      gradient: "from-orange-500 to-amber-500",
    },
    {
      icon: MessageSquare,
      title: "Message Board",
      description: "Collaborate and share with your campus community",
      gradient: "from-red-500 to-rose-500",
    },
    {
      icon: BookOpen,
      title: "Resources Hub",
      description: "Curated study materials and course recommendations",
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      icon: GraduationCap,
      title: "Announcements",
      description: "Stay ahead with timely updates and opportunities",
      gradient: "from-purple-500 to-pink-500",
    }
  ];

  const stats = [
    { value: "500+", label: "Active Students", icon: Target },
    { value: "100+", label: "Alumni Network", icon: Users },
    { value: "50+", label: "Top Companies", icon: Briefcase },
    { value: "95%", label: "Placement Rate", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-slide-up">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Your Gateway to Success</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight animate-scale-in">
              <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Campus
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Connect
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Elevate your campus experience with cutting-edge placement prep, 
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold"> alumni connections</span>, 
              and collaborative learning
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Button 
                size="lg" 
                className="text-lg px-8 py-7 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-2xl shadow-purple-500/50 group relative overflow-hidden"
                onClick={() => navigate("/auth")}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-7 border-2 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-24 animate-slide-up" style={{ animationDelay: "0.6s" }}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-2 group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10 mb-2 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Everything You Need
              </h2>
              <p className="text-gray-400 text-lg">Powerful features for your success journey</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card 
                    key={index}
                    className="group relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Gradient Background on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative p-8 space-y-4">
                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-2xl font-display font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Hover Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto">
            <Card className="relative bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-xl border border-white/20 overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
              
              <div className="relative p-12 md:p-16 text-center space-y-6">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                  <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                    Ready to Transform Your Future?
                  </span>
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Join thousands of students already accelerating their careers with Campus Connect
                </p>
                <Button 
                  size="lg" 
                  className="text-lg px-12 py-7 bg-white text-black hover:bg-gray-100 shadow-2xl shadow-white/20 group mt-8"
                  onClick={() => navigate("/auth")}
                >
                  <span className="flex items-center gap-2">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
