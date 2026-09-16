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

interface PhoneSpecs {
  _id: string
  title: string
  price?: number
  launchDate?: string
  simConfig?: string
  dimensions?: string
  weight?: string
  software?: string
  displayDiagonal?: string
  resolution?: string
  panelTech?: string
  glassShield?: string
  builtInStorage?: string
  systemMemory?: string
  expandableStorage?: string
  cpu?: string
  graphics?: string
  batteryCapacity?: string
  primaryCamera?: string
  mainFlash?: boolean
  mainVideo?: string
  selfieLens?: string
  selfieFlash?: boolean
  selfieVideo?: string
  has5G?: boolean
  has4G?: boolean
  has3G?: boolean
  wifi?: string
  bluetooth?: string
  nfc?: boolean
  radio?: boolean
  imageUrls?: string[]
}

export default async function PhonePage({ params }: { params: { slug: string } }) {
  const phone: PhoneSpecs = await client.fetch(
    `*[_type == "phone" && slug.current == $slug][0]{
      _id,
      title,
      price,
      launchDate,
      simConfig,
      dimensions,
      weight,
      software,
      displayDiagonal,
      resolution,
      panelTech,
      glassShield,
      builtInStorage,
      systemMemory,
      expandableStorage,
      cpu,
      graphics,
      batteryCapacity,
      primaryCamera,
      mainFlash,
      mainVideo,
      selfieLens,
      selfieFlash,
      selfieVideo,
      has5G,
      has4G,
      has3G,
      wifi,
      bluetooth,
      nfc,
      radio,
      "imageUrls": images[].asset->url
    }`,
    { slug: params.slug }
  )

  if (!phone) {
    notFound()
  }

  const specSections = [
    {
      heading: 'General Features',
      items: [
        { label: 'Release Date', val: phone.launchDate },
        { label: 'SIM Support', val: phone.simConfig },
        { label: 'Phone Dimensions', val: phone.dimensions },
        { label: 'Phone Weight', val: phone.weight },
        { label: 'Operating System', val: phone.software },
      ],
    },
    {
      heading: 'Display',
      items: [
        { label: 'Screen Size', val: phone.displayDiagonal },
        { label: 'Screen Resolution', val: phone.resolution },
        { label: 'Screen Type', val: phone.panelTech },
        { label: 'Screen Protection', val: phone.glassShield },
      ],
    },
    {
      heading: 'Memory & Performance',
      items: [
        { label: 'Internal Memory', val: phone.builtInStorage },
        { label: 'RAM', val: phone.systemMemory },
        { label: 'Card Slot', val: phone.expandableStorage },
        { label: 'Processor', val: phone.cpu },
        { label: 'GPU', val: phone.graphics },
        { label: 'Battery', val: phone.batteryCapacity },
      ],
    },
    {
      heading: 'Camera',
      items: [
        { label: 'Back Camera', val: phone.primaryCamera },
        { label: 'Back Flash Light', val: phone.mainFlash ? 'Yes' : 'No' },
        { label: 'Back Video Recording', val: phone.mainVideo },
        { label: 'Front Camera', val: phone.selfieLens },
        { label: 'Front Flash Light', val: phone.selfieFlash ? 'Yes' : 'No' },
        { label: 'Front Video Recording', val: phone.selfieVideo },
      ],
    },
    {
      heading: 'Connectivity',
      items: [
        { label: '5G', val: phone.has5G ? 'Yes' : 'No' },
        { label: '4G/LTE', val: phone.has4G ? 'Yes' : 'No' },
        { label: '3G', val: phone.has3G ? 'Yes' : 'No' },
        { label: 'WiFi', val: phone.wifi },
        { label: 'Bluetooth', val: phone.bluetooth },
        { label: 'NFC', val: phone.nfc ? 'Yes' : 'No' },
        { label: 'Radio', val: phone.radio ? 'Yes' : 'No' },
      ],
    },
  ]

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0F172A', paddingBottom: '60px' }}>
      {/* Top Header */}
      <header style={{ backgroundColor: '#0F172A', padding: '14px 20px', color: '#FFF' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" style={{ color: '#38BDF8', textDecoration: 'none', fontSize: '0.9rem' }}>
            &larr; Home
          </Link>
          <span style={{ color: '#475569' }}>/</span>
          <span style={{ fontSize: '0.9rem', color: '#CBD5E1' }}>{phone.title}</span>
        </div>
      </header>

      <main style={{ maxWidth: '900px', margin: '24px auto', padding: '0 16px' }}>
        {/* Device Hero Card */}
        <div style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px', marginBottom: '24px' }}>
          {/* Image Gallery Row */}
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '20px' }}>
            {phone.imageUrls && phone.imageUrls.length > 0 ? (
              phone.imageUrls.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`${phone.title} photo ${i + 1}`}
                  style={{ height: '180px', objectFit: 'contain', borderRadius: '8px', backgroundColor: '#F8FAFC', padding: '8px', border: '1px solid #E2E8F0' }}
                />
              ))
            ) : (
              <div style={{ height: '140px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F5F9', borderRadius: '8px', color: '#94A3B8' }}>
                No Photos Available
              </div>
            )}
          </div>

          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 8px' }}>{phone.title}</h1>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10B981', margin: '0 0 16px' }}>
            {phone.price ? `Rs. ${phone.price.toLocaleString()}` : 'Price Pending'}
          </div>
        </div>

        {/* Specification Tables */}
        {specSections.map((section, idx) => (
          <div key={idx} style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '20px', overflow: 'hidden' }}>
            <h2 style={{ backgroundColor: '#F1F5F9', margin: 0, padding: '12px 18px', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', borderBottom: '1px solid #E2E8F0' }}>
              {section.heading}
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <tbody>
                {section.items.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '12px 18px', width: '40%', color: '#64748B', fontWeight: 600 }}>
                      {row.label}
                    </td>
                    <td style={{ padding: '12px 18px', color: '#0F172A', fontWeight: 500 }}>
                      {row.val !== undefined && row.val !== '' ? row.val : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </main>
    </div>
  )
}
