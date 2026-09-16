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
  has5G?: boolean
  ptaApproved?: boolean
  description?: string
  imageUrl?: string
  brand?: string
}

export default async function PhoneDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const phone: PhoneDetail | null = await client.fetch(
    `*[_type == "phone" && slug.current == $slug][0] {
      _id,
      title,
      price,
      has5G,
      ptaApproved,
      description,
      "imageUrl": image.asset->url,
      brand
    }`,
    { slug }
  )

  if (!phone) {
    notFound()
  }

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0F172A', overflowX: 'hidden' }}>
      
      {/* Header */}
      <header style={{ backgroundColor: '#0F172A', padding: '14px 16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 900 }}>
              <span style={{ color: '#FFFFFF' }}>5G</span>
              <span style={{ color: '#10B981' }}>Mobile</span>
              <span style={{ color: '#FFFFFF', fontWeight: 400 }}>.pk</span>
            </span>
          </Link>
          <Link href="/" style={{ color: '#FFF', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
            &larr; Back
          </Link>
        </div>
      </header>

      {/* Main Specs Area */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '16px 12px' }}>
        
        {/* Search Bar */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="Search another mobile..." 
            style={{ flex: 1, minWidth: 0, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', backgroundColor: '#FFF' }}
          />
          <button style={{ backgroundColor: '#10B981', color: '#FFF', border: 'none', borderRadius: '8px', padding: '0 16px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
            Search
          </button>
        </div>

        {/* Phone Card */}
        <div style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 16px', marginBottom: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            {phone.imageUrl ? (
              <img src={phone.imageUrl} alt={phone.title} style={{ maxHeight: '220px', maxWidth: '100%', objectFit: 'contain' }} />
            ) : (
              <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>No Image Available</div>
            )}
          </div>

          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 8px' }}>{phone.title}</h1>
          <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#10B981', marginBottom: '16px' }}>
            {phone.price ? `Rs. ${phone.price.toLocaleString()}` : 'Price Updating'}
          </div>

          {/* Key Quick Badges */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <span style={{ backgroundColor: phone.has5G ? '#DCFCE7' : '#F1F5F9', color: phone.has5G ? '#166534' : '#475569', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700 }}>
              {phone.has5G ? '✓ 5G Network Supported' : '4G Only'}
            </span>
            <span style={{ backgroundColor: phone.ptaApproved ? '#E0F2FE' : '#FEF3C7', color: phone.ptaApproved ? '#0369A1' : '#B45309', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700 }}>
              {phone.ptaApproved ? '✓ Official PTA Approved' : 'PTA Status: Check IMEI'}
            </span>
          </div>

          {/* Specs Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '10px 0', color: '#64748B', fontWeight: 600 }}>Brand</td>
                <td style={{ padding: '10px 0', fontWeight: 700, textAlign: 'right' }}>{phone.brand || 'Standard'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '10px 0', color: '#64748B', fontWeight: 600 }}>Network</td>
                <td style={{ padding: '10px 0', fontWeight: 700, textAlign: 'right' }}>{phone.has5G ? '5G / 4G LTE' : '4G LTE'}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '10px 0', color: '#64748B', fontWeight: 600 }}>Official PTA Approval</td>
                <td style={{ padding: '10px 0', fontWeight: 700, textAlign: 'right' }}>{phone.ptaApproved ? 'Yes' : 'Not Registered'}</td>
              </tr>
            </tbody>
          </table>

          {phone.description && (
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F1F5F9', fontSize: '0.9rem', lineHeight: 1.6, color: '#475569' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>Description</h3>
              <p style={{ margin: 0 }}>{phone.description}</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0F172A', color: '#94A3B8', padding: '24px 14px', textAlign: 'center', fontSize: '0.8rem' }}>
        <p style={{ margin: '0 0 8px', color: '#FFF', fontWeight: 700 }}>5G Mobile.pk</p>
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} 5gmobile.pk. All rights reserved.</p>
      </footer>
    </div>
  )
}
