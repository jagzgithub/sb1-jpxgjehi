/*
  # User Roles System Update
  
  This migration ensures all components of the user roles system exist,
  safely handling cases where some elements may have been created by previous migrations.
  
  1. Checks
    - Verifies and creates user_role enum if needed
    - Verifies and creates user_roles table if needed
    - Updates policies if needed
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

-- Enable RLS (safe to run multiple times)
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Handle existing policies
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can read own role" ON user_roles;
  DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;
  
  -- Recreate policies
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
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid()
        AND role = 'admin'
      )
    );
END $$;