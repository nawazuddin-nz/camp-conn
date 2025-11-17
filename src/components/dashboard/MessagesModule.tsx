import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface MessagesModuleProps {
  profile: any;
}

const MessagesModule = ({ profile }: MessagesModuleProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (profile) {
      fetchContacts();
      fetchMessages();
    }
  }, [profile]);

  const fetchContacts = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .neq("id", profile.id);
    setContacts(data || []);
  };

  const fetchMessages = async () => {
    if (!profile) return;
    
    const { data } = await supabase
      .from("messages")
      .select(`
        *,
        sender:profiles!messages_sender_id_fkey(*),
        receiver:profiles!messages_receiver_id_fkey(*)
      `)
      .or(`sender_id.eq.${profile.id},receiver_id.eq.${profile.id}`)
      .order("created_at", { ascending: true });
    
    setMessages(data || []);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedContact) return;

    const { error } = await supabase.from("messages").insert({
      sender_id: profile.id,
      receiver_id: selectedContact.id,
      content: newMessage,
    });

    if (error) {
      toast.error("Failed to send message");
    } else {
      setNewMessage("");
      fetchMessages();
      toast.success("Message sent!");
    }
  };

  const getConversationMessages = () => {
    if (!selectedContact) return [];
    return messages.filter(
      (m) =>
        (m.sender_id === profile.id && m.receiver_id === selectedContact.id) ||
        (m.sender_id === selectedContact.id && m.receiver_id === profile.id)
    );
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
        <h2 className="text-3xl font-bold text-foreground">Messages</h2>
        <p className="text-muted-foreground mt-2">Connect with your peers</p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Contacts List */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
            <CardDescription>Select a contact to message</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-muted transition-colors border-b ${
                    selectedContact?.id === contact.id ? "bg-muted" : ""
                  }`}
                >
                  <Avatar>
                    <AvatarImage src={contact.avatar_url} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(contact.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left flex-1">
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-xs text-muted-foreground">{contact.usn}</p>
                  </div>
                </button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="col-span-8">
          {selectedContact ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedContact.avatar_url} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(selectedContact.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{selectedContact.name}</CardTitle>
                    <CardDescription>{selectedContact.usn}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px] p-6">
                  <div className="space-y-4">
                    {getConversationMessages().map((message) => {
                      const isSender = message.sender_id === profile.id;
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              isSender
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                isSender ? "text-primary-foreground/70" : "text-muted-foreground"
                              }`}
                            >
                              {format(new Date(message.created_at), "p")}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button onClick={sendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="h-[600px] flex items-center justify-center">
              <p className="text-muted-foreground">Select a contact to start messaging</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MessagesModule;