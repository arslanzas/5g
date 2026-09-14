export const dynamic = 'force-dynamic'

import { createClient } from 'next-sanity'
import Link from 'next/link'

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

export default async function HomePage() {
  const phones: Phone[] = await client.fetch(
    `*[_type == "phone"]{
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
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Top Header */}
      <header style={{ backgroundColor: '#0f172a', color: '#fff', padding: '16px 20px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
              5G<span style={{ color: '#10b981' }}>Mobile</span>.pk
            </h1>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#94a3b8' }}>Pakistan's 5G Smartphone Hub</p>
          </div>
          <Link href="/studio" style={{ color: '#38bdf8', fontSize: '0.8rem', textDecoration: 'none', border: '1px solid #1e293b', padding: '6px 12px', borderRadius: '6px' }}>
            Admin Studio &rarr;
          </Link>
        </div>
      </header>

      {/* Main Grid */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '20px 16px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.15rem', color: '#0f172a', margin: 0 }}>Latest 5G & 4G Mobiles</h2>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{phones.length} Devices</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {phones.map((phone) => {
            const phoneUrl = phone.slug?.current ? `/phone/${phone.slug.current}` : '#'
            return (
              <Link
                key={phone._id}
                href={phoneUrl}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  boxSizing: 'border-box'
                }}>
                  {/* Image Frame */}
                  <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9', borderRadius: '8px', overflow: 'hidden', marginBottom: '10px' }}>
                    {phone.imageUrl ? (
                      <img
                        src={phone.imageUrl}
                        alt={phone.title}
                        style={{ maxHeight: '130px', maxWidth: '90%', objectFit: 'contain' }}
                      />
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>No Photo</span>
                    )}
                  </div>

                  {/* Title & Price */}
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a', margin: '0 0 6px', lineHeight: 1.3 }}>
                    {phone.title}
                  </h3>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0284c7', margin: '0 0 8px' }}>
                    {phone.price ? `Rs. ${phone.price.toLocaleString()}` : 'Coming Soon'}
                  </div>

                  {/* Badges */}
                  <div style={{ marginTop: 'auto', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '3px 6px',
                      borderRadius: '4px',
                      backgroundColor: phone.has5G ? '#dcfce7' : '#f1f5f9',
                      color: phone.has5G ? '#15803d' : '#475569'
                    }}>
                      {phone.has5G ? '5G' : '4G'}
                    </span>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      padding: '3px 6px',
                      borderRadius: '4px',
                      backgroundColor: phone.ptaApproved ? '#e0f2fe' : '#fee2e2',
                      color: phone.ptaApproved ? '#0369a1' : '#b91c1c'
                    }}>
                      {phone.ptaApproved ? 'PTA Approved' : 'Non-PTA'}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
