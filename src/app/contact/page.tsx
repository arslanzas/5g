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
  title: 'Contact Us | 5gmobile.pk',
  description: 'Get in touch with 5gmobile.pk. Located on Hall Road, Lahore, Pakistan. Contact our editorial team at info@5gmobile.pk for price updates and inquiries.',
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

export default async function ContactPage() {
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
          <span style={{ fontWeight: 600 }}>Contact Us</span>
        </div>

        {/* Contact Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          
          {/* Contact Details (Left Column) */}
          <div style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '30px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 12px', color: '#0F172A' }}>
                Contact Our Team
              </h1>
              <p style={{ fontSize: '0.92rem', color: '#64748B', lineHeight: 1.6, marginBottom: '24px' }}>
                Have an inquiry about a smartphone, spotted a price change, or need to verify a specification? Contact our editorial desk directly.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <strong style={{ display: 'block', color: '#0F172A', fontSize: '0.9rem', marginBottom: '4px' }}>
                    📧 Official Email:
                  </strong>
                  <a href="mailto:info@5gmobile.pk" style={{ color: '#10B981', fontWeight: 700, textDecoration: 'none', fontSize: '1.05rem' }}>
                    info@5gmobile.pk
                  </a>
                </div>

                <div>
                  <strong style={{ display: 'block', color: '#0F172A', fontSize: '0.9rem', marginBottom: '4px' }}>
                    📍 Editorial Office Address:
                  </strong>
                  <p style={{ margin: 0, color: '#334155', fontSize: '0.92rem', lineHeight: 1.5, fontWeight: 500 }}>
                    5gmobile.pk, Hall Road, Lahore, Punjab, Pakistan
                  </p>
                </div>

                <div>
                  <strong style={{ display: 'block', color: '#0F172A', fontSize: '0.9rem', marginBottom: '4px' }}>
                    ⏰ Working Hours:
                  </strong>
                  <span style={{ color: '#64748B', fontSize: '0.88rem' }}>
                    Monday – Saturday: 10:00 AM to 7:00 PM (PKT)
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                💡 <em>Tip: You can also tap below to email directly without filling out the form.</em>
              </span>
              <a 
                href="mailto:info@5gmobile.pk?subject=Price%20Inquiry%20-%205gmobile.pk"
                style={{ display: 'block', marginTop: '8px', textAlign: 'center', backgroundColor: '#F1F5F9', color: '#0F172A', padding: '9px', borderRadius: '6px', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem', border: '1px solid #CBD5E1' }}
              >
                Open Default Mail App &rarr;
              </a>
            </div>
          </div>

          {/* Mailto Form (Right Column) */}
          <div style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '30px 20px' }}>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: '0 0 6px', color: '#0F172A' }}>
              Compose Message
            </h2>
            <p style={{ margin: '0 0 20px', fontSize: '0.82rem', color: '#64748B' }}>
              Fill in your details below and click the button to launch your mail application with your pre-written inquiry.
            </p>

            <form action="mailto:info@5gmobile.pk" method="GET" encType="text/plain" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Subject / Reason for Contact
                </label>
                <input 
                  type="text" 
                  name="subject" 
                  defaultValue="Mobile Price Update - 5gmobile.pk" 
                  required
                  style={{ width: '100%', padding: '11px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Your Message & Contact Details
                </label>
                <textarea 
                  name="body" 
                  rows={5} 
                  placeholder="Please include your name, mobile model, and price or query details..." 
                  required
                  style={{ width: '100%', padding: '11px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                ></textarea>
              </div>

              <button 
                type="submit" 
                style={{ width: '100%', padding: '13px', backgroundColor: '#10B981', color: '#FFF', border: 'none', borderRadius: '7px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', marginTop: '4px' }}
              >
                Open Mail App to Send &rarr;
              </button>
            </form>
          </div>

        </div>

        {/* Trending Mobiles & Brands Section */}
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
