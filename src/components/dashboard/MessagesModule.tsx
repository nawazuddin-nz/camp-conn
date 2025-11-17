import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

interface MessagesModuleProps {
  profile: any;
}

const MessagesModule = ({ profile }: MessagesModuleProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (profile) {
      fetchMessages();
      
      // Subscribe to real-time updates
      const channel = supabase
        .channel('public-messages')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'public_messages'
          },
          () => fetchMessages()
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [profile]);

  const fetchMessages = async () => {
    if (!profile) return;
    
    const { data } = await supabase
      .from("public_messages")
      .select(`
        *,
        sender:profiles!public_messages_sender_id_fkey(*)
      `)
      .order("created_at", { ascending: false })
      .limit(100);
    
    setMessages(data || []);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const { error } = await supabase.from("public_messages").insert({
      sender_id: profile.id,
      content: newMessage,
    });

    if (error) {
      toast.error("Failed to send message");
    } else {
      setNewMessage("");
      toast.success("Message sent!");
    }
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
        <h2 className="text-3xl font-bold text-foreground">Public Message Board</h2>
        <p className="text-muted-foreground mt-2">Share updates and connect with everyone</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post a Message</CardTitle>
          <CardDescription>Your message will be visible to all users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Textarea
              placeholder="What's on your mind?"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="min-h-[80px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <Button onClick={sendMessage} className="self-end">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
          <CardDescription>Latest messages from the community</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="flex gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={message.sender?.avatar_url} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(message.sender?.name || "Unknown")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{message.sender?.name || "Unknown"}</p>
                      <span className="text-xs text-muted-foreground">•</span>
                      <p className="text-xs text-muted-foreground">{message.sender?.usn}</p>
                      <span className="text-xs text-muted-foreground">•</span>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(message.created_at), "MMM d, yyyy 'at' h:mm a")}
                      </p>
                    </div>
                    <p className="text-sm text-foreground whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No messages yet. Be the first to post!</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesModule;