/*
  # User Roles System Migration
  
  1. Tables
    - Creates user_roles table if it doesn't exist
  2. Security
    - Enables RLS
    - Sets up access policies for users and admins
*/

-- Create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'player',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable row level security
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Handle policies
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Users can read own role" ON user_roles;
  DROP POLICY IF EXISTS "Admins can manage all roles" ON user_roles;
  
  -- Create policies
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