import type { BorderStyle } from '..'
import type { borderMap } from '../const'
import type { ListOpt } from './list'
import { List } from './list'

export interface TableOpt extends Omit<ListOpt, 'contents'> {
  /** table data */
  data: string[][]
  borderStyle?: keyof typeof borderMap | BorderStyle & {
    leftMiddle: string
    rightMiddle: string
    topMiddle: string
    bottomMiddle: string
    middleMiddle: string
  }
}
export function Table(opt: TableOpt) {
  const { data, ...listOpt } = opt
  const rows = data.map((cell) => {
    return List({
      contents: cell,
      ...listOpt,
    })
  })

  return List({ ...listOpt, _views: rows, contents: [], direction: 'vertical' })
}
