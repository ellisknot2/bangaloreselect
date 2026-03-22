import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

const MOCK_ARTICLES: Record<string, {
  title: string
  slug: string
  category: string
  author: string
  date: string
  read_time: string
  excerpt: string
  pull_quote: string
  content: string[]
  tags: string[]
  toc: { id: string; label: string }[]
}> = {
  'north-bangalore-investment-hotspot': {
    title: 'Why North Bangalore is the Next Investment Hotspot',
    slug: 'north-bangalore-investment-hotspot',
    category: 'Market Analysis',
    author: 'Priya Sharma',
    date: 'Mar 15, 2026',
    read_time: '5 min',
    excerpt: 'With KIAL expansion, metro Phase 2, and 14 major townships, North Bangalore is redefining Bangalore real estate.',
    pull_quote: 'North Bangalore is not just growing — it is being engineered. Every infrastructure decision made in the last 5 years points to one direction: north.',
    content: [
      "The transformation of North Bangalore from a peripheral suburb into one of India's most sought-after real estate corridors is one of the most compelling urban development stories of the decade. What began as a speculative bet on airport proximity has evolved into a full-scale infrastructure revolution.",
      "The Kempegowda International Airport expansion — adding a second terminal with a capacity for 55 million passengers annually — has been the catalytic event. But airport proximity alone doesn't create sustainable real estate demand. What truly differentiates North Bangalore is the convergence of multiple demand drivers arriving simultaneously.",
      "The Aerospace Special Economic Zone (SEZ) adjacent to KIAL is expected to create over 80,000 direct jobs when fully operational. The ITIR (Information Technology Investment Region) spanning 12,000 acres in Devanahalli is one of the largest planned tech corridors in Asia. These are not peripheral developments — they are the kind of infrastructure triggers that fundamentally alter land value equations.",
      "Metro Phase 2's Yellow Line, connecting Central Bangalore to Devanahalli, represents the connectivity breakthrough that investors have long awaited. Historical data from Mumbai, Hyderabad, and Pune consistently shows 25-40% price appreciation within 3 years of metro corridor announcement in residential areas along the route.",
      "The township story is equally compelling. Brigade Orchards (135 acres), Embassy Springs (288 acres), Godrej Ananda (62 acres), and 11 other major township projects have collectively brought over ₹45,000 crore in residential investment to North Bangalore in the past 4 years. These integrated townships bring their own social infrastructure — schools, hospitals, retail — dramatically reducing the suburban premium.",
      "From a purely quantitative standpoint, the numbers are striking. Average price per square foot in Devanahalli has moved from ₹3,800 in 2021 to ₹7,800 in 2026 — a 105% gain. Comparable areas in Hyderabad's HITECH City corridor saw 120% appreciation over the same timeline after equivalent infrastructure commitment.",
      "The risk factors deserve acknowledgment. North Bangalore's growth thesis is infrastructure-dependent — delivery delays in the Aerospace SEZ or Metro Yellow Line could moderate appreciation timelines. Oversupply in specific micro-markets (particularly Bagalur and Budigere) is a monitored concern. And global macro factors affecting NRI investment sentiment remain variable.",
      "However, the structural case — airport mega-hub, aerospace employment cluster, IT investment region, metro connectivity, township social infrastructure — is robust. North Bangalore is not a speculative play. It is a calculated bet on the convergence of infrastructure investments that have now largely been committed and funded.",
    ],
    tags: ['North Bangalore', 'Investment', 'Infrastructure', 'Metro', 'KIAL', 'Township'],
    toc: [
      { id: 'intro', label: 'The Transformation' },
      { id: 'airport', label: 'Airport Catalyst' },
      { id: 'jobs', label: 'Employment Drivers' },
      { id: 'metro', label: 'Metro Connectivity' },
      { id: 'townships', label: 'Township Story' },
      { id: 'numbers', label: 'The Numbers' },
      { id: 'risks', label: 'Risk Factors' },
    ],
  },
  'devanahalli-aerospace-hub': {
    title: 'Devanahalli: Aerospace Hub Driving 45% Appreciation',
    slug: 'devanahalli-aerospace-hub',
    category: 'Cluster Intelligence',
    author: 'Rahul Mehta',
    date: 'Mar 10, 2026',
    read_time: '7 min',
    excerpt: 'The Aerospace SEZ and ITIR projects near Devanahalli are creating unprecedented demand for residential real estate.',
    pull_quote: 'When 80,000 aerospace engineers need homes near KIAL, the residential math writes itself.',
    content: [
      "Devanahalli's evolution from a quiet town north of Bangalore into an aerospace and aviation hub is reshaping residential real estate fundamentals in ways that few analysts predicted even five years ago.",
      "The anchor: Kempegowda International Airport, now handling 45 million passengers annually with a ₹13,000 crore expansion underway. But the airport is just the beginning. The Aerospace SEZ, approved by the Ministry of Commerce, is being developed across 900 acres adjacent to KIAL. Companies including HAL, Airbus Supply Chain, Boeing India, and 60+ aerospace component manufacturers are either operational or committed.",
      "The ITIR — Information Technology Investment Region — spanning 12,000 acres represents the most ambitious tech corridor development in South Asia. While implementation has been phased, the commitment from Karnataka's government and Central approval has established land use patterns that are driving residential speculation and genuine end-user demand.",
      "For real estate investors, the employment story is the foundation of the investment thesis. 80,000 direct jobs in aerospace, an estimated 200,000 indirect jobs in the ITIR zone, and 50,000+ jobs at the expanded KIAL — the total employment creation within a 15 km radius of Devanahalli is extraordinary by any standard.",
      "The price appreciation data validates the thesis. Launch prices in Brigade Orchards Phase 1 were ₹3,200/sqft in 2018. Current resale prices for completed units are commanding ₹7,800-8,500/sqft. Embassy Springs, launched at ₹3,800/sqft in 2019, now quotes ₹9,800+/sqft for current launches.",
    ],
    tags: ['Devanahalli', 'Aerospace', 'Investment', 'KIAL', 'Appreciation'],
    toc: [
      { id: 'intro', label: 'The Hub Story' },
      { id: 'aerospace', label: 'Aerospace SEZ' },
      { id: 'itir', label: 'ITIR Zone' },
      { id: 'employment', label: 'Employment Impact' },
      { id: 'appreciation', label: 'Price Data' },
    ],
  },
  'emi-vs-rent-bangalore-2026': {
    title: 'EMI vs Rent: The 2026 Bangalore Calculus',
    slug: 'emi-vs-rent-bangalore-2026',
    category: 'Financial Insights',
    author: 'Aditya Kumar',
    date: 'Mar 5, 2026',
    read_time: '6 min',
    excerpt: 'With rental yields at 3.5% and appreciation at 8.5%, owning vs renting math is shifting dramatically.',
    pull_quote: 'In Bangalore 2026, every ₹1 lakh in annual rent is ₹1 lakh not building equity in an 8.5% appreciation market.',
    content: [
      "The rent vs buy debate has been a perennial one in Indian real estate. In Bangalore's 2026 market, the calculus has shifted meaningfully toward buying — but the answer is more nuanced than headlines suggest.",
      "Let's start with the numbers that matter. The average 3BHK apartment in a premium North Bangalore township rents for ₹35,000-45,000/month. The same apartment is priced at ₹85-1.2 crore. At an 8.5% home loan rate (SBI HLSR), the EMI on ₹72 lakh (80% loan on ₹90L property) is approximately ₹62,000/month.",
      "On pure monthly cash flow, renting wins. But the EMI calculus ignores two crucial variables: appreciation and equity building. With North Bangalore's 3-year appreciation running at 8-12% CAGR, a ₹90 lakh apartment purchased today is worth ₹1.2-1.4 crore in 2029. The renter, having paid ₹15-18 lakh in rent, has zero equity.",
      "The break-even analysis typically lands at 7-9 years in premium Bangalore micro-markets — meaning after 7 years of ownership, the total cost of ownership (EMI minus equity building plus appreciation) equals what a renter would have paid, with the owner now holding a fully appreciating asset.",
      "For NRIs receiving income in foreign currencies, the EMI vs rent calculation looks even more compelling. A ₹62,000 EMI represents approximately $750 USD — or roughly 15% of a median NRI family income — for an asset appreciating at 10% annually in a city with strengthening fundamentals.",
      "The caveat: liquidity. Real estate is not a liquid asset. For buyers who may need mobility within 3-5 years, the transaction costs (registration, brokerage, maintenance pre-possession) can erode appreciation gains. For long-term holders (7+ years) with stable income, the 2026 Bangalore premium residential market offers a compelling ownership proposition.",
    ],
    tags: ['EMI Calculator', 'Rent vs Buy', 'Investment Analysis', 'Bangalore 2026'],
    toc: [
      { id: 'numbers', label: 'The Numbers' },
      { id: 'cashflow', label: 'Monthly Cashflow' },
      { id: 'appreciation', label: 'Appreciation Factor' },
      { id: 'breakeven', label: 'Break-Even Analysis' },
      { id: 'nri', label: 'NRI Perspective' },
      { id: 'caveats', label: 'Caveats' },
    ],
  },
}

