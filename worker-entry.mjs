// Persistent Worker entry that wraps the OpenNext-generated worker.
// Adds edge-level HTTPS enforcement, then delegates to the Next.js handler.
// `.open-next/worker.js` is regenerated on every build; this wrapper is stable.
import worker from "./.open-next/worker.js";

export {
  DOQueueHandler,
  DOShardedTagCache,
  BucketCachePurge,
} from "./.open-next/worker.js";

const handler = {
  async fetch(request, env, ctx) {
    // Cloudflare forwards the original scheme via `x-forwarded-proto`.
    // Permanently redirect any plain-HTTP request to its HTTPS equivalent.
    const forwardedProto = request.headers.get("x-forwarded-proto");
    if (forwardedProto && forwardedProto.split(",")[0].trim() === "http") {
      const httpsUrl = new URL(request.url);
      httpsUrl.protocol = "https:";
      return Response.redirect(httpsUrl.toString(), 308);
    }

    return worker.fetch(request, env, ctx);
  },
};

export default handler;
