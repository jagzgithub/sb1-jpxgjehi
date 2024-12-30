/*
  # Role Update System Enhancement
  
  1. New Functions
    - Secure role update function with validation
    - Role history tracking
    - Notification system integration
  
  2. Security
    - Role-based access control
    - Audit logging
    - Input validation
*/

-- Create secure function to update user role
CREATE OR REPLACE FUNCTION update_user_role(
    p_user_id uuid,
    p_new_role user_role
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_old_role user_role;
    v_admin_id uuid;
BEGIN
    -- Get admin ID (current user)
    v_admin_id := auth.uid();
    
    -- Verify admin permissions
    IF NOT EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = v_admin_id
        AND role = 'admin'
    ) THEN
        RAISE EXCEPTION 'Unauthorized: Only admins can update roles';
    END IF;

    -- Get current role
    SELECT role INTO v_old_role
    FROM user_roles
    WHERE user_id = p_user_id;

    -- Prevent self-demotion
    IF p_user_id = v_admin_id AND p_new_role != 'admin' THEN
        RAISE EXCEPTION 'Cannot remove your own admin role';
    END IF;

    -- Update role
    UPDATE user_roles
    SET role = p_new_role
    WHERE user_id = p_user_id;

    -- Log the change
    INSERT INTO role_audit_log (
        user_id,
        old_role,
        new_role,
        changed_by
    ) VALUES (
        p_user_id,
        v_old_role,
        p_new_role,
        v_admin_id
    );

    -- Create notification
    INSERT INTO notifications (
        user_id,
        title,
        message,
        type
    ) VALUES (
        p_user_id,
        'Role Updated',
        format('Your role has been updated from %s to %s', v_old_role, p_new_role),
        'role_update'
    );

    RETURN true;
END;
$$;