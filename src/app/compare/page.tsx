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
  title: 'Compare 5G Mobiles | Side-by-Side Specs | 5gmobile.pk',
  description: 'Compare mobile phone prices, camera specs, batteries, and 5G network bands side-by-side in Pakistan.',
  robots: { index: true, follow: true },
}

export default async function ComparePage() {
  const data = await client.fetch(`*[_type == "phone"] | order(_createdAt desc)[0...6] {
      _id, title, slug, price, "imageUrl": coalesce(images[0].asset->url, image.asset->url)
  }`)

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0F172A', overflowX: 'hidden' }}>
      
      {/* Drawer & Header */}
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
        <Link href="/pta-tax" className="sidebar-link">PTA Tax Calculator</Link>
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
        <div style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '40px 24px', textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 12px', color: '#0F172A' }}>Compare Mobiles</h1>
          <p style={{ color: '#64748B', marginBottom: '24px' }}>Search for two devices from our database to compare their specs side-by-side.</p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <input type="text" placeholder="Search Device 1..." style={{ flex: '1 1 250px', padding: '14px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 800, color: '#94A3B8' }}>VS</div>
            <input type="text" placeholder="Search Device 2..." style={{ flex: '1 1 250px', padding: '14px', borderRadius: '8px', border: '1px solid #CBD5E1', outline: 'none' }} />
          </div>
          <button style={{ marginTop: '20px', padding: '14px 32px', backgroundColor: '#0284C7', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Compare Now</button>
        </div>
      </main>

      <footer style={{ backgroundColor: '#0F172A', color: '#94A3B8', padding: '40px 16px', textAlign: 'center', fontSize: '0.85rem' }}>
        <p>&copy; {new Date().getFullYear()} 5gmobile.pk.</p>
      </footer>
    </div>
  )
}
