import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Ensure the generated + base Prisma clients are bundled for the workerd
  // runtime so OpenNext can patch the wasm query compiler (avoids the runtime
  // "Wasm code generation disallowed by embedder" error on Cloudflare Workers).
  serverExternalPackages: ["@prisma/client", ".prisma/client"],
};

export default withNextIntl(nextConfig);

initOpenNextCloudflareForDev();
