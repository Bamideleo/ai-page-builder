export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  plan: 'free' | 'pro' | 'enterprise';
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  framework: 'react' | 'vue' | 'vanilla' | 'next';
  deployment_type: 'slug' | 'subdomain' | 'custom';
  urls?: {
    slug?: string;
    subdomain?: string;
    custom_domain?: string;
  };
  thumbnail?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Component {
  id: string;
  project_id: string;
  type: 'header' | 'hero' | 'navbar' | 'footer' | 'form' | 'button' | 'text' | 'image' | 'card' | 'grid';
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  content: Record<string, any>;
  styles: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Prompt {
  id: string;
  user_id: string;
  project_id: string;
  input_text: string;
  ai_output: string;
  created_at: string;
}

export interface SamplePrompt {
  id: string;
  title: string;
  description: string;
  category: 'ecommerce' | 'portfolio' | 'saas' | 'blog' | 'business' | 'education';
  prompt_text: string;
  is_active: boolean;
}

export interface Deployment {
  id: string;
  project_id: string;
  deployment_type: 'slug' | 'subdomain' | 'custom';
  slug?: string;
  subdomain?: string;
  custom_domain?: string;
  ssl_enabled: boolean;
  deployed_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  started_at: string;
  expires_at: string;
}

export interface ProjectVersion {
  id: string;
  project_id: string;
  version_number: number;
  snapshot_data: Record<string, any>;
  created_at: string;
}

export interface Collaborator {
  id: string;
  project_id: string;
  user_id: string;
  role: 'owner' | 'editor' | 'viewer';
  invited_at: string;
  accepted_at?: string;
}

export type Page = 'auth' | 'dashboard' | 'create-project' | 'workspace' | 'editor' | 'billing' | 'analytics' | 'settings';