import { compose, pipe } from './compose-pipe'

const add10: (v: number) => number = (v: number): number => v + 10

const times2: (v: number) => number = (v: number): number => v * 2

const uppercase: (v: string) => string = (v: string): string =>
  v.toLocaleUpperCase()

const removeSymbols: (v: string) => string = (v: string): string =>
  v.replace(/\W/gi, '')

// const trace: <T>(label: string) => (value: T) => T = <T>(
//   label: string
// ): ((value: T) => T) => (value: T): T => {
//   console.log(`${label}: ${value}`)

//   return value
// }

interface IObject {
  name: string
  skill: number
}

interface ILevel {
  level: 'novice' | 'apprentice'
}

const object: IObject = {
  name: 'Mock',
  skill: 6
}

const improveSkill: (obj: IObject) => IObject = (obj: IObject): IObject => {
  obj.skill++

  return obj
}

const levelify: (obj: IObject) => IObject & ILevel = (
  obj: IObject
): IObject & ILevel => {
  return { ...obj, level: obj.skill < 8 ? 'novice' : 'apprentice' }
}

describe('compose()', () => {
  it('should compose functions RTL (number)', () => {
    expect(
      compose(
        add10,
        times2
      )(4)
    ).toBe(18)
  })

  it('should compose functions RTL (string)', () => {
    expect(
      compose(
        removeSymbols,
        // trace('after uppercase'),
        uppercase
      )('abcd1234&*^%')
    ).toBe('ABCD1234')
  })
})

describe('pipe()', () => {
  it('should pipe functions LTR (number)', () => {
    expect(
      pipe(
        add10,
        times2
      )(4)
    ).toBe(28)
  })

  it('should pipe functions LTR (string)', () => {
    expect(
      pipe(
        removeSymbols,
        // trace('after removeSymbols'),
        uppercase
      )('abcd1234&*^%')
    ).toBe('ABCD1234')
  })

  it('should pipe functions LTR (object)', () => {
    expect(
      pipe(
        improveSkill,
        // trace('after improveskill'),
        levelify
      )(object)
    ).toEqual({
      name: 'Mock',
      skill: 7,
      level: 'novice'
    })
  })
})

// describe("pipe & compose compile time validation using Generics", () => {
//   it("should give a compile time error", () => {
//     expect(
//       pipe(
//         add10,
//         times2,
//         uppercase // <-- errors as expected. TODO: add a runtime implementation.
//       )(4)
//     ).toBe(null)
//   })
// })
