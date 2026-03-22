export interface Cluster {
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

export interface Project {
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

export interface Lead {
  id?: string
  name: string
  phone: string
  email: string
  project_id?: string
  cluster_name?: string
  intent: string
  message?: string
  source?: string
  created_at?: string
}

export interface PaymentPlan {
  milestone: string
  percentage: number
  amount_cr: number
  due_date?: string
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  author: string
  date: string
  read_time: string
  image?: string
  content?: string
  tags?: string[]
}
