import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.API_BASE_URL_INTERNAL || 'http://backend:8080/api';

function buildHeaders(req: NextRequest): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = req.cookies.get('token')?.value;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const targetPath = params.path.join('/');
  const url = `${API_BASE}/${targetPath}${req.nextUrl.search}`;
  const backendRes = await fetch(url, { headers: buildHeaders(req) });
  const data = await backendRes.text();
  return new NextResponse(data, { status: backendRes.status, headers: { 'Content-Type': backendRes.headers.get('Content-Type') || 'application/json' } });
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  const targetPath = params.path.join('/');
  const url = `${API_BASE}/${targetPath}`;
  const body = await req.text();
  const backendRes = await fetch(url, { method: 'POST', body, headers: buildHeaders(req) } as RequestInit);
  const data = await backendRes.text();
  return new NextResponse(data, { status: backendRes.status, headers: { 'Content-Type': backendRes.headers.get('Content-Type') || 'application/json' } });
}

export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
  const targetPath = params.path.join('/');
  const url = `${API_BASE}/${targetPath}`;
  const body = await req.text();
  const backendRes = await fetch(url, { method: 'PUT', body, headers: buildHeaders(req) } as RequestInit);
  const data = await backendRes.text();
  return new NextResponse(data, { status: backendRes.status, headers: { 'Content-Type': backendRes.headers.get('Content-Type') || 'application/json' } });
}

export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) {
  const targetPath = params.path.join('/')
  const url = `${API_BASE}/${targetPath}`;
  const backendRes = await fetch(url, { method: 'DELETE', headers: buildHeaders(req) } as RequestInit);
  const data = await backendRes.text();
  return new NextResponse(data, { status: backendRes.status, headers: { 'Content-Type': backendRes.headers.get('Content-Type') || 'application/json' } });
} 