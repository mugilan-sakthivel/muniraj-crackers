import { readFile } from 'node:fs/promises'
import { basename, join } from 'node:path'
import { createClient } from '@sanity/client'

const token = process.env.SANITY_IMPORT_TOKEN
if (!token) throw new Error('SANITY_IMPORT_TOKEN is required')

const assetsDirectory = join(process.cwd(), 'public', 'reference-images')
const manifest = JSON.parse(await readFile(join(assetsDirectory, 'manifest.json'), 'utf8'))
const client = createClient({ projectId: '8bk97zyk', dataset: 'production', token, apiVersion: '2026-09-18', useCdn: false })

for (const [index, item] of manifest.assets.entries()) {
  const file = join(assetsDirectory, basename(item.path))
  const data = await readFile(file)
  await client.assets.upload('image', data, { filename: item.name, contentType: item.contentType })
  console.log(`[${index + 1}/${manifest.assets.length}] ${item.name}`)
}
