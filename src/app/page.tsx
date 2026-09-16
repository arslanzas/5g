export const dynamic = 'force-dynamic'

import { createClient } from 'next-sanity'
import Link from 'next/link'

export const metadata = {
  title: 'Best 5G Mobile in Pakistan 2026 | Compare Prices & Specs',
  description: 'Find the latest 5G mobile price in Pakistan. Compare budget 5G phones with official PTA approval status and reviews.',
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

const BRANDS = [
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
  const phones: Phone[] = await client.fetch(
    `*[_type == "phone"] | order(_createdAt desc)[0...30] {
      _id,
      title,
      slug,
      price,
      has5G,
      ptaApproved,
      "imageUrl": image.asset->url
    }`
  )

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0F172A', overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>
      
      {/* GLOBAL MOBILE OVERFLOW FIX & TRANSFORM DRAWER */}
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
          <span style={{ color: '#FFF', fontSize: '1.3rem', fontWeight: 800 }}>5G Mobile Navigation</span>
          <label htmlFor="nav-toggle" style={{ color: '#FFF', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>&times;</label>
        </div>
        <Link href="/" className="sidebar-link">Home</Link>
        <Link href="/brand/samsung" className="sidebar-link">Samsung Phones</Link>
        <Link href="/brand/apple" className="sidebar-link">Apple iPhones</Link>
        <Link href="/brand/vivo" className="sidebar-link">Vivo Mobiles</Link>
        <Link href="/brand/xiaomi" className="sidebar-link">Xiaomi Mobiles</Link>
        <Link href="/price/under-50000" className="sidebar-link">Phones Under Rs. 50,000</Link>
        <Link href="/price/under-30000" className="sidebar-link">Phones Under Rs. 30,000</Link>
        <Link href="/blog" className="sidebar-link">Blogs & Guides</Link>
        <Link href="/news" className="sidebar-link">5G News</Link>
      </aside>
      <label htmlFor="nav-toggle" className="overlay"></label>

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
        
        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', width: '100%' }}>
          <input 
            type="text" 
            placeholder="Search mobile, brand, or specs..." 
            style={{ flex: 1, minWidth: 0, padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.95rem', outline: 'none', backgroundColor: '#FFF' }}
          />
          <button style={{ backgroundColor: '#10B981', color: '#FFF', border: 'none', borderRadius: '8px', padding: '0 18px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', flexShrink: 0 }}>
            Search
          </button>
        </div>

        {/* Latest 5G News Slider */}
        <section style={{ marginBottom: '22px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 10px', color: '#0F172A' }}>Latest 5G News</h3>
          <div className="hide-scroll" style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '6px' }}>
            {[
              { id: 1, title: 'PTA prepares final spectrum auction for commercial 5G rollout', time: '1 hr ago' },
              { id: 2, title: '5G test results in Karachi clock over 1.2 Gbps speeds', time: '3 hrs ago' },
              { id: 3, title: 'Federal budget outlines tax incentives for local 5G device assembly', time: '5 hrs ago' }
            ].map((news) => (
              <div key={news.id} style={{ minWidth: '82%', maxWidth: '82%', backgroundColor: '#FFF', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', scrollSnapAlign: 'start', display: 'flex', gap: '12px', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: '#F1F5F9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#10B981', fontSize: '0.8rem', flexShrink: 0 }}>5G</div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ margin: '0 0 3px', fontSize: '0.85rem', fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{news.title}</p>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{news.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5G Mobile Brands (5 Columns Grid) */}
        <section style={{ marginBottom: '26px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 2px' }}>5G Mobile</h2>
          <p style={{ margin: '0 0 14px', color: '#64748B', fontSize: '0.85rem' }}>5G Mobiles Brands</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {BRANDS.map(brand => (
              <Link key={brand.slug} href={`/brand/${brand.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '74px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                  <div style={{ height: '24px', width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logo`} 
                      style={{ maxHeight: '20px', maxWidth: '24px', objectFit: 'contain' }}
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none'
                      }}
                    />
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
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 6px' }}>Let's find mobile by Price</h2>
          <p style={{ margin: '0 0 12px', fontSize: '0.85rem', color: '#64748B' }}>Your price range from...</p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '14px', width: '100%' }}>
            <input 
              type="number" 
              placeholder="3,000" 
              defaultValue="3000"
              style={{ flex: 1, minWidth: 0, padding: '10px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', textAlign: 'center' }} 
            />
            <span style={{ fontWeight: 600, color: '#64748B', fontSize: '0.85rem', flexShrink: 0 }}>to</span>
            <input 
              type="number" 
              placeholder="150,000" 
              defaultValue="150000"
              style={{ flex: 1, minWidth: 0, padding: '10px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', textAlign: 'center' }} 
            />
          </div>
          <button style={{ width: '100%', padding: '12px', backgroundColor: '#0284C7', color: '#FFF', border: 'none', borderRadius: '7px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}>
            Find 5G Mobile
          </button>
        </section>

        {/* Latest 5G Phones (3 per row) */}
        <section style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 14px' }}>Latest 5G Phones</h2>
          
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
            Next Page &rarr;
          </button>
        </section>

        {/* Latest Blogs Slider */}
        <section style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Latest Blogs</h2>
            <Link href="/blog" style={{ fontSize: '0.82rem', color: '#0284C7', textDecoration: 'none', fontWeight: 600 }}>View All</Link>
          </div>
          <div className="hide-scroll" style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '6px' }}>
            {[
              { id: 1, title: '5G vs 4G Battery Life in Pakistan: Complete Analysis', excerpt: 'How continuous 5G usage impacts battery endurance...' },
              { id: 2, title: 'Official PTA Tax Rates for Imported 5G Flagships in 2026', excerpt: 'Current customs calculations for passport vs CNIC...' },
              { id: 3, title: 'Best Mobile Processors for Gaming Under Rs. 50,000', excerpt: 'Dimensity vs Snapdragon benchmarks tested locally...' }
            ].map((blog) => (
              <div key={blog.id} style={{ minWidth: '72%', maxWidth: '72%', backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0', scrollSnapAlign: 'start', overflow: 'hidden' }}>
                <div style={{ height: '90px', backgroundColor: '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontWeight: 700, fontSize: '0.85rem' }}>
                  Mobile Guide
                </div>
                <div style={{ padding: '10px' }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: '0.88rem', fontWeight: 700, lineHeight: 1.3 }}>{blog.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748B' }}>{blog.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured 5G News Slider */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 10px' }}>Featured 5G News</h2>
          <div className="hide-scroll" style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '6px' }}>
            {[
              { id: 1, title: 'Jazz completes cloud-native core 5G trials' },
              { id: 2, title: 'Zong extends high-frequency 5G test sites' },
              { id: 3, title: 'Ufone announces readiness for commercial millimeter wave' },
              { id: 4, title: 'Local assembly lines for 5G motherboards approved' }
            ].map((feat) => (
              <div key={feat.id} style={{ minWidth: '46%', maxWidth: '46%', backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0', scrollSnapAlign: 'start', padding: '10px' }}>
                <div style={{ height: '65px', backgroundColor: '#F1F5F9', borderRadius: '4px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontWeight: 800, fontSize: '0.8rem' }}>5G NEWS</div>
                <h4 style={{ margin: 0, fontSize: '0.8rem', fontWeight: 600, lineHeight: 1.3 }}>{feat.title}</h4>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: 0, borderTop: '1px solid #E2E8F0', margin: '30px 0' }} />

        {/* Semantic Content */}
        <article style={{ backgroundColor: '#FFF', padding: '20px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', lineHeight: 1.7, fontSize: '0.92rem', color: '#334155' }}>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0F172A', marginBottom: '14px' }}>
            Best 5G Mobile in Pakistan
          </h2>
          <p>
            Welcome to <strong>5gmobile.pk</strong>, Pakistan's dedicated smartphone portal. Finding the right mobile phone in Pakistan can be tricky due to currency fluctuations, import duties, and PTA taxes across major markets in Lahore (Hafeez Center), Karachi (Saddar), and Islamabad. We provide accurate hardware specifications, authentic review benchmarks, and daily updated retail rates.
          </p>
          <p>
            Upgrading to a 5G-ready device is the smartest decision for longevity and speed. With fifth-generation mobile connectivity, users can experience multi-gigabit transfer speeds and ultra-low latency.
          </p>

          <h2 style={{ fontSize: '1.25rem', color: '#0F172A', marginTop: '24px', marginBottom: '12px', fontWeight: 800 }}>
            5G Mobile Price in Pakistan by Budget Tiers
          </h2>

          <h3 style={{ fontSize: '1.05rem', color: '#0F172A', marginTop: '16px', fontWeight: 700 }}>5G Mobiles Under 30,000 PKR</h3>
          <p>Entry-level options engineered for basic daily computing, social media, and long battery life.</p>
          <Link href="/price/under-30000" style={{ display: 'inline-block', padding: '8px 14px', backgroundColor: '#F1F5F9', color: '#0284C7', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', border: '1px solid #CBD5E1', fontSize: '0.8rem' }}>
            View Mobiles Under Rs. 30,000 &rarr;
          </Link>

          <h3 style={{ fontSize: '1.05rem', color: '#0F172A', marginTop: '20px', fontWeight: 700 }}>5G Mobiles Under 50,000 PKR</h3>
          <p>The sweet spot for Pakistani consumers, offering high-refresh-rate AMOLED displays, 50MP cameras, and fast charging.</p>
          <Link href="/price/under-50000" style={{ display: 'inline-block', padding: '8px 14px', backgroundColor: '#F1F5F9', color: '#0284C7', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', border: '1px solid #CBD5E1', fontSize: '0.8rem' }}>
            View Mobiles Under Rs. 50,000 &rarr;
          </Link>
        </article>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0F172A', color: '#94A3B8', padding: '32px 14px', marginTop: '36px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', borderBottom: '1px solid #1E293B', paddingBottom: '24px', marginBottom: '20px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <span style={{ fontSize: '1.3rem', fontWeight: 900, letterSpacing: '-0.5px', display: 'block', marginBottom: '8px' }}>
              <span style={{ color: '#FFFFFF' }}>5G</span>
              <span style={{ color: '#10B981' }}>Mobile</span>
              <span style={{ color: '#FFFFFF', fontWeight: 400 }}>.pk</span>
            </span>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
              Pakistan's trusted guide for official 5G smartphone rates, PTA tax calculations, and tech news.
            </p>
          </div>
          <div>
            <h4 style={{ color: '#FFF', fontSize: '0.95rem', marginBottom: '10px', fontWeight: 700 }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/brand/samsung" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.82rem' }}>Samsung</Link>
              <Link href="/brand/apple" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.82rem' }}>Apple</Link>
              <Link href="/blog" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.82rem' }}>Mobile Blog</Link>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#FFF', fontSize: '0.95rem', marginBottom: '10px', fontWeight: 700 }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link href="/privacy-policy" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.82rem' }}>Privacy Policy</Link>
              <Link href="/terms" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.82rem' }}>Terms</Link>
              <Link href="/disclaimer" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.82rem' }}>Disclaimer</Link>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', fontSize: '0.72rem' }}>
          &copy; {new Date().getFullYear()} 5gmobile.pk. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
