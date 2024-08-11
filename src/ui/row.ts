import { padArrAround, padArrEnd, padArrStart } from '../utils'
import { NEWLINE, SPACE } from '../const'
import type { BaseStyle } from '..'
import type { ViewObj, ViewOpt } from './view'
import { View } from './view'

export interface RowOpt extends BaseStyle {
  /** row contents,can pass a view or string */
  contents?: (ViewObj | string)[]
  /** gap between contents */
  gap?: number
  /** content style ,only for string content */
  contentStyle?: Omit<ViewOpt, 'content'>
  /** content vertical align */
  alignItems?: 'center' | 'start' | 'end'
}

export function Row(opt: RowOpt) {
  const { contents, alignItems = 'start', contentStyle = {}, gap = 0, ...viewOpt } = opt
  if (!contents || contents.length === 0) {
    return
  }

  let maxHeight = 0
  let maxItem = contents[0]

  const _views = contents.map((view) => {
    if (typeof view === 'string') {
      const v = View({ ...contentStyle, content: view })
      maxHeight = v.height > maxHeight ? v.height : maxHeight
      maxItem = v.height > maxHeight ? v : maxItem
      return v
    }
    else {
      maxHeight = view.height > maxHeight ? view.height : maxHeight
      maxItem = view.height > maxHeight ? view : maxItem
      return view
    }
  }) as (ViewObj & { _rows?: string[] })[]

  const rows: string[] = []

  if (alignItems === 'start') {
    _views.forEach((view) => {
      view._rows = padArrEnd(view.rows, maxHeight, SPACE.repeat(view.width))
    })
  }
  else if (alignItems === 'center') {
    _views.forEach((view) => {
      view._rows = padArrAround(view.rows, maxHeight, SPACE.repeat(view.width))
    })
  }
  else {
    _views.forEach((view) => {
      view._rows = padArrStart(view.rows, maxHeight, SPACE.repeat(view.width))
    })
  }

  for (let i = 0; i < maxHeight; i++) {
    let res = ''
    _views.forEach((view, index) => {
      const isLast = index === _views.length - 1
      res += (view._rows?.[i] || SPACE.repeat(view.width)) + (isLast ? '' : SPACE.repeat(gap))
    })
    rows.push(res)
  }

  return View({ content: rows.join(NEWLINE), ...viewOpt })
}
