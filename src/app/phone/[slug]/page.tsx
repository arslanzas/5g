export const dynamic = 'force-dynamic'

import { createClient } from 'next-sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const client = createClient({
  projectId: 'e1h3j61w',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

interface PhoneDetail {
  _id: string
  title: string
  price?: number
  ptaApproved?: boolean
  has5G?: boolean
  screen?: string
  processor?: string
  ramStorage?: string
  mainCamera?: string
  selfieCamera?: string
  battery?: string
  pros?: string[]
  cons?: string[]
  verdict?: string
  imageUrl?: string
}

export default async function PhonePage({ params }: { params: { slug: string } }) {
  const phone: PhoneDetail = await client.fetch(
    `*[_type == "phone" && slug.current == $slug][0]{
      _id,
      title,
      price,
      ptaApproved,
      has5G,
      screen,
      processor,
      ramStorage,
      mainCamera,
      selfieCamera,
      battery,
      pros,
      cons,
      verdict,
      "imageUrl": image.asset->url
    }`,
    { slug: params.slug }
  )

  if (!phone) {
    notFound()
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Navbar */}
      <header style={{ backgroundColor: '#0f172a', padding: '14px 20px', color: '#fff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '0.9rem' }}>
            &larr; All Mobiles
          </Link>
          <span style={{ color: '#475569' }}>/</span>
          <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>{phone.title}</span>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 16px 80px' }}>
        {/* Top Hero Section */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', marginBottom: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            {phone.imageUrl && (
              <img
                src={phone.imageUrl}
                alt={phone.title}
                style={{ maxHeight: '240px', maxWidth: '100%', objectFit: 'contain' }}
              />
            )}
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>
            {phone.title}
          </h1>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0284c7', margin: '0 0 16px' }}>
            {phone.price ? `Rs. ${phone.price.toLocaleString()}` : 'Price Pending'}
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              padding: '6px 12px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.8rem',
              backgroundColor: phone.has5G ? '#dcfce7' : '#f1f5f9',
              color: phone.has5G ? '#15803d' : '#475569'
            }}>
              {phone.has5G ? '5G Network Ready' : '4G LTE Only'}
            </span>
            <span style={{
              padding: '6px 12px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.8rem',
              backgroundColor: phone.ptaApproved ? '#e0f2fe' : '#fee2e2',
              color: phone.ptaApproved ? '#0369a1' : '#b91c1c'
            }}>
              {phone.ptaApproved ? 'PTA Status: Approved' : 'PTA Status: Non-PTA'}
            </span>
          </div>
        </div>

        {/* Bento Specs Grid */}
        <h2 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '12px' }}>Key Specifications</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Display', val: phone.screen },
            { label: 'Processor', val: phone.processor },
            { label: 'RAM & Storage', val: phone.ramStorage },
            { label: 'Main Camera', val: phone.mainCamera },
            { label: 'Selfie Camera', val: phone.selfieCamera },
            { label: 'Battery', val: phone.battery },
          ].map((item, idx) => (
            <div key={idx} style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>{item.label}</div>
              <div style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 600, marginTop: '4px' }}>
                {item.val || 'Not Specified'}
              </div>
            </div>
          ))}
        </div>

        {/* Pros & Cons Section */}
        {(phone.pros?.length || phone.cons?.length) ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '24px' }}>
            {phone.pros && phone.pros.length > 0 && (
              <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '16px' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '1rem', color: '#166534' }}>What We Like</h3>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#14532d', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {phone.pros.map((pro, i) => (
                    <li key={i}>{pro}</li>
                  ))}
                </ul>
              </div>
            )}
            {phone.cons && phone.cons.length > 0 && (
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '16px' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '1rem', color: '#991b1b' }}>What Could Be Better</h3>
                <ul style={{ margin: 0, paddingLeft: '20px', color: '#7f1d1d', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {phone.cons.map((con, i) => (
                    <li key={i}>{con}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}

        {/* Verdict */}
        {phone.verdict && (
          <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '1rem', color: '#0f172a' }}>Our Verdict</h3>
            <p style={{ margin: 0, color: '#334155', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {phone.verdict}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
