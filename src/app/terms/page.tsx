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
  title: 'Terms & Conditions | 5gmobile.pk',
  description: 'Terms and Conditions for using 5gmobile.pk. Read our legal disclaimers regarding smartphone prices, PTA verification, and hardware specifications in Pakistan.',
  robots: {
    index: true,
    follow: true,
  },
}

interface Phone {
  _id: string
  title: string
  slug?: { current: string }
  price?: number
  has5G?: boolean
  imageUrl?: string
}

interface BrandItem {
  name: string
  slug?: { current?: string } | string
  logoUrl?: string
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

export default async function TermsPage() {
  const data = await client.fetch(`{
    "topPhones": *[_type == "phone"] | order(_createdAt desc)[0...5] {
      _id,
      title,
      slug,
      price,
      has5G,
      "imageUrl": coalesce(images[0].asset->url, image.asset->url)
    },
    "brands": *[_type == "brand"] | order(_createdAt asc) {
      name,
      slug,
      "logoUrl": logo.asset->url
    }
  }`)

  const topPhones: Phone[] = data?.topPhones || []
  const brands: BrandItem[] = data?.brands || []

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
      
      {/* CSS Drawer Navigation */}
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
          <span style={{ fontWeight: 600 }}>Terms & Conditions</span>
        </div>

        {/* Content Section */}
        <article style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px 20px', marginBottom: '40px', lineHeight: 1.7, color: '#334155', fontSize: '0.95rem' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 16px', color: '#0F172A' }}>
            Terms & Conditions
          </h1>
          
          <p>Last updated: {new Date().toLocaleDateString('en-PK', { month: 'long', year: 'numeric' })}</p>

          <p>
            Welcome to <strong>5gmobile.pk</strong>. By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '24px', marginBottom: '12px', color: '#0F172A' }}>1. Informational Purposes Only</h2>
          <p>
            All smartphone specifications, prices, PTA tax estimates, and launch dates provided on 5gmobile.pk are for informational and research purposes only. While we make every effort to ensure that device data and telecom news are accurate, prices in local retail markets (such as Hafeez Center Lahore, Saddar Karachi, and Rawalpindi) fluctuate regularly due to currency exchange rates and dealer margins.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '24px', marginBottom: '12px', color: '#0F172A' }}>2. PTA Approval and DIRBS Verification</h2>
          <p>
            While 5gmobile.pk indicates whether devices are officially PTA approved or non-PTA, visitors must verify the official status of any mobile phone prior to purchase by sending the 15-digit IMEI number via SMS to <strong>8484</strong> or using the official PTA DIRBS online portal. 5gmobile.pk is not liable for any private commercial transactions made between users and independent third-party mobile sellers.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '24px', marginBottom: '12px', color: '#0F172A' }}>3. Intellectual Property</h2>
          <p>
            All original textual content, reviews, buying guides, and software code on 5gmobile.pk are the property of 5gmobile.pk. Brand logos, trademarks, and device images belong to their respective manufacturers (such as Samsung, Apple, Vivo, Oppo, Infinix, Xiaomi, and Tecno) and are used strictly under fair use for identification and editorial evaluation.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '24px', marginBottom: '12px', color: '#0F172A' }}>4. External Links & Advertisements</h2>
          <p>
            Our website may contain links to third-party websites or services (such as Google AdSense ad partners or official telecom carriers) that are not owned or controlled by 5gmobile.pk. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites.
          </p>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '24px', marginBottom: '12px', color: '#0F172A' }}>5. Modifications to Terms</h2>
          <p>
            We reserve the right to revise or replace these Terms and Conditions at any time. By continuing to access or use our website after any revisions become effective, you agree to be bound by the updated terms.
          </p>
        </article>

        {/* Trending Phones & Brands Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          {/* Top 5 Trending Mobiles */}
          <section>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 14px' }}>Trending 5G Mobiles</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {topPhones.map((phone, idx) => {
                const phoneUrl = phone.slug?.current ? `/phone/${phone.slug.current}` : '#'
                return (
                  <Link key={phone._id} href={phoneUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#94A3B8', width: '22px' }}>#{idx + 1}</div>
                      <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {phone.imageUrl ? (
                          <img src={phone.imageUrl} alt={phone.title} style={{ maxHeight: '40px', maxWidth: '40px', objectFit: 'contain' }} />
                        ) : (
                          <span style={{ fontSize: '0.65rem' }}>Img</span>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ margin: '0 0 3px', fontSize: '0.85rem', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {phone.title}
                        </h4>
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#10B981', flexShrink: 0 }}>
                        {phone.price ? `Rs. ${phone.price.toLocaleString()}` : 'N/A'}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* Explore Brands */}
          <section>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 14px' }}>Browse by Brand</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {combinedBrands.map((brand) => (
                <Link key={brand.slug} href={`/brand/${brand.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{ backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '65px' }}>
                    <span style={{ fontSize: '0.76rem', fontWeight: 600, color: '#1E293B', textAlign: 'center' }}>{brand.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0F172A', color: '#94A3B8', padding: '40px 16px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', borderBottom: '1px solid #1E293B', paddingBottom: '32px', marginBottom: '24px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.5px', display: 'block', marginBottom: '10px' }}>
              <span style={{ color: '#FFFFFF' }}>5G</span><span style={{ color: '#10B981' }}>Mobile</span><span style={{ color: '#FFFFFF', fontWeight: 400 }}>.pk</span>
            </span>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              Pakistan's most trusted directory for 5G smartphone prices, daily market updates, and official PTA tax calculators[cite: 3, 6].
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
