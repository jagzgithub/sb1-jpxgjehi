/*
  # Fix Admin Role Access
  
  1. Purpose
    - Ensure admin role is properly set
    - Add necessary admin policies
    - Fix role-based access control
  
  2. Changes
    - Add admin policies for user_roles table
    - Ensure admin user exists
    - Add function to check admin status
*/

-- Add admin-specific policies
DO $$ 
BEGIN
    -- Policy for admins to manage all user roles
    DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;
    
    CREATE POLICY "Admins can manage all roles"
        ON user_roles
        FOR ALL
        TO authenticated
        USING (
            EXISTS (
                SELECT 1 FROM user_roles
                WHERE user_id = auth.uid()
                AND role = 'admin'
            )
        );
END $$;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = $1
        AND role = 'admin'
    );
END;
$$;

-- Ensure admin user exists and has proper role
DO $$ 
DECLARE
    v_user_id uuid;
BEGIN
    -- Get user ID for the admin email
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE email = 'jagadambi@gmail.com';

    -- If user exists, ensure they have admin role
    IF v_user_id IS NOT NULL THEN
        INSERT INTO user_roles (user_id, role)
        VALUES (v_user_id, 'admin')
        ON CONFLICT (user_id) 
        DO UPDATE SET role = 'admin';
    END IF;
END $$;