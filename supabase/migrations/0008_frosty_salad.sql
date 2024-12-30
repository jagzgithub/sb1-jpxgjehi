/*
  # Fix Admin Access
  
  1. Purpose
    - Fix admin role verification
    - Add secure functions for role management
    - Ensure proper admin access
  
  2. Changes
    - Add function to verify admin status
    - Update role verification logic
    - Re-assign admin role with proper checks
*/

-- Drop existing admin check function if exists
DROP FUNCTION IF EXISTS is_admin;

-- Create more secure admin check function
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM user_roles 
        WHERE user_roles.user_id = $1 
        AND role = 'admin'::user_role
    );
END;
$$;

-- Create function to force refresh user role
CREATE OR REPLACE FUNCTION refresh_user_role(p_user_id uuid)
RETURNS user_role
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_role user_role;
BEGIN
    SELECT role INTO v_role
    FROM user_roles
    WHERE user_id = p_user_id;
    
    RETURN v_role;
END;
$$;

-- Ensure admin role is properly set
DO $$
DECLARE
    v_user_id uuid;
BEGIN
    -- Get admin user ID
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE email = 'jagadambi@gmail.com';

    IF v_user_id IS NOT NULL THEN
        -- Force update admin role
        DELETE FROM user_roles WHERE user_id = v_user_id;
        
        INSERT INTO user_roles (user_id, role)
        VALUES (v_user_id, 'admin'::user_role);
        
        -- Create confirmation notification
        INSERT INTO notifications (
            user_id,
            title,
            message,
            type
        ) VALUES (
            v_user_id,
            'Admin Access Verified',
            'Your admin access has been verified and updated.',
            'role_update'
        );
    END IF;
END $$;