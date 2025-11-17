-- Enable realtime for public messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.public_messages;