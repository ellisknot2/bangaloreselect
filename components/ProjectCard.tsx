import Link from 'next/link'
import type { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
  onMapClick?: () => void
  compact?: boolean
}

function StarRating({ score }: { score: number }) {
  const maxScore = 5
  const filledStars = Math.round(score)
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: maxScore }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={i < filledStars ? '#F5C000' : 'none'}
          stroke={i < filledStars ? '#F5C000' : '#d1d5db'}
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export default function ProjectCard({ project, onMapClick, compact = false }: ProjectCardProps) {
  const isAvailable = project.status?.toLowerCase() === 'available' || project.rera_status?.toLowerCase() === 'registered'

  return (
    <div className="card group hover:shadow-md transition-shadow duration-200">
      {/* Image Placeholder */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={isAvailable ? 'badge-available' : 'badge-upcoming'}>
            {isAvailable ? 'Available' : 'Upcoming'}
          </span>
        </div>

        {/* Category Badge */}
        {project.cluster_category && (
          <div className="absolute top-3 right-3">
            <span className="bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">
              {project.cluster_category}
            </span>
          </div>
        )}

        {/* Township tag */}
        {project.township_typology && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-primary/90 text-black text-xs font-semibold px-2 py-1 rounded-full">
              {project.township_typology}
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Developer + Rating */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {project.developer}
          </span>
          <StarRating score={project.investor_score || 4} />
        </div>

        {/* Project Name */}
        <h3 className="font-bold text-gray-900 text-base leading-tight mb-1.5 group-hover:text-primary transition-colors">
          {project.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{project.micro_location}, {project.cluster_name}</span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <span className="text-lg font-bold text-green-600">
            ₹{project.entry_ticket_cr} Cr
            {project.highest_ticket_cr > project.entry_ticket_cr && ` – ₹${project.highest_ticket_cr} Cr`}
          </span>
          {project.launch_price_per_sqft > 0 && (
            <span className="text-sm text-gray-400 ml-2">
              ₹{project.launch_price_per_sqft.toLocaleString()}/sqft
            </span>
          )}
        </div>

        {/* Stats Row */}
        {!compact && (
          <div className="flex items-center gap-4 pb-3 border-b border-gray-100 mb-3">
            <div className="text-center">
              <p className="text-xs text-gray-400">Scale</p>
              <p className="text-sm font-semibold text-gray-700">{project.scale_acres} Ac</p>
            </div>
            <div className="h-6 w-px bg-gray-100" />
            <div className="text-center">
              <p className="text-xs text-gray-400">Investor Score</p>
              <p className="text-sm font-semibold text-gray-700">{project.investor_score}/5</p>
            </div>
            <div className="h-6 w-px bg-gray-100" />
            <div className="text-center">
              <p className="text-xs text-gray-400">3Y Appreciation</p>
              <p className="text-sm font-semibold text-green-600">~35%</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {onMapClick && (
            <button
              onClick={onMapClick}
              className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium border border-gray-200 text-gray-600 py-2 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-10l6-3m0 13l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              On Map
            </button>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold bg-primary text-black py-2 rounded-lg hover:bg-yellow-400 transition-colors"
          >
            View Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
