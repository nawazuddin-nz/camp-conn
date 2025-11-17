import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import PlacementsAdmin from "@/components/admin/PlacementsAdmin";
import EventsAdmin from "@/components/admin/EventsAdmin";
import AlumniAdmin from "@/components/admin/AlumniAdmin";
import AnnouncementsAdmin from "@/components/admin/AnnouncementsAdmin";
import ResourcesAdmin from "@/components/admin/ResourcesAdmin";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please login to access admin panel");
        navigate("/auth");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");

      if (roles && roles.length > 0) {
        setIsAdmin(true);
      } else {
        toast.error("You don't have admin access");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error checking admin access:", error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Shield className="h-12 w-12 mx-auto text-primary animate-pulse" />
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-display font-bold">Admin Panel</h1>
          </div>
          <p className="text-muted-foreground">Manage all campus content and resources</p>
        </div>

        <Tabs defaultValue="placements" className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full max-w-4xl">
            <TabsTrigger value="placements">Placements</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="alumni">Alumni</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="placements">
            <Card>
              <CardHeader>
                <CardTitle>Placement Resources Management</CardTitle>
                <CardDescription>Add, edit, or remove placement preparation materials</CardDescription>
              </CardHeader>
              <CardContent>
                <PlacementsAdmin />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Events Management</CardTitle>
                <CardDescription>Manage campus events, workshops, and seminars</CardDescription>
              </CardHeader>
              <CardContent>
                <EventsAdmin />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alumni">
            <Card>
              <CardHeader>
                <CardTitle>Alumni Network Management</CardTitle>
                <CardDescription>Add and update alumni profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <AlumniAdmin />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements">
            <Card>
              <CardHeader>
                <CardTitle>Announcements Management</CardTitle>
                <CardDescription>Post and manage campus announcements</CardDescription>
              </CardHeader>
              <CardContent>
                <AnnouncementsAdmin />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Resources Management</CardTitle>
                <CardDescription>Manage study materials and learning resources</CardDescription>
              </CardHeader>
              <CardContent>
                <ResourcesAdmin />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
