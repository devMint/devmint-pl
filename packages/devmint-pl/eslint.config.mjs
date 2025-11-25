import { defineConfig } from "@devmint/config-eslint";
import astro from "@devmint/config-eslint/astro";
import config from "@devmint/config-eslint/base";

export default defineConfig(
  {
    ignores: [
      "**/.astro/**",
      "**/.cache/**",
      "**/.wireit/**",
      "**/dist/**",
      "**/node_modules/**",
    ],
  },
  ...config,
  ...astro,
);
