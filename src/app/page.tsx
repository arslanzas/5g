export const dynamic = 'force-dynamic'

import { createClient } from 'next-sanity'
import Link from 'next/link'

export const metadata = {
  title: 'Best 5G Mobile in Pakistan 2026 | Compare Prices & Specs',
  description: 'Find the latest 5G mobile price in Pakistan. Compare budget 5G phones under 30,000, 40,000, and 50,000 PKR with official PTA approval status and reviews.',
  keywords: [
    '5g mobile price in pakistan', 
    'best 5g mobile in pakistan', 
    '5g mobile price in pakistan under 50000', 
    '5g mobile price in pakistan under 40000', 
    '5g mobile price in pakistan under 30000',
    'samsung 5g mobile price in pakistan',
    'vivo 5g mobile price in pakistan',
    'infinix 5g mobile price in pakistan',
    'oppo 5g mobile price in pakistan',
    'apple iphone 5g price in pakistan'
  ],
}

const client = createClient({
  projectId: 'e1h3j61w',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

interface Phone {
  _id: string
  title: string
  slug?: { current: string }
  price?: number
  has5G?: boolean
  ptaApproved?: boolean
  imageUrl?: string
}

interface Banner {
  _id: string
  alertText: string
  linkUrl?: string
}

interface BrandItem {
  _id?: string
  name: string
  slug?: { current?: string } | string
  logoUrl?: string
  logo?: string
}

interface NewsItem {
  _id: string
  title: string
  slug?: { current: string }
  publishedAt?: string
  snippet?: string
  imageUrl?: string
}

interface BlogItem {
  _id: string
  title: string
  slug?: { current: string }
  category?: string
  excerpt?: string
  readTime?: string
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
  { name: 'Pixel', slug: 'google-pixel', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg' },
  { name: 'Nothing', slug: 'nothing', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nothing.svg' },
]

export default async function HomePage() {
  let phones: Phone[] = []
  let banner: Banner | null = null
  let brands: BrandItem[] = []
  let latestNews: NewsItem[] = []
  let featuredNews: NewsItem[] = []
  let blogs: BlogItem[] = []
  
  try {
    const data = await client.fetch(`{
      "phones": *[_type == "phone"] | order(_createdAt desc)[0...30] {
        _id,
        title,
        slug,
        price,
        has5G,
        ptaApproved,
        "imageUrl": coalesce(images[0].asset->url, image.asset->url)
      },
      "banner": *[_type == "banner" && isActive == true][0] {
        _id,
        alertText,
        linkUrl
      },
      "brands": *[_type == "brand"] | order(_createdAt asc) {
        _id,
        name,
        slug,
        "logoUrl": logo.asset->url
      },
      "latestNews": *[_type == "news"] | order(publishedAt desc, _createdAt desc)[0...10] {
        _id,
        title,
        slug,
        publishedAt,
        snippet,
        "imageUrl": mainImage.asset->url
      },
      "featuredNews": *[_type == "news" && isFeatured == true] | order(publishedAt desc, _createdAt desc)[0...10] {
        _id,
        title,
        slug,
        snippet,
        "imageUrl": mainImage.asset->url
      },
      "blogs": *[_type == "blog"] | order(_createdAt desc)[0...10] {
        _id,
        title,
        slug,
        category,
        excerpt,
        readTime,
        "imageUrl": featuredImage.asset->url
      }
    }`)

    if (data) {
      phones = data.phones || []
      banner = data.banner || null
      brands = data.brands || []
      latestNews = data.latestNews || []
      featuredNews = data.featuredNews || []
      blogs = data.blogs || []
    }
  } catch (error) {
    console.error("Sanity dynamic fetch failed:", error)
  }

  // Combine dynamic Sanity brands with defaults so the 5-column grid always stays clean and full
  const sanityBrandNames = new Set(brands.map(b => b.name.toLowerCase()))
  const combinedBrands = [
    ...brands.map(b => ({
      name: b.name,
      slug: (typeof b.slug === 'object' ? b.slug?.current : b.slug) || b.name.toLowerCase().replace(/\s+/g, '-'),
      logo: b.logoUrl || ''
    })),
    ...DEFAULT_BRANDS.filter(b => !sanityBrandNames.has(b.name.toLowerCase()))
  ].slice(0, 10)

  // Use recent news if featured items are not specifically toggled yet
  const displayFeaturedNews = featuredNews.length > 0 ? featuredNews : latestNews

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0F172A', overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>
      
      {/* MOBILE EDGE-TO-EDGE RESET & PURE CSS DRAWER */}
      <style dangerouslySetInnerHTML={{__html: `
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; overflow-x: hidden; width: 100%; max-width: 100%; }
        #nav-toggle { display: none; }
        .sidebar { position: fixed; top: 0; left: 0; width: 280px; height: 100vh; background-color: #0F172A; transform: translateX(-100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); z-index: 1000; padding: 24px 20px; overflow-y: auto; }
        #nav-toggle:checked ~ .sidebar { transform: translateX(0); }
        .overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.6); opacity: 0; visibility: hidden; transition: opacity 0.3s; z-index: 999; }
        #nav-toggle:checked ~ .overlay { opacity: 1; visibility: visible; }
        .sidebar-link { display: block; color: #FFF; text-decoration: none; padding: 14px 0; font-size: 1.05rem; border-bottom: 1px solid #1E293B; font-weight: 500; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <input type="checkbox" id="nav-toggle" />
      
      {/* Sidebar Drawer */}
      <aside className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <span style={{ color: '#FFF', fontSize: '1.3rem', fontWeight: 800 }}>Navigation</span>
          <label htmlFor="nav-toggle" style={{ color: '#FFF', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>&times;</label>
        </div>
        <Link href="/" className="sidebar-link">Home</Link>
        <Link href="/brand/samsung" className="sidebar-link">Samsung Phones</Link>
        <Link href="/brand/apple" className="sidebar-link">Apple iPhones</Link>
        <Link href="/brand/vivo" className="sidebar-link">Vivo Mobiles</Link>
        <Link href="/brand/oppo" className="sidebar-link">Oppo Mobiles</Link>
        <Link href="/brand/infinix" className="sidebar-link">Infinix Mobiles</Link>
        <Link href="/brand/xiaomi" className="sidebar-link">Xiaomi Mobiles</Link>
        <Link href="/price/under-50000" className="sidebar-link">Phones Under Rs. 50,000</Link>
        <Link href="/price/under-30000" className="sidebar-link">Phones Under Rs. 30,000</Link>
        <Link href="/blog" className="sidebar-link">Blogs</Link>
        <Link href="/news" className="sidebar-link">5G News</Link>
        <Link href="/compare" className="sidebar-link">Compare</Link>
        <Link href="/contact" className="sidebar-link">Contact Us</Link>
      </aside>
      <label htmlFor="nav-toggle" className="overlay"></label>

      {/* Dynamic Announcement Banner from Sanity */}
      {banner?.alertText && (
        <div style={{ backgroundColor: '#10B981', color: '#FFFFFF', padding: '9px 14px', textAlign: 'center', fontSize: '0.84rem', fontWeight: 600 }}>
          {banner.linkUrl ? (
            <a href={banner.linkUrl} style={{ color: '#FFFFFF', textDecoration: 'underline' }}>
              📢 {banner.alertText} &rarr;
            </a>
          ) : (
            <span>📢 {banner.alertText}</span>
          )}
        </div>
      )}

      {/* Header */}
      <header style={{ backgroundColor: '#0F172A', padding: '14px 16px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '14px' }}>
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
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '14px 12px', width: '100%' }}>
        
        {/* Search Bar Section */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', width: '100%' }}>
          <input 
            type="text" 
            placeholder="Search mobile, brand, or specs..." 
            style={{ flex: 1, minWidth: 0, padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.95rem', outline: 'none', backgroundColor: '#FFF' }}
          />
          <button style={{ backgroundColor: '#10B981', color: '#FFF', border: 'none', borderRadius: '8px', padding: '0 18px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', flexShrink: 0 }}>
            Search
          </button>
        </div>

        {/* Latest 5G News (Under Search, Live from Sanity) */}
        <section style={{ marginBottom: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: '#0F172A' }}>Latest 5G News</h3>
            <Link href="/news" style={{ fontSize: '0.8rem', color: '#0284C7', textDecoration: 'none', fontWeight: 600 }}>View All</Link>
          </div>
          <div className="hide-scroll" style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '6px' }}>
            {latestNews.length === 0 ? (
              <div style={{ minWidth: '82%', maxWidth: '82%', backgroundColor: '#FFF', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B' }}>5G Network Rolling out in Lahore and Karachi soon...</p>
              </div>
            ) : (
              latestNews.map((news) => {
                const newsUrl = news.slug?.current ? `/news/${news.slug.current}` : '#'
                return (
                  <Link key={news._id} href={newsUrl} style={{ textDecoration: 'none', color: 'inherit', minWidth: '82%', maxWidth: '82%', flexShrink: 0 }}>
                    <div style={{ backgroundColor: '#FFF', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', scrollSnapAlign: 'start', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                      <div style={{ width: '48px', height: '48px', backgroundColor: '#F1F5F9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#10B981', fontSize: '0.8rem', flexShrink: 0, overflow: 'hidden' }}>
                        {news.imageUrl ? (
                          <img src={news.imageUrl} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          '5G'
                        )}
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <p style={{ margin: '0 0 3px', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{news.title}</p>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                          {news.publishedAt ? new Date(news.publishedAt).toLocaleDateString('en-PK', { month: 'short', day: 'numeric' }) : 'Recent'}
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })
            )}
          </div>
        </section>

        {/* 5G Mobile Brands (5 Columns Grid, Live from Sanity + Defaults) */}
        <section style={{ marginBottom: '26px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 2px' }}>5G Mobile</h2>
          <p style={{ margin: '0 0 14px', color: '#64748B', fontSize: '0.85rem' }}>5g mobiles brands</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {combinedBrands.map(brand => (
              <Link key={brand.slug} href={`/brand/${brand.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '74px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                  <div style={{ height: '24px', width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>
                    {brand.logo ? (
                      <img src={brand.logo} alt={`${brand.name} logo`} style={{ maxHeight: '20px', maxWidth: '24px', objectFit: 'contain' }} />
                    ) : (
                      <span style={{ fontWeight: 800, fontSize: '0.75rem', color: '#0F172A' }}>{brand.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#1E293B', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', padding: '0 2px' }}>
                    {brand.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Find Mobile by Price */}
        <section style={{ backgroundColor: '#FFF', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0', marginBottom: '26px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 6px' }}>Lets find mobile by Price</h2>
          <p style={{ margin: '0 0 12px', fontSize: '0.85rem', color: '#64748B' }}>your price range from... to</p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '14px', width: '100%' }}>
            <input 
              type="number" 
              placeholder="Rs. 3000" 
              defaultValue="3000"
              style={{ flex: 1, minWidth: 0, padding: '10px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', textAlign: 'center' }} 
            />
            <span style={{ fontWeight: 600, color: '#64748B', fontSize: '0.85rem', flexShrink: 0 }}>to</span>
            <input 
              type="number" 
              placeholder="Rs. 150000" 
              defaultValue="150000"
              style={{ flex: 1, minWidth: 0, padding: '10px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', textAlign: 'center' }} 
            />
          </div>
          <button style={{ width: '100%', padding: '12px', backgroundColor: '#0284C7', color: '#FFF', border: 'none', borderRadius: '7px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}>
            find 5G mobile
          </button>
        </section>

        {/* Latest 5G Phones (3 per row) */}
        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 14px' }}>Latest 5g phones</h2>
          
          {phones.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <p style={{ color: '#64748B', margin: 0 }}>No phones found in database.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {phones.map((phone) => {
                const phoneUrl = phone.slug?.current ? `/phone/${phone.slug.current}` : '#'
                return (
                  <Link key={phone._id} href={phoneUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ backgroundColor: '#FFF', borderRadius: '8px', padding: '8px 6px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', textAlign: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                      <div style={{ height: '90px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>
                        {phone.imageUrl ? (
                          <img src={phone.imageUrl} alt={phone.title} style={{ maxHeight: '85px', maxWidth: '100%', objectFit: 'contain' }} />
                        ) : (
                          <div style={{ width: '48px', height: '64px', backgroundColor: '#F1F5F9', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', fontSize: '0.65rem' }}>No Img</div>
                        )}
                      </div>
                      <h3 style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 4px', lineHeight: 1.25, color: '#0F172A', minHeight: '2.5em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {phone.title}
                      </h3>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10B981', marginTop: 'auto' }}>
                        {phone.price ? `Rs. ${phone.price.toLocaleString()}` : 'Check Price'}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
          
          <button style={{ width: '100%', marginTop: '14px', padding: '11px', backgroundColor: '#FFF', color: '#0F172A', border: '1px solid #CBD5E1', borderRadius: '6px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
            next page &rarr;
          </button>
        </section>

        {/* Blogs Section (Live from Sanity, 2 on screen) */}
        <section style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Latest Blogs</h2>
            <Link href="/blog" style={{ fontSize: '0.82rem', color: '#0284C7', textDecoration: 'none', fontWeight: 600 }}>View All</Link>
          </div>
          <div className="hide-scroll" style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '6px' }}>
            {blogs.length === 0 ? (
              <div style={{ minWidth: '48%', maxWidth: '48%', backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '10px' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>5G vs 4G Battery Life in Pakistan...</p>
              </div>
            ) : (
              blogs.map((blog) => {
                const blogUrl = blog.slug?.current ? `/blog/${blog.slug.current}` : '#'
                return (
                  <Link key={blog._id} href={blogUrl} style={{ textDecoration: 'none', color: 'inherit', minWidth: '48%', maxWidth: '48%', flexShrink: 0 }}>
                    <div style={{ backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0', scrollSnapAlign: 'start', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ height: '80px', backgroundColor: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontWeight: 700, fontSize: '0.8rem', overflow: 'hidden' }}>
                        {blog.imageUrl ? (
                          <img src={blog.imageUrl} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          blog.category || 'Mobile Guide'
                        )}
                      </div>
                      <div style={{ padding: '10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#10B981', textTransform: 'uppercase', marginBottom: '2px' }}>
                          {blog.category || 'Guide'}
                        </span>
                        <h4 style={{ margin: '0 0 4px', fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.3, color: '#0F172A', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {blog.title}
                        </h4>
                        <p style={{ margin: 'auto 0 0', fontSize: '0.72rem', color: '#64748B', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {blog.excerpt}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              })
            )}
          </div>
        </section>

        {/* Feature 5G News Section (Live from Sanity, 2 on screen) */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 10px' }}>Feature 5g news</h2>
          <div className="hide-scroll" style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '6px' }}>
            {displayFeaturedNews.length === 0 ? (
              <div style={{ minWidth: '48%', maxWidth: '48%', backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '10px' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>Jazz completes cloud-native core 5G trials...</p>
              </div>
            ) : (
              displayFeaturedNews.map((feat) => {
                const newsUrl = feat.slug?.current ? `/news/${feat.slug.current}` : '#'
                return (
                  <Link key={feat._id} href={newsUrl} style={{ textDecoration: 'none', color: 'inherit', minWidth: '48%', maxWidth: '48%', flexShrink: 0 }}>
                    <div style={{ height: '100%', backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0', scrollSnapAlign: 'start', padding: '10px', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ height: '65px', backgroundColor: '#F1F5F9', borderRadius: '4px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontWeight: 800, fontSize: '0.8rem', overflow: 'hidden' }}>
                        {feat.imageUrl ? (
                          <img src={feat.imageUrl} alt={feat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          '5G NEWS'
                        )}
                      </div>
                      <h4 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, lineHeight: 1.3, color: '#0F172A', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {feat.title}
                      </h4>
                    </div>
                  </Link>
                )
              })
            )}
          </div>
        </section>

        <hr style={{ border: 0, borderTop: '1px solid #E2E8F0', margin: '30px 0' }} />

        {/* 1,500 Word Semantic SEO Guide */}
        <article style={{ backgroundColor: '#FFF', padding: '24px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', lineHeight: 1.8, fontSize: '0.95rem', color: '#334155' }}>
          
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', marginBottom: '16px' }}>
            Best 5G Mobile in Pakistan
          </h2>
          
          <p>
            Welcome to 5gmobile.pk, Pakistan's dedicated online smartphone portal. Finding the right mobile phone in Pakistan can be incredibly tricky. With currency fluctuations, import custom duties, PTA taxes, and rapidly changing retail prices across major markets in Lahore (Hafeez Center), Karachi (Saddar), and Rawalpindi, buyers often struggle to find clear, honest information. Our mission is to make your smartphone shopping journey completely stress-free by providing accurate hardware specifications and daily updated market rates.
          </p>
          <p>
            As telecom operators in Pakistan prepare their cellular towers and fiber backhaul networks for nationwide 5G launches, upgrading to a 5G-ready device is the smartest financial decision you can make. Fifth-generation mobile networking, popularly known as 5G, represents a massive technological leap forward from standard 4G LTE technology.
          </p>

          <h2 style={{ fontSize: '1.4rem', color: '#0F172A', marginTop: '32px', marginBottom: '16px', fontWeight: 800 }}>
            5G Mobile Price in Pakistan by Budget Tiers
          </h2>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 30000
          </h3>
          <p>
            Finding a brand-new, official PTA-approved 5G smartphone under 30,000 PKR is highly challenging due to FBR import duties and global microchip costs. However, budget innovators like Infinix and Tecno occasionally offer entry-level 5G devices in this tight price bracket.
          </p>
          <Link href="/price/under-30000" style={{ display: 'inline-block', marginTop: '8px', padding: '10px 16px', backgroundColor: '#F1F5F9', color: '#0284C7', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}>
            View All Mobiles Under Rs. 30,000 &rarr;
          </Link>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '32px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 40000
          </h3>
          <p>
            The 30,000 to 40,000 PKR category represents the entry-level sweet spot for price-conscious Pakistani buyers looking for a bit more performance. In this range, brands like Tecno, Infinix, and Xiaomi Redmi deliver solid build quality.
          </p>
          <Link href="/price/under-40000" style={{ display: 'inline-block', marginTop: '8px', padding: '10px 16px', backgroundColor: '#F1F5F9', color: '#0284C7', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}>
            View All Mobiles Under Rs. 40,000 &rarr;
          </Link>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '32px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 50000
          </h3>
          <p>
            The 40,000 to 50,000 PKR price segment is currently the most popular, highly searched smartphone category in Pakistan. You will find fierce competition from Vivo, Samsung, Realme, and Infinix.
          </p>
          <Link href="/price/under-50000" style={{ display: 'inline-block', marginTop: '8px', padding: '10px 16px', backgroundColor: '#F1F5F9', color: '#0284C7', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}>
            View All Mobiles Under Rs. 50,000 &rarr;
          </Link>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '32px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 100000
          </h3>
          <p>
            Stepping up to the 100,000 PKR bracket moves you into the "Premium Mid-Range" category. Devices here feature flagship-grade designs, Optical Image Stabilization (OIS), and powerful chipsets.
          </p>
          <Link href="/price/under-100000" style={{ display: 'inline-block', marginTop: '8px', padding: '10px 16px', backgroundColor: '#F1F5F9', color: '#0284C7', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}>
            View All Mobiles Under Rs. 100,000 &rarr;
          </Link>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '32px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 150000
          </h3>
          <p>
            At the 150,000 PKR mark, you are entering the territory of "Flagship Killers." These smartphones offer true top-tier performance, ultra-fast 68W to 120W charging, and advanced AI camera algorithms.
          </p>
          <Link href="/price/under-150000" style={{ display: 'inline-block', marginTop: '8px', padding: '10px 16px', backgroundColor: '#F1F5F9', color: '#0284C7', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}>
            View All Mobiles Under Rs. 150,000 &rarr;
          </Link>

          <h2 style={{ fontSize: '1.4rem', color: '#0F172A', marginTop: '40px', marginBottom: '16px', fontWeight: 800 }}>
            Top 5G Mobile Brands Dominating the Pakistani Market
          </h2>

          <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>Samsung 5G Mobile Price in Pakistan</h3>
          <p>
            The current Samsung 5G mobile price in Pakistan generally ranges from <strong>Rs. 45,000 to over Rs. 450,000+</strong> depending on the series. Samsung phones retain an incredibly high resale value in local markets.
          </p>

          <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>Apple iPhone 5G Price in Pakistan</h3>
          <p>
            For brand new, official PTA-approved devices, the Apple iPhone 5G price in Pakistan starts around <strong>Rs. 200,000 and can exceed Rs. 550,000+</strong> for the top-tier iPhone Pro Max models.
          </p>

          <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>Vivo 5G Mobile Price in Pakistan</h3>
          <p>
            The Vivo 5G mobile price in Pakistan ranges from <strong>Rs. 48,000 to Rs. 220,000</strong>. These smartphones are absolute staple choices for wedding photography due to their specialized portrait lighting.
          </p>
          
          <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>Oppo 5G Mobile Price in Pakistan</h3>
          <p>
            The Oppo 5G mobile price in Pakistan sits comfortably between <strong>Rs. 50,000 and Rs. 180,000</strong>. Oppo's proprietary SuperVOOC fast-charging technology ensures quick top-ups during load shedding.
          </p>

          <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>Infinix 5G Mobile Price in Pakistan</h3>
          <p>
            The Infinix 5G mobile price in Pakistan is highly accessible, generally falling between <strong>Rs. 32,000 and Rs. 75,000</strong>. They offer large batteries and smooth high-refresh-rate screens for budget gamers.
          </p>

          <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>Tecno 5G Mobile Price in Pakistan</h3>
          <p>
            The Tecno 5G mobile price in Pakistan ranges from <strong>Rs. 34,000 to Rs. 85,000</strong>. The Tecno Pova series is famous among local gamers for its massive batteries and vapor-chamber cooling.
          </p>

          <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>Redmi 5G Mobile Price in Pakistan</h3>
          <p>
            Xiaomi’s Redmi brand offers great specification-to-price value, ranging from <strong>Rs. 38,000 to Rs. 195,000</strong>. Powered by Xiaomi HyperOS, they deliver responsive daily performance.
          </p>

          <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>Realme 5G Mobile Price in Pakistan</h3>
          <p>
            Realme delivers clean UI and youth-oriented designs, priced between <strong>Rs. 42,000 and Rs. 110,000</strong>, holding significant market share in the mid-range segment.
          </p>

          <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>Google Pixel 5G Price in Pakistan</h3>
          <p>
            Beloved by camera purists, the Google Pixel ranges from <strong>Rs. 65,000 up to Rs. 280,000+</strong> across non-PTA and PTA registered imports.
          </p>

          <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>Nothing Phone 5G Price in Pakistan</h3>
          <p>
            Featuring the Glyph lighting interface and transparent aesthetic, Nothing Phone ranges between <strong>Rs. 85,000 and Rs. 165,000</strong>.
          </p>

          <h2 style={{ fontSize: '1.4rem', color: '#0F172A', marginTop: '40px', marginBottom: '16px', fontWeight: 800 }}>
            Essential Guide: PTA Approval and DIRBS Compliance
          </h2>

          <p>
            Every 5G phone operating on Pakistani cellular networks must be officially registered with the PTA through the DIRBS database. Always dial <strong>*#06#</strong> to get your 15-digit IMEI and verify it by sending an SMS to <strong>8484</strong> before completing your purchase.
          </p>
        </article>
      </main>

      {/* AdSense Ready Footer */}
      <footer style={{ backgroundColor: '#0F172A', color: '#94A3B8', padding: '40px 16px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', borderBottom: '1px solid #1E293B', paddingBottom: '32px', marginBottom: '24px' }}>
          
          <div style={{ gridColumn: 'span 2' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.5px', display: 'block', marginBottom: '10px' }}>
              <span style={{ color: '#FFFFFF' }}>5G</span>
              <span style={{ color: '#10B981' }}>Mobile</span>
              <span style={{ color: '#FFFFFF', fontWeight: 400 }}>.pk</span>
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
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', fontSize: '0.75rem' }}>
          &copy; {new Date().getFullYear()} 5gmobile.pk. All rights reserved. Prices and specs are for reference only.
        </div>
      </footer>
    </div>
  )
}
