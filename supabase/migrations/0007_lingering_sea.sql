/*
  # Assign Admin Role
  
  1. Purpose
    - Ensure jagadambi@gmail.com has admin role
    - Add secure function to manage admin users
  
  2. Changes
    - Add function to assign admin role
    - Set jagadambi@gmail.com as admin
*/

-- Create secure function to assign admin role
CREATE OR REPLACE FUNCTION assign_admin_role(p_email text)
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
        -- Update or insert admin role
        INSERT INTO user_roles (user_id, role)
        VALUES (v_user_id, 'admin')
        ON CONFLICT (user_id) 
        DO UPDATE SET role = 'admin'
        WHERE user_roles.user_id = v_user_id;

        -- Create notification for user
        INSERT INTO notifications (
            user_id,
            title,
            message,
            type
        ) VALUES (
            v_user_id,
            'Admin Role Assigned',
            'You have been assigned the admin role.',
            'role_update'
        );
    END IF;
END;
$$;

-- Assign admin role to jagadambi@gmail.com
SELECT assign_admin_role('jagadambi@gmail.com');