/*
  # Set Admin User

  1. Changes
    - Creates a secure function to set admin user
    - Sets jagadambi@gmail.com as admin
    - Adds appropriate notifications
    - Includes role audit logging
*/

-- Create secure function to set admin user
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
    -- Update or insert admin role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_user_id, 'admin')
    ON CONFLICT (user_id) 
    DO UPDATE SET role = 'admin'
    WHERE user_roles.user_id = v_user_id;

    -- Log the change
    INSERT INTO role_audit_log (
      user_id,
      old_role,
      new_role,
      changed_by
    ) VALUES (
      v_user_id,
      'player',
      'admin',
      v_user_id
    );

    -- Create notification
    INSERT INTO notifications (
      user_id,
      title,
      message,
      type
    ) VALUES (
      v_user_id,
      'Admin Access Granted',
      'You have been granted administrator access.',
      'role_update'
    );
  END IF;
END;
$$;

-- Set admin user
SELECT set_admin_user('jagadambi@gmail.com');