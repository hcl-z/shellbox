import stringWidth from 'string-width'
import type { Padding } from '../utils'
import { getBgStr, getColorStr, getPadding, padAround, padEnd, padStart, repeatArr } from '../utils'
import { NEWLINE, SPACE, borderMap } from '../const'
import type { BaseStyle } from '..'

export interface ViewOpt extends BaseStyle {
  /** text align */
  textAlign?: 'left' | 'center' | 'right'
  /** text Content(default ' ') */
  content?: string
}

export interface ViewObj {
  content: string
  width: number
  height: number
  padding?: Padding
  rows: string[]
  border: boolean
  render: () => void
}
export function View(opt: ViewOpt): ViewObj {
  const { width, padding, textAlign = 'left', background, border = false, borderColor = '#fff', borderStyle = 'single', content = ' ' } = opt

  let rows: string[] = []
  const { left, right, top, bottom } = getPadding(padding)
  const len = stringWidth(content.split(NEWLINE).sort((a, b) => stringWidth(b) - stringWidth(a))[0])
  const measureWidth = width || (len + left + right + (border ? 2 : 0))
  const innerWidth = width ? width - left - right - (border ? 2 : 0) : len

  const contentRows = content.split(NEWLINE).reduce((rows, str) => {
    if (width && stringWidth(str) > innerWidth) {
      const regex = new RegExp(`.{1,${innerWidth}}`, 'g')
      rows.push(...str.match(regex) || [])
    }
    else {
      rows.push(str)
    }
    return rows
  }, [] as string[])

  const line = SPACE.repeat(border ? measureWidth - 2 : measureWidth)

  if (top) {
    rows.push(...repeatArr(line, top))
  }

  contentRows.forEach((slice) => {
    if (textAlign === 'left') {
      rows.push(SPACE.repeat(left) + padEnd(slice, innerWidth, SPACE) + SPACE.repeat(right))
    }
    else if (textAlign === 'center') {
      rows.push(SPACE.repeat(left) + padAround(slice, innerWidth, SPACE) + SPACE.repeat(right))
    }
    else {
      rows.push(SPACE.repeat(left) + padStart(slice, innerWidth, SPACE) + SPACE.repeat(right))
    }
  })

  if (bottom) {
    rows.push(...repeatArr(line, bottom))
  }

  if (border) {
    const { top, bottom, left, right, topLeft, topRight, bottomLeft, bottomRight } = typeof borderStyle === 'string' ? borderMap[borderStyle] : borderStyle

    const topBorder = getColorStr(topLeft + top.repeat(measureWidth - 2) + topRight, borderColor)
    const bottomBorder = getColorStr(bottomLeft + bottom.repeat(measureWidth - 2) + bottomRight, borderColor)

    rows = [topBorder, ...rows.map((row) => {
      return getColorStr(left, borderColor) + getBgStr(row, background) + getColorStr(right, borderColor)
    }), bottomBorder]
  }
  else {
    rows = rows.map((row) => {
      return getBgStr(row, background)
    })
  }
  const res = rows.join(NEWLINE)
  return {
    content: res,
    width: measureWidth,
    height: top + bottom + (border ? 2 : 0) + contentRows.length,
    border,
    padding,
    rows,
    render: () => {
      console.log(res)
    },
  }
}
