import { createClient } from '@supabase/supabase-js'

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clusters: {
        Row: {
          id: string
          name: string
          slug: string
          total_active_projects: number
          upcoming_launches: number
          avg_price_per_sqft: number
          price_momentum: string
          key_infra_projects: string[]
          maturity_score: number
          investor_sentiment: string
          end_user_trend: string
          competition_density: string
          strategic_outlook: string
        }
        Insert: Omit<Database['public']['Tables']['clusters']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['clusters']['Row']>
      }
      projects: {
        Row: {
          id: string
          name: string
          slug: string
          developer: string
          micro_location: string
          cluster_name: string
          township_typology: string
          cluster_category: string
          scale_acres: number
          longitude: number
          latitude: number
          project_type: string
          launch_phase: string
          rera_number: string
          rera_status: string
          launch_price_per_sqft: number
          entry_ticket_cr: number
          highest_ticket_cr: number
          early_access_benefit: string
          ideal_buyer_persona: string[]
          investor_score: number
          end_user_score: number
          rental_score: number
          scarcity_level: string
          infra_trigger_score: number
          strategic_quadrant: string
          headline_angle: string
          differentiator: string
          infra_hook: string
          key_highlights: string[]
          payment_plan_detail: string
          status: string
        }
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['projects']['Row']>
      }
      leads: {
        Row: {
          id: string
          name: string
          phone: string
          email: string
          project_id: string | null
          cluster_name: string | null
          intent: string
          message: string | null
          source: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['leads']['Row']>
      }
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export function createServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  // Use untyped client to avoid complex generic inference issues with insert
  return createClient(supabaseUrl, serviceKey)
}
