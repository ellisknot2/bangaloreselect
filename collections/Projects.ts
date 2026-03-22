import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    description: 'Residential project listings',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly identifier (e.g., prestige-raintree-park)',
      },
    },
    {
      name: 'developer',
      type: 'text',
      required: true,
    },
    {
      name: 'microLocation',
      type: 'text',
      label: 'Micro Location',
    },
    {
      name: 'clusterName',
      type: 'text',
      label: 'Cluster Name',
    },
    {
      name: 'projectType',
      type: 'select',
      label: 'Project Type',
      options: [
        { label: 'Apartments', value: 'Apartments' },
        { label: 'Villas', value: 'Villas' },
        { label: 'Mixed Use', value: 'Mixed Use' },
        { label: 'Plots', value: 'Plots' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Available', value: 'Available' },
        { label: 'Upcoming', value: 'Upcoming' },
        { label: 'Sold Out', value: 'Sold Out' },
      ],
      defaultValue: 'Available',
    },
    {
      name: 'entryTicketCr',
      type: 'number',
      label: 'Entry Ticket (Cr)',
    },
    {
      name: 'highestTicketCr',
      type: 'number',
      label: 'Highest Ticket (Cr)',
    },
    {
      name: 'launchPricePerSqft',
      type: 'number',
      label: 'Launch Price/sqft (₹)',
    },
    {
      name: 'scaleAcres',
      type: 'number',
      label: 'Scale (Acres)',
    },
    {
      name: 'latitude',
      type: 'number',
    },
    {
      name: 'longitude',
      type: 'number',
    },
    {
      name: 'reraNumber',
      type: 'text',
      label: 'RERA Number',
    },
    {
      name: 'reraStatus',
      type: 'select',
      label: 'RERA Status',
      options: [
        { label: 'Registered', value: 'Registered' },
        { label: 'Applied', value: 'Applied' },
        { label: 'Exempt', value: 'Exempt' },
      ],
    },
    {
      name: 'investorScore',
      type: 'number',
      label: 'Investor Score (1-5)',
      min: 1,
      max: 5,
    },
    {
      name: 'keyHighlights',
      type: 'array',
      label: 'Key Highlights',
      fields: [
        {
          name: 'highlight',
          type: 'text',
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
    },
  ],
}
