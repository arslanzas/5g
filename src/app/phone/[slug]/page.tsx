export const dynamic = 'force-dynamic'

import { createClient } from 'next-sanity'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// --- SANITY CLIENT SETUP ---
const client = createClient({
  projectId: 'e1h3j61w',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// --- DYNAMIC SEO METADATA ---
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const phone = await client.fetch(
    `*[_type == "phone" && slug.current == $slug][0]{
      title,
      price,
      builtInStorage,
      primaryCamera,
      batteryCapacity,
      "imageUrl": coalesce(images[0].asset->url, image.asset->url)
    }`,
    { slug: params.slug }
  )

  if (!phone) return {}

  const formattedPrice = phone.price ? `Rs. ${phone.price.toLocaleString()}` : 'Price Updated'
  return {
    title: `${phone.title} Price in Pakistan (2026), Specs & Verdict | 5gmobile.pk`,
    description: `Check latest ${phone.title} official price in Pakistan (${formattedPrice}). Full specifications: ${phone.batteryCapacity || 'Li-Po'} battery, ${phone.primaryCamera || 'HD'} camera, storage options, PTA status, and review.`,
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
    openGraph: {
      images: phone.imageUrl ? [{ url: phone.imageUrl }] : [],
    },
  }
}

// --- TYPES & INTERFACES ---
interface VariantItem {
  ram?: string
  storage?: string
  price?: number
}

interface BlockChild {
  _key: string
  _type: string
  text?: string
}

interface ContentBlock {
  _key: string
  _type: string
  style?: string
  listItem?: string
  children?: BlockChild[]
  asset?: { url: string }
}

interface PhoneDetail {
  _id: string
  title: string
  slug?: { current: string }
  price?: number
  marketPrice?: number
  warranty?: string
  colors?: string[]
  ptaApproved?: boolean
  launchDate?: string
  simConfig?: string
  dimensions?: string
  weight?: string
  software?: string
  deviceVariants?: VariantItem[]
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
  pros?: string[]
  cons?: string[]
  verdict?: ContentBlock[]
  images?: Array<{ asset?: { url: string } }>
}

interface PhoneCard {
  _id: string
  title: string
  slug?: { current: string }
  price?: number
  has5G?: boolean
  imageUrl?: string
}

interface NewsSnippet {
  _id: string
  title: string
  slug?: { current: string }
  publishedAt?: string
  snippet?: string
  imageUrl?: string
}

interface BlogSnippet {
  _id: string
  title: string
  slug?: { current: string }
  category?: string
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
  { name: 'Pixel', slug: 'google-pixel', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg' },
  { name: 'Nothing', slug: 'nothing', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nothing.svg' },
]

// --- PORTABLE TEXT RENDERER (VERDICT EDITOR) ---
function RenderVerdictText({ content }: { content?: ContentBlock[] }) {
  if (!content || !Array.isArray(content)) return null

  return (
    <div style={{ lineHeight: 1.8, fontSize: '0.98rem', color: '#334155' }}>
      {content.map((block) => {
        if (block._type === 'image' && block.asset?.url) {
          return (
            <div key={block._key} style={{ margin: '20px 0', textAlign: 'center' }}>
              <img src={block.asset.url} alt="Review editorial illustration" style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #E2E8F0' }} />
            </div>
          )
        }

        const text = block.children?.map((c) => c.text).join('') || ''
        if (!text.trim()) return null

        if (block.style === 'h2') {
          return <h3 key={block._key} style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', marginTop: '24px', marginBottom: '10px' }}>{text}</h3>
        }
        if (block.style === 'h3') {
          return <h4 key={block._key} style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginTop: '20px', marginBottom: '8px' }}>{text}</h4>
        }
        if (block.listItem === 'bullet') {
          return (
            <li key={block._key} style={{ marginLeft: '20px', marginBottom: '6px' }}>
              {text}
            </li>
          )
        }
        return <p key={block._key} style={{ marginBottom: '14px' }}>{text}</p>
      })}
    </div>
  )
}

// --- MAIN PHONE DETAIL COMPONENT ---
export default async function PhoneDetailPage({ params }: { params: { slug: string } }) {
  // 1. Fetch current phone details
  const phone: PhoneDetail | null = await client.fetch(
    `*[_type == "phone" && slug.current == $slug][0]{
      ...,
      images[]{
        asset->{ url }
      }
    }`,
    { slug: params.slug }
  )

  if (!phone) {
    notFound()
  }

  // Determine brand name from the first word of the phone's title (e.g., "Samsung Galaxy S24" -> "Samsung")
  const inferredBrand = phone.title.split(' ')[0]

  // 2. Fetch related data (Same Brand, Other Brands, Brands list, Blogs, and News)
  const additionalData = await client.fetch(
    `{
      "sameBrandPhones": *[_type == "phone" && title match $brandMatch && _id != $currentId] | order(_createdAt desc)[0...4] {
        _id,
        title,
        slug,
        price,
        has5G,
        "imageUrl": coalesce(images[0].asset->url, image.asset->url)
      },
      "otherBrandPhones": *[_type == "phone" && !(title match $brandMatch) && _id != $currentId] | order(_createdAt desc)[0...6] {
        _id,
        title,
        slug,
        price,
        has5G,
        "imageUrl": coalesce(images[0].asset->url, image.asset->url)
      },
      "brands": *[_type == "brand"] | order(name asc) {
        name,
        slug,
        "logoUrl": logo.asset->url
      },
      "blogs": *[_type == "blog"] | order(_createdAt desc)[0...3] {
        _id,
        title,
        slug,
        category,
        "imageUrl": coalesce(featuredImage.asset->url, content[_type == "image"][0].asset->url)
      },
      "news": *[_type == "news"] | order(publishedAt desc, _createdAt desc)[0...3] {
        _id,
        title,
        slug,
        publishedAt,
        snippet,
        "imageUrl": mainImage.asset->url
      }
    }`,
    {
      brandMatch: `${inferredBrand}*`,
      currentId: phone._id,
    }
  )

  const sameBrandPhones: PhoneCard[] = additionalData?.sameBrandPhones || []
  const otherBrandPhones: PhoneCard[] = additionalData?.otherBrandPhones || []
  const brands: BrandItem[] = additionalData?.brands || []
  const blogs: BlogSnippet[] = additionalData?.blogs || []
  const news: NewsSnippet[] = additionalData?.news || []

  // Combine dynamic brands with default fallbacks
  const sanityBrandNames = new Set(brands.map((b) => b.name.toLowerCase()))
  const combinedBrands = [
    ...brands.map((b) => ({
      name: b.name,
      slug: (typeof b.slug === 'object' ? b.slug?.current : b.slug) || b.name.toLowerCase().replace(/\s+/g, '-'),
      logo: b.logoUrl || '',
    })),
    ...DEFAULT_BRANDS.filter((b) => !sanityBrandNames.has(b.name.toLowerCase())),
  ].slice(0, 10)

  // Primary phone image
  const primaryImage = phone.images && phone.images.length > 0 ? phone.images[0]?.asset?.url : null

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0F172A', overflowX: 'hidden' }}>
      
      {/* Mobile edge-to-edge Reset & Pure CSS Navigation Drawer */}
      <style dangerouslySetInnerHTML={{__html: `
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; }
        #nav-toggle { display: none; }
        .sidebar { position: fixed; top: 0; left: 0; width: 280px; height: 100vh; background-color: #0F172A; transform: translateX(-100%); transition: transform 0.3s ease; z-index: 1000; padding: 24px 20px; overflow-y: auto; }
        #nav-toggle:checked ~ .sidebar { transform: translateX(0); }
        .overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.6); opacity: 0; visibility: hidden; transition: opacity 0.3s; z-index: 999; }
        #nav-toggle:checked ~ .overlay { opacity: 1; visibility: visible; }
        .sidebar-link { display: block; color: #FFF; text-decoration: none; padding: 14px 0; font-size: 1.05rem; border-bottom: 1px solid #1E293B; font-weight: 500; }
        .spec-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 0.88rem; }
        .spec-table tr:nth-child(even) { background-color: #F8FAFC; }
        .spec-table td { padding: 10px 12px; border-bottom: 1px solid #E2E8F0; }
        .spec-label { width: 34%; font-weight: 600; color: '#475569'; }
        .spec-val { color: #0F172A; }
      `}} />

      <input type="checkbox" id="nav-toggle" />
      
      {/* Navigation Drawer */}
      <aside className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <span style={{ color: '#FFF', fontSize: '1.3rem', fontWeight: 800 }}>Menu</span>
          <label htmlFor="nav-toggle" style={{ color: '#FFF', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>&times;</label>
        </div>
        <Link href="/" className="sidebar-link">Home</Link>
        <Link href="/brand/samsung" className="sidebar-link">Samsung Phones</Link>
        <Link href="/brand/apple" className="sidebar-link">Apple iPhones</Link>
        <Link href="/brand/vivo" className="sidebar-link">Vivo Mobiles</Link>
        <Link href="/brand/infinix" className="sidebar-link">Infinix Mobiles</Link>
        <Link href="/price/under-50000" className="sidebar-link">Phones Under Rs. 50,000</Link>
        <Link href="/price/under-30000" className="sidebar-link">Phones Under Rs. 30,000</Link>
        <Link href="/blog" className="sidebar-link">Blogs</Link>
        <Link href="/news" className="sidebar-link">5G News</Link>
        <Link href="/contact" className="sidebar-link">Contact Us</Link>
      </aside>
      <label htmlFor="nav-toggle" className="overlay"></label>

      {/* Header with Working Search Form */}
      <header style={{ backgroundColor: '#0F172A', padding: '12px 16px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
        <div style={{ maxWidth: '1050px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '14px' }}>
          
          <label htmlFor="nav-toggle" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px' }}>
            <span style={{ width: '22px', height: '2.5px', backgroundColor: '#FFF', borderRadius: '2px', display: 'block' }}></span>
            <span style={{ width: '22px', height: '2.5px', backgroundColor: '#FFF', borderRadius: '2px', display: 'block' }}></span>
            <span style={{ width: '22px', height: '2.5px', backgroundColor: '#FFF', borderRadius: '2px', display: 'block' }}></span>
          </label>

          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
            <span style={{ margin: 0, fontSize: '1.45rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
              <span style={{ color: '#FFFFFF' }}>5G</span>
              <span style={{ color: '#10B981' }}>Mobile</span>
              <span style={{ color: '#FFFFFF', fontWeight: 400 }}>.pk</span>
            </span>
          </Link>

          {/* Working Functional Search Box */}
          <form action="/search" method="GET" style={{ display: 'flex', flex: 1, maxWidth: '480px', marginLeft: 'auto', gap: '6px' }}>
            <input 
              type="text" 
              name="q"
              placeholder="Search phone, specs, brand..." 
              required
              style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#1E293B', color: '#FFF', fontSize: '0.85rem', outline: 'none' }}
            />
            <button type="submit" style={{ backgroundColor: '#10B981', color: '#FFF', border: 'none', borderRadius: '6px', padding: '0 14px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
              Search
            </button>
          </form>

        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '16px 14px 40px' }}>
        
        {/* Breadcrumbs */}
        <div style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '16px' }}>
          <Link href="/" style={{ color: '#0284C7', textDecoration: 'none' }}>Home</Link> &gt;{' '}
          <Link href={`/brand/${inferredBrand.toLowerCase()}`} style={{ color: '#0284C7', textDecoration: 'none' }}>{inferredBrand}</Link> &gt;{' '}
          <span style={{ fontWeight: 600 }}>{phone.title}</span>
        </div>

        {/* HERO SECTION: Title, Gallery, Pricing, Variants & Colors */}
        <section style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 16px', marginBottom: '24px' }}>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
            {phone.has5G && (
              <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                5G ENABLED
              </span>
            )}
            <span style={{ backgroundColor: phone.ptaApproved ? '#E0F2FE' : '#FEF3C7', color: phone.ptaApproved ? '#0369A1' : '#92400E', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
              {phone.ptaApproved ? '✓ PTA APPROVED' : '⚠ NON-PTA / CUSTOMS'}
            </span>
            {phone.warranty && (
              <span style={{ backgroundColor: '#F1F5F9', color: '#475569', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                🛡️ {phone.warranty} Warranty
              </span>
            )}
          </div>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0F172A', margin: '0 0 16px', lineHeight: 1.25 }}>
            {phone.title} Price in Pakistan
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'start' }}>
            
            {/* Phone Image Gallery */}
            <div>
              <div style={{ height: '320px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '16px' }}>
                {primaryImage ? (
                  <img src={primaryImage} alt={phone.title} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                ) : (
                  <span style={{ color: '#94A3B8', fontWeight: 700 }}>No Phone Image</span>
                )}
              </div>

              {/* Thumbnails if multiple gallery photos exist */}
              {phone.images && phone.images.length > 1 && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {phone.images.map((img, idx) => (
                    <div key={idx} style={{ width: '56px', height: '56px', borderRadius: '6px', border: '1px solid #CBD5E1', padding: '4px', flexShrink: 0, backgroundColor: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={img.asset?.url} alt={`${phone.title} angle ${idx + 1}`} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Price Cards, Colors & Storage Variants */}
            <div>
              {/* Dual Price Display: Official vs Market */}
              <div style={{ display: 'grid', gridTemplateColumns: phone.marketPrice ? '1fr 1fr' : '1fr', gap: '12px', marginBottom: '18px' }}>
                <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '12px 14px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>Official Retail Price</div>
                  <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#15803D', marginTop: '4px' }}>
                    {phone.price ? `Rs. ${phone.price.toLocaleString()}` : 'Contact Dealer'}
                  </div>
                </div>

                {phone.marketPrice && (
                  <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '12px 14px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1E40AF', textTransform: 'uppercase' }}>Estimated Market Rate</div>
                    <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#2563EB', marginTop: '4px' }}>
                      Rs. {phone.marketPrice.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>

              {/* Available Colors Tags */}
              {phone.colors && phone.colors.length > 0 && (
                <div style={{ marginBottom: '18px' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', marginBottom: '8px' }}>Available Colors:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {phone.colors.map((color, idx) => (
                      <span key={idx} style={{ backgroundColor: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '20px', padding: '4px 12px', fontSize: '0.76rem', fontWeight: 600, color: '#334155' }}>
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Multiple Storage & RAM Variants List */}
              {phone.deviceVariants && phone.deviceVariants.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>Available Storage Variants:</div>
                  <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                    {phone.deviceVariants.map((variant, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: idx !== phone.deviceVariants!.length - 1 ? '1px solid #F1F5F9' : 'none', backgroundColor: idx % 2 === 0 ? '#FFF' : '#F8FAFC' }}>
                        <div>
                          <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0F172A' }}>{variant.storage || 'Base Storage'}</span>
                          {variant.ram && <span style={{ fontSize: '0.76rem', color: '#64748B', marginLeft: '6px' }}>({variant.ram} RAM)</span>}
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#10B981' }}>
                          {variant.price ? `Rs. ${variant.price.toLocaleString()}` : 'Check Price'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Highlights Pill Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '20px' }}>
                <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Display</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{phone.displayDiagonal || 'Full View'}</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Main Camera</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{phone.primaryCamera || 'Multi-lens'}</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Battery</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{phone.batteryCapacity || 'Standard'}</div>
                </div>
                <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Processor</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{phone.cpu || 'Octa Core'}</div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* PROS & CONS BOX */}
        {((phone.pros && phone.pros.length > 0) || (phone.cons && phone.cons.length > 0)) && (
          <section style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 16px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0 0 14px' }}>
              Why Buy or Skip {phone.title}?
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              
              {/* Pros */}
              <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #DCFCE7', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#166534', marginBottom: '10px' }}>✓ Reasons to Buy (Pros)</div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', color: '#15803D', lineHeight: 1.6 }}>
                  {phone.pros?.map((pro, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>{pro}</li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FEE2E2', borderRadius: '8px', padding: '14px' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#991B1B', marginBottom: '10px' }}>✕ Reasons to Skip (Cons)</div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.85rem', color: '#B91C1C', lineHeight: 1.6 }}>
                  {phone.cons?.map((con, idx) => (
                    <li key={idx} style={{ marginBottom: '6px' }}>{con}</li>
                  ))}
                </ul>
              </div>

            </div>
          </section>
        )}

        {/* OUR VERDICT (Rich Text Editor Content) */}
        {phone.verdict && phone.verdict.length > 0 && (
          <section style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ backgroundColor: '#10B981', color: '#FFF', padding: '4px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800 }}>
                EXPERT REVIEW
              </span>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Our Verdict on {phone.title}
              </h2>
            </div>
            <RenderVerdictText content={phone.verdict} />
          </section>
        )}

        {/* DETAILED SPECIFICATIONS TABLES */}
        <section style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 16px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0F172A', margin: '0 0 16px' }}>
            {phone.title} Full Specifications
          </h2>

          {/* General Specs */}
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0284C7', margin: '14px 0 8px' }}>General & Build</h3>
          <table className="spec-table">
            <tbody>
              <tr><td className="spec-label">Operating System</td><td className="spec-val">{phone.software || 'Android'}</td></tr>
              <tr><td className="spec-label">Release Date</td><td className="spec-val">{phone.launchDate || 'Recent'}</td></tr>
              <tr><td className="spec-label">SIM Configuration</td><td className="spec-val">{phone.simConfig || 'Dual SIM (Nano-SIM)'}</td></tr>
              <tr><td className="spec-label">Dimensions</td><td className="spec-val">{phone.dimensions || 'N/A'}</td></tr>
              <tr><td className="spec-label">Weight</td><td className="spec-val">{phone.weight || 'N/A'}</td></tr>
            </tbody>
          </table>

          {/* Display Specs */}
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0284C7', margin: '20px 0 8px' }}>Display</h3>
          <table className="spec-table">
            <tbody>
              <tr><td className="spec-label">Screen Size</td><td className="spec-val">{phone.displayDiagonal || 'N/A'}</td></tr>
              <tr><td className="spec-label">Resolution</td><td className="spec-val">{phone.resolution || 'FHD+'}</td></tr>
              <tr><td className="spec-label">Panel Type</td><td className="spec-val">{phone.panelTech || 'IPS / AMOLED'}</td></tr>
              <tr><td className="spec-label">Glass Protection</td><td className="spec-val">{phone.glassShield || 'Corning Gorilla Glass'}</td></tr>
            </tbody>
          </table>

          {/* Memory & Core Specs */}
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0284C7', margin: '20px 0 8px' }}>Performance & Memory</h3>
          <table className="spec-table">
            <tbody>
              <tr><td className="spec-label">Chipset / CPU</td><td className="spec-val">{phone.cpu || 'Octa-core'}</td></tr>
              <tr><td className="spec-label">GPU</td><td className="spec-val">{phone.graphics || 'N/A'}</td></tr>
              <tr><td className="spec-label">Built-in Storage</td><td className="spec-val">{phone.builtInStorage || '128GB'}</td></tr>
              <tr><td className="spec-label">System RAM</td><td className="spec-val">{phone.systemMemory || '6GB / 8GB'}</td></tr>
              <tr><td className="spec-label">Card Slot</td><td className="spec-val">{phone.expandableStorage || 'microSDXC'}</td></tr>
              <tr><td className="spec-label">Battery Capacity</td><td className="spec-val">{phone.batteryCapacity || '5000 mAh'}</td></tr>
            </tbody>
          </table>

          {/* Cameras Specs */}
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0284C7', margin: '20px 0 8px' }}>Camera Setup</h3>
          <table className="spec-table">
            <tbody>
              <tr><td className="spec-label">Primary Back Camera</td><td className="spec-val">{phone.primaryCamera || 'N/A'}</td></tr>
              <tr><td className="spec-label">Back Flash</td><td className="spec-val">{phone.mainFlash ? 'Yes, LED Flash' : 'No'}</td></tr>
              <tr><td className="spec-label">Back Video Capture</td><td className="spec-val">{phone.mainVideo || '1080p @ 30fps'}</td></tr>
              <tr><td className="spec-label">Front Selfie Lens</td><td className="spec-val">{phone.selfieLens || 'N/A'}</td></tr>
              <tr><td className="spec-label">Front Flash</td><td className="spec-val">{phone.selfieFlash ? 'Yes' : 'Screen Flash'}</td></tr>
              <tr><td className="spec-label">Front Video Capture</td><td className="spec-val">{phone.selfieVideo || '1080p @ 30fps'}</td></tr>
            </tbody>
          </table>

          {/* Connectivity */}
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0284C7', margin: '20px 0 8px' }}>Connectivity</h3>
          <table className="spec-table">
            <tbody>
              <tr><td className="spec-label">5G Band Support</td><td className="spec-val">{phone.has5G ? 'Yes (SA / NSA)' : 'No'}</td></tr>
              <tr><td className="spec-label">4G / LTE</td><td className="spec-val">{phone.has4G ? 'Yes' : 'Supported'}</td></tr>
              <tr><td className="spec-label">Wi-Fi</td><td className="spec-val">{phone.wifi || 'Wi-Fi 802.11 a/b/g/n/ac'}</td></tr>
              <tr><td className="spec-label">Bluetooth</td><td className="spec-val">{phone.bluetooth || 'Bluetooth 5.2'}</td></tr>
              <tr><td className="spec-label">NFC Support</td><td className="spec-val">{phone.nfc ? 'Yes' : 'No'}</td></tr>
              <tr><td className="spec-label">Radio</td><td className="spec-val">{phone.radio ? 'FM Radio' : 'No'}</td></tr>
            </tbody>
          </table>
        </section>

        {/* LATEST PHONES FROM THIS BRAND */}
        {sameBrandPhones.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px' }}>More from {inferredBrand}</h2>
            <p style={{ margin: '0 0 14px', color: '#64748B', fontSize: '0.85rem' }}>Other popular smartphones released by {inferredBrand}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
              {sameBrandPhones.map((item) => (
                <Link key={item._id} href={`/phone/${item.slug?.current || ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ backgroundColor: '#FFF', borderRadius: '8px', padding: '12px 8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ height: '90px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} style={{ maxHeight: '85px', maxWidth: '100%', objectFit: 'contain' }} />
                      ) : (
                        <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>5G</span>
                      )}
                    </div>
                    <h4 style={{ fontSize: '0.78rem', fontWeight: 600, margin: '0 0 4px', lineHeight: 1.3, color: '#0F172A', minHeight: '2.4em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.title}
                    </h4>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#10B981', marginTop: 'auto' }}>
                      {item.price ? `Rs. ${item.price.toLocaleString()}` : 'Check Price'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* LATEST PHONES FROM OTHER BRANDS */}
        {otherBrandPhones.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px' }}>Latest 5G Mobiles from Other Brands</h2>
            <p style={{ margin: '0 0 14px', color: '#64748B', fontSize: '0.85rem' }}>Compare with trending competitor devices</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '10px' }}>
              {otherBrandPhones.map((item) => (
                <Link key={item._id} href={`/phone/${item.slug?.current || ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ backgroundColor: '#FFF', borderRadius: '8px', padding: '12px 8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ height: '90px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} style={{ maxHeight: '85px', maxWidth: '100%', objectFit: 'contain' }} />
                      ) : (
                        <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>5G</span>
                      )}
                    </div>
                    <h4 style={{ fontSize: '0.78rem', fontWeight: 600, margin: '0 0 4px', lineHeight: 1.3, color: '#0F172A', minHeight: '2.4em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.title}
                    </h4>
                    <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#10B981', marginTop: 'auto' }}>
                      {item.price ? `Rs. ${item.price.toLocaleString()}` : 'Check Price'}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* RELATED BLOGS & GUIDES */}
        {blogs.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 12px' }}>Helpful Mobile Guides & Tips</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              {blogs.map((b) => (
                <Link key={b._id} href={`/blog/${b.slug?.current || ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '60px', height: '60px', backgroundColor: '#F1F5F9', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                      {b.imageUrl ? (
                        <img src={b.imageUrl} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#94A3B8' }}>GUIDE</div>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#10B981', textTransform: 'uppercase' }}>{b.category || 'Article'}</span>
                      <h4 style={{ margin: '2px 0 0', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.3 }}>
                        {b.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* RELATED 5G TELECOM NEWS */}
        {news.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 12px' }}>Latest Telecom Updates</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
              {news.map((item) => (
                <Link key={item._id} href={`/news/${item.slug?.current || ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '60px', height: '60px', backgroundColor: '#F1F5F9', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#10B981', fontWeight: 800 }}>5G</div>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: '0.68rem', color: '#64748B' }}>
                        {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-PK', { month: 'short', day: 'numeric' }) : 'Recent'}
                      </span>
                      <h4 style={{ margin: '2px 0 0', fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.3 }}>
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* EXPLORE POPULAR BRANDS GRID */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px' }}>Shop by Brand</h2>
          <p style={{ margin: '0 0 12px', color: '#64748B', fontSize: '0.85rem' }}>Browse top-selling mobile brands in Pakistan</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {combinedBrands.map((brand) => (
              <Link key={brand.slug} href={`/brand/${brand.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '10px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '74px' }}>
                  <div style={{ height: '24px', width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '6px' }}>
                    {brand.logo ? (
                      <img src={brand.logo} alt={`${brand.name} logo`} style={{ maxHeight: '20px', maxWidth: '24px', objectFit: 'contain' }} />
                    ) : (
                      <span style={{ fontWeight: 800, fontSize: '0.75rem', color: '#0F172A' }}>{brand.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#1E293B', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', padding: '0 2px' }}>
                    {brand.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#0F172A', color: '#94A3B8', padding: '40px 16px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', borderBottom: '1px solid #1E293B', paddingBottom: '32px', marginBottom: '24px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.5px', display: 'block', marginBottom: '10px' }}>
              <span style={{ color: '#FFFFFF' }}>5G</span>
              <span style={{ color: '#10B981' }}>Mobile</span>
              <span style={{ color: '#FFFFFF', fontWeight: 400 }}>.pk</span>
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
          &copy; {new Date().getFullYear()} 5gmobile.pk. All rights reserved. Prices are subject to local market fluctuations.
        </div>
      </footer>

    </div>
  )
}
