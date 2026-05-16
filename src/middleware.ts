import { defineMiddleware } from "astro:middleware";

const SECURITY_HEADERS: Record<string, string> = {
	"X-Frame-Options": "DENY",
	"X-Content-Type-Options": "nosniff",
	"Referrer-Policy": "strict-origin-when-cross-origin",
	"Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

// Applied to all public routes; excluded from /_emdash/ admin to avoid
// breaking the CMS UI (which may require relaxed CSP for its editor).
export const onRequest = defineMiddleware(async (context, next) => {
	const response = await next();

	const { pathname } = context.url;
	if (pathname.startsWith("/_emdash")) {
		return response;
	}

	const headers = new Headers(response.headers);
	for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
		headers.set(key, value);
	}

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers,
	});
});

