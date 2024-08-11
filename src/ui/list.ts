import stripAnsi from 'strip-ansi'
import type { borderMap } from '../const'
import { DefaultStyle, NEWLINE, SPACE } from '../const'
import type { BaseStyle, BorderStyle } from '..'
import { getBorderStyle } from '../utils'
import type { ViewObj } from './view'
import { View } from './view'

export interface ListOpt extends BaseStyle {
  /** list contents */
  contents: string[]
  /** list direction */
  direction?: 'vertical' | 'horizontal'
  /** list text align */
  textAlign?: 'left' | 'center' | 'right'
  _views?: ViewObj[]
  borderStyle?: keyof typeof borderMap | BorderStyle & {
    leftMiddle: string
    rightMiddle: string
    topMiddle: string
    bottomMiddle: string
    middleMiddle: string
  }
}

export function List(opt: ListOpt) {
  const { contents, _views = [], direction = 'horizontal', ...viewOpt } = { ...DefaultStyle, ...opt } as ListOpt

  const views = [...contents.map((content) => {
    const v = View({ content, ...viewOpt })
    return v
  }), ..._views]

  const rows: string[] = []
  if (direction === 'horizontal') {
    for (let i = 0; i < views[0].height; i++) {
      const isBorderRow = i === 0 || i === views[0].height - 1
      let res = ''
      views.forEach((view, index) => {
        const isLast = index === views.length - 1
        const isFirst = index === 0
        if (opt.border) {
          let middleRow = view.rows?.[i]
          const { topMiddle, bottomMiddle, bottomRight, topRight } = getBorderStyle(viewOpt.borderStyle)
          if (!isLast && isBorderRow) {
            middleRow = middleRow?.replace(topRight, topMiddle).replace(bottomRight, bottomMiddle)
          }
          if (!isFirst) {
            middleRow = middleRow?.replace(stripAnsi(middleRow)?.[0], '')
          }
          res = res + (middleRow || SPACE.repeat(view.width))
        }
        else {
          res += (view.rows?.[i] || SPACE.repeat(view.width))
        }
      })
      rows.push(res)
    }
  }
  else {
    views.forEach((view, index) => {
      const isLast = index === views.length - 1
      const isFirst = index === 0
      if (opt.border) {
        const { leftMiddle, rightMiddle, bottomLeft, bottomRight, middleMiddle, bottomMiddle } = getBorderStyle(viewOpt.borderStyle)
        const middleRow = isLast ? view.rows.at(-1) : view.rows.at(-1)?.replace(bottomLeft, leftMiddle).replace(bottomRight, rightMiddle).replaceAll(bottomMiddle, middleMiddle)
        rows.push(...view.rows.slice(isFirst ? 0 : 1, -1), middleRow || '')
      }
      else {
        rows.push(...view.rows)
      }
    })
  }
  return {
    rows,
    width: views[0].width,
    height: rows.length,
    border: viewOpt.border,
    padding: viewOpt.padding,
    render: () => {
      console.log(rows.join(NEWLINE))
    },
  } as ViewObj
}