const RELATED_ARTICLES = [
  { title: 'Devanahalli: Aerospace Hub Driving 45% Appreciation', slug: 'devanahalli-aerospace-hub', category: 'Cluster Intelligence', read_time: '7 min' },
  { title: 'EMI vs Rent: The 2026 Bangalore Calculus', slug: 'emi-vs-rent-bangalore-2026', category: 'Financial Insights', read_time: '6 min' },
  { title: 'Why North Bangalore is the Next Investment Hotspot', slug: 'north-bangalore-investment-hotspot', category: 'Market Analysis', read_time: '5 min' },
]

export default async function InsightDetailPage({ params: paramsPromise }: Props) {
  const params = await paramsPromise
  const article = MOCK_ARTICLES[params.slug]

  if (!article) {
    // Generic article for any slug
    const genericArticle = {
      title: params.slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      slug: params.slug,
      category: 'Market Analysis',
      author: 'BangaloreSelect Team',
      date: 'Mar 2026',
      read_time: '5 min',
      excerpt: 'Deep-dive analysis on Bangalore real estate market trends and investment opportunities.',
      pull_quote: 'Data-driven insights for smarter real estate decisions in Bangalore.',
      content: [
        'Bangalore continues to be one of India\'s most dynamic real estate markets, driven by technology sector growth, infrastructure investment, and growing domestic and NRI demand.',
        'The premium residential segment has shown remarkable resilience, with appreciation rates consistently outperforming fixed income alternatives while providing lifestyle benefits.',
        'Our analysis of Bangalore\'s micro-markets reveals significant variation in investment potential, with North Bangalore clusters offering the highest upside potential while more mature markets provide stability.',
      ],
      tags: ['Bangalore', 'Real Estate', 'Investment', 'Market Analysis'],
      toc: [{ id: 'intro', label: 'Introduction' }, { id: 'analysis', label: 'Market Analysis' }, { id: 'conclusion', label: 'Conclusion' }],
    }

    return <ArticleLayout article={genericArticle} />
  }

  return <ArticleLayout article={article} />
}

