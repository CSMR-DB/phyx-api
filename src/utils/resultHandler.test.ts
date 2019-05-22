import { resultHandler } from './resultHandler'

describe('ResultHandler', () => {
  const resultHandlerErrorBoolean = resultHandler<boolean | Error>({
    true: () => true,
    [Error.name]: () => {
      throw new Error('Error value for option that throws an error')
    }
  })

  const resultHandlerNumber = resultHandler<number>({
    '1': () => true,
    '2': () => {
      throw new Error('Error value for option that throws an error')
    }
  })

  test('Returns a value provided in the results scenarios', () => {
    expect(resultHandlerNumber.handle(1)).toEqual(true)
  })

  test('Can throw an error', () => {
    const TE = new Error('test')

    expect(() => resultHandlerErrorBoolean.handle(TE)).toThrow()
  })
})
