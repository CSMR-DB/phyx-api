export function sumArray(arr: number[]): number {
  return arr.reduce(
    (previousValue: number, currentValue: number) =>
      previousValue + currentValue,
    0
  )
}
