import { isValidated } from './isValidated'

describe('isValidated()', () => {
  test('should return true if boolean[] does NOT include false', () => {
    expect(isValidated([ true, true, true ])).toEqual(true)

    expect(isValidated([ true, false, true ])).toEqual(false)
  })
})
