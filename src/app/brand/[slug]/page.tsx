export const dynamic = 'force-dynamic'

import { createClient } from 'next-sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const client = createClient({
  projectId: 'e1h3j61w',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string }
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const slug = params?.slug

  return {
    title: `Latest ${slug?.toUpperCase() || '5G'} Mobile Prices in Pakistan | 5gmobile.pk`,
    description: `Explore official prices, specifications, and PTA approval status for all ${slug || '5G'} smartphones in Pakistan.`,
    robots: { index: true, follow: true },
  }
}

interface PhoneItem {
  _id: string
  title: string
  slug?: { current: string }
  price?: number
  has5G?: boolean
  ptaApproved?: boolean
  imageUrl?: string
}

export default async function BrandArchivePage(props: PageProps) {
  const params = await props.params
  const slug = params?.slug

  let phones: PhoneItem[] = []
  let brandName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Brand'

  try {
    const data = await client.fetch(`{
      "phones": *[_type == "phone" && (brand == $slug || lower(brand) == lower($slug) || title match $slug)] | order(_createdAt desc)[0...100] {
        _id,
        title,
        slug,
        price,
        has5G,
        ptaApproved,
        "imageUrl": coalesce(images[0].asset->url, image.asset->url)
      },
      "brandInfo": *[_type == "brand" && (slug.current == $slug || lower(name) == lower($slug))][0] {
        name
      }
    }`, { slug })

    if (data) {
      phones = data.phones || []
      if (data.brandInfo?.name) {
        brandName = data.brandInfo.name
      }
    }
  } catch (error) {
    console.error("Brand fetch failed:", error)
  }

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0F172A', overflowX: 'hidden' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        * { box-sizing: border-box; }
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
          <span style={{ color: '#FFF', fontSize: '1.3rem', fontWeight: 800 }}>Navigation</span>
          <label htmlFor="nav-toggle" style={{ color: '#FFF', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>&times;</label>
        </div>
        <Link href="/" className="sidebar-link">Home</Link>
        <Link href="/brand/samsung" className="sidebar-link">Samsung Phones</Link>
        <Link href="/brand/apple" className="sidebar-link">Apple iPhones</Link>
        <Link href="/brand/vivo" className="sidebar-link">Vivo Mobiles</Link>
        <Link href="/blog" className="sidebar-link">Blogs</Link>
        <Link href="/news" className="sidebar-link">5G News</Link>
        <Link href="/contact" className="sidebar-link">Contact Us</Link>
      </aside>
      <label htmlFor="nav-toggle" className="overlay"></label>

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

      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '16px 14px 40px' }}>
        
        <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '16px' }}>
          <Link href="/" style={{ color: '#0284C7', textDecoration: 'none' }}>Home</Link> &gt; <span>{brandName} 5G Mobiles</span>
        </div>

        <div style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 16px', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', margin: '0 0 6px' }}>
            {brandName} 5G Mobile Price in Pakistan
          </h1>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B' }}>
            Browse official specifications, retail market prices, and PTA approval status for all {brandName} smartphones.
          </p>
        </div>

        <section style={{ marginBottom: '36px' }}>
          {phones.length === 0 ? (
            <div style={{ backgroundColor: '#FFF', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '30px', textAlign: 'center' }}>
              <p style={{ color: '#64748B', margin: 0 }}>No {brandName} models found in the database yet.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {phones.map((phone) => {
                const phoneUrl = phone.slug?.current ? `/phone/${phone.slug.current}` : '#'
                return (
                  <Link key={phone._id} href={phoneUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '10px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%' }}>
                      <div style={{ width: '100%', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', borderRadius: '6px', marginBottom: '8px' }}>
                        {phone.imageUrl ? (
                          <img src={phone.imageUrl} alt={phone.title} style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain' }} />
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>5G Mobile</span>
                        )}
                      </div>
                      <h3 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', margin: '0 0 4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.3, width: '100%' }}>
                        {phone.title}
                      </h3>
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#10B981', marginTop: 'auto' }}>
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

      <footer style={{ backgroundColor: '#0F172A', color: '#94A3B8', padding: '40px 16px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', fontSize: '0.75rem' }}>
          &copy; {new Date().getFullYear()} 5gmobile.pk. All rights reserved.
        </div>
      </footer>

    </div>
  )
}
