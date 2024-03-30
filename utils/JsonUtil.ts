export function convertNumber(json: any): number | undefined {
  if (json === undefined) {
    return undefined
  }
  
  return parseFloat(json)
}