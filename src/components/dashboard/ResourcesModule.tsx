import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Link as LinkIcon, Video, Download } from "lucide-react";

const ResourcesModule = () => {
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    const { data } = await supabase
      .from("resources")
      .select("*")
      .order("created_at", { ascending: false });
    setResources(data || []);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
      case "document":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "link":
        return <LinkIcon className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
      case "document":
        return "bg-red-100 text-red-700";
      case "video":
        return "bg-purple-100 text-purple-700";
      case "link":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const groupedResources = resources.reduce((acc, resource) => {
    const category = resource.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(resource);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Resources</h2>
        <p className="text-muted-foreground mt-2">Access study materials and helpful guides</p>
      </div>

      {Object.keys(groupedResources).length > 0 ? (
        (Object.entries(groupedResources) as [string, any[]][]).map(([category, items]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                        {getTypeIcon(resource.type)}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-base">{resource.title}</CardTitle>
                        {resource.description && (
                          <CardDescription className="mt-1">{resource.description}</CardDescription>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  {resource.url && (
                    <CardContent>
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          Access Resource
                        </a>
                      </Button>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        ))
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No resources yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResourcesModule;