import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

type ImagePresetCallback = (input: sharp.Sharp, output: string) => Promise<sharp.OutputInfo>

type ImagePreset = {
  name: string
  media: string
  presets: ImagePresetCallback[]
}

const coverSmall: ImagePreset = {
  name: 'cover-sm',
  media: '(max-width: 768px)',
  presets: [
    (input, output) => input.resize(450).toFormat('avif', { quality: 100 }).toFile(`${output}-cover-sm.avif`),
    (input, output) => input.resize(450).toFormat('webp', { quality: 100 }).toFile(`${output}-cover-sm.webp`),
    (input, output) => input.resize(450).toFormat('jpg', { quality: 100 }).toFile(`${output}-cover-sm.jpg`),
  ],
}

const coverMedium: ImagePreset = {
  name: 'cover-md',
  media: '(max-width: 1024px)',
  presets: [
    (input, output) => input.resize(768).toFormat('avif', { quality: 100 }).toFile(`${output}-cover-md.avif`),
    (input, output) => input.resize(768).toFormat('webp', { quality: 100 }).toFile(`${output}-cover-md.webp`),
    (input, output) => input.resize(768).toFormat('jpg', { quality: 100 }).toFile(`${output}-cover-md.jpg`),
  ],
}

const coverLarge: ImagePreset = {
  name: 'cover-lg',
  media: '(max-width: 1536px)',
  presets: [
    (input, output) => input.resize(1536).toFormat('avif', { quality: 100 }).toFile(`${output}-cover-lg.avif`),
    (input, output) => input.resize(1536).toFormat('webp', { quality: 100 }).toFile(`${output}-cover-lg.webp`),
    (input, output) => input.resize(1536).toFormat('jpg', { quality: 100 }).toFile(`${output}-cover-lg.jpg`),
  ],
}

const opengraph: ImagePreset = {
  name: 'opengraph',
  media: '',
  presets: [
    (input, output) =>
      input.resize(1200, 630, { fit: 'cover' }).toFormat('png', { quality: 100 }).toFile(`${output}-opengraph.png`),
  ],
}

await generate('public/raw/hidden-cost-of-dependencies.webp', coverSmall, coverMedium, coverLarge, opengraph)

/**
 * Generates multiple versions of an input image using the provided presets.
 * Each preset can transform the image (e.g. resize, change format, adjust quality)
 * and save it to a new file.
 *
 * @param input - Path to the source image file
 * @param presets - Array of image transformation presets to apply
 *
 * @example
 * ```ts
 * // Generate multiple sizes and formats of a cover image
 * await generate('public/assets/raw/cover.webp', [
 *   // Generate small AVIF
 *   (input, output) => input
 *     .resize(450)
 *     .toFormat('avif', { quality: 100 })
 *     .toFile(`${output}-sm.avif`),
 *
 *   // Generate medium WebP
 *   (input, output) => input
 *     .resize(768)
 *     .toFormat('webp', { quality: 100 })
 *     .toFile(`${output}-md.webp`)
 * ])
 * ```
 */
async function generate(input: string, ...presets: ImagePreset[]) {
  const { name } = path.parse(input)
  const image = sharp(input)
  const metadata = await image.metadata()

  const reduced: Record<string, { width: number; height: number; type: string }[]> = {}

  /**
   * Generate fallback image. Fallback doesn't contain url but only base64 encoded image.
   */
  const fallbackMetadata = await image.resize(14).metadata()
  const fallback = await image.resize(14).toBuffer()

  for (const { name: presetName, presets: configs, media } of presets) {
    const output = `public/assets/${name}`
    const results = await Promise.all(configs.map((cfg) => cfg(image, output)))

    reduced[presetName] = results.map((result) => ({
      width: result.width,
      height: result.height,
      type: `image/${result.format}`,
      src: `/${output.replace('public/', '')}-${presetName}.${result.format}`,
      media,
    }))
  }

  const tsFile = `
    type Preset = ${presets.map((p) => `'${p.name}'`).join(' | ')};

    type Image = {
      image: {
        img: {
          h: number
          w: number
          src: string
        }
        sources: { 
          srcSet: string
          media?: string
          type: string
        }[]
      }
      fallback?: {
        lqip: string
        width: number
        height: number
        src: string
      }
    }

    export const metadata = ${JSON.stringify(reduced)};\n

    export const original = ${JSON.stringify({
      width: metadata.width,
      height: metadata.height,
      type: `image/${metadata.format}`,
      src: input.replace('public/', '/'),
    })}

    export const fallback = 'data:image/${metadata.format};base64,${fallback.toString('base64')}';

    export function build(...presets: Preset[]): Image {
      return {
        image: {
          img: ${JSON.stringify({ w: metadata.width, h: metadata.height, src: input.replace('public/', '/') })},
          sources: Object.keys(metadata)
            .filter((key) => presets.includes(key as Preset))
            .flatMap(presetName => metadata[presetName as Preset].map(source => ({
              srcSet: source.src,
              media: source.media,
              type: source.type,
            }))),
        },
        fallback: {
          lqip: fallback,
          width: ${fallbackMetadata.width},
          height: ${fallbackMetadata.height},
          src: ${JSON.stringify(input.replace('public/', '/'))}
        }
      }
    }
  `

  await fs.writeFile(`${import.meta.dirname}/../app/assets/${name}.ts`, tsFile, { flag: 'a+' })
}
