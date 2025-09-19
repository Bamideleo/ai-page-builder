import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        plan: 'free'
      }
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Database helpers
export const createProject = async (projectData: Partial<any>) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([projectData])
    .select()
    .single();
  return { data, error };
};

export const getProjects = async (userId: string) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
  return { data, error };
};

export const updateProject = async (id: string, updates: Partial<any>) => {
  const { data, error } = await supabase
    .from('projects')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deleteProject = async (id: string) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  return { error };
};

export const savePrompt = async (promptData: Partial<any>) => {
  const { data, error } = await supabase
    .from('prompts')
    .insert([promptData])
    .select()
    .single();
  return { data, error };
};

export const getSamplePrompts = async () => {
  const { data, error } = await supabase
    .from('sample_prompts')
    .select('*')
    .eq('is_active', true)
    .order('category');
  return { data, error };
};