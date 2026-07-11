import type { MetadataRoute } from 'next'

const BASE = 'https://freelegalforms.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                                    lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/nda`,                           lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/bill-of-sale`,                  lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/lease-agreement`,               lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/contractor-agreement`,          lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/privacy`,                       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/about`,                         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
