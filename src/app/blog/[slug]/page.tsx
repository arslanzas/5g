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

// Dynamic SEO for Google Discover
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await client.fetch(`*[_type == "blog" && slug.current == $slug][0]{
    title,
    excerpt,
    "imageUrl": coalesce(featuredImage.asset->url, content[_type == "image"][0].asset->url)
  }`, { slug: params.slug })

  if (!data) return {}

  return {
    title: `${data.title} | 5gmobile.pk`,
    description: data.excerpt,
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large', // CRITICAL FOR GOOGLE DISCOVER
    },
    openGraph: {
      images: data.imageUrl ? [{ url: data.imageUrl }] : [],
    }
  }
}

interface BlockChild {
  _key: string
  _type: string
  text?: string
  marks?: string[]
}

interface ContentBlock {
  _key: string
  _type: string
  style?: string
  children?: BlockChild[]
  asset?: { url: string }
}

interface BlogArticle {
  _id: string
  title: string
  category?: string
  readTime?: string
  excerpt?: string
  imageUrl?: string
  _createdAt: string
  content?: ContentBlock[]
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
  { name: 'Pixel', slug: 'google-pixel', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg' },
  { name: 'Nothing', slug: 'nothing', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nothing.svg' },
]

function RenderPortableText({ content }: { content?: ContentBlock[] }) {
  if (!content || !Array.isArray(content)) return null

  return (
    <div style={{ lineHeight: 1.8, fontSize: '1.02rem', color: '#334155' }}>
      {content.map((block) => {
        if (block._type === 'image' && block.asset?.url) {
          return (
            <div key={block._key} style={{ margin: '24px 0', textAlign: 'center' }}>
              <img src={block.asset.url} alt="Article visual" style={{ maxWidth: '100%', borderRadius: '8px' }} />
            </div>
          )
        }

        const text = block.children?.map((c) => c.text).join('') || ''

        if (block.style === 'h2') {
          return <h2 key={block._key} style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', marginTop: '28px', marginBottom: '12px' }}>{text}</h2>
        }
        if (block.style === 'h3') {
          return <h3 key={block._key} style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', marginTop: '22px', marginBottom: '10px' }}>{text}</h3>
        }
        if (block.style === 'blockquote') {
          return (
            <blockquote key={block._key} style={{ borderLeft: '4px solid #10B981', paddingLeft: '14px', margin: '16px 0', fontStyle: 'italic', color: '#475569' }}>
              {text}
            </blockquote>
          }
        }

        return <p key={block._key} style={{ marginBottom: '16px' }}>{text}</p>
      })}
    </div>
  )
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const data = await client.fetch(`{
    "blog": *[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      category,
      readTime,
      excerpt,
      _createdAt,
      "imageUrl": coalesce(featuredImage.asset->url, content[_type == "image"][0].asset->url),
      content[]{
        ...,
        asset->{ url }
      }
    },
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
  }`, { slug: params.slug })

  const blog: BlogArticle | null = data?.blog || null
  const topPhones: Phone[] = data?.topPhones || []
  const brands: BrandItem[] = data?.brands || []

  if (!blog) {
    notFound()
  }

  const sanityBrandNames = new Set(brands.map((b) => b.name.toLowerCase()))
  const combinedBrands = [
    ...brands.map((b) => ({
      name: b.name,
      slug: (typeof b.slug === 'object' ? b.slug?.current : b.slug) || b.name.toLowerCase().replace(/\s+/g, '-'),
      logo: b.logoUrl || ''
    })),
    ...DEFAULT_BRANDS.filter((b) => !sanityBrandNames.has(b.name.toLowerCase()))
  ].slice(0, 10)

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
      
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <span style={{ color: '#FFF', fontSize: '1.3rem', fontWeight: 800 }}>Navigation</span>
          <label htmlFor="nav-toggle" style={{ color: '#FFF', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>&times;</label>
        </div>
        <Link href="/" className="sidebar-link">Home</Link>
        <Link href="/brand/samsung" className="sidebar-link">Samsung Phones</Link>
        <Link href="/brand/apple" className="sidebar-link">Apple iPhones</Link>
        <Link href="/brand/vivo" className="sidebar-link">Vivo Mobiles</Link>
        <Link href="/brand/infinix" className="sidebar-link">Infinix Mobiles</Link>
        <Link href="/price/under-50000" className="sidebar-link">Phones Under Rs. 50,000</Link>
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
          <Link href="/blog" style={{ color: '#0284C7', textDecoration: 'none' }}>Blogs</Link> &gt;{' '}
          <span>{blog.title}</span>
        </div>

        {/* Article Body */}
        <article style={{ backgroundColor: '#FFF', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 16px', marginBottom: '32px' }}>
          {blog.category && (
            <span style={{ display: 'inline-block', backgroundColor: '#DCFCE7', color: '#15803D', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '4px', marginBottom: '10px', textTransform: 'uppercase' }}>
              {blog.category}
            </span>
          )}

          <h1 style={{ fontSize: '1.65rem', fontWeight: 900, lineHeight: 1.3, color: '#0F172A', margin: '0 0 12px' }}>
            {blog.title}
          </h1>

          <div style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '20px', display: 'flex', gap: '14px', alignItems: 'center' }}>
            <span>📅 {new Date(blog._createdAt).toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            {blog.readTime && <span>⏱️ {blog.readTime}</span>}
          </div>

          {blog.imageUrl && (
            <div style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', marginBottom: '22px', maxHeight: '420px', backgroundColor: '#F1F5F9' }}>
              <img src={blog.imageUrl} alt={blog.title} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
            </div>
          )}

          {blog.excerpt && (
            <p style={{ fontSize: '1.05rem', fontWeight: 600, color: '#334155', borderLeft: '3px solid #10B981', paddingLeft: '12px', marginBottom: '24px' }}>
              {blog.excerpt}
            </p>
          )}

          <RenderPortableText content={blog.content} />
        </article>

        {/* Brands List */}
        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px' }}>Popular 5G Brands</h2>
          <p style={{ margin: '0 0 14px', color: '#64748B', fontSize: '0.85rem' }}>Explore smartphones by your favorite brand</p>
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

        {/* Top 5 Most Visited Mobiles */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 14px' }}>Top 5 Most Visited Mobiles</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {topPhones.map((phone, idx) => {
              const phoneUrl = phone.slug?.current ? `/phone/${phone.slug.current}` : '#'
              return (
                <Link key={phone._id} href={phoneUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#94A3B8', width: '22px' }}>#{idx + 1}</div>
                    <div style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', borderRadius: '6px', flexShrink: 0 }}>
                      {phone.imageUrl ? (
                        <img src={phone.imageUrl} alt={phone.title} style={{ maxHeight: '45px', maxWidth: '45px', objectFit: 'contain' }} />
                      ) : (
                        <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>5G</span>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ margin: '0 0 3px', fontSize: '0.88rem', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {phone.title}
                      </h4>
                      <div style={{ fontSize: '0.72rem', color: phone.has5G ? '#15803D' : '#64748B', fontWeight: 600 }}>
                        {phone.has5G ? '5G Ready' : '4G Phone'}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#10B981', flexShrink: 0 }}>
                      {phone.price ? `Rs. ${phone.price.toLocaleString()}` : 'Check Price'}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

      </main>

      {/* Footer */}
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
          &copy; {new Date().getFullYear()} 5gmobile.pk. All rights reserved.
        </div>
      </footer>

    </div>
  )
}
