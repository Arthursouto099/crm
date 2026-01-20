import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const public_routes: {
  path: string;
  whenAuthenticated: "redirect" | "next";
}[] = [
  { path: "/sign", whenAuthenticated: "redirect" },
  { path: "/signup", whenAuthenticated: "redirect" },
  { path: "/auth.jpg", whenAuthenticated: "next" },
  { path: "/logo_.png", whenAuthenticated: "next" },

  // {path: '/sign', whenAuthenticated: 'redirect'},
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign";

function base64UrlToString(input: string) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = "=".repeat((4 - (base64.length % 4)) % 4);
  return atob(base64 + pad);
}

function isExpired(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) return true;

  const payload = JSON.parse(base64UrlToString(parts[1]));
  const exp = payload?.exp;

  if (typeof exp !== "number") return true;

  // exp vem em segundos; Date.now() em ms
  return Date.now() >= exp * 1000;
}

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = public_routes.find((route) => route.path === path);
  const auth_token = request.cookies.get("access_token");
  const token = auth_token?.value;
  const expired = token ? isExpired(token) : true;

  if (!auth_token && publicRoute) {
    return NextResponse.next();
  }

  if ((!token || expired) && !publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;
    const res = NextResponse.redirect(redirectUrl);

    if (token && expired) {
      res.cookies.set("access_token", "", { path: "/", maxAge: 0 });
    }

    return res;
  }

  if (
    auth_token &&
    publicRoute &&
    publicRoute.whenAuthenticated === "redirect"
  ) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  if (auth_token && !publicRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
