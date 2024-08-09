import process from 'node:process'

export function getCliWidth(defaultSize: [number, number]) {
  return [process.stdout.rows || defaultSize[0], process.stdout.columns || defaultSize[1]]
}
