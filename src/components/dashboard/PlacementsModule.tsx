import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, MessageCircle, FileText, Target, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const PlacementsModule = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsDialogOpen(true);
  };

  const selectedCategoryData = categories.find((c) => c.id === selectedCategory);
  const selectedResources = selectedCategory ? getResourcesByCategory(selectedCategory) : [];

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Placements Preparation</h2>
          <p className="text-muted-foreground mt-2">Access resources to ace your placement interviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            const categoryResources = getResourcesByCategory(category.id);
            return (
              <Card 
                key={category.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer h-[180px] flex flex-col"
                onClick={() => handleCategoryClick(category.id)}
              >
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
                <CardContent className="flex-1 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    {categoryResources.length > 0 ? "Click to view all resources" : "No resources yet"}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[95vw] md:max-w-3xl max-h-[85vh] md:max-h-[80vh] overflow-y-auto overflow-x-hidden w-full mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedCategoryData && (
                <>
                  <div className={`p-2 rounded-lg ${selectedCategoryData.color}`}>
                    {selectedCategoryData.icon && <selectedCategoryData.icon className="h-5 w-5" />}
                  </div>
                  <span>{selectedCategoryData.label}</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedResources.length} resource{selectedResources.length !== 1 ? "s" : ""} available
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {selectedResources.length > 0 ? (
              selectedResources.map((resource) => (
                <Card key={resource.id} className="border w-full">
                  <CardHeader className="w-full space-y-2">
                    <CardTitle className="text-base break-words leading-relaxed">{resource.title}</CardTitle>
                    {resource.description && (
                      <CardDescription className="whitespace-normal break-words leading-relaxed text-sm" style={{ wordWrap: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
                        {resource.description}
                      </CardDescription>
                    )}
                  </CardHeader>
                  {resource.link && (
                    <CardContent>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Resource
                        </a>
                      </Button>
                    </CardContent>
                  )}
                </Card>
              ))
            ) : (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No resources available in this category yet</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlacementsModule;