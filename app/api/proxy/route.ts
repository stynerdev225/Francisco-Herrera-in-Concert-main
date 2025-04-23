// app/api/proxy/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get the URL from the query parameter
    const url = request.nextUrl.searchParams.get('url');
    
    if (!url) {
      return new NextResponse('URL parameter is required', { status: 400 });
    }
    
    // Fetch the resource from the original URL
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });
    
    if (!response.ok) {
      return new NextResponse(`Error fetching resource: ${response.statusText}`, { 
        status: response.status 
      });
    }
    
    // Get the ArrayBuffer from the response
    const buffer = await response.arrayBuffer();
    
    // Get the content type from the original response
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    
    // Create response with proper headers
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*'
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse(`Proxy error: ${error instanceof Error ? error.message : 'Unknown error'}`, { 
      status: 500 
    });
  }
}