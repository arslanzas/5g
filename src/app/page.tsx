export const dynamic = 'force-dynamic'

import { createClient } from 'next-sanity'
import Link from 'next/link'

// Semantic SEO Metadata
export const metadata = {
  title: 'Best 5G Mobile in Pakistan 2026 | Compare Prices & Specs',
  description: 'Find the latest 5G mobile price in Pakistan. Compare budget 5G phones under 30,000, 40,000, and 50,000 PKR with official PTA approval status and reviews.',
  keywords: [
    '5g mobile price in pakistan', 
    'best 5g mobile in pakistan', 
    '5g mobile price in pakistan under 50000', 
    '5g mobile price in pakistan under 40000', 
    '5g mobile price in pakistan under 30000',
    'samsung 5g mobile price in pakistan',
    'vivo 5g mobile price in pakistan',
    'apple iphone 5g price in pakistan'
  ],
}

const client = createClient({
  projectId: 'e1h3j61w', // Ensure this matches your project ID
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
  // Fetch up to 30 latest phones
  const phones: Phone[] = await client.fetch(
    `*[_type == "phone"] | order(_createdAt desc)[0...30] {
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
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0F172A', margin: 0, padding: 0 }}>
      
      {/* PURE CSS SIDEBAR HACK */}
      <style dangerouslySetInnerHTML={{__html: `
        body { margin: 0; padding: 0; }
        #nav-toggle { display: none; }
        .sidebar { position: fixed; top: 0; left: -300px; width: 280px; height: 100vh; background-color: #0F172A; transition: left 0.3s ease; z-index: 1000; padding: 20px; overflow-y: auto; }
        #nav-toggle:checked ~ .sidebar { left: 0; }
        .overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100vh; background: rgba(0,0,0,0.5); opacity: 0; visibility: hidden; transition: opacity 0.3s; z-index: 999; }
        #nav-toggle:checked ~ .overlay { opacity: 1; visibility: visible; }
        .sidebar-link { display: block; color: #FFF; text-decoration: none; padding: 12px 0; font-size: 1.1rem; border-bottom: 1px solid #1E293B; }
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      <input type="checkbox" id="nav-toggle" />
      
      {/* Sidebar Menu */}
      <div className="sidebar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#FFF', margin: 0, fontSize: '1.4rem' }}>Menu</h2>
          <label htmlFor="nav-toggle" style={{ color: '#FFF', fontSize: '1.8rem', cursor: 'pointer' }}>&times;</label>
        </div>
        <Link href="/" className="sidebar-link">Home</Link>
        <Link href="/brands" className="sidebar-link">Brands</Link>
        <Link href="/blog" className="sidebar-link">Blogs</Link>
        <Link href="/news" className="sidebar-link">News</Link>
        <Link href="/compare" className="sidebar-link">Compare</Link>
        <Link href="/contact" className="sidebar-link">Contact Us</Link>
      </div>
      <label htmlFor="nav-toggle" className="overlay"></label>

      {/* Navbar: White & Green Logo on Dark Background */}
      <header style={{ backgroundColor: '#0F172A', padding: '16px 20px', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <label htmlFor="nav-toggle" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ width: '24px', height: '3px', backgroundColor: '#FFF', borderRadius: '2px' }}></div>
            <div style={{ width: '24px', height: '3px', backgroundColor: '#FFF', borderRadius: '2px' }}></div>
            <div style={{ width: '24px', height: '3px', backgroundColor: '#FFF', borderRadius: '2px' }}></div>
          </label>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <h1 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
              <span style={{ color: '#FFFFFF' }}>5G</span>
              <span style={{ color: '#10B981' }}>Mobile</span>
              <span style={{ color: '#FFFFFF', fontWeight: 400, opacity: 0.9 }}>.pk</span>
            </h1>
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '16px auto', padding: '0 12px' }}>
        
        {/* Search Bar Section */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input 
            type="text" 
            placeholder="Search mobile, brand, or specs..." 
            style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '1rem', outline: 'none' }}
          />
          <button style={{ backgroundColor: '#10B981', color: '#FFF', border: 'none', borderRadius: '8px', padding: '0 20px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
            Search
          </button>
        </div>

        {/* Latest 5G News (Under Search, Slider) */}
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>Latest 5G News</h3>
          <div className="hide-scroll" style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '8px' }}>
            {[1, 2, 3, 4].map((news) => (
              <div key={news} style={{ minWidth: '80%', backgroundColor: '#FFF', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', scrollSnapAlign: 'start', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '60px', height: '60px', backgroundColor: '#F1F5F9', borderRadius: '4px' }}></div>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '0.9rem', fontWeight: 600 }}>5G Network Rolling out in Lahore soon...</h4>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>2 hours ago</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: 0, borderTop: '1px solid #E2E8F0', margin: '24px 0' }} />

        {/* Mobile Brands Grid (5 per row) */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 4px' }}>5G Mobile</h2>
          <p style={{ margin: '0 0 16px', color: '#64748B', fontSize: '0.9rem' }}>5G Mobile Brands</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {[
              { name: 'Samsung', url: '/brand/samsung' }, { name: 'Apple', url: '/brand/apple' },
              { name: 'Vivo', url: '/brand/vivo' }, { name: 'Oppo', url: '/brand/oppo' },
              { name: 'Infinix', url: '/brand/infinix' }, { name: 'Tecno', url: '/brand/tecno' },
              { name: 'Realme', url: '/brand/realme' }, { name: 'Xiaomi', url: '/brand/xiaomi' },
              { name: 'Pixel', url: '/brand/google-pixel' }, { name: 'Nothing', url: '/brand/nothing' }
            ].map(brand => (
              <Link key={brand.name} href={brand.url} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', aspectRatio: '1/1' }}>
                  <div style={{ width: '30px', height: '30px', backgroundColor: '#F1F5F9', borderRadius: '50%', marginBottom: '8px' }}></div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0F172A', textAlign: 'center' }}>{brand.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Find Mobile by Price */}
        <section style={{ backgroundColor: '#FFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 16px' }}>Let's find mobile by Price</h2>
          <p style={{ margin: '0 0 8px', fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>Your price range from...</p>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
            <input type="number" placeholder="Rs. 3000" style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }} />
            <span style={{ fontWeight: 600, color: '#64748B' }}>to</span>
            <input type="number" placeholder="Rs. 150000" style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }} />
          </div>
          <button style={{ width: '100%', padding: '12px', backgroundColor: '#0284C7', color: '#FFF', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
            Find 5G Mobile
          </button>
        </section>

        {/* Latest 5G Phones (3 per row) */}
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 16px' }}>Latest 5G Phones</h2>
          
          {phones.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <p style={{ color: '#64748B' }}>No phones added yet.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {phones.map((phone) => {
                const phoneUrl = phone.slug?.current ? `/phone/${phone.slug.current}` : '#'
                return (
                  <Link key={phone._id} href={phoneUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ backgroundColor: '#FFF', borderRadius: '8px', padding: '8px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', textAlign: 'center' }}>
                      <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                        {phone.imageUrl ? (
                          <img src={phone.imageUrl} alt={phone.title} style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain' }} />
                        ) : (
                          <span style={{ fontSize: '0.6rem', color: '#94A3B8' }}>No Photo</span>
                        )}
                      </div>
                      <h3 style={{ fontSize: '0.75rem', fontWeight: 600, margin: '0 0 4px', lineHeight: 1.2, color: '#0F172A' }}>{phone.title}</h3>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10B981', margin: '0' }}>
                        {phone.price ? `Rs. ${phone.price.toLocaleString()}` : 'N/A'}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
          
          <button style={{ width: '100%', marginTop: '16px', padding: '12px', backgroundColor: '#F1F5F9', color: '#0F172A', border: '1px solid #CBD5E1', borderRadius: '6px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
            Next Page &rarr;
          </button>
        </section>

        {/* Blogs Section (Slider) */}
        <section style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Latest Blogs</h2>
            <Link href="/blog" style={{ fontSize: '0.85rem', color: '#0284C7', textDecoration: 'none', fontWeight: 600 }}>View All</Link>
          </div>
          <div className="hide-scroll" style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '8px' }}>
            {[1, 2, 3].map((blog) => (
              <div key={blog} style={{ minWidth: '70%', backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0', scrollSnapAlign: 'start', overflow: 'hidden' }}>
                <div style={{ height: '120px', backgroundColor: '#CBD5E1' }}></div>
                <div style={{ padding: '12px' }}>
                  <h4 style={{ margin: '0 0 8px', fontSize: '1rem', fontWeight: 700 }}>Why 5G matters for gaming in Pakistan</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B' }}>Read more...</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured 5G News Section (2 on screen slider) */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 12px' }}>Featured 5G News</h2>
          <div className="hide-scroll" style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: '8px' }}>
            {[1, 2, 3, 4].map((feat) => (
              <div key={feat} style={{ minWidth: '45%', backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0', scrollSnapAlign: 'start', padding: '12px' }}>
                <div style={{ height: '80px', backgroundColor: '#F1F5F9', borderRadius: '4px', marginBottom: '8px' }}></div>
                <h4 style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.3 }}>Zong announces new 5G trial locations</h4>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: 0, borderTop: '1px solid #E2E8F0', margin: '40px 0' }} />

        {/* 1,500 Word Semantic SEO Guide */}
        <article style={{ backgroundColor: '#FFF', padding: '24px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', lineHeight: 1.8, fontSize: '0.95rem', color: '#334155' }}>
          
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0F172A', marginBottom: '16px' }}>
            Best 5G Mobile in Pakistan
          </h2>
          
          <p>
            Welcome to 5gmobile.pk, Pakistan's dedicated online smartphone portal. Finding the right mobile phone in Pakistan can be incredibly tricky. With currency fluctuations, import custom duties, PTA taxes, and rapidly changing retail prices across major markets in Lahore (Hafeez Center), Karachi (Saddar), and Rawalpindi, buyers often struggle to find clear, honest information. Our mission is to make your smartphone shopping journey completely stress-free by providing accurate hardware specifications and daily updated market rates.
          </p>
          <p>
            As telecom operators in Pakistan prepare their cellular towers and fiber backhaul networks for nationwide 5G launches, upgrading to a 5G-ready device is the smartest financial decision you can make. Fifth-generation mobile networking, popularly known as 5G, represents a massive technological leap forward from standard 4G LTE technology.
          </p>

          <h2 style={{ fontSize: '1.4rem', color: '#0F172A', marginTop: '32px', marginBottom: '16px', fontWeight: 800 }}>
            5G Mobile Price in Pakistan by Budget Tiers
          </h2>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 30000
          </h3>
          <p>
            Finding a brand-new, official PTA-approved 5G smartphone under 30,000 PKR is highly challenging due to FBR import duties and global microchip costs. However, budget innovators like Infinix and Tecno occasionally offer entry-level 5G devices in this tight price bracket.
          </p>
          <Link href="/price/under-30000" style={{ display: 'inline-block', marginTop: '8px', padding: '10px 16px', backgroundColor: '#F1F5F9', color: '#0284C7', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}>
            View All Mobiles Under Rs. 30,000 &rarr;
          </Link>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '32px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 40000
          </h3>
          <p>
            The 30,000 to 40,000 PKR category represents the entry-level sweet spot for price-conscious Pakistani buyers looking for a bit more performance. In this range, brands like Tecno, Infinix, and Xiaomi Redmi deliver solid build quality.
          </p>
          <Link href="/price/under-40000" style={{ display: 'inline-block', marginTop: '8px', padding: '10px 16px', backgroundColor: '#F1F5F9', color: '#0284C7', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}>
            View All Mobiles Under Rs. 40,000 &rarr;
          </Link>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '32px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 50000
          </h3>
          <p>
            The 40,000 to 50,000 PKR price segment is currently the most popular, highly searched smartphone category in Pakistan. You will find fierce competition from Vivo, Samsung, Realme, and Infinix.
          </p>
          <Link href="/price/under-50000" style={{ display: 'inline-block', marginTop: '8px', padding: '10px 16px', backgroundColor: '#F1F5F9', color: '#0284C7', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}>
            View All Mobiles Under Rs. 50,000 &rarr;
          </Link>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '32px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 100000
          </h3>
          <p>
            Stepping up to the 100,000 PKR bracket moves you into the "Premium Mid-Range" category. Devices here feature flagship-grade designs, Optical Image Stabilization (OIS), and powerful chipsets.
          </p>
          <Link href="/price/under-100000" style={{ display: 'inline-block', marginTop: '8px', padding: '10px 16px', backgroundColor: '#F1F5F9', color: '#0284C7', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}>
            View All Mobiles Under Rs. 100,000 &rarr;
          </Link>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '32px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 150000
          </h3>
          <p>
            At the 150,000 PKR mark, you are entering the territory of "Flagship Killers." These smartphones offer true top-tier performance, ultra-fast 68W to 120W charging, and advanced AI camera algorithms.
          </p>
          <Link href="/price/under-150000" style={{ display: 'inline-block', marginTop: '8px', padding: '10px 16px', backgroundColor: '#F1F5F9', color: '#0284C7', fontWeight: 700, borderRadius: '6px', textDecoration: 'none', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}>
            View All Mobiles Under Rs. 150,000 &rarr;
          </Link>

          <h2 style={{ fontSize: '1.4rem', color: '#0F172A', marginTop: '40px', marginBottom: '16px', fontWeight: 800 }}>
            Top 5G Mobile Brands Dominating the Pakistani Market
          </h2>

          <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>Samsung 5G Mobile Price in Pakistan</h3>
          <p>
            The current Samsung 5G mobile price in Pakistan generally ranges from <strong>Rs. 45,000 to over Rs. 450,000+</strong> depending on the series. Samsung phones retain an incredibly high resale value in local markets.
          </p>

          <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>Apple iPhone 5G Price in Pakistan</h3>
          <p>
            For brand new, official PTA-approved devices, the Apple iPhone 5G price in Pakistan starts around <strong>Rs. 200,000 and can exceed Rs. 550,000+</strong> for the top-tier iPhone Pro Max models.
          </p>

          <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>Vivo 5G Mobile Price in Pakistan</h3>
          <p>
            The Vivo 5G mobile price in Pakistan ranges from <strong>Rs. 48,000 to Rs. 220,000</strong>. These smartphones are absolute staple choices for wedding photography due to their specialized portrait lighting.
          </p>
          
          <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>Oppo 5G Mobile Price in Pakistan</h3>
          <p>
            The Oppo 5G mobile price in Pakistan sits comfortably between <strong>Rs. 50,000 and Rs. 180,000</strong>. Oppo's proprietary SuperVOOC fast-charging technology ensures quick top-ups during load shedding.
          </p>

          <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>Infinix 5G Mobile Price in Pakistan</h3>
          <p>
            The Infinix 5G mobile price in Pakistan is highly accessible, generally falling between <strong>Rs. 32,000 and Rs. 75,000</strong>. They offer large batteries and smooth high-refresh-rate screens for budget gamers.
          </p>

          <h3 style={{ fontSize: '1.1rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>Tecno 5G Mobile Price in Pakistan</h3>
          <p>
            The Tecno 5G mobile price in Pakistan ranges from <strong>Rs. 34,000 to Rs. 85,000</strong>. The Tecno Pova series is famous among local gamers for its massive batteries and vapor-chamber cooling.
          </p>
        </article>
      </main>

      {/* AdSense Ready Footer */}
      <footer style={{ backgroundColor: '#0F172A', color: '#94A3B8', padding: '40px 16px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', borderBottom: '1px solid #1E293B', paddingBottom: '32px', marginBottom: '24px' }}>
          
          <div style={{ gridColumn: 'span 2' }}>
            <h4 style={{ color: '#FFF', fontSize: '1.2rem', marginBottom: '12px', fontWeight: 700 }}>5G Mobile.pk</h4>
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
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', fontSize: '0.75rem' }}>
          &copy; {new Date().getFullYear()} 5gmobile.pk. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
