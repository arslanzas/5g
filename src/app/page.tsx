export const dynamic = 'force-dynamic'

import { createClient } from 'next-sanity'
import Link from 'next/link'

// 1. Semantic SEO Metadata
export const metadata = {
  title: '5G Mobile Price in Pakistan 2026 | Compare PTA Approved Phones',
  description: 'Find the latest 5G mobile price in Pakistan. Compare budget 5G phones under 30,000, 40,000, and 50,000 PKR with official PTA approval status and reviews.',
  keywords: [
    '5g mobile price in pakistan', 
    'best 5g mobile in pakistan', 
    '5g mobile price in pakistan under 50000', 
    '5g mobile price in pakistan under 40000', 
    '5g mobile price in pakistan under 30000',
    'samsung 5g mobile price in pakistan',
    'vivo 5g mobile price in pakistan',
    'infinix 5g mobile price in pakistan',
    'oppo 5g mobile price in pakistan',
    'apple iphone 5g price in pakistan'
  ],
}

// 2. Database Connection
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
    `*[_type == "phone"] | order(_createdAt desc) {
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
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0F172A', margin: 0, padding: 0 }}>
      
      {/* PURE CSS SIDEBAR HACK (Zero JavaScript needed) */}
      <style dangerouslySetInnerHTML={{__html: `
        body { margin: 0; padding: 0; }
        #nav-toggle { display: none; }
        .sidebar { 
          position: fixed; top: 0; left: -300px; width: 280px; height: 100vh; 
          background-color: #0F172A; transition: left 0.3s ease; z-index: 1000;
          box-shadow: 4px 0 15px rgba(0,0,0,0.5); padding: 20px; overflow-y: auto;
        }
        #nav-toggle:checked ~ .sidebar { left: 0; }
        .overlay { 
          position: fixed; top: 0; left: 0; width: 100%; height: 100vh; 
          background: rgba(0,0,0,0.5); opacity: 0; visibility: hidden; 
          transition: opacity 0.3s; z-index: 999; 
        }
        #nav-toggle:checked ~ .overlay { opacity: 1; visibility: visible; }
        .sidebar-link {
          display: block; color: #FFF; text-decoration: none; padding: 12px 0;
          font-size: 1.1rem; border-bottom: 1px solid #1E293B;
        }
        .sidebar-link:hover { color: #10B981; }
      `}} />

      <input type="checkbox" id="nav-toggle" />
      
      {/* Sidebar Menu */}
      <div className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#FFF', margin: 0, fontSize: '1.4rem' }}>Menu</h2>
          <label htmlFor="nav-toggle" style={{ color: '#FFF', fontSize: '1.8rem', cursor: 'pointer' }}>&times;</label>
        </div>
        <Link href="/" className="sidebar-link">Home</Link>
        <Link href="/brand/samsung" className="sidebar-link">Brands</Link>
        <Link href="/blog" className="sidebar-link">Blogs</Link>
        <Link href="/news" className="sidebar-link">News</Link>
        <Link href="/compare" className="sidebar-link">Compare</Link>
        <Link href="/pta-tax" className="sidebar-link">PTA Tax Calculator</Link>
        <Link href="/contact" className="sidebar-link">Contact Us</Link>
      </div>
      <label htmlFor="nav-toggle" className="overlay"></label>

      {/* Navbar */}
      <header style={{ backgroundColor: '#0F172A', padding: '16px 20px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Hamburger Icon */}
            <label htmlFor="nav-toggle" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ width: '24px', height: '3px', backgroundColor: '#FFF', borderRadius: '2px' }}></div>
              <div style={{ width: '24px', height: '3px', backgroundColor: '#FFF', borderRadius: '2px' }}></div>
              <div style={{ width: '24px', height: '3px', backgroundColor: '#FFF', borderRadius: '2px' }}></div>
            </label>

            {/* Clean White Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#FFF', letterSpacing: '-0.5px' }}>
                5G<span style={{ fontWeight: 400, opacity: 0.8 }}>Mobile.pk</span>
              </h1>
            </Link>
          </div>
          
          {/* Search Bar */}
          <div style={{ flex: '1 1 300px', maxWidth: '500px' }}>
            <div style={{ display: 'flex', backgroundColor: '#1E293B', borderRadius: '4px', padding: '10px 16px', border: '1px solid #334155' }}>
              <input 
                type="text" 
                placeholder="Search for products or brands..." 
                style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#FFF' }}
                disabled 
              />
              <span style={{ color: '#94A3B8' }}>🔍</span>
            </div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '24px auto', padding: '0 16px' }}>
        
        {/* 91mobiles Style Hero Block: Filters & Features */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          
          {/* Left Block: Price Filter */}
          <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem', fontWeight: 700 }}>Find Mobiles by Price</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ flex: 1, padding: '10px', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.9rem' }}>Rs. 0</div>
              <span style={{ color: '#94A3B8' }}>to</span>
              <div style={{ flex: 1, padding: '10px', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.9rem' }}>Rs. 300,000+</div>
            </div>
            <div style={{ height: '4px', backgroundColor: '#10B981', borderRadius: '2px', position: 'relative', marginBottom: '24px' }}>
              <div style={{ position: 'absolute', width: '16px', height: '16px', backgroundColor: '#FFF', border: '2px solid #10B981', borderRadius: '50%', top: '-6px', left: '0' }}></div>
              <div style={{ position: 'absolute', width: '16px', height: '16px', backgroundColor: '#FFF', border: '2px solid #10B981', borderRadius: '50%', top: '-6px', right: '0' }}></div>
            </div>
            <button style={{ width: '100%', padding: '12px', backgroundColor: '#0284C7', color: '#FFF', border: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
              Find Mobiles
            </button>
          </div>

          {/* Right Block: Features & Price Links (Stacked 1 per line) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem', fontWeight: 700 }}>Mobiles by Popular Features</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link href="/5g-phones" style={{ textDecoration: 'none', color: '#475569', fontSize: '0.95rem', fontWeight: 500 }}>⚡ 5G Phones</Link>
                <Link href="/ram/8gb" style={{ textDecoration: 'none', color: '#475569', fontSize: '0.95rem', fontWeight: 500 }}>📱 8GB & Above RAM</Link>
                <Link href="/storage/256gb" style={{ textDecoration: 'none', color: '#475569', fontSize: '0.95rem', fontWeight: 500 }}>💾 256GB Storage</Link>
                <Link href="/feature/120hz" style={{ textDecoration: 'none', color: '#475569', fontSize: '0.95rem', fontWeight: 500 }}>📺 120Hz Refresh Rate</Link>
                <Link href="/feature/5000mah" style={{ textDecoration: 'none', color: '#475569', fontSize: '0.95rem', fontWeight: 500 }}>🔋 5000mAh Battery</Link>
                <Link href="/pta-approved" style={{ textDecoration: 'none', color: '#475569', fontSize: '0.95rem', fontWeight: 500 }}>✅ PTA Approved</Link>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem', fontWeight: 700 }}>Mobiles by Price</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link href="/price/under-30000" style={{ textDecoration: 'none', color: '#0284C7', fontSize: '0.95rem', fontWeight: 600 }}>Under Rs. 30,000</Link>
                <Link href="/price/under-40000" style={{ textDecoration: 'none', color: '#0284C7', fontSize: '0.95rem', fontWeight: 600 }}>Under Rs. 40,000</Link>
                <Link href="/price/under-50000" style={{ textDecoration: 'none', color: '#0284C7', fontSize: '0.95rem', fontWeight: 600 }}>Under Rs. 50,000</Link>
                <Link href="/price/under-75000" style={{ textDecoration: 'none', color: '#0284C7', fontSize: '0.95rem', fontWeight: 600 }}>Under Rs. 75,000</Link>
                <Link href="/price/under-100000" style={{ textDecoration: 'none', color: '#0284C7', fontSize: '0.95rem', fontWeight: 600 }}>Under Rs. 100,000</Link>
                <Link href="/price/under-150000" style={{ textDecoration: 'none', color: '#0284C7', fontSize: '0.95rem', fontWeight: 600 }}>Under Rs. 150,000+</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Mobile Brands (3 Columns Grid) */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Featured Mobile Brands</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { name: 'Samsung', url: '/brand/samsung' },
              { name: 'Vivo', url: '/brand/vivo' },
              { name: 'Oppo', url: '/brand/oppo' },
              { name: 'Infinix', url: '/brand/infinix' },
              { name: 'Tecno', url: '/brand/tecno' },
              { name: 'Realme', url: '/brand/realme' },
              { name: 'Xiaomi', url: '/brand/xiaomi' },
              { name: 'Apple iPhones', url: '/brand/apple' },
              { name: 'Google Pixel', url: '/brand/google-pixel' },
              { name: 'Nothing Phone', url: '/brand/nothing' }
            ].map(brand => (
              <Link key={brand.name} href={brand.url} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px 12px', textAlign: 'center', fontWeight: 700, color: '#0F172A', transition: 'background-color 0.2s' }}>
                  {brand.name}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest & Popular Mobiles */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>Latest 5G Mobiles</h2>
            <Link href="/5g-phones" style={{ fontSize: '0.9rem', color: '#0284C7', fontWeight: 600, textDecoration: 'none' }}>View All &gt;</Link>
          </div>

          {phones.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <p style={{ color: '#64748B' }}>No phones added yet. Please add devices from your dashboard.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {phones.map((phone) => {
                const phoneUrl = phone.slug?.current ? `/phone/${phone.slug.current}` : '#'
                return (
                  <Link key={phone._id} href={phoneUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ backgroundColor: '#FFF', borderRadius: '8px', padding: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                      
                      <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: phone.has5G ? '#84CC16' : '#94A3B8', color: '#FFF', padding: '4px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
                        {phone.has5G ? '5G' : '4G'}
                      </div>

                      <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', marginTop: '20px' }}>
                        {phone.imageUrl ? (
                          <img src={phone.imageUrl} alt={phone.title} style={{ maxHeight: '140px', maxWidth: '100%', objectFit: 'contain' }} />
                        ) : (
                          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>No Photo</span>
                        )}
                      </div>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0 0 8px', lineHeight: 1.3, color: '#0F172A' }}>{phone.title}</h3>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', margin: '0 0 12px' }}>
                        {phone.price ? `Rs. ${phone.price.toLocaleString()}` : 'Price Pending'}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>

        <hr style={{ border: 0, borderTop: '1px solid #E2E8F0', margin: '40px 0' }} />

        {/* 1,500 Word Semantic SEO Guide */}
        <article style={{ backgroundColor: '#FFF', padding: '32px', borderRadius: '8px', border: '1px solid #E2E8F0', lineHeight: 1.8, fontSize: '1rem', color: '#334155' }}>
          
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0F172A', marginBottom: '16px' }}>
            Best 5G Mobile in Pakistan
          </h2>
          
          <p>
            Welcome to 5gmobile.pk, Pakistan's dedicated online smartphone portal. Finding the right mobile phone in Pakistan can be incredibly tricky. With currency fluctuations, import custom duties, PTA taxes, and rapidly changing retail prices across major markets in Lahore (Hafeez Center), Karachi (Saddar), and Rawalpindi, buyers often struggle to find clear, honest information. Our mission is to make your smartphone shopping journey completely stress-free by providing accurate hardware specifications and daily updated market rates.
          </p>

          <p>
            As telecom operators in Pakistan prepare their cellular towers and fiber backhaul networks for nationwide 5G launches, upgrading to a 5G-ready device is the smartest financial decision you can make. Fifth-generation mobile networking, popularly known as 5G, represents a massive technological leap forward from standard 4G LTE technology. While current 4G networks in Pakistan offer typical download speeds between 10 Mbps and 40 Mbps under good signal conditions, 5G is engineered to deliver speeds starting from 100 Mbps up to 1 Gbps with near-instant responsiveness.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#0F172A', marginTop: '32px', marginBottom: '16px', fontWeight: 800 }}>
            5G Mobile Price in Pakistan by Budget Tiers
          </h2>

          <p>
            Consumer demand in Pakistan is heavily focused on finding maximum value within specific budget brackets. Below is a detailed breakdown of what you can expect to find when searching for a 5G device based on your specific budget constraints.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 30000
          </h3>
          <p>
            Finding a brand-new, official PTA-approved 5G smartphone under 30,000 PKR is highly challenging due to FBR import duties and global microchip costs. However, budget innovators like Infinix and Tecno occasionally offer entry-level 5G devices in this tight price bracket. Devices here typically feature power-efficient processors like the MediaTek Dimensity 6080, standard 6.6-inch 90Hz IPS LCD screens, 4GB of RAM, and large 5000mAh batteries.
          </p>
          <Link href="/price/under-30000" style={{ display: 'inline-block', marginTop: '8px', padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#0284C7', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', border: '1px solid #CBD5E1' }}>
            View All Mobiles Under Rs. 30,000 &rarr;
          </Link>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '32px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 40000
          </h3>
          <p>
            The 30,000 to 40,000 PKR category represents the entry-level sweet spot for price-conscious Pakistani buyers looking for a bit more performance. In this range, brands like Tecno, Infinix, and Xiaomi Redmi deliver solid build quality. A 5g mobile price in pakistan under 40000 generally nets you a crisp 120Hz display, highly capable processors like the Snapdragon 4 Gen 2, 128GB of internal storage, and 33W fast charging.
          </p>
          <Link href="/price/under-40000" style={{ display: 'inline-block', marginTop: '8px', padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#0284C7', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', border: '1px solid #CBD5E1' }}>
            View All Mobiles Under Rs. 40,000 &rarr;
          </Link>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '32px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 50000
          </h3>
          <p>
            The 40,000 to 50,000 PKR price segment is currently the most popular, highly searched smartphone category in Pakistan. If you search for a 5g mobile price in pakistan under 50000, you will find fierce competition from Vivo, Samsung, Realme, and Infinix. You start seeing premium AMOLED screens, stereo dual speakers, and capable 50MP primary camera sensors.
          </p>
          <Link href="/price/under-50000" style={{ display: 'inline-block', marginTop: '8px', padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#0284C7', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', border: '1px solid #CBD5E1' }}>
            View All Mobiles Under Rs. 50,000 &rarr;
          </Link>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '32px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 100000
          </h3>
          <p>
            Stepping up to the 100,000 PKR bracket moves you into the "Premium Mid-Range" category. Devices here feature flagship-grade designs, Optical Image Stabilization (OIS) for steady video recording, curved AMOLED displays, and powerful chipsets capable of running heavy games like PUBG at 60 to 90 FPS without overheating.
          </p>
          <Link href="/price/under-100000" style={{ display: 'inline-block', marginTop: '8px', padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#0284C7', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', border: '1px solid #CBD5E1' }}>
            View All Mobiles Under Rs. 100,000 &rarr;
          </Link>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '32px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 150000
          </h3>
          <p>
            At the 150,000 PKR mark, you are entering the territory of "Flagship Killers." These smartphones offer true top-tier performance, ultra-fast 68W to 120W charging, glass and metal builds, and advanced AI camera algorithms. Many older-generation Apple and Samsung flagships also fall into this price range in the second-hand market.
          </p>
          <Link href="/price/under-150000" style={{ display: 'inline-block', marginTop: '8px', padding: '10px 20px', backgroundColor: '#F1F5F9', color: '#0284C7', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', border: '1px solid #CBD5E1' }}>
            View All Mobiles Under Rs. 150,000 &rarr;
          </Link>

          <h2 style={{ fontSize: '1.5rem', color: '#0F172A', marginTop: '40px', marginBottom: '16px', fontWeight: 800 }}>
            Top 5G Mobile Brands Dominating the Pakistani Market
          </h2>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Samsung 5G Mobile Price in Pakistan
          </h3>
          <p>
            Samsung securely remains the most trusted smartphone brand in Pakistan. The current Samsung 5G mobile price in Pakistan generally ranges from <strong>Rs. 45,000 to over Rs. 450,000+</strong> depending on the series. Options range from the affordable Galaxy A-series (like the A15 5G) all the way to the premium Galaxy S-series Ultra models. Samsung phones retain an incredibly high resale value in local second-hand markets.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Apple iPhone 5G Price in Pakistan
          </h3>
          <p>
            Apple remains the ultimate status symbol in the local market. For brand new, official PTA-approved devices, the Apple iPhone 5G price in Pakistan starts around <strong>Rs. 200,000 and can exceed Rs. 550,000+</strong> for the top-tier iPhone Pro Max models. Apple devices are praised for their unmatched video recording quality, absolute software fluidity (iOS), and exceptional long-term hardware durability.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Vivo 5G Mobile Price in Pakistan
          </h3>
          <p>
            Vivo has captured a massive market share across Pakistani cities through incredibly stylish designs and exceptional selfie cameras. The Vivo 5G mobile price in Pakistan ranges from <strong>Rs. 48,000 to Rs. 220,000</strong>. These smartphones are absolute staple choices for wedding photography due to their specialized portrait lighting systems.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Oppo 5G Mobile Price in Pakistan
          </h3>
          <p>
            Oppo is globally recognized for its eye-catching Glow designs, highly durable build quality, and feature-rich ColorOS software. The Oppo 5G mobile price in Pakistan sits comfortably between <strong>Rs. 50,000 and Rs. 180,000</strong>. Oppo's proprietary SuperVOOC fast-charging technology ensures that your phone battery goes from zero to full rapidly.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Infinix 5G Mobile Price in Pakistan
          </h3>
          <p>
            Infinix has completely transformed Pakistan's budget smartphone landscape. The Infinix 5G mobile price in Pakistan is highly accessible, generally falling between <strong>Rs. 32,000 and Rs. 75,000</strong>. By establishing local manufacturing facilities within Pakistan, they avoid heavy import duties, ensuring highly competitive retail pricing.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Tecno 5G Mobile Price in Pakistan
          </h3>
          <p>
            Tecno focuses heavily on raw gaming performance and highly distinctive aesthetic designs. The Tecno 5G mobile price in Pakistan remains extremely competitive, ranging from <strong>Rs. 34,000 to Rs. 85,000</strong> for their core models. The Tecno Pova series is famous among local gamers for its massive batteries and dedicated vapor-chamber cooling systems.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Redmi 5G Mobile Price in Pakistan
          </h3>
          <p>
            Xiaomi’s Redmi brand is synonymous with the best specification-to-price ratio available. The Redmi 5G mobile price in Pakistan caters perfectly to the budget and mid-range segments, stretching from <strong>Rs. 38,000 to Rs. 195,000</strong>. Powered by Xiaomi's HyperOS, Redmi 5G devices offer crisp screens, rapid charging, and highly capable chipsets.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Realme 5G Mobile Price in Pakistan
          </h3>
          <p>
            Realme targets younger users who desire bold, fashionable aesthetics. The Realme 5G mobile price in Pakistan positions it as a direct competitor to Xiaomi, with devices priced between <strong>Rs. 42,000 and Rs. 110,000</strong>. With its intuitive Realme UI and efficient battery management, Realme remains a massive force in the mid-range 5G segment.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Google Pixel 5G Price in Pakistan
          </h3>
          <p>
            For Android purists and photography enthusiasts, the Google Pixel remains a highly sought-after device. The Google Pixel 5G price in Pakistan (for non-PTA and PTA approved variants) typically spans from <strong>Rs. 65,000 (for older A-series) up to Rs. 280,000+</strong> for the latest Pro models. Pixels are praised for their unmatched AI computational photography.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Nothing Phone 5G Price in Pakistan
          </h3>
          <p>
            The Nothing Phone has carved out a unique niche with its transparent back designs and Glyph interface lighting. The Nothing Phone 5G price in Pakistan generally ranges between <strong>Rs. 85,000 and Rs. 165,000</strong>. It offers a near-stock Android experience that appeals to tech enthusiasts looking for something different from the standard designs.
          </p>

        </article>
      </main>

      {/* AdSense Ready Footer */}
      <footer style={{ backgroundColor: '#0F172A', color: '#94A3B8', padding: '60px 20px 40px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', borderBottom: '1px solid #1E293B', paddingBottom: '40px', marginBottom: '20px' }}>
          
          <div>
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '16px', fontWeight: 700 }}>5G Mobile.pk</h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Pakistan's most trusted directory for 5G smartphone prices, daily market updates, and official PTA tax calculators.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '16px', fontWeight: 700 }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/about" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</Link>
              <Link href="/contact" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>Contact Us</Link>
              <Link href="/blog" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>Mobile Blog</Link>
              <Link href="/news" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>Tech News</Link>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '16px', fontWeight: 700 }}>Tools & Guides</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/compare" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>Compare Phones</Link>
              <Link href="/pta-tax" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>PTA Tax Calculator</Link>
              <Link href="/5g-coverage" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>5G Coverage Map</Link>
              <Link href="/brands" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>All Mobile Brands</Link>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginBottom: '16px', fontWeight: 700 }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/privacy-policy" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</Link>
              <Link href="/terms" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>Terms & Conditions</Link>
              <Link href="/disclaimer" style={{ color: '#94A3B8', textDecoration: 'none', fontSize: '0.9rem' }}>Disclaimer</Link>
            </div>
          </div>

        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} 5gmobile.pk. All rights reserved. Prices and specifications are for reference only.
        </div>
      </footer>
    </div>
  )
}
