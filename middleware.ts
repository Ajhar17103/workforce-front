import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This assumes you store permissions in cookies/session after login
// You can adapt to fetch from API or JWT payload

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Example: you might have permissions in cookies
  const rawPerms = req.cookies.get('permissions')?.value;
  if (!rawPerms) return NextResponse.next();

  const permissions = JSON.parse(rawPerms);
  const hasView = permissions.some(
    (perm: any) => perm.path === pathname && perm.view,
  );

  if (!hasView) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/master-data/:path*'],
};
