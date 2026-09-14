import { defineConfig } from 'sanity'
import { schema } from './sanity/schema'

export default defineConfig({
  basePath: '/studio',
  projectId: 'e1h3j61w',
  dataset: 'production',
  title: '5gmobile Admin',
  schema: { types: schema.types },
})
