'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import type { Project } from '@/lib/types'

const MapboxMap = dynamic(() => import('./MapboxMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" style={{ borderWidth: '3px' }} />
        <p className="text-sm text-gray-500">Loading map...</p>
      </div>
    </div>
  ),
})

interface HeroSectionProps {
  projects: Project[]
}

export default function HeroSection({ projects }: HeroSectionProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const displayProjects = projects.length > 0 ? projects.slice(0, 8) : FALLBACK_PROJECTS as Project[]

  const filteredProjects = displayProjects.filter((p) =>
    searchQuery
      ? p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.micro_location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.cluster_name?.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  )

  return (
    <section className="relative bg-gray-50">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-3 py-1.5 rounded-full mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Bangalore Premium Real Estate Intelligence
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
            Find Your Perfect
            <span className="text-primary block">Property in Bangalore</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Data-driven spatial intelligence for {displayProjects.length}+ curated premium residential projects across 14 clusters.
          </p>
        </div>
      </div>

      {/* Map + Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex flex-col lg:flex-row gap-4 h-[600px]">
          {/* Map Container */}
          <div className="flex-1 relative rounded-xl overflow-hidden shadow-md min-h-[300px]">
            {/* Search overlay on map */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-md px-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, locations, clusters..."
                  className="w-full pl-10 pr-4 py-3 bg-white shadow-lg border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <svg
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <MapboxMap
              projects={filteredProjects}
              onProjectSelect={setSelectedProject}
              selectedProjectId={selectedProject?.id}
              height="100%"
              center={[77.6413, 13.0827]}
              zoom={10}
            />

            {/* Map legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-sm">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-black">₹</div>
                <span>Project Location</span>
              </div>
            </div>
          </div>

          {/* Sidebar: Project List */}
          <div className="w-full lg:w-80 bg-white rounded-xl shadow-md border border-gray-100 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm">
                {filteredProjects.length} Projects Found
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Click on a project to highlight on map</p>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project.id === selectedProject?.id ? null : project)}
                  className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                    selectedProject?.id === project.id ? 'bg-amber-50 border-l-4 border-l-primary' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-400 truncate">{project.developer}</p>
                      <p className="font-semibold text-gray-900 text-sm leading-tight truncate">{project.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {project.micro_location}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-green-600">₹{project.entry_ticket_cr}Cr</p>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        project.status?.toLowerCase() === 'available'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {project.status || 'Available'}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-gray-100">
              <Link
                href="/projects"
                className="w-full flex items-center justify-center gap-2 btn-primary text-sm py-2.5"
              >
                Explore All Projects
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Selected Project Quick Info */}
        {selectedProject && (
          <div className="mt-4 bg-white rounded-xl p-5 shadow-md border border-primary/20 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs text-gray-400">{selectedProject.developer} · {selectedProject.cluster_name}</p>
              <h3 className="font-bold text-gray-900 text-lg">{selectedProject.name}</h3>
              <p className="text-sm text-gray-500">{selectedProject.micro_location}</p>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-gray-400">Price Range</p>
                <p className="font-bold text-green-600">₹{selectedProject.entry_ticket_cr}–{selectedProject.highest_ticket_cr} Cr</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">₹/sqft</p>
                <p className="font-bold text-gray-900">₹{selectedProject.launch_price_per_sqft?.toLocaleString()}</p>
              </div>
              <Link
                href={`/projects/${selectedProject.slug}`}
                className="btn-primary text-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

const FALLBACK_PROJECTS = [
  { id: '1', name: 'Prestige Raintree Park', slug: 'prestige-raintree-park', developer: 'Prestige Group', micro_location: 'Whitefield', cluster_name: 'East Bangalore', entry_ticket_cr: 2.5, highest_ticket_cr: 8.5, launch_price_per_sqft: 9500, status: 'Available', latitude: 12.9716, longitude: 77.7500 },
  { id: '2', name: 'Brigade Orchards', slug: 'brigade-orchards', developer: 'Brigade Group', micro_location: 'Devanahalli', cluster_name: 'North Bangalore', entry_ticket_cr: 1.8, highest_ticket_cr: 6.5, launch_price_per_sqft: 7800, status: 'Available', latitude: 13.2547, longitude: 77.6675 },
  { id: '3', name: 'Sobha Neopolis', slug: 'sobha-neopolis', developer: 'Sobha Limited', micro_location: 'Panathur', cluster_name: 'East Bangalore', entry_ticket_cr: 3.2, highest_ticket_cr: 9.8, launch_price_per_sqft: 11200, status: 'Available', latitude: 12.9350, longitude: 77.6900 },
  { id: '4', name: 'Godrej Ananda', slug: 'godrej-ananda', developer: 'Godrej Properties', micro_location: 'Bagalur', cluster_name: 'North Bangalore', entry_ticket_cr: 1.2, highest_ticket_cr: 3.5, launch_price_per_sqft: 6200, status: 'Upcoming', latitude: 13.1688, longitude: 77.6847 },
  { id: '5', name: 'Embassy Springs', slug: 'embassy-springs', developer: 'Embassy Group', micro_location: 'Devanahalli', cluster_name: 'North Bangalore', entry_ticket_cr: 2.8, highest_ticket_cr: 12, launch_price_per_sqft: 9800, status: 'Available', latitude: 13.2200, longitude: 77.7100 },
]
