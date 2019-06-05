import {compose, pipe} from "./compose-pipe"

const add10: (v: number) => number = (v: number): number => v + 10

const times2: (v: number) => number = (v: number): number => v * 2

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
