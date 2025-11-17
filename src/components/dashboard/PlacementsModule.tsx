import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, MessageCircle, FileText, Target } from "lucide-react";

const PlacementsModule = () => {
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    const { data } = await supabase
      .from("placements_resources")
      .select("*")
      .order("created_at", { ascending: false });
    setResources(data || []);
  };

  const categories = [
    { id: "reasoning", label: "Reasoning", icon: Brain, color: "bg-blue-100 text-blue-700" },
    { id: "verbal", label: "Verbal", icon: MessageCircle, color: "bg-green-100 text-green-700" },
    { id: "quantitative", label: "Quantitative", icon: Target, color: "bg-purple-100 text-purple-700" },
    { id: "mock_interviews", label: "Mock Interviews", icon: MessageCircle, color: "bg-orange-100 text-orange-700" },
    { id: "study_materials", label: "Study Materials", icon: FileText, color: "bg-teal-100 text-teal-700" },
  ];

  const getResourcesByCategory = (category: string) => {
    return resources.filter((r) => r.category === category);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Placements Preparation</h2>
        <p className="text-muted-foreground mt-2">Access resources to ace your placement interviews</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          const categoryResources = getResourcesByCategory(category.id);
          return (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${category.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>{category.label}</CardTitle>
                    <CardDescription>{categoryResources.length} resources</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {categoryResources.length > 0 ? (
                  categoryResources.slice(0, 3).map((resource) => (
                    <div key={resource.id} className="p-3 bg-muted rounded-lg">
                      <h4 className="font-medium text-sm text-foreground">{resource.title}</h4>
                      {resource.description && (
                        <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                      )}
                      {resource.link && (
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline mt-2 inline-block"
                        >
                          View Resource →
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No resources yet</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PlacementsModule;