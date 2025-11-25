export default function defineConfig(...configs) {
  let cfg = { plugins: [] }
  if (!Array.isArray(configs) || configs.length === 0) {
    throw new Error('configs must be an array of objects')
  }

  try {
    for (const config of configs) {
      const plugins = [...cfg.plugins, ...config.plugins]
      const overrides = [...cfg.overrides, ...config.overrides]
      cfg = { ...cfg, ...config, plugins, overrides }
    }
  } catch {
    return {}
  }

  return cfg
}
