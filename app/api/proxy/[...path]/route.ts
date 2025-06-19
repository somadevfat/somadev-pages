import { NextRequest, NextResponse } from 'next/server';

// API ベース URL を解決
// 優先順位: 1) サーバサイド専用 (container / Vercel) 2) フロントエンド公開変数 3) dev 環境デフォルト
const API_BASE =
  process.env.API_BASE_URL_INTERNAL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'http://backend:8080/api';

function buildHeaders(req: NextRequest): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = req.cookies.get('token')?.value;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
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

  // Handle Set-Cookie headers properly for multiple values
  // Use getSetCookie() if available (Next.js 15+ / Edge Runtime)
  if (typeof backendRes.headers.getSetCookie === 'function') {
    const cookies = backendRes.headers.getSetCookie();
    for (const cookie of cookies) {
      headers.append('set-cookie', cookie);
    }
  } else {
    // Fallback for single Set-Cookie header
    const setCookieHeader = backendRes.headers.get('set-cookie');
    if (setCookieHeader) {
      headers.set('set-cookie', setCookieHeader);
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
  const backendRes = await fetch(url, { headers: buildHeaders(req) });
  return forwardResponse(backendRes);
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  const targetPath = params.path.join('/');
  const url = `${API_BASE}/${targetPath}`;
  const body = await req.text();
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