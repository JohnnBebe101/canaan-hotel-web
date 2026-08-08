import { SITE_URL } from "@/lib/site";

export const canonical = (path = "/") => `${SITE_URL}${path === "/" ? "/" : path}`;