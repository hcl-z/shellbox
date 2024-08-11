import chalk from 'chalk'
import stringWidth from 'string-width'
import { borderMap } from './const'
import type { BorderStyle } from '.'

export type Padding = [number] | [number, number] | [number, number, number] | [number, number, number, number]

export function repeatArr(item: string, len: number) {
  return Array.from({ length: len }).fill(item) as string[]
}

export function padStart(str: string, len: number, pad: string) {
  const rest = len - stringWidth(str)
  if (rest <= 0) {
    return str
  }
  return pad.repeat(rest) + str
}

export function padEnd(str: string, len: number, pad: string) {
  const rest = len - stringWidth(str)
  if (rest <= 0) {
    return str
  }
  return str + pad.repeat(rest)
}

export function padAround(str: string, len: number, pad: string) {
  const rest = (len - stringWidth(str)) / 2
  if (rest <= 0) {
    return str
  }
  return pad.repeat(Math.ceil(rest)) + str + pad.repeat(Math.floor(rest))
}
export function padArrStart(arr: string[], len: number, pad: string) {
  const rest = len - arr.length
  if (rest <= 0) {
    return arr
  }
  return [...repeatArr(pad, rest), ...arr] as string[]
}

export function padArrEnd(arr: string[], len: number, pad: string) {
  const rest = len - arr.length
  if (rest <= 0) {
    return arr
  }
  return [...arr, ...repeatArr(pad, rest)] as string[]
}

export function padArrAround(arr: string[], len: number, pad: string) {
  const rest = (len - arr.length) / 2
  if (rest <= 0) {
    return arr
  }
  return [...repeatArr(pad, Math.ceil(rest)), ...arr, ...repeatArr(pad, Math.floor(rest))] as string[]
}

export function getPadding(padding?: Padding) {
  if (padding?.length === 1) {
    const pd = padding[0] > 0 ? padding[0] : 0
    return {
      left: pd,
      right: pd,
      top: pd,
      bottom: pd,
    }
  }
  else if (padding?.length === 2) {
    const pdV = padding[0] > 0 ? padding[0] : 0
    const pdH = padding[1] > 0 ? padding[1] : 0
    return {
      left: pdH,
      right: pdH,
      top: pdV,
      bottom: pdV,
    }
  }
  else if (padding?.length === 3) {
    const pdT = padding[0] > 0 ? padding[0] : 0
    const pdH = padding[1] > 0 ? padding[1] : 0
    const pdB = padding[2] > 0 ? padding[2] : 0
    return {
      left: pdH,
      right: pdH,
      top: pdT,
      bottom: pdB,
    }
  }
  else if (padding?.length === 4) {
    const pdT = padding[0] > 0 ? padding[0] : 0
    const pdR = padding[1] > 0 ? padding[1] : 0
    const pdB = padding[2] > 0 ? padding[2] : 0
    const pdL = padding[3] > 0 ? padding[3] : 0
    return {
      left: pdL,
      right: pdR,
      top: pdT,
      bottom: pdB,
    }
  }
  else {
    return {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    }
  }
}

export function getBorderStyle<T extends BorderStyle>(borderStyle?: (keyof typeof borderMap) | T) {
  if (typeof borderStyle === 'string') {
    return borderMap[borderStyle]
  }
  else {
    return borderStyle || {} as T
  }
}
export function getBgStr(res: string, bg?: string) {
  return bg ? chalk.bgHex(bg)(res) : res
}
export function getColorStr(str: string, color?: string) {
  return color ? chalk.hex(color).bold(str) : str
}
