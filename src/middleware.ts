import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Allow unrestricted access to Sanity Studio and internal assets
  if (
    pathname.startsWith('/studio') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 2. Serve a modern Maintenance Page with HTTP 503 (SEO-safe)
  return new NextResponse(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>5gmobile.pk | Launching Soon</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: system-ui, -apple-system, sans-serif;
      background-color: #0f172a;
      color: #f8fafc;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
      padding: 24px;
      box-sizing: border-box;
    }
    .badge {
      background: rgba(16, 185, 129, 0.12);
      color: #10b981;
      border: 1px solid #10b981;
      padding: 6px 16px;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 20px;
      display: inline-block;
    }
    h1 {
      font-size: 2.4rem;
      margin: 0 0 12px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    h1 span {
      color: #10b981;
    }
    p {
      color: #94a3b8;
      max-width: 460px;
      font-size: 1.05rem;
      line-height: 1.6;
      margin: 0 0 28px;
    }
    .footer {
      position: absolute;
      bottom: 20px;
      font-size: 0.8rem;
      color: #475569;
    }
    .studio-link {
      color: #334155;
      text-decoration: none;
      font-size: 0.75rem;
    }
    .studio-link:hover {
      color: #64748b;
    }
  </style>
</head>
<body>
  <div class="badge">Under Active Development</div>
  <h1>5G<span>Mobile</span>.pk</h1>
  <p>Pakistan's dedicated 5G smartphone directory is cataloging hardware specs, official PTA approval duties, and reviews. We are going live shortly.</p>
  <div class="footer">
    &copy; 5gmobile.pk &bull; <a href="/studio" class="studio-link">Admin Access</a>
  </div>
</body>
</html>`,
    {
      status: 503,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'Retry-After': '86400',
      },
    }
  )
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
