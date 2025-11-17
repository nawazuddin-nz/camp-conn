import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { LogOut, BookOpen, Calendar, Users, Bell, FileText, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import PlacementsModule from "@/components/dashboard/PlacementsModule";
import EventsModule from "@/components/dashboard/EventsModule";
import AlumniModule from "@/components/dashboard/AlumniModule";
import AnnouncementsModule from "@/components/dashboard/AnnouncementsModule";
import ResourcesModule from "@/components/dashboard/ResourcesModule";
import MessagesModule from "@/components/dashboard/MessagesModule";

type ModuleType = "placements" | "events" | "alumni" | "announcements" | "resources" | "messages";

const Dashboard = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [activeModule, setActiveModule] = useState<ModuleType>("placements");
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      } else {
        fetchProfile(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      } else {
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    setProfile(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully!");
    navigate("/auth");
  };

  const modules = [
    { id: "placements", label: "Placements Preparation", icon: BookOpen, color: "from-blue-500 to-blue-600" },
    { id: "events", label: "Student Events", icon: Calendar, color: "from-green-500 to-green-600" },
    { id: "alumni", label: "Alumni Network", icon: Users, color: "from-orange-500 to-orange-600" },
    { id: "announcements", label: "Announcements", icon: Bell, color: "from-purple-500 to-purple-600" },
    { id: "resources", label: "Resources", icon: FileText, color: "from-teal-500 to-teal-600" },
    { id: "messages", label: "Messages", icon: MessageSquare, color: "from-red-500 to-red-600" },
  ];

  if (!session) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">Campus Connect</h1>
          {profile && (
            <div className="mt-4">
              <p className="text-sm font-medium text-foreground">{profile.name}</p>
              <p className="text-xs text-muted-foreground">{profile.usn}</p>
            </div>
          )}
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id as ModuleType)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeModule === module.id
                    ? `bg-gradient-to-r ${module.color} text-white shadow-lg`
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{module.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {activeModule === "placements" && <PlacementsModule />}
          {activeModule === "events" && <EventsModule />}
          {activeModule === "alumni" && <AlumniModule />}
          {activeModule === "announcements" && <AnnouncementsModule />}
          {activeModule === "resources" && <ResourcesModule />}
          {activeModule === "messages" && <MessagesModule profile={profile} />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;