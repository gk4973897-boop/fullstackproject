import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "es", "hi", "pt", "zh", "fr"],
  defaultLocale: "en"
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};