import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProjectCard from '@/components/ProjectCard'
import ClusterCard from '@/components/ClusterCard'
import { supabase } from '@/lib/supabase'
import type { Project, Cluster } from '@/lib/types'
import HeroSection from '@/components/HeroSection'
import NewsletterForm from '@/components/NewsletterForm'

async function getProjects(): Promise<Project[]> {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .limit(12)

    if (error) {
      console.error('Projects fetch error:', error)
      return []
    }
    return (data as Project[]) || []
  } catch {
    return []
  }
}

async function getClusters(): Promise<Cluster[]> {
  try {
    const { data, error } = await supabase
      .from('clusters')
      .select('*')
      .limit(6)

    if (error) {
      console.error('Clusters fetch error:', error)
      return []
    }
    return (data as Cluster[]) || []
  } catch {
    return []
  }
}

const MOCK_ARTICLES = [
  {
    id: '1',
    title: 'Why North Bangalore is the Next Investment Hotspot',
    excerpt: 'With KIAL expansion, metro Phase 2, and 14 major townships, North Bangalore is redefining Bangalore real estate.',
    category: 'Market Analysis',
    author: 'Priya Sharma',
    date: 'Mar 15, 2026',
    read_time: '5 min',
    slug: 'north-bangalore-investment-hotspot',
  },
  {
    id: '2',
    title: 'Devanahalli: Aerospace Hub Driving 45% Appreciation',
    excerpt: 'The Aerospace SEZ and ITIR projects near Devanahalli are creating unprecedented demand for residential real estate.',
    category: 'Cluster Intelligence',
    author: 'Rahul Mehta',
    date: 'Mar 10, 2026',
    read_time: '7 min',
    slug: 'devanahalli-aerospace-hub',
  },
  {
    id: '3',
    title: 'EMI vs Rent: The 2026 Bangalore Calculus',
    excerpt: 'With rental yields at 3.5% and appreciation at 8.5%, owning vs renting math is shifting dramatically.',
    category: 'Financial Insights',
    author: 'Aditya Kumar',
    date: 'Mar 5, 2026',
    read_time: '6 min',
    slug: 'emi-vs-rent-bangalore-2026',
  },
]

