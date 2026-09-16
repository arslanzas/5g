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
  let phones: Phone[] = []
  
  try {
    // Updated to query the new 'images' array from your schema
    const data = await client.fetch(
      `*[_type == "phone"] | order(_createdAt desc)[0...30] {
        _id,
        title,
        slug,
        price,
        has5G,
        "imageUrl": coalesce(images[0].asset->url, image.asset->url)
      }`
    )
    if (Array.isArray(data)) {
      phones = data
    }
  } catch (error) {
    console.error("Sanity fetch failed:", error)
  }

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
          <span style={{ color: '#FFF', fontSize: '1.3rem', fontWeight: 800 }}>Menu</span>
          <label htmlFor="nav-toggle" style={{ color: '#FFF', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>&times;</label>
        </div>
        <Link href="/" className="sidebar-link">Home</Link>
        <Link href="/brand/samsung" className="sidebar-link">Samsung Phones</Link>
        <Link href="/brand/apple" className="sidebar-link">Apple iPhones</Link>
        <Link href="/brand/vivo" className="sidebar-link">Vivo Mobiles</Link>
        <Link href="/price/under-50000" className="sidebar-link">Under Rs. 50,000</Link>
        <Link href="/blog" className="sidebar-link">Blogs</Link>
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

        {/* 5G Mobile Brands Grid */}
        <section style={{ marginBottom: '26px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 14px' }}>5G Mobile Brands</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {BRANDS.map(brand => (
              <Link key={brand.slug} href={`/brand/${brand.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '74px', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                  <div style={{ height: '24px', width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>
                    {/* Fixed: Removed the server-crashing onError handler */}
                    <img src={brand.logo} alt={`${brand.name} logo`} style={{ maxHeight: '20px', maxWidth: '24px', objectFit: 'contain' }} />
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#1E293B' }}>{brand.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Find Mobile by Price */}
        <section style={{ backgroundColor: '#FFF', padding: '16px', borderRadius: '10px', border: '1px solid #E2E8F0', marginBottom: '26px' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 6px' }}>Let's find mobile by Price</h2>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '14px', width: '100%' }}>
            <input type="number" placeholder="3000" style={{ flex: 1, minWidth: 0, padding: '10px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', textAlign: 'center' }} />
            <span style={{ fontWeight: 600, color: '#64748B', fontSize: '0.85rem', flexShrink: 0 }}>to</span>
            <input type="number" placeholder="150000" style={{ flex: 1, minWidth: 0, padding: '10px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', textAlign: 'center' }} />
          </div>
          <button style={{ width: '100%', padding: '12px', backgroundColor: '#0284C7', color: '#FFF', border: 'none', borderRadius: '7px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}>
            Find 5G Mobile
          </button>
        </section>

        {/* Latest Phones */}
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
                    <div style={{ backgroundColor: '#FFF', borderRadius: '8px', padding: '8px 6px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', textAlign: 'center' }}>
                      <div style={{ height: '90px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>
                        {phone.imageUrl ? (
                          <img src={phone.imageUrl} alt={phone.title} style={{ maxHeight: '85px', maxWidth: '100%', objectFit: 'contain' }} />
                        ) : (
                          <div style={{ width: '48px', height: '64px', backgroundColor: '#F1F5F9', borderRadius: '4px' }}></div>
                        )}
                      </div>
                      <h3 style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 4px', lineHeight: 1.25, color: '#0F172A', minHeight: '2.5em' }}>{phone.title}</h3>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10B981', marginTop: 'auto' }}>
                        {phone.price ? `Rs. ${phone.price.toLocaleString()}` : 'Check Price'}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0F172A', color: '#94A3B8', padding: '32px 14px', marginTop: '36px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center', fontSize: '0.72rem' }}>
          &copy; {new Date().getFullYear()} 5gmobile.pk. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
