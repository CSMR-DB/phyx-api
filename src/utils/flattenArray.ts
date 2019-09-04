export function flattenArray(arr: any[]): [] {
  return arr.reduce(function (flat: [], toFlatten: []): any[] {
    return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
  }, []);
}