'use client'

import { useEffect, useRef, useState } from 'react'
import type { Project } from '@/lib/types'

interface MapboxMapProps {
  projects: Project[]
  onProjectSelect?: (project: Project) => void
  selectedProjectId?: string
  center?: [number, number]
  zoom?: number
  height?: string
  showPopups?: boolean
  singleProject?: boolean
}

export default function MapboxMap({
  projects,
  onProjectSelect,
  selectedProjectId,
  center,
  zoom = 11,
  height = '100%',
  showPopups = true,
  singleProject = false,
}: MapboxMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    if (!token) {
      setError('Mapbox token not configured')
      return
    }

    const initMap = async () => {
      try {
        const mapboxgl = (await import('mapbox-gl')).default
        mapboxgl.accessToken = token

        // Determine map center
        let mapCenter: [number, number] = center || [77.5946, 13.0827]
        if (!center && projects.length > 0) {
          const validProjects = projects.filter((p) => p.longitude && p.latitude)
          if (validProjects.length > 0) {
            const avgLng = validProjects.reduce((sum, p) => sum + p.longitude, 0) / validProjects.length
            const avgLat = validProjects.reduce((sum, p) => sum + p.latitude, 0) / validProjects.length
            mapCenter = [avgLng, avgLat]
          }
        }

        const map = new mapboxgl.Map({
          container: mapContainerRef.current!,
          style: 'mapbox://styles/mapbox/light-v11',
          center: mapCenter,
          zoom: singleProject ? 14 : zoom,
          attributionControl: false,
        })

        map.addControl(new mapboxgl.NavigationControl(), 'top-right')
        map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right')

        mapRef.current = map

        map.on('load', () => {
          setIsLoaded(true)

          // Add markers
          const validProjects = projects.filter((p) => p.longitude && p.latitude)
          validProjects.forEach((project) => {
            // Create custom marker element
            const el = document.createElement('div')
            el.className = 'custom-marker'
            el.style.cssText = `
              width: 36px;
              height: 36px;
              background: #F5C000;
              border: 3px solid #ffffff;
              border-radius: 50%;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 8px rgba(0,0,0,0.25);
              transition: transform 0.2s, background 0.2s;
              font-size: 14px;
              font-weight: 700;
              color: #0a0a0a;
            `
            el.innerHTML = '₹'

            if (project.id === selectedProjectId) {
              el.style.background = '#F59E0B'
              el.style.transform = 'scale(1.2)'
            }

            el.addEventListener('mouseenter', () => {
              el.style.transform = 'scale(1.15)'
            })
            el.addEventListener('mouseleave', () => {
              el.style.transform = project.id === selectedProjectId ? 'scale(1.2)' : 'scale(1)'
            })

            const popup = showPopups
              ? new mapboxgl.Popup({
                  offset: 25,
                  closeButton: true,
                  maxWidth: '250px',
                }).setHTML(`
                  <div style="font-family: Inter, sans-serif; padding: 4px 0;">
                    <p style="font-size: 11px; color: #6b7280; margin-bottom: 2px;">${project.developer}</p>
                    <h3 style="font-size: 14px; font-weight: 700; color: #111; margin-bottom: 4px;">${project.name}</h3>
                    <p style="font-size: 12px; color: #6b7280; margin-bottom: 6px;">📍 ${project.micro_location}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 13px; font-weight: 600; color: #16a34a;">₹${project.entry_ticket_cr}–${project.highest_ticket_cr} Cr</span>
                      <span style="font-size: 11px; background: #dcfce7; color: #16a34a; padding: 2px 8px; border-radius: 20px;">${project.status}</span>
                    </div>
                  </div>
                `)
              : undefined

            const marker = new mapboxgl.Marker({ element: el })
              .setLngLat([project.longitude, project.latitude])

            if (popup) {
              marker.setPopup(popup)
            }

            marker.addTo(map)

            el.addEventListener('click', () => {
              if (onProjectSelect) {
                onProjectSelect(project)
              }
            })

            markersRef.current.push(marker)
          })
        })

        return () => {
          markersRef.current.forEach((m) => m.remove())
          markersRef.current = []
          map.remove()
          mapRef.current = null
        }
      } catch (err) {
        console.error('Mapbox init error:', err)
        setError('Failed to load map')
      }
    }

    const cleanup = initMap()
    return () => {
      cleanup.then((fn) => fn && fn())
    }
  }, [])

  // Update marker styles when selectedProjectId changes
  useEffect(() => {
    // Markers are static after mount — re-init handled by parent if needed
  }, [selectedProjectId])

  if (error) {
    return (
      <div
        style={{ height }}
        className="bg-gray-100 rounded-xl flex items-center justify-center"
      >
        <div className="text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-10l6-3m0 13l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-sm">Map unavailable</p>
          <p className="text-xs mt-1 text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative" style={{ height }}>
      <div ref={mapContainerRef} className="absolute inset-0 rounded-xl overflow-hidden" />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 rounded-xl flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" style={{ borderWidth: '3px' }} />
            <p className="text-sm text-gray-500">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  )
}
