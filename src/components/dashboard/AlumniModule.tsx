import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building, Mail, Linkedin, GraduationCap } from "lucide-react";

const AlumniModule = () => {
  const [alumni, setAlumni] = useState<any[]>([]);

  useEffect(() => {
    fetchAlumni();
  }, []);

  const fetchAlumni = async () => {
    const { data } = await supabase
      .from("alumni")
      .select("*")
      .order("graduation_year", { ascending: false });
    setAlumni(data || []);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Alumni Network</h2>
        <p className="text-muted-foreground mt-2">Connect with our successful alumni</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alumni.length > 0 ? (
          alumni.map((alum) => (
            <Card key={alum.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={alum.avatar_url} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(alum.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{alum.name}</CardTitle>
                    <CardDescription>
                      {alum.role} {alum.company && `at ${alum.company}`}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {alum.bio && <p className="text-sm text-muted-foreground">{alum.bio}</p>}
                <div className="space-y-2">
                  {alum.graduation_year && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      <span>Class of {alum.graduation_year}</span>
                    </div>
                  )}
                  {alum.company && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building className="h-4 w-4" />
                      <span>{alum.company}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 pt-2">
                  {alum.email && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={`mailto:${alum.email}`}>
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </a>
                    </Button>
                  )}
                  {alum.linkedin_url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={alum.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-1" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No alumni profiles yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AlumniModule;