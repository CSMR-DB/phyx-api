import { importFeatures } from './importFeatures'

describe('importFeatures', () => {
  test('should import feature index files at the root of each feature folder', async () => {
    await importFeatures().then(({ featureSchemas, featureContexts }: any) => {
      expect(featureContexts[0].hasOwnProperty('csgoGraphQLService')).toEqual(
        true
      )
      expect(featureSchemas[0].hasOwnProperty('_typeMap')).toEqual(true)
    })
  })
})
