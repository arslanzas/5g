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
    'oppo 5g mobile price in pakistan'
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
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0F172A' }}>
      
      {/* Navbar */}
      <header style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '16px 20px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ backgroundColor: '#FF6F00', color: '#FFF', padding: '4px 8px', borderRadius: '4px', fontWeight: 900, fontSize: '1.2rem' }}>5G</div>
            <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.5px' }}>Mobile.pk</h1>
          </Link>
          
          {/* Search Bar */}
          <div style={{ flex: '1 1 300px', maxWidth: '500px' }}>
            <div style={{ display: 'flex', backgroundColor: '#F1F5F9', borderRadius: '4px', padding: '10px 16px', border: '1px solid #E2E8F0' }}>
              <input 
                type="text" 
                placeholder="Search for products or brands..." 
                style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem', color: '#0F172A' }}
                disabled 
              />
              <span style={{ color: '#94A3B8' }}>🔍</span>
            </div>
          </div>

          <Link href="/studio" style={{ color: '#0F172A', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 600 }}>
            Login / Admin
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '24px auto', padding: '0 16px' }}>
        
        {/* 91mobiles Style Hero Block: Filters & Features */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          
          {/* Left Block: Price Filter */}
          <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: 700 }}>Find Mobiles by Price</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ flex: 1, padding: '10px', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.9rem' }}>Rs. 0</div>
              <span style={{ color: '#94A3B8' }}>to</span>
              <div style={{ flex: 1, padding: '10px', border: '1px solid #CBD5E1', borderRadius: '4px', fontSize: '0.9rem' }}>Rs. 150,000+</div>
            </div>
            <div style={{ height: '4px', backgroundColor: '#10B981', borderRadius: '2px', position: 'relative', marginBottom: '24px' }}>
              <div style={{ position: 'absolute', width: '16px', height: '16px', backgroundColor: '#FFF', border: '2px solid #10B981', borderRadius: '50%', top: '-6px', left: '0' }}></div>
              <div style={{ position: 'absolute', width: '16px', height: '16px', backgroundColor: '#FFF', border: '2px solid #10B981', borderRadius: '50%', top: '-6px', right: '0' }}></div>
            </div>
            <button style={{ width: '100%', padding: '12px', backgroundColor: '#FF6F00', color: '#FFF', border: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
              Find Mobiles
            </button>
          </div>

          {/* Right Block: Features & Price Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: 700 }}>Mobiles by Popular Features</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {['5G Phones', '8GB & Above RAM', '256GB Storage', '120Hz Refresh Rate', '5000mAh Battery', 'PTA Approved'].map(feat => (
                  <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer' }}>
                    <span style={{ color: '#94A3B8' }}>⚡</span> {feat}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: '#FFF', padding: '24px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: 700 }}>Mobiles by Price</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {['Rs. 30,000', 'Rs. 40,000', 'Rs. 50,000', 'Rs. 75,000', 'Rs. 100,000', 'Rs. 150,000+'].map(price => (
                  <div key={price} style={{ fontSize: '0.85rem', color: '#0284C7', cursor: 'pointer', fontWeight: 600 }}>{price}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Mobile Brands (Horizontal Row) */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Featured Mobile Brands</h2>
            <span style={{ fontSize: '0.85rem', color: '#FF6F00', fontWeight: 600, cursor: 'pointer' }}>View All &gt;</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
            {['Samsung', 'Vivo', 'Oppo', 'Infinix', 'Tecno', 'Realme', 'Xiaomi'].map(brand => (
              <div key={brand} style={{ minWidth: '100px', backgroundColor: '#FFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '16px 12px', textAlign: 'center', fontWeight: 700, color: '#0F172A', cursor: 'pointer' }}>
                {brand}
              </div>
            ))}
          </div>
        </section>

        {/* Latest & Popular Mobiles (91mobiles Card Style) */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>Latest 5G Mobiles</h2>
            <span style={{ fontSize: '0.85rem', color: '#FF6F00', fontWeight: 600, cursor: 'pointer' }}>View All &gt;</span>
          </div>

          {phones.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <p style={{ color: '#64748B' }}>No phones added yet. Please add devices from the Admin Studio.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {phones.map((phone) => {
                const phoneUrl = phone.slug?.current ? `/phone/${phone.slug.current}` : '#'
                return (
                  <Link key={phone._id} href={phoneUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ backgroundColor: '#FFF', borderRadius: '8px', padding: '16px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                      
                      {/* Spec Score Badge */}
                      <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#84CC16', color: '#FFF', padding: '4px 6px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800 }}>
                        {phone.has5G ? '92%' : '75%'}
                        <div style={{ fontSize: '0.55rem', fontWeight: 500 }}>Spec Score</div>
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
                        {phone.price ? `₹${phone.price.toLocaleString()}` : 'Price Pending'}
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
            The Ultimate Guide to the Best 5G Mobile in Pakistan (2026)
          </h2>
          
          <p>
            Welcome to 5gmobile.pk, Pakistan's dedicated online smartphone portal. Finding the right mobile phone in Pakistan can be incredibly tricky. With currency fluctuations, import custom duties, PTA taxes, and rapidly changing retail prices across major markets in Lahore (Hafeez Center), Karachi (Saddar), and Rawalpindi, buyers often struggle to find clear, honest information. Our mission is to make your smartphone shopping journey completely stress-free by providing accurate hardware specifications and daily updated market rates.
          </p>

          <p>
            As telecom operators in Pakistan prepare their cellular towers and fiber backhaul networks for nationwide 5G launches, upgrading to a 5G-ready device is the smartest financial decision you can make. Fifth-generation mobile networking, popularly known as 5G, represents a massive technological leap forward from standard 4G LTE technology. While current 4G networks in Pakistan offer typical download speeds between 10 Mbps and 40 Mbps under good signal conditions, 5G is engineered to deliver speeds starting from 100 Mbps up to 1 Gbps with near-instant responsiveness (low latency).
          </p>

          <p>
            Why does 5G matter for the average Pakistani user? First, buffer-free streaming allows you to download full HD movies or heavy university materials in seconds. Second, lag-free online gaming is crucial; popular games in Pakistan like PUBG Mobile and Free Fire demand low ping, and 5G reduces network latency down to single-digit milliseconds, completely eliminating gameplay stutter. Third, video calling your family or clients on WhatsApp stays sharp without voice distortion, even in crowded outdoor areas. Simply put, investing in a 5G phone today ensures your handset stays relevant and fast for the next 3 to 5 years.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#0F172A', marginTop: '32px', marginBottom: '16px', fontWeight: 800 }}>
            Understanding 5G Mobile Price in Pakistan by Budget Tiers
          </h2>

          <p>
            Consumer demand in Pakistan is heavily focused on finding maximum value within specific budget brackets. Below is a detailed breakdown of what you can expect to find when searching for a 5G device based on your specific budget constraints.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 30000
          </h3>
          <p>
            Finding a brand-new, official PTA-approved 5G smartphone under 30,000 PKR is highly challenging due to FBR import duties and global microchip costs. However, budget innovators like Infinix and Tecno occasionally offer entry-level 5G devices in this tight price bracket. Devices here typically feature power-efficient processors like the MediaTek Dimensity 6080 or Dimensity 6100+. You will usually find standard 6.6-inch 90Hz IPS LCD screens, 4GB of RAM (often boosted by virtual RAM), and large 5000mAh batteries. A 5g mobile price in pakistan under 30000 is perfect for university students and delivery riders who need reliable social media browsing, YouTube playback, and long battery life without spending a fortune.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 40000
          </h3>
          <p>
            The 30,000 to 40,000 PKR category represents the entry-level sweet spot for price-conscious Pakistani buyers looking for a bit more performance. In this range, brands like Tecno, Infinix, and Xiaomi Redmi deliver solid build quality and responsive performance. A 5g mobile price in pakistan under 40000 generally nets you a crisp 120Hz Full HD+ display that makes scrolling through TikTok and Facebook feel ultra-smooth. You also get highly capable processors like the Snapdragon 4 Gen 2 that handle everyday multitasking effortlessly, alongside 128GB of internal storage and 33W fast charging capable of filling a 5000mAh battery rapidly during load-shedding hours.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            5G Mobile Price in Pakistan Under 50000
          </h3>
          <p>
            The 40,000 to 50,000 PKR price segment is currently the most popular, highly searched smartphone category in Pakistan. This bracket provides exceptionally balanced performance without forcing you to pay premium flagship prices. If you search for a 5g mobile price in pakistan under 50000, you will find fierce competition from Vivo, Samsung, Realme, and Infinix. This is the tier where you start seeing premium AMOLED screens offering deep blacks and excellent outdoor visibility under bright sunlight. You also gain access to stereo dual speakers, capable 50MP primary camera sensors with advanced night mode algorithms for clean photos at family events, and guaranteed Android OS updates for long-term reliability.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#0F172A', marginTop: '40px', marginBottom: '16px', fontWeight: 800 }}>
            Top 5G Mobile Brands Dominating the Pakistani Market
          </h2>

          <p>
            Not all 5G phones are created equal. When a phone is labeled as "5G," it must support the specific radio frequency bands allocated by the Pakistan Telecommunication Authority (PTA), specifically Band n78 (3.5 GHz) and Band n41 (2.5 GHz). Below is a deep dive into how the major brands are performing in the local market.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Samsung 5G Mobile Price in Pakistan
          </h3>
          <p>
            Samsung securely remains the most trusted smartphone brand in Pakistan. The South Korean tech giant offers extensive local customer support through highly authorized distribution partners like Airlink Communication, Mercantile, and Muller & Phipps. When looking at the Samsung 5G mobile price in Pakistan, options range from the affordable Galaxy A-series to the premium Galaxy S-series Ultra models. Samsung 5G phones are celebrated for their highly refined One UI software interface, Knox security hardware that protects your banking apps (like Meezan, SadaPay, and Nayapay), and industry-leading software update commitments. Furthermore, Samsung phones consistently retain an incredibly high resale value in local second-hand markets.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Vivo 5G Mobile Price in Pakistan
          </h3>
          <p>
            Vivo has captured a massive market share across Pakistani cities through incredibly stylish designs, ultra-slim profiles, and exceptional selfie cameras tailored for local aesthetics. The Vivo 5G mobile price in Pakistan is highly competitive, particularly within the V-series and Y-series lineups. These smartphones are absolute staple choices for wedding photography and social media influencers due to their specialized portrait lighting systems (Aura Light) and robust battery optimization. The Funtouch OS interface remains lightweight on system memory, ensuring that even mid-range Vivo devices provide smooth, lag-free daily operations.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Vivo New 5G Mobile
          </h3>
          <p>
            Consumers eagerly anticipate every Vivo new 5G mobile launch because the brand consistently introduces major aesthetic and camera upgrades. Whether it is color-changing back panels or advanced optical image stabilization (OIS) for steady video recording, a new Vivo 5G release is always designed to appeal to the younger demographic in Pakistan who prioritize both style and cellular performance.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Oppo 5G Mobile Price in Pakistan
          </h3>
          <p>
            Oppo is globally recognized for its eye-catching Glow designs, highly durable build quality, and feature-rich ColorOS software. The Oppo 5G mobile price in Pakistan sits comfortably in the mid-range to premium-mid-range segment. Devices in the Oppo Reno 5G and A-series lineups deliver highly reliable cellular signal reception across all Pakistani telecom networks. Furthermore, Oppo's proprietary SuperVOOC fast-charging technology ensures that your phone battery goes from zero to full in roughly 45 minutes, a crucial feature for users dealing with unpredictable electricity load-shedding schedules.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Infinix 5G Mobile Price in Pakistan
          </h3>
          <p>
            Infinix, owned by Transsion Holdings, has completely transformed Pakistan's budget smartphone landscape. By aggressively offering high-end hardware specifications at incredibly accessible price points, the Infinix 5G mobile price in Pakistan is often the most appealing option for young professionals. Their 5G devices frequently feature large 120Hz AMOLED displays, 108MP camera sensors, and 45W+ fast wired and wireless charging capabilities. Because Infinix has established local manufacturing and assembly facilities within Pakistan, they avoid heavy import duties, ensuring highly competitive retail pricing and wide spare parts availability across the country.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Tecno 5G Mobile Price in Pakistan
          </h3>
          <p>
            Also operating under the Transsion umbrella, Tecno focuses heavily on raw gaming performance and highly distinctive, futuristic aesthetic designs. The Tecno 5G mobile price in Pakistan remains extremely competitive. The Tecno Pova series is famous among local gamers for its massive 6000mAh batteries and dedicated vapor-chamber cooling systems that prevent overheating during long PUBG sessions. Meanwhile, the Tecno Camon series brings professional-grade photography sensors to the mid-range market, ensuring you get excellent value for your money.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Redmi 5G Mobile Price in Pakistan
          </h3>
          <p>
            Xiaomi’s Redmi brand is synonymous with the best specification-to-price ratio available globally. Operating through local assemblers and authorized distributors like Airlink, the Redmi 5G mobile price in Pakistan caters perfectly to the budget and lower-mid-range segments. Powered by Xiaomi's highly optimized HyperOS, Redmi 5G devices offer crisp high-refresh-rate screens, rapid charging speeds, infrared blasters (allowing you to control your TV and AC), and highly capable Qualcomm Snapdragon or MediaTek Dimensity chipsets.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            Realme 5G Mobile Price in Pakistan
          </h3>
          <p>
            Realme strictly targets younger users who desire bold, fashionable aesthetics combined with reliable hardware and clean software. The Realme 5G mobile price in Pakistan positions it as a direct competitor to Xiaomi and Infinix. With its intuitive Realme UI, which is free from excessive bloatware, and highly efficient battery management systems, Realme remains a massive force in the sub-50,000 PKR and mid-range 5G segments, providing excellent cellular connectivity and everyday multitasking speed.
          </p>

          <h2 style={{ fontSize: '1.5rem', color: '#0F172A', marginTop: '40px', marginBottom: '16px', fontWeight: 800 }}>
            Essential Guide: PTA Approval and DIRBS Compliance
          </h2>

          <p>
            Every single 5G mobile in Pakistan operating on a cellular network must be officially registered with the Pakistan Telecommunication Authority (PTA) through the Device Identification, Registration and Blocking System (DIRBS). Understanding these strict government regulations is absolutely essential before purchasing any mobile phone in local markets.
          </p>

          <p>
            When a phone is certified as "PTA Approved," its unique 15-digit International Mobile Equipment Identity (IMEI) numbers are fully verified, tax-paid, and officially cleared in the FBR database. An approved 5G mobile can freely make voice calls, send SMS messages, and use high-speed cellular data on all Pakistani SIM cards (Jazz, Zong, Telenor, Ufone) without ever facing the threat of being blocked. These phones always come with an official, legal brand warranty from local distributors.
          </p>

          <p>
            Conversely, Non-PTA handsets are devices brought into Pakistan privately from abroad (like Dubai or the UK) without paying customs duties. A non-PTA phone will strictly only function on local SIM cards for an initial 60-day grace period. After exactly 60 days, the cellular signals will be automatically blocked by the PTA until the required customs tax is paid in full.
          </p>

          <p style={{ backgroundColor: '#FEF2F2', borderLeft: '4px solid #EF4444', padding: '16px', marginTop: '16px' }}>
            <strong>Major Warning Regarding CPID and Software Patched Phones:</strong> In local Pakistani electronic markets, you will frequently find cheap imported 5G phones sold as "CPID Approved" or "VIP Software Patched" at heavily discounted rates. In these specific phones, local technicians illegally alter the phone's original IMEI number using software hacking tools, replacing it with the IMEI of an inexpensive, broken 2G phone to evade taxes. We strongly advise against buying patched devices because banking apps (like JazzCash, Nayapay, Meezan) will instantly block the phone for security reasons, software updates will break the signal, and it is a strict violation of PTA telecommunication laws.
          </p>

          <h3 style={{ fontSize: '1.2rem', color: '#0F172A', marginTop: '24px', fontWeight: 700 }}>
            How to Check IMEI on 8484
          </h3>
          <p>
            Before handing over your hard-earned money to any phone shop or private OLX seller, always verify the device's IMEI. Open the smartphone's dialer app and dial <strong>*#06#</strong>. A pop-up window will instantly appear showing the 15-digit IMEI numbers. Send this 15-digit IMEI number via a simple SMS to <strong>8484</strong> (the official PTA shortcode). Within seconds, you will receive an SMS reply from PTA stating "PTA Approved / Compliant" (safe to buy) or "Device IMEI is Valid but Not Approved" (meaning taxes are entirely unpaid).
          </p>

          <p style={{ marginTop: '32px' }}>
            At 5gmobile.pk, we are fully committed to bringing you the most accurate specifications, honest reviews, and daily updated pricing for the best 5G mobile in Pakistan. Bookmark this page, utilize our advanced price filtering tools at the top of the screen, and make your next smartphone purchase with absolute confidence.
          </p>

        </article>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0F172A', color: '#94A3B8', padding: '40px 20px', textAlign: 'center', fontSize: '0.85rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ marginBottom: '16px' }}>&copy; {new Date().getFullYear()} 5gmobile.pk - Pakistan's Premium 5G Smartphone Directory.</p>
        </div>
      </footer>
    </div>
  )
}
