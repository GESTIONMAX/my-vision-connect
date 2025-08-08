export interface Profile {
  id: string;
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  company_name?: string | null;
  company_siret?: string | null;
  company_sector?: string | null;
  user_type?: string | null;
  pricing_group?: string | null;
  avatar_url?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface SignUpData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  userType?: string;
  companyName?: string;
  companySector?: string;
}