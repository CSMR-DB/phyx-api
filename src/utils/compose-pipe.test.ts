import {compose, pipe} from "./compose-pipe"

const add10: (v: number) => number = (v: number): number => v + 10

const times2: (v: number) => number = (v: number): number => v * 2

// const uppercase: (v: string) => string = (v: string): string =>
//   v.toLocaleUpperCase()

describe("compose()", () => {
  it("should compose functions RTL", () => {
    expect(
      compose(
        add10,
        times2
      )(4)
    ).toBe(18)
  })
})

describe("pipe()", () => {
  it("should pipe functions LTR", () => {
    expect(
      pipe(
        add10,
        times2
      )(4)
    ).toBe(28)
  })
})

// describe("pipe & compose compile time validation using Generics", () => {
//   it("should give a compile time error", () => {
//     expect(
//       pipe(
//         add10,
//         times2,
//         uppercase // <-- errors as expected. Consider adding a runtime implementation.
//       )(4)
//     ).toBe(null)
//   })
// })
