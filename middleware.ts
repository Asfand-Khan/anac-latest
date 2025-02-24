// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("anac-token")?.value;
//   console.log("Token:", token);

//   const publicRoutes = ["/login", "/forgot-password", "/otp"];
//   const pathname = request.nextUrl.pathname;

//   if (token && publicRoutes.includes(pathname)) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   if (!token && !publicRoutes.includes(pathname)) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };


import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("anac-token")?.value;
  const pathname = request.nextUrl.pathname;

  const publicRoutes = ["/login", "/forgot-password", "/otp"];
  const isPublicRoute = publicRoutes.includes(pathname);
  const isPublicAsset = pathname.startsWith("/images") || pathname.startsWith("/public");

  console.log("Token:", token, "Pathname:", pathname);

  // Allow public assets without token
  if (isPublicAsset) {
    return NextResponse.next();
  }

  // Redirect authenticated users from public routes to home
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users to login for protected routes
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};