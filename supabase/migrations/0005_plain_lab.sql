/*
  # Add Role Function
  
  1. Purpose
    - Add secure function to fetch user role
    - Ensure proper role access control
  
  2. Changes
    - Create get_user_role function
*/

-- Create function to securely get user role
CREATE OR REPLACE FUNCTION get_user_role(p_user_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN (
    SELECT role::text
    FROM user_roles
    WHERE user_id = p_user_id
  );
END;
$$;