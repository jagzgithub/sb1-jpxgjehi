/*
  # User Roles and Policies Setup

  1. New Tables and Types
    - Create `user_role` enum type ('player', 'captain', 'admin')
    - Create `user_roles` table with:
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `role` (user_role enum)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `user_roles` table
    - Add policies for:
      - Users to read their own role
      - Admins to manage all roles using a secure function
*/

-- Create enum type if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('player', 'captain', 'admin');
  END IF;
END $$;

-- Create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'player',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Create a secure admin check function that avoids recursion
CREATE OR REPLACE FUNCTION check_is_admin(check_user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = check_user_id
    AND role = 'admin'::user_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own role" ON user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;

-- Create new policies
CREATE POLICY "Users can read own role"
ON user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON user_roles
FOR ALL
TO authenticated
USING (check_is_admin(auth.uid()));

-- Grant necessary permissions
GRANT SELECT ON user_roles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON user_roles TO service_role;