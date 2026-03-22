import type { CollectionConfig } from 'payload'

export const Clusters: CollectionConfig = {
  slug: 'clusters',
  admin: {
    useAsTitle: 'name',
    description: 'Bangalore real estate cluster profiles',
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
    },
    {
      name: 'totalActiveProjects',
      type: 'number',
      label: 'Total Active Projects',
    },
    {
      name: 'upcomingLaunches',
      type: 'number',
      label: 'Upcoming Launches',
    },
    {
      name: 'avgPricePerSqft',
      type: 'number',
      label: 'Average Price/sqft (₹)',
    },
    {
      name: 'priceMomentum',
      type: 'select',
      label: 'Price Momentum',
      options: [
        { label: 'Rising Strong', value: 'Rising Strong' },
        { label: 'Rising', value: 'Rising' },
        { label: 'Stable Rising', value: 'Stable Rising' },
        { label: 'Stable', value: 'Stable' },
        { label: 'Declining', value: 'Declining' },
      ],
    },
    {
      name: 'maturityScore',
      type: 'number',
      label: 'Maturity Score (1-10)',
      min: 1,
      max: 10,
    },
    {
      name: 'investorSentiment',
      type: 'select',
      label: 'Investor Sentiment',
      options: [
        { label: 'Very Bullish', value: 'Very Bullish' },
        { label: 'Bullish', value: 'Bullish' },
        { label: 'Positive', value: 'Positive' },
        { label: 'Neutral', value: 'Neutral' },
        { label: 'Cautious', value: 'Cautious' },
      ],
    },
    {
      name: 'endUserTrend',
      type: 'text',
      label: 'End User Trend',
    },
    {
      name: 'competitionDensity',
      type: 'select',
      label: 'Competition Density',
      options: [
        { label: 'Very High', value: 'Very High' },
        { label: 'High', value: 'High' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Low', value: 'Low' },
      ],
    },
    {
      name: 'keyInfraProjects',
      type: 'array',
      label: 'Key Infrastructure Projects',
      fields: [
        {
          name: 'project',
          type: 'text',
        },
      ],
    },
    {
      name: 'strategicOutlook',
      type: 'textarea',
      label: 'Strategic Outlook',
    },
  ],
}
