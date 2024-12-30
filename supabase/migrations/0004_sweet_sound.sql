/*
  # Ensure Admin Access
  
  1. Purpose
    - Ensure jagadambi@gmail.com has admin role
    - Add additional admin policies
  
  2. Changes
    - Call set_admin_user function
    - Add admin-specific policies
*/

-- Ensure admin user is set
SELECT set_admin_user('jagadambi@gmail.com');

-- Add admin-specific policies
DO $$ 
BEGIN
    -- Policy for admin to manage all notifications
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'notifications' 
        AND policyname = 'Admins can manage all notifications'
    ) THEN
        CREATE POLICY "Admins can manage all notifications"
            ON public.notifications
            FOR ALL
            TO authenticated
            USING (
                EXISTS (
                    SELECT 1 FROM user_roles
                    WHERE user_id = auth.uid()
                    AND role = 'admin'
                )
            );
    END IF;
END $$;