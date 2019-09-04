import fs from 'fs'

export function getGQLTypes(path: string): string {
  return fs.readFileSync(path, 'utf8')
}