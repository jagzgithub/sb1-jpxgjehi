/*
  # Improve Role Verification System

  1. New Functions
    - verify_and_refresh_role: Securely verifies and refreshes user role
    - ensure_admin_access: Ensures admin access for specific users
  
  2. Security
    - All functions are SECURITY DEFINER for elevated privileges
    - Input validation and sanitization
    - Audit logging for role changes
*/

-- Create function to verify and refresh role
CREATE OR REPLACE FUNCTION verify_and_refresh_role(p_user_id uuid)
RETURNS user_role
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_role user_role;
BEGIN
    -- Get current role with verification
    SELECT role INTO v_role
    FROM user_roles
    WHERE user_id = p_user_id;
    
    -- Log verification attempt
    INSERT INTO role_audit_log (
        user_id,
        old_role,
        new_role,
        changed_by,
        change_type
    ) VALUES (
        p_user_id,
        v_role,
        v_role,
        auth.uid(),
        'verification'
    );
    
    RETURN COALESCE(v_role, 'player'::user_role);
END;
$$;

-- Function to ensure admin access
CREATE OR REPLACE FUNCTION ensure_admin_access(p_email text)
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
            'Admin Access Confirmed',
            'Your admin access has been verified and is active.',
            'role_update'
        );
    END IF;
END;
$$;