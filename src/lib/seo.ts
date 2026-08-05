const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://canaan11.netlify.app";

export const canonical = (path = "/") => `${BASE}${path === "/" ? "/" : path}`;