function ArticleLayout({ article }: { article: typeof MOCK_ARTICLES[string] }) {
  const relatedFiltered = RELATED_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Image */}
      <div className="w-full h-[300px] bg-gradient-to-br from-gray-800 to-gray-600 relative flex items-end">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
          <span className="bg-primary text-black text-xs font-bold px-3 py-1.5 rounded-full">
            {article.category}
          </span>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <Link href="/insights" className="hover:text-primary transition-colors">Insights</Link>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            <span className="text-gray-900 font-medium truncate max-w-xs">{article.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Article Content */}
          <div className="lg:col-span-2">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-500">
              <span className="font-medium text-gray-700">{article.author}</span>
              <span>·</span>
              <span>{article.date}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {article.read_time} read
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
              {article.title}
            </h1>

            {/* Pull Quote */}
            <blockquote className="border-l-4 border-primary bg-amber-50 pl-5 pr-4 py-4 rounded-r-xl mb-8">
              <p className="text-lg font-medium text-gray-800 italic leading-relaxed">
                &ldquo;{article.pull_quote}&rdquo;
              </p>
            </blockquote>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none text-gray-700 space-y-5">
              {article.content.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-base text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-2 mb-6">
                {article.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-primary hover:text-black cursor-pointer transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-600">Share:</span>
                {[
                  { label: 'Twitter', color: 'bg-sky-100 text-sky-700 hover:bg-sky-200' },
                  { label: 'LinkedIn', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
                  { label: 'WhatsApp', color: 'bg-green-100 text-green-700 hover:bg-green-200' },
                  { label: 'Copy Link', color: 'bg-gray-100 text-gray-600 hover:bg-gray-200' },
                ].map((s) => (
                  <button key={s.label} className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${s.color}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Table of Contents */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Table of Contents</h3>
              <div className="space-y-2">
                {article.toc.map((item, i) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-primary transition-colors py-1"
                  >
                    <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
                      {i + 1}
                    </span>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Related Articles</h3>
              <div className="space-y-4">
                {relatedFiltered.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/insights/${related.slug}`}
                    className="block group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg shrink-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-400">IMG</span>
                      </div>
                      <div>
                        <span className="text-xs text-primary font-semibold">{related.category}</span>
                        <p className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors leading-snug">
                          {related.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{related.read_time} read</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-dark rounded-xl p-5">
              <h3 className="font-bold text-white mb-1">Get Weekly Insights</h3>
              <p className="text-gray-400 text-sm mb-4">Data-driven Bangalore real estate intelligence, every week.</p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2.5 bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-lg text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="w-full bg-primary text-black font-bold py-2.5 rounded-lg text-sm hover:bg-yellow-400 transition-colors">
                Subscribe Free
              </button>
            </div>
          </div>
        </div>

        {/* More Insights Grid */}
        <div className="mt-16 pt-10 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedFiltered.map((a) => (
              <Link key={a.slug} href={`/insights/${a.slug}`} className="group card hover:shadow-md transition-shadow">
                <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 flex items-end p-4">
                  <span className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full">{a.category}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-primary transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    {a.read_time} read
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
