-- Allow users to delete their own public messages
CREATE POLICY "Users can delete own messages"
ON public.public_messages
FOR DELETE
USING (auth.uid() = sender_id);