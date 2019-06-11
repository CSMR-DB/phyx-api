# PHYX-API

This application serves as a GraphQL API server to a (yet-to-develop) app. It is not complete! It is powered by GraphQL, Apollo Server and Mongoose and built with ❤️ and TypeScript. I try to focus more and more on Separation of Concerns / Single Responsibility, thus much of the code is likely to change at any point.

## Getting started

Clone this repo, followed by installation of all dependencies.

```
npm install
```

To be able to run tests, this app uses Jest. Make sure you have it installed globally.

```
npm i -g jest
```

Install MongoDB (https://www.mongodb.com/download-center/community?jmp=docs), following the docs for your OS. Optionally also install Compass. This installation is required to run the tests regarding the Mongoose models.

Now you should be able to run tests using

```
npm run test:watchAll
```

Or run the app itself, opening up a GraphiQL GUI in the browser at localhost:4000

```
npm run serve
```

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