export default async function HomePage() {
  const [projects, clusters] = await Promise.all([getProjects(), getClusters()])
  const featuredProjects = projects.slice(0, 6)
  const moreProjects = projects.slice(6, 9)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Map */}
      <HeroSection projects={projects} />

      {/* Featured Projects Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-1">Curated for You</p>
              <h2 className="section-title">Featured Projects</h2>
            </div>
            <Link
              href="/projects"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              View All Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_PROJECTS.slice(0, 6).map((project) => (
                <ProjectCard key={project.id} project={project as Project} />
              ))}
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link href="/projects" className="btn-secondary inline-flex items-center gap-2">
              View All Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Market Analytics Section */}
      <section id="market" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-1">Data-Driven</p>
            <h2 className="section-title">Market Analytics & Insights</h2>
            <p className="text-gray-500 mt-2">Real-time intelligence on Bangalore&apos;s premium residential market</p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Avg Property Price', value: '₹6.2 Cr', change: '+12.4%', positive: true, sub: 'Bangalore Premium' },
              { label: 'Annual Appreciation', value: '8.5%', change: '+2.1%', positive: true, sub: 'Year over Year' },
              { label: 'Active Listings', value: '1,426', change: '-8.3%', positive: false, sub: 'Tightening Supply' },
              { label: 'Avg Days on Market', value: '23 days', change: '-5 days', positive: true, sub: 'Faster Sales' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 font-medium mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs font-semibold ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
                    {stat.positive ? '↑' : '↓'} {stat.change}
                  </span>
                  <span className="text-xs text-gray-400">{stat.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Cluster Comparison Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-6">Cluster Price Comparison (₹/sqft)</h3>
            <div className="space-y-4">
              {[
                { cluster: 'Devanahalli', price: 7800, maxPrice: 12000, change: '+45%', color: 'bg-primary' },
                { cluster: 'Hebbal', price: 9500, maxPrice: 12000, change: '+28%', color: 'bg-green-500' },
                { cluster: 'Whitefield', price: 8200, maxPrice: 12000, change: '+22%', color: 'bg-blue-500' },
                { cluster: 'Sarjapur', price: 7500, maxPrice: 12000, change: '+18%', color: 'bg-purple-500' },
                { cluster: 'Bannerghatta', price: 6800, maxPrice: 12000, change: '+15%', color: 'bg-orange-400' },
                { cluster: 'Electronic City', price: 6200, maxPrice: 12000, change: '+12%', color: 'bg-teal-500' },
              ].map((item) => (
                <div key={item.cluster} className="flex items-center gap-4">
                  <div className="w-28 text-sm font-medium text-gray-700 shrink-0">{item.cluster}</div>
                  <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full flex items-center pl-3 transition-all duration-700`}
                      style={{ width: `${(item.price / item.maxPrice) * 100}%` }}
                    >
                      <span className="text-xs font-bold text-white/90">₹{item.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-14 text-right shrink-0">
                    <span className="text-xs font-semibold text-green-600">{item.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* North Bangalore Cluster Analysis */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-1">Spatial Intelligence</p>
              <h2 className="section-title">North Bangalore Cluster Analysis</h2>
            </div>
            <Link href="/clusters" className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              All Clusters
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Dark Stats Bar */}
          <div className="bg-dark rounded-xl p-5 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Active Clusters', value: '14' },
              { label: 'Township Projects', value: '6' },
              { label: 'Price Range (₹/sqft)', value: '3.9K–18K' },
              { label: 'Avg Appreciation (3Y)', value: '25–45%' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Cluster Grid */}
          {clusters.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {clusters.map((cluster) => (
                <ClusterCard key={cluster.id} cluster={cluster} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_CLUSTERS.map((cluster) => (
                <ClusterCard key={cluster.id} cluster={cluster as Cluster} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* More Premium Properties */}
      {(moreProjects.length > 0 || true) && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-1">Handpicked</p>
                <h2 className="section-title">More Premium Properties</h2>
              </div>
              <Link href="/projects" className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                Browse All
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(moreProjects.length > 0 ? moreProjects : MOCK_PROJECTS.slice(3, 6)).map((project) => (
                <ProjectCard key={project.id} project={project as Project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Editorial & Insights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-1">Intelligence</p>
              <h2 className="section-title">Editorial & Insights</h2>
            </div>
            <Link href="/insights" className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              All Articles
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_ARTICLES.map((article) => (
              <Link key={article.id} href={`/insights/${article.slug}`} className="group">
                <div className="card hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                  {/* Article Image Placeholder */}
                  <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 relative flex items-end p-4">
                    <span className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{article.author}</span>
                      <div className="flex items-center gap-3">
                        <span>{article.date}</span>
                        <span className="flex items-center gap-1">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {article.read_time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-dark">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            Weekly Intelligence
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            Stay Ahead of the Market
          </h2>
          <p className="text-gray-400 mb-8">
            Get curated insights on Bangalore&apos;s premium residential market — cluster analysis, investment opportunities, and price intelligence — delivered every week.
          </p>
          <NewsletterForm />
          <p className="text-gray-600 text-xs mt-4">
            No spam. Unsubscribe anytime. 2,400+ investors already subscribed.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Mock data for when DB is empty
const MOCK_PROJECTS: Partial<Project>[] = [
  {
    id: '1', name: 'Prestige Raintree Park', slug: 'prestige-raintree-park',
    developer: 'Prestige Group', micro_location: 'Whitefield', cluster_name: 'East Bangalore',
    entry_ticket_cr: 2.5, highest_ticket_cr: 8.5, launch_price_per_sqft: 9500,
    scale_acres: 80, investor_score: 5, status: 'Available', rera_status: 'Registered',
    cluster_category: 'Township', township_typology: 'Integrated Township',
    project_type: 'Mixed Use', latitude: 12.9716, longitude: 77.7500,
    rera_number: 'PRM/KA/RERA/1251/308/PR/190927/001407',
    key_highlights: ['80 acres township', '5000+ units', 'Club house'],
    payment_plan_detail: '10:80:10', scarcity_level: 'High', infra_trigger_score: 8,
    strategic_quadrant: 'Invest Now', headline_angle: 'Largest township in Whitefield',
    differentiator: 'Integrated township with all amenities', infra_hook: 'Metro connectivity',
    ideal_buyer_persona: ['NRI', 'IT Professional'], end_user_score: 4, rental_score: 4,
    launch_phase: 'Phase 2', early_access_benefit: '5% discount',
  },
  {
    id: '2', name: 'Brigade Orchards', slug: 'brigade-orchards',
    developer: 'Brigade Group', micro_location: 'Devanahalli', cluster_name: 'North Bangalore',
    entry_ticket_cr: 1.8, highest_ticket_cr: 6.5, launch_price_per_sqft: 7800,
    scale_acres: 135, investor_score: 5, status: 'Available', rera_status: 'Registered',
    cluster_category: 'Township', township_typology: 'Integrated Township',
    project_type: 'Mixed Use', latitude: 13.2547, longitude: 77.6675,
    rera_number: 'PRM/KA/RERA/1251/308/PR/001',
    key_highlights: ['135 acres', 'Near KIAL', 'World-class amenities'],
    payment_plan_detail: '20:80', scarcity_level: 'Very High', infra_trigger_score: 9,
    strategic_quadrant: 'High Growth', headline_angle: 'Next to Aerospace SEZ',
    differentiator: '135-acre integrated township', infra_hook: 'Airport proximity',
    ideal_buyer_persona: ['Investor', 'NRI'], end_user_score: 4, rental_score: 5,
    launch_phase: 'Phase 3', early_access_benefit: '3% pre-launch benefit',
  },
  {
    id: '3', name: 'Sobha Neopolis', slug: 'sobha-neopolis',
    developer: 'Sobha Limited', micro_location: 'Panathur', cluster_name: 'East Bangalore',
    entry_ticket_cr: 3.2, highest_ticket_cr: 9.8, launch_price_per_sqft: 11200,
    scale_acres: 25, investor_score: 4, status: 'Available', rera_status: 'Registered',
    cluster_category: 'Premium', township_typology: 'Gated Community',
    project_type: 'Apartments', latitude: 12.9350, longitude: 77.6900,
    rera_number: 'PRM/KA/RERA/1251/308/PR/003',
    key_highlights: ['25 acres', '4 BHK luxury', 'Clubhouse'],
    payment_plan_detail: '10:90', scarcity_level: 'High', infra_trigger_score: 7,
    strategic_quadrant: 'Premium', headline_angle: 'Ultra-luxury in Panathur',
    differentiator: 'Sobha quality construction', infra_hook: 'ORR connectivity',
    ideal_buyer_persona: ['Senior Professional', 'NRI'], end_user_score: 5, rental_score: 3,
    launch_phase: 'Phase 1', early_access_benefit: '2% early bird',
  },
  {
    id: '4', name: 'Godrej Ananda', slug: 'godrej-ananda',
    developer: 'Godrej Properties', micro_location: 'Bagalur', cluster_name: 'North Bangalore',
    entry_ticket_cr: 1.2, highest_ticket_cr: 3.5, launch_price_per_sqft: 6200,
    scale_acres: 62, investor_score: 4, status: 'Upcoming', rera_status: 'Applied',
    cluster_category: 'Growth', township_typology: 'Township',
    project_type: 'Apartments', latitude: 13.1688, longitude: 77.6847,
    rera_number: 'PRM/KA/RERA/APPLIED',
    key_highlights: ['62 acres', 'Aerospace corridor', 'Affordable luxury'],
    payment_plan_detail: '30:70', scarcity_level: 'Medium', infra_trigger_score: 8,
    strategic_quadrant: 'Emerging', headline_angle: 'Aerospace corridor advantage',
    differentiator: 'Godrej quality at entry price', infra_hook: 'SEZ proximity',
    ideal_buyer_persona: ['First Time Buyer', 'Investor'], end_user_score: 3, rental_score: 4,
    launch_phase: 'Pre-launch', early_access_benefit: '8% pre-launch discount',
  },
  {
    id: '5', name: 'Mahindra Antheia', slug: 'mahindra-antheia',
    developer: 'Mahindra Lifespaces', micro_location: 'Pimpri-Chinchwad', cluster_name: 'North Bangalore',
    entry_ticket_cr: 2.1, highest_ticket_cr: 5.8, launch_price_per_sqft: 8400,
    scale_acres: 45, investor_score: 4, status: 'Available', rera_status: 'Registered',
    cluster_category: 'Premium', township_typology: 'Gated Community',
    project_type: 'Apartments', latitude: 13.1200, longitude: 77.6200,
    rera_number: 'PRM/KA/RERA/1251/308/PR/005',
    key_highlights: ['45 acres', 'Integrated township', 'Sustainable'],
    payment_plan_detail: '20:80', scarcity_level: 'High', infra_trigger_score: 7,
    strategic_quadrant: 'Premium Growth', headline_angle: 'Sustainable living',
    differentiator: 'Green certified township', infra_hook: 'Metro Phase 2',
    ideal_buyer_persona: ['Professional', 'Family'], end_user_score: 5, rental_score: 3,
    launch_phase: 'Phase 2', early_access_benefit: '4% early bird',
  },
  {
    id: '6', name: 'Embassy Springs', slug: 'embassy-springs',
    developer: 'Embassy Group', micro_location: 'Devanahalli', cluster_name: 'North Bangalore',
    entry_ticket_cr: 2.8, highest_ticket_cr: 12, launch_price_per_sqft: 9800,
    scale_acres: 288, investor_score: 5, status: 'Available', rera_status: 'Registered',
    cluster_category: 'Luxury', township_typology: 'Integrated Township',
    project_type: 'Mixed Use', latitude: 13.2200, longitude: 77.7100,
    rera_number: 'PRM/KA/RERA/1251/308/PR/006',
    key_highlights: ['288 acres', 'Largest township', 'Airport facing'],
    payment_plan_detail: '15:85', scarcity_level: 'Very High', infra_trigger_score: 10,
    strategic_quadrant: 'Invest Now', headline_angle: '288-acre master township',
    differentiator: "India's largest residential township", infra_hook: 'KIAL proximity',
    ideal_buyer_persona: ['NRI', 'HNI', 'Investor'], end_user_score: 4, rental_score: 5,
    launch_phase: 'Phase 4', early_access_benefit: '2% pre-launch',
  },
]

const MOCK_CLUSTERS: Partial<Cluster>[] = [
  {
    id: '1', name: 'Devanahalli', slug: 'devanahalli',
    total_active_projects: 18, upcoming_launches: 5, avg_price_per_sqft: 7800,
    price_momentum: 'Rising Strong', maturity_score: 7,
    investor_sentiment: 'Very Bullish', end_user_trend: 'Growing',
    competition_density: 'Medium', key_infra_projects: ['KIAL Expansion', 'Aerospace SEZ', 'Metro Phase 3'],
    strategic_outlook: 'Aerospace corridor driving unprecedented demand with 45% 3-year appreciation.',
  },
  {
    id: '2', name: 'Hebbal', slug: 'hebbal',
    total_active_projects: 12, upcoming_launches: 3, avg_price_per_sqft: 9500,
    price_momentum: 'Stable Rising', maturity_score: 8,
    investor_sentiment: 'Bullish', end_user_trend: 'Strong',
    competition_density: 'High', key_infra_projects: ['Outer Ring Road', 'Metro Yellow Line', 'Nagavara Lake'],
    strategic_outlook: 'Mature cluster with strong end-user demand and consistent appreciation.',
  },
  {
    id: '3', name: 'Whitefield', slug: 'whitefield',
    total_active_projects: 24, upcoming_launches: 7, avg_price_per_sqft: 8200,
    price_momentum: 'Rising', maturity_score: 9,
    investor_sentiment: 'Positive', end_user_trend: 'Very Strong',
    competition_density: 'Very High', key_infra_projects: ['Purple Metro Line', 'ITPL', 'EPIP Zone'],
    strategic_outlook: 'Established IT corridor with metro connectivity boosting premium segment.',
  },
  {
    id: '4', name: 'Sarjapur Road', slug: 'sarjapur-road',
    total_active_projects: 20, upcoming_launches: 8, avg_price_per_sqft: 7500,
    price_momentum: 'Rising', maturity_score: 7,
    investor_sentiment: 'Bullish', end_user_trend: 'Growing',
    competition_density: 'High', key_infra_projects: ['Peripheral Ring Road', 'TCS Campus', 'Amazon HQ'],
    strategic_outlook: 'Tech campus cluster with strong rental demand and appreciation potential.',
  },
  {
    id: '5', name: 'Bannerghatta Road', slug: 'bannerghatta-road',
    total_active_projects: 15, upcoming_launches: 4, avg_price_per_sqft: 6800,
    price_momentum: 'Stable', maturity_score: 7,
    investor_sentiment: 'Positive', end_user_trend: 'Stable',
    competition_density: 'Medium', key_infra_projects: ['Metro Green Line', 'NIMHANS', 'JP Nagar'],
    strategic_outlook: 'Healthcare and education hub with good social infrastructure.',
  },
  {
    id: '6', name: 'North Bangalore', slug: 'north-bangalore',
    total_active_projects: 35, upcoming_launches: 12, avg_price_per_sqft: 6500,
    price_momentum: 'Rising Strong', maturity_score: 6,
    investor_sentiment: 'Very Bullish', end_user_trend: 'Emerging',
    competition_density: 'Medium', key_infra_projects: ['Peripheral Ring Road', 'STRR', 'Metro Phase 2'],
    strategic_outlook: 'Mega township zone with 14 clusters and infrastructure-led appreciation play.',
  },
]
