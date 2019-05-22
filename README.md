# VALIDATORS

Validators are expected to expose an 'execute()' method returning a boolean. Some Validators are more generic, while others are more specialized. In this case, there are generic Validators for items and sides (taking in a helper to reduce the data to the expected format)

Validators have the following contract:

```
interface IValidator {
  execute(): boolean
}
```

They always rely on the ENTIRE Strategy 'Document'. More specialized Validators, such as a CostValidator for CSGO, can be added to the Validation sequence. As long as they expose an 'execute()' method returning a boolean, of course.

## GraphQL

Visit [GraphQLUrl]

Where a `Validator` relies on validating the submitted values provided in the incoming object, GraphQL is used for basic typechecking. Since Typescript has no runtime benefits, type-checking in `.ts` files is to be used for compile-time type-checking only.

> Some runtime type-checking could be implemented using a package like io-ts, as far as I know. Currently I prefer havind a smaller package.json ánd I consider type-checking via GraphQL sufficient for this API. But it could be a viable option.

[graphqlurl]: https://graphql.org/
