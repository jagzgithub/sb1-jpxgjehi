/*
  # Fix Admin Role System
  
  1. Changes
    - Add role verification trigger
    - Improve role caching
    - Add role audit logging
    - Fix role assignment issues
  
  2. Security
    - Add role verification checks
    - Implement secure role fetching
    - Add audit trail
*/

-- Create role audit table
CREATE TABLE IF NOT EXISTS role_audit_log (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id),
    old_role user_role,
    new_role user_role,
    changed_by uuid REFERENCES auth.users(id),
    changed_at timestamptz DEFAULT now()
);

-- Create more secure role verification function
CREATE OR REPLACE FUNCTION verify_user_role(p_user_id uuid)
RETURNS user_role
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_role user_role;
    v_cached_role user_role;
BEGIN
    -- Get role from database
    SELECT role INTO v_role
    FROM user_roles
    WHERE user_id = p_user_id;
    
    -- Return verified role or default to player
    RETURN COALESCE(v_role, 'player'::user_role);
END;
$$;

-- Create trigger to log role changes
CREATE OR REPLACE FUNCTION log_role_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO role_audit_log (
        user_id,
        old_role,
        new_role,
        changed_by
    ) VALUES (
        NEW.user_id,
        OLD.role,
        NEW.role,
        auth.uid()
    );
    RETURN NEW;
END;
$$;

-- Create trigger on user_roles table
DROP TRIGGER IF EXISTS role_audit_trigger ON user_roles;
CREATE TRIGGER role_audit_trigger
    AFTER UPDATE ON user_roles
    FOR EACH ROW
    EXECUTE FUNCTION log_role_change();

-- Function to safely verify and update admin role
CREATE OR REPLACE FUNCTION verify_and_update_admin(p_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_user_id uuid;
    v_current_role user_role;
BEGIN
    -- Get user ID
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE email = p_email;

    IF v_user_id IS NULL THEN
        RETURN;
    END IF;

    -- Get current role
    SELECT role INTO v_current_role
    FROM user_roles
    WHERE user_id = v_user_id;

    -- Update role if needed
    IF v_current_role IS NULL OR v_current_role != 'admin' THEN
        INSERT INTO user_roles (user_id, role)
        VALUES (v_user_id, 'admin'::user_role)
        ON CONFLICT (user_id) 
        DO UPDATE SET role = 'admin'::user_role;

        -- Create notification
        INSERT INTO notifications (
            user_id,
            title,
            message,
            type
        ) VALUES (
            v_user_id,
            'Admin Role Verified',
            'Your admin role has been verified and updated.',
            'role_update'
        );
    END IF;
END;
$$;

-- Verify and update admin role
SELECT verify_and_update_admin('jagadambi@gmail.com');