import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./lib/login/manage-login";

// foi necessario alterar o nome da função de middleware para proxy

export async function proxy(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname.startsWith("/admin/login");
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");
  const isGetRequest = request.method === "GET";

  const shouldBeRedirected = isAdminPage && !isLoginPage;

  console.log("shouldBeRedirected", shouldBeRedirected);

  if (!shouldBeRedirected) {
    return NextResponse.next();
  }

  const jwtSession = request.cookies.get(
    process.env.LOGIN_COOKIE_NAME || "login_session",
  )?.value;
  const isAuthenticated = await verifyJwt(jwtSession);

  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};
