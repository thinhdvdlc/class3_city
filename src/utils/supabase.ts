import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tvluuszzmqzceoafyzpf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2bHV1c3p6bXF6Y2VvYWZ5enBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3NDc0NTQsImV4cCI6MjEwMTMyMzQ1NH0.U-sWHacS8viP7Z1MeTOsMEA-VcPkAsdb-SZVna7VekY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserProfile {
  name: string;
  coins: number;
  math_level: number;
  vietnamese_level: number;
  english_level: number;
}
