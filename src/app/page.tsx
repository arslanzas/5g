import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'e1h3j61w',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

interface Phone {
  _id: string
  title: string
  price: number
  has5G: boolean
}

export default async function HomePage() {
  const phones: Phone[] = await client.fetch(
    `*[_type == "phone"]{ _id, title, price, has5G }`
  )

  return (
    <main style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'sans-serif', padding: '0 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>5gmobile.pk</h1>
        <p style={{ color: '#666' }}>Pakistan's 5G Smartphone Directory</p>
        <a href="/studio" style={{ color: '#0066cc', fontSize: '0.9rem' }}>
          Go to Admin Studio &rarr;
        </a>
      </header>

      <section>
        <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Latest Devices</h2>
        
        {phones.length === 0 ? (
          <p>No phones added yet. Add one in <a href="/studio">the Studio</a>!</p>
        ) : (
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginTop: '20px' }}>
            {phones.map((phone) => (
              <div
                key={phone._id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
              >
                <h3 style={{ margin: '0 0 10px 0' }}>{phone.title}</h3>
                <p style={{ margin: '4px 0', fontSize: '1.1rem', fontWeight: 'bold', color: '#111' }}>
                  Rs. {phone.price ? phone.price.toLocaleString() : 'N/A'}
                </p>
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '8px',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    backgroundColor: phone.has5G ? '#e6f4ea' : '#fce8e6',
                    color: phone.has5G ? '#137333' : '#c5221f',
                  }}
                >
                  {phone.has5G ? '5G Ready' : '4G Only'}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
