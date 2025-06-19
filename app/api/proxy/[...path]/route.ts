import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.API_BASE_URL_INTERNAL || 'http://backend:8080/api';

function buildHeaders(req: NextRequest): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = req.cookies.get('token')?.value;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // デバッグログ追加
  console.log('🔧 buildHeaders:', {
    hasToken: !!token,
    tokenLength: token ? token.length : 0,
    headers: Object.keys(headers)
  });
  
  return headers;
}

async function forwardResponse(backendRes: Response): Promise<NextResponse> {
  const data = await backendRes.text();
  const headers = new Headers();

  // Copy essential headers from the backend response
  const contentType = backendRes.headers.get('Content-Type');
  if (contentType) {
    headers.set('Content-Type', contentType);
  }

  // Specifically handle and forward all Set-Cookie headers as an array
  const responseHeaders = backendRes.headers as Headers & { getSetCookie?: () => string[] };
  const setCookieHeaders = responseHeaders.getSetCookie
    ? responseHeaders.getSetCookie()
    : responseHeaders.get('set-cookie');

  // デバッグログ追加
  console.log('🍪 forwardResponse Cookie処理:', {
    backendStatus: backendRes.status,
    hasCookieHeaders: !!setCookieHeaders,
    cookieHeaders: setCookieHeaders,
    allBackendHeaders: Array.from(backendRes.headers.entries())
  });

  if (setCookieHeaders) {
    if (Array.isArray(setCookieHeaders)) {
      setCookieHeaders.forEach((cookie) => {
        headers.append('set-cookie', cookie);
        console.log('🍪 Appending cookie:', cookie);
      });
    } else if (typeof setCookieHeaders === 'string') {
      headers.set('set-cookie', setCookieHeaders);
      console.log('🍪 Setting cookie:', setCookieHeaders);
    }
  }

  return new NextResponse(data, {
    status: backendRes.status,
    headers: headers,
  });
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const targetPath = params.path.join('/');
  const url = `${API_BASE}/${targetPath}${req.nextUrl.search}`;
  console.log('🚀 GET proxy request:', { targetPath, url });
  const backendRes = await fetch(url, { headers: buildHeaders(req) });
  return forwardResponse(backendRes);
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  const targetPath = params.path.join('/');
  const url = `${API_BASE}/${targetPath}`;
  const body = await req.text();
  console.log('🚀 POST proxy request:', { targetPath, url, bodyLength: body.length });
  const backendRes = await fetch(url, { method: 'POST', body, headers: buildHeaders(req) } as RequestInit);
  return forwardResponse(backendRes);
}

export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
  const targetPath = params.path.join('/');
  const url = `${API_BASE}/${targetPath}`;
  const body = await req.text();
  const backendRes = await fetch(url, { method: 'PUT', body, headers: buildHeaders(req) } as RequestInit);
  return forwardResponse(backendRes);
}

export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) {
  const targetPath = params.path.join('/')
  const url = `${API_BASE}/${targetPath}`;
  const backendRes = await fetch(url, { method: 'DELETE', headers: buildHeaders(req) } as RequestInit);
  return forwardResponse(backendRes);
} 