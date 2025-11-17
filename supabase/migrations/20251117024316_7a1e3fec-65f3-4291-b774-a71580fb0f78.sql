-- Create public messages table for message board
CREATE TABLE public.public_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.public_messages ENABLE ROW LEVEL SECURITY;

-- Everyone can view all public messages
CREATE POLICY "Anyone can view public messages" 
ON public.public_messages 
FOR SELECT 
USING (true);

-- Authenticated users can send public messages
CREATE POLICY "Authenticated users can send public messages" 
ON public.public_messages 
FOR INSERT 
WITH CHECK (auth.uid() = sender_id);

-- Add index for better performance
CREATE INDEX idx_public_messages_created_at ON public.public_messages(created_at DESC);