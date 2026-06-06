import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig({});

// `npm run build` runs `opennextjs-cloudflare build`, which in turn runs the
// framework build via this command. Point it at the Next build (webpack) so we
// don't recurse back into `npm run build`.
config.buildCommand = "npm run build:next";

export default config;
