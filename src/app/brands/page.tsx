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

export const metadata: Metadata = {
  title: 'All Mobile Brands in Pakistan | 5gmobile.pk',
  description: 'Browse all smartphone brands in Pakistan including Samsung, Apple, Vivo, Oppo, Infinix, Xiaomi, and Tecno.',
  robots: { index: true, follow: true },
}

interface BrandItem {
  name: string
  slug?: { current?: string } | string
  logoUrl?: string
}

export default async function BrandsPage() {
  const brands: BrandItem[] = await client.fetch(`*[_type == "brand"] | order(name asc) {
    name, slug, "logoUrl": logo.asset->url
  }`)

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0F172A' }}>
      
      {/* Drawer Menu & Header */}
      <style dangerouslySetInnerHTML={{__html: `
        * { box-sizing: border-box; } body { margin: 0; padding: 0; }
        #nav-toggle { display: none; }
        .sidebar { position: fixed; top: 0; left: 0; width: 280px; height: 100vh; background-color: #0F172A; transform: translateX(-100%); transition: transform 0.3s ease; z-index: 1000; padding: 24px 20px; overflow-y: auto; }
        #nav-toggle:checked ~ .sidebar { transform: translateX(0); }
        .overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.6); opacity: 0; visibility: hidden; transition: opacity 0.3s; z-index: 999; }
        #nav-toggle:checked ~ .overlay { opacity: 1; visibility: visible; }
        .sidebar-link { display: block; color: #FFF; text-decoration: none; padding: 14px 0; font-size: 1.05rem; border-bottom: 1px solid #1E293B; font-weight: 500; }
      `}} />
      <input type="checkbox" id="nav-toggle" />
      <aside className="sidebar">
        <label htmlFor="nav-toggle" style={{ color: '#FFF', fontSize: '2rem', cursor: 'pointer', float: 'right' }}>&times;</label>
        <Link href="/" className="sidebar-link">Home</Link>
        <Link href="/pta-tax" className="sidebar-link">PTA Tax</Link>
      </aside>
      <label htmlFor="nav-toggle" className="overlay"></label>

      <header style={{ backgroundColor: '#0F172A', padding: '14px 16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <label htmlFor="nav-toggle" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px' }}>
            <span style={{ width: '22px', height: '2.5px', backgroundColor: '#FFF', borderRadius: '2px', display: 'block' }}></span>
            <span style={{ width: '22px', height: '2.5px', backgroundColor: '#FFF', borderRadius: '2px', display: 'block' }}></span>
            <span style={{ width: '22px', height: '2.5px', backgroundColor: '#FFF', borderRadius: '2px', display: 'block' }}></span>
          </label>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
            <span style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.5px' }}><span style={{ color: '#FFFFFF' }}>5G</span><span style={{ color: '#10B981' }}>Mobile</span><span style={{ color: '#FFFFFF', fontWeight: 400 }}>.pk</span></span>
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 14px 40px' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 20px', color: '#0F172A' }}>Explore Mobile Brands</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
          {brands.map((brand) => {
            const brandSlug = typeof brand.slug === 'object' ? brand.slug?.current : brand.slug;
            return (
              <Link key={brand.name} href={`/brand/${brandSlug}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  {brand.logoUrl ? (
                    <img src={brand.logoUrl} alt={brand.name} style={{ maxHeight: '40px', maxWidth: '80%', objectFit: 'contain', marginBottom: '10px' }} />
                  ) : (
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#94A3B8', marginBottom: '10px' }}>{brand.name[0]}</div>
                  )}
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', textAlign: 'center' }}>{brand.name}</span>
                </div>
              </Link>
            )
          })}
        </div>
      </main>

      <footer style={{ backgroundColor: '#0F172A', color: '#94A3B8', padding: '40px 16px', textAlign: 'center', fontSize: '0.85rem' }}>
        <p>&copy; {new Date().getFullYear()} 5gmobile.pk.</p>
      </footer>
    </div>
  )
}
