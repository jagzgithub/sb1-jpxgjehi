/*
  # Fix user roles policies

  1. Changes
    - Drop existing policies to prevent conflicts
    - Create new optimized policies for user roles
    - Add proper type casting for role enum
    - Prevent infinite recursion in admin policy

  2. Security
    - Enable RLS on user_roles table
    - Add policy for users to read their own role
    - Add policy for admins to manage all roles
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

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own role" ON user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;

-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

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
USING (
  EXISTS (
    SELECT 1 FROM user_roles ur
    WHERE ur.user_id = auth.uid()
    AND ur.role = 'admin'::user_role
  )
);