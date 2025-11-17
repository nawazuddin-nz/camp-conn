import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Users, Calendar, Briefcase, MessageSquare, BookOpen } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Briefcase,
      title: "Placement Preparation",
      description: "Access comprehensive resources, interview guides, and company-specific preparation materials",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Calendar,
      title: "Campus Events",
      description: "Stay updated with workshops, seminars, tech talks, and placement drives happening on campus",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: Users,
      title: "Alumni Network",
      description: "Connect with successful alumni working in top companies worldwide for guidance and mentorship",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      icon: MessageSquare,
      title: "Public Message Board",
      description: "Share updates, ask questions, and collaborate with your peers in the community message board",
      color: "text-red-500",
      bgColor: "bg-red-500/10"
    },
    {
      icon: BookOpen,
      title: "Learning Resources",
      description: "Explore curated study materials, video tutorials, and recommended courses for skill development",
      color: "text-teal-500",
      bgColor: "bg-teal-500/10"
    },
    {
      icon: GraduationCap,
      title: "Announcements",
      description: "Never miss important updates, deadlines, and opportunities shared by the placement cell",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-4xl mx-auto mb-20">
          <div className="inline-block animate-fade-in">
            <GraduationCap className="h-20 w-20 mx-auto text-primary mb-4" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-fade-in">
            Campus Connect
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Your all-in-one platform for placement preparation, alumni networking, and campus collaboration
          </p>
          <div className="flex gap-4 justify-center pt-6 animate-fade-in">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              onClick={() => navigate("/auth")}
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className={`${feature.bgColor} w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Alumni</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Companies</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Placement Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
