export const metadata = {
  title: '5gmobile.pk | Best 5G Phones in Pakistan',
  description: 'Specifications and prices for 5G phones in Pakistan',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'sans-serif' }}>{children}</body>
    </html>
  )
}
