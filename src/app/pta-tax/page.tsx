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
  title: 'PTA Tax Calculator 2026 | FBR Mobile Phone Duties Pakistan',
  description: 'Calculate official PTA taxes for your mobile phone. Check CNIC vs Passport FBR custom duties for iPhone, Samsung, and imported 5G devices in Pakistan.',
  robots: { index: true, follow: true },
}

// Reusable Top Phones / Brands Fetch
export default async function PtaTaxPage() {
  const data = await client.fetch(`{
    "topPhones": *[_type == "phone"] | order(_createdAt desc)[0...5] {
      _id, title, slug, price, has5G, "imageUrl": coalesce(images[0].asset->url, image.asset->url)
    },
    "brands": *[_type == "brand"] | order(_createdAt asc) { name, slug, "logoUrl": logo.asset->url }
  }`)

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0F172A', overflowX: 'hidden' }}>
      
      {/* Drawer Menu & Header Styles */}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <span style={{ color: '#FFF', fontSize: '1.3rem', fontWeight: 800 }}>Menu</span>
          <label htmlFor="nav-toggle" style={{ color: '#FFF', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>&times;</label>
        </div>
        <Link href="/" className="sidebar-link">Home</Link>
        <Link href="/brands" className="sidebar-link">All Brands</Link>
        <Link href="/pta-tax" className="sidebar-link">PTA Tax Calculator</Link>
        <Link href="/compare" className="sidebar-link">Compare Phones</Link>
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
            <span style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.5px' }}><span style={{ color: '#FFFFFF' }}>5G</span><span style={{ color: '#10B981' }}>Mobile</span><span style={{ color: '#FFFFFF', fontWeight: 400 }}>.pk</span></span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '16px 14px 40px' }}>
        <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '16px' }}><Link href="/" style={{ color: '#0284C7', textDecoration: 'none' }}>Home</Link> &gt; <span style={{ fontWeight: 600 }}>PTA Tax Calculator</span></div>

        {/* Calculator Widget */}
        <div style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '32px 24px', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 12px', color: '#0F172A' }}>Official PTA Tax Calculator</h1>
          <p style={{ color: '#64748B', marginBottom: '24px', lineHeight: 1.6 }}>Calculate custom duties for your imported smartphone based on official FBR slabs. Select your device value and registration method below.</p>

          <div style={{ display: 'grid', gap: '20px', backgroundColor: '#F8FAFC', padding: '24px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>1. Device Value (USD) [C&F]</label>
              <select id="slab-select" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '1rem', outline: 'none' }}>
                <option value="1">Up to $30 (Basic Phones)</option>
                <option value="2">$30 to $100 (Entry Level)</option>
                <option value="3">$100 to $200 (Budget Level)</option>
                <option value="4">$200 to $350 (Mid-Range)</option>
                <option value="5">$350 to $500 (Premium Mid-Range)</option>
                <option value="6">Above $500 (Flagships / iPhone / S-Ultra)</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px' }}>2. Registration Method</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <label style={{ flex: 1, backgroundColor: '#FFF', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="radio" name="reg-type" value="cnic" defaultChecked /> CNIC (Local)
                </label>
                <label style={{ flex: 1, backgroundColor: '#FFF', padding: '12px', border: '1px solid #CBD5E1', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="radio" name="reg-type" value="passport" /> Passport (Overseas)
                </label>
              </div>
            </div>

            <div style={{ marginTop: '16px', padding: '20px', backgroundColor: '#ECFDF5', border: '1px solid #10B981', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '0.9rem', color: '#065F46', fontWeight: 600, marginBottom: '8px' }}>Estimated PTA Tax:</span>
              <div id="tax-result" style={{ fontSize: '2rem', fontWeight: 900, color: '#047857' }}>Rs. 550</div>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#065F46', marginTop: '8px' }}>*Includes base tax + 18% GST (if applicable)</span>
            </div>
          </div>
        </div>

        {/* Client-Side Calculator Logic */}
        <script dangerouslySetInnerHTML={{__html: `
          const slabs = {
            "1": { passport: "Rs. 430", cnic: "Rs. 550" },
            "2": { passport: "Rs. 3,200", cnic: "Rs. 4,323" },
            "3": { passport: "Rs. 9,580", cnic: "Rs. 11,561" },
            "4": { passport: "Rs. 12,200 + 18% GST", cnic: "Rs. 14,661 + 18% GST" },
            "5": { passport: "Rs. 17,800 + 18% GST", cnic: "Rs. 23,420 + 18% GST" },
            "6": { passport: "Rs. 27,600 + 18% GST", cnic: "Rs. 37,007 + 18% GST" }
          };
          function calculate() {
            const slab = document.getElementById('slab-select').value;
            const regType = document.querySelector('input[name="reg-type"]:checked').value;
            document.getElementById('tax-result').innerText = slabs[slab][regType];
          }
          document.getElementById('slab-select').addEventListener('change', calculate);
          document.querySelectorAll('input[name="reg-type"]').forEach(r => r.addEventListener('change', calculate));
        `}} />
      </main>

      <footer style={{ backgroundColor: '#0F172A', color: '#94A3B8', padding: '40px 16px', textAlign: 'center', fontSize: '0.85rem' }}>
        <p>&copy; {new Date().getFullYear()} 5gmobile.pk. All rights reserved.</p>
      </footer>
    </div>
  )
}
