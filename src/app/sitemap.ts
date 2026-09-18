import { createClient } from 'next-sanity'
import { MetadataRoute } from 'next'

const client = createClient({
  projectId: 'e1h3j61w',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const BASE_URL = 'https://5gmobile.pk'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic slugs from Sanity
  const data = await client.fetch(`{
    "phones": *[_type == "phone" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
    "blogs": *[_type == "blog" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
    "news": *[_type == "news" && defined(slug.current)]{ "slug": slug.current, _updatedAt },
    "brands": *[_type == "brand" && defined(slug.current)]{ "slug": slug.current }
  }`)

  const phoneUrls = (data.phones || []).map((item: any) => ({
    url: `${BASE_URL}/phone/${item.slug}`,
    lastModified: item._updatedAt ? new Date(item._updatedAt) : new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  const blogUrls = (data.blogs || []).map((item: any) => ({
    url: `${BASE_URL}/blog/${item.slug}`,
    lastModified: item._updatedAt ? new Date(item._updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const newsUrls = (data.news || []).map((item: any) => ({
    url: `${BASE_URL}/news/${item.slug}`,
    lastModified: item._updatedAt ? new Date(item._updatedAt) : new Date(),
    changeFrequency: 'hourly' as const,
    priority: 0.8,
  }))

  const brandUrls = (data.brands || []).map((item: any) => ({
    url: `${BASE_URL}/brand/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const staticUrls = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'always' as const, priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${BASE_URL}/news`, lastModified: new Date(), changeFrequency: 'hourly' as const, priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.1 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.1 },
    { url: `${BASE_URL}/disclaimer`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.1 },
  ]

  return [...staticUrls, ...phoneUrls, ...blogUrls, ...newsUrls, ...brandUrls]
}
