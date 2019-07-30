import fs from 'fs'
import { GraphQLSchema } from 'graphql'

type FeatureModule = { default: { schema: GraphQLSchema; context?: Object } }

export type ImportFeaturesObject = {
  featureSchemas: GraphQLSchema[]
  featureContexts: Object[]
}

export async function importFeatures(): Promise<ImportFeaturesObject> {
  const featureFolders: string[] = await fs.readdirSync('src/features', 'utf8')

  const featureSchemas: GraphQLSchema[] = []
  const featureContexts: Object[] = []

  await featureFolders.map((folder: string) => {
    import(`~src/features/${folder}`)
      .then((module: FeatureModule) => {
        const schema: GraphQLSchema = module.default.schema
        const context: Object | undefined = module.default.context

        featureSchemas.push(schema)
        context && featureContexts.push(context)
      })
      .catch((error: Error) => {
        throw error
      })
  })

  return await { featureSchemas, featureContexts }
}
