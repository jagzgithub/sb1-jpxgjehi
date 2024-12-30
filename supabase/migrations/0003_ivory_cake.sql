/*
  # Add Notifications System
  
  1. New Tables
    - notifications
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - title (text)
      - message (text)
      - type (text)
      - read (boolean)
      - created_at (timestamptz)
  
  2. Security
    - Enable RLS on notifications table
    - Add policy for users to read their own notifications
  
  3. Functions
    - set_admin_user: Function to securely set admin role
*/

-- Create notifications table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Safely create notification policy
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'notifications' 
        AND policyname = 'Users can read own notifications'
    ) THEN
        CREATE POLICY "Users can read own notifications"
            ON public.notifications
            FOR SELECT
            TO authenticated
            USING (auth.uid() = user_id);
    END IF;
END $$;

-- Create function to safely update user role
CREATE OR REPLACE FUNCTION set_admin_user(p_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Get user ID from auth.users
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = p_email;

  -- Only proceed if user exists
  IF v_user_id IS NOT NULL THEN
    -- Update or insert role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_user_id, 'admin')
    ON CONFLICT (user_id)
    DO UPDATE SET role = 'admin';

    -- Create notification
    INSERT INTO public.notifications (
      user_id,
      title,
      message,
      type
    ) VALUES (
      v_user_id,
      'Admin Access Granted',
      'You have been granted admin access to the system.',
      'role_update'
    );
  END IF;
END;
$$;

-- Set admin user
SELECT set_admin_user('jagadambi@gmail.com');