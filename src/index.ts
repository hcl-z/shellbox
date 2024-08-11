import type { Padding } from './utils'
import type { borderMap } from './const'
import { View, type ViewObj, type ViewOpt } from './ui/view'
import { Table, type TableOpt } from './ui/table'
import { Row, type RowOpt } from './ui/row'
import { List, type ListOpt } from './ui/list'

export interface BorderStyle {
  topLeft: string
  top: string
  topRight: string
  right: string
  bottomRight: string
  bottom: string
  bottomLeft: string
  left: string
  leftMiddle?: string
  rightMiddle?: string
  topMiddle?: string
  bottomMiddle?: string
  middleMiddle?: string
}

export interface BaseStyle {
  /** view width */
  width?: number
  /** view background */
  background?: string
  /** show view border */
  border?: boolean
  /** view border color */
  borderColor?: string
  /** view border style */
  borderStyle?: keyof typeof borderMap | BorderStyle
  /** view padding */
  padding?: Padding
}

export {
  ViewOpt,
  RowOpt,
  ListOpt,
  TableOpt,
}
export default {
  View,
  Row,
  List,
  Table,
}
