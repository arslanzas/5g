export const dynamic = 'force-dynamic'

import { createClient } from 'next-sanity'
import Link from 'next/link'
import type { Metadata } from 'next'

const client = createClient({
  projectId: 'e1h3j61w',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Helper to extract the ceiling price from the URL slug
function parseMaxPrice(slug: string): number {
  const match = slug.match(/under-(\d+)/i)
  if (match && match[1]) {
    return parseInt(match[1], 10)
  }
  const digitsOnly = slug.replace(/\D/g, '')
  return digitsOnly ? parseInt(digitsOnly, 10) : 50000
}

// 1. Dynamic SEO Metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const maxPrice = parseMaxPrice(params.slug)
  const formattedPrice = maxPrice.toLocaleString('en-PK')

  return {
    title: `5G Mobile Price in Pakistan Under ${formattedPrice} (2026) | 5gmobile.pk`,
    description: `Browse the best 5G mobile phones in Pakistan under ${formattedPrice} PKR. Compare specs, official PTA approval status, battery life, and prices.`,
    robots: {
      index: true,
      follow: true,
    }
  }
}

interface Phone {
  _id: string
  title: string
  slug?: { current: string }
  price?: number
  has5G?: boolean
  ptaApproved?: boolean
  imageUrl?: string
}

interface BrandItem {
  name: string
  slug?: { current?: string } | string
  logoUrl?: string
}

interface BlogSnippet {
  _id: string
  title: string
  slug?: { current: string }
  category?: string
  imageUrl?: string
}

const DEFAULT_BRANDS = [
  { name: 'Samsung', slug: 'samsung', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/samsung.svg' },
  { name: 'Apple', slug: 'apple', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/apple.svg' },
  { name: 'Xiaomi', slug: 'xiaomi', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/xiaomi.svg' },
  { name: 'Vivo', slug: 'vivo', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vivo.svg' },
  { name: 'Oppo', slug: 'oppo', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/oppo.svg' },
  { name: 'Realme', slug: 'realme', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/realme.svg' },
  { name: 'Infinix', slug: 'infinix', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Infinix_wordmark.svg' },
  { name: 'Tecno', slug: 'tecno', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Tecno_Mobile_logo.svg' },
]

const PRICE_TIERS = [
  { label: 'Under 30K', slug: 'under-30000' },
  { label: 'Under 40K', slug: 'under-40000' },
  { label: 'Under 50K', slug: 'under-50000' },
  { label: 'Under 100K', slug: 'under-100000' },
  { label: 'Under 150K', slug: 'under-150000' },
]

export default async function PriceArchivePage({ params }: { params: { slug: string } }) {
  const maxPrice = parseMaxPrice(params.slug)
  const formattedPrice = maxPrice.toLocaleString('en-PK')

  // Fetch phones within price bracket, top phones, blogs, and brands
  const data = await client.fetch(`{
    "phones": *[_type == "phone" && price <= $maxPrice] | order(price desc, _createdAt desc)[0...40] {
      _id,
      title,
      slug,
      price,
      has5G,
      ptaApproved,
      "imageUrl": coalesce(images[0].asset->url, image.asset->url)
    },
    "brands": *[_type == "brand"] | order(_createdAt asc) {
      name,
      slug,
      "logoUrl": logo.asset->url
    },
    "blogs": *[_type == "blog"] | order(_createdAt desc)[0...3] {
      _id,
      title,
      slug,
      category,
      "imageUrl": coalesce(featuredImage.asset->url, content[_type == "image"][0].asset->url)
    }
  }`, { maxPrice })

  const phones: Phone[] = data?.phones || []
  const brands: BrandItem[] = data?.brands || []
  const blogs: BlogSnippet[] = data?.blogs || []

  // Combine Sanity brands with fallback defaults
  const sanityBrandNames = new Set(brands.map((b) => b.name.toLowerCase()))
  const combinedBrands = [
    ...brands.map((b) => ({
      name: b.name,
      slug: (typeof b.slug === 'object' ? b.slug?.current : b.slug) || b.name.toLowerCase().replace(/\s+/g, '-'),
      logo: b.logoUrl || ''
    })),
    ...DEFAULT_BRANDS.filter((b) => !sanityBrandNames.has(b.name.toLowerCase()))
  ].slice(0, 8)

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0F172A', overflowX: 'hidden' }}>
      
      {/* CSS Drawer Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
        #nav-toggle { display: none; }
        .sidebar { position: fixed; top: 0; left: 0; width: 280px; height: 100vh; background-color: #0F172A; transform: translateX(-100%); transition: transform 0.3s ease; z-index: 1000; padding: 24px 20px; overflow-y: auto; }
        #nav-toggle:checked ~ .sidebar { transform: translateX(0); }
        .overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.6); opacity: 0; visibility: hidden; transition: opacity 0.3s; z-index: 999; }
        #nav-toggle:checked ~ .overlay { opacity: 1; visibility: visible; }
        .sidebar-link { display: block; color: #FFF; text-decoration: none; padding: 14px 0; font-size: 1.05rem; border-bottom: 1px solid #1E293B; font-weight: 500; }
      `}} />

      <input type="checkbox" id="nav-toggle" />
      
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <span style={{ color: '#FFF', fontSize: '1.3rem', fontWeight: 800 }}>Menu</span>
          <label htmlFor="nav-toggle" style={{ color: '#FFF', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>&times;</label>
        </div>
        <Link href="/" className="sidebar-link">Home</Link>
        <Link href="/brand/samsung" className="sidebar-link">Samsung Phones</Link>
        <Link href="/brand/apple" className="sidebar-link">Apple iPhones</Link>
        <Link href="/brand/vivo" className="sidebar-link">Vivo Mobiles</Link>
        <Link href="/price/under-50000" className="sidebar-link">Phones Under Rs. 50,000</Link>
        <Link href="/price/under-30000" className="sidebar-link">Phones Under Rs. 30,000</Link>
        <Link href="/blog" className="sidebar-link">Blogs</Link>
        <Link href="/news" className="sidebar-link">5G News</Link>
        <Link href="/contact" className="sidebar-link">Contact Us</Link>
      </aside>
      <label htmlFor="nav-toggle" className="overlay"></label>

      {/* Header */}
      <header style={{ backgroundColor: '#0F172A', padding: '14px 16px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <label htmlFor="nav-toggle" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px' }}>
            <span style={{ width: '22px', height: '2.5px', backgroundColor: '#FFF', borderRadius: '2px', display: 'block' }}></span>
            <span style={{ width: '22px', height: '2.5px', backgroundColor: '#FFF', borderRadius: '2px', display: 'block' }}></span>
            <span style={{ width: '22px', height: '2.5px', backgroundColor: '#FFF', borderRadius: '2px', display: 'block' }}></span>
          </label>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            <span style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
              <span style={{ color: '#FFFFFF' }}>5G</span>
              <span style={{ color: '#10B981' }}>Mobile</span>
              <span style={{ color: '#FFFFFF', fontWeight: 400 }}>.pk</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '16px 14px 40px' }}>
        
        {/* Breadcrumbs */}
        <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '16px' }}>
          <Link href="/" style={{ color: '#0284C7', textDecoration: 'none' }}>Home</Link> &gt;{' '}
          <span>Price Filter</span> &gt;{' '}
          <span style={{ fontWeight: 600 }}>Under Rs. {formattedPrice}</span>
        </div>

        {/* Page Title & Filter Header */}
        <div style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 16px', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.55rem', fontWeight: 900, margin: '0 0 6px', color: '#0F172A' }}>
            Mobiles Under Rs. {formattedPrice} in Pakistan
          </h1>
          <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: '#64748B' }}>
            Displaying {phones.length} phones currently available under Rs. {formattedPrice} PKR.
          </p>

          {/* Quick Price Switcher Buttons */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {PRICE_TIERS.map((tier) => {
              const isActive = tier.slug === params.slug
              return (
                <Link key={tier.slug} href={`/price/${tier.slug}`} style={{ textDecoration: 'none' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    backgroundColor: isActive ? '#10B981' : '#F1F5F9',
                    color: isActive ? '#FFF' : '#334155',
                    border: isActive ? '1px solid #10B981' : '1px solid #CBD5E1'
                  }}>
                    {tier.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Mobiles Grid */}
        <section style={{ marginBottom: '40px' }}>
          {phones.length === 0 ? (
            <div style={{ padding: '36px 16px', textAlign: 'center', backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <p style={{ color: '#64748B', margin: 0 }}>
                No phones listed under Rs. {formattedPrice} PKR in the database yet.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
              {phones.map((phone) => {
                const phoneUrl = phone.slug?.current ? `/phone/${phone.slug.current}` : '#'
                return (
                  <Link key={phone._id} href={phoneUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ backgroundColor: '#FFF', borderRadius: '8px', padding: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', textAlign: 'center' }}>
                      <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                        {phone.imageUrl ? (
                          <img src={phone.imageUrl} alt={phone.title} style={{ maxHeight: '90px', maxWidth: '100%', objectFit: 'contain' }} />
                        ) : (
                          <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>No Photo</span>
                        )}
                      </div>
                      <h3 style={{ fontSize: '0.8rem', fontWeight: 600, margin: '0 0 6px', color: '#0F172A', lineHeight: 1.3 }}>
                        {phone.title}
                      </h3>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#10B981', margin: '0 0 10px' }}>
                        {phone.price ? `Rs. ${phone.price.toLocaleString()}` : 'Check Price'}
                      </div>
                      <div style={{ marginTop: 'auto', display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {phone.has5G && <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '2px 6px', backgroundColor: '#DCFCE7', color: '#15803D', borderRadius: '4px' }}>5G</span>}
                        {phone.ptaApproved && <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '2px 6px', backgroundColor: '#E0F2FE', color: '#0369A1', borderRadius: '4px' }}>PTA</span>}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>

        {/* Related Buying Guides */}
        {blogs.length > 0 && (
          <section style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 12px' }}>Smartphone Guides & Tips</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              {blogs.map((blog) => {
                const blogUrl = blog.slug?.current ? `/blog/${blog.slug.current}` : '#'
                return (
                  <Link key={blog._id} href={blogUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div style={{ width: '56px', height: '56px', backgroundColor: '#F1F5F9', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {blog.imageUrl ? (
                          <img src={blog.imageUrl} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>Guide</span>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#10B981', textTransform: 'uppercase' }}>{blog.category || 'Tip'}</span>
                        <h4 style={{ margin: '2px 0 0', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.3 }}>
                          {blog.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Explore Brands */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 12px' }}>Shop by Brand</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {combinedBrands.map((brand) => (
              <Link key={brand.slug} href={`/brand/${brand.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '68px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 600, color: '#1E293B', textAlign: 'center' }}>{brand.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0F172A', color: '#94A3B8', padding: '40px 16px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', borderBottom: '1px solid #1E293B', paddingBottom: '32px', marginBottom: '24px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.5px', display: 'block', marginBottom: '10px' }}>
              <span style={{ color: '#FFFFFF' }}>5G</span><span style={{ color: '#10B981' }}>Mobile</span><span style={{ color: '#FFFFFF', fontWeight: 400 }}>.pk</span>
            </span>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              Pakistan's most trusted directory for 5G smartphone prices, daily market updates, and official PTA tax calculators.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#FFF', fontSize: '1rem', marginBottom: '12px', fontWeight: 700 }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/about" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem' }}>About Us</Link>
              <Link href="/contact" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem' }}>Contact Us</Link>
              <Link href="/blog" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem' }}>Mobile Blog</Link>
              <Link href="/news" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem' }}>5G News</Link>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#FFF', fontSize: '1rem', marginBottom: '12px', fontWeight: 700 }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/privacy-policy" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem' }}>Privacy Policy</Link>
              <Link href="/terms" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem' }}>Terms & Conditions</Link>
              <Link href="/disclaimer" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem' }}>Disclaimer</Link>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', fontSize: '0.75rem' }}>
          &copy; {new Date().getFullYear()} 5gmobile.pk. All rights reserved.
        </div>
      </footer>

    </div>
  )
}
