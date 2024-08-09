import chalk from 'chalk'

const NEWLINE = '\n'
const SPACE = ' '

interface RowOpt {
  views?: ViewObj[]
  contents?: string[]
  align?: 'left' | 'center' | 'right'
  padding?: [number, number, number, number]
  background?: string
  border?: boolean
  borderWidth?: number
  borderColor?: string
  borderStyle?: 'solid' | 'dashed' | 'dotted'
  gap?: number
}

interface ViewOpt {
  width?: number
  padding?: [number, number, number, number]
  background?: string
  border?: boolean
  borderWidth?: number
  borderColor?: string
  borderStyle?: 'solid' | 'dashed' | 'dotted'
  align?: 'left' | 'center' | 'right'
  content: string
}

interface ViewObj {
  content: string
  width: number
  height: number
  padding?: [number, number, number, number]
}

export function Row(opt: RowOpt) {
  const { views, contents, align, padding = [0, 0, 0, 0], gap = 0, background, border, borderWidth, borderColor, borderStyle } = opt
  if (!views && !contents) {
    return
  }
  const [top, right, bottom, left] = padding

  if (contents) {
    let res = ''
    const line = contents.reduce((str, content, index) => {
      const isLast = index === contents.length - 1
      return str + getBgStr(SPACE.repeat(left + content.length), background) + (isLast ? '' : SPACE.repeat(gap))
    }, '') + NEWLINE

    if (padding?.[0]) {
      res += line.repeat(padding[0])
    }

    if (padding?.[2]) {
      res += line.repeat(padding[2])
    }

    console.log(res)
  }
}

function getBgStr(res: string, bg?: string) {
  return bg ? chalk.bgHex(bg)(res) : res
}

export function View(opt: ViewOpt): ViewObj {
  const { width, padding, align = 'left', background, border, borderColor, borderStyle, borderWidth, content } = opt
  console.log(content, content.length, content.split('&sp;'))

  let res = ''

  const measureWidth = width || content.length + (padding?.[1] || 0) + (padding?.[3] || 0)
  const line = getBgStr(SPACE.repeat(measureWidth) + NEWLINE, background)

  if (padding?.[0]) {
    res += line.repeat(padding[0])
  }

  if (align === 'left') {
    res = res + SPACE.repeat((padding?.[3] || 0)) + content.padEnd(measureWidth - (padding?.[3] || 0), SPACE)
  }
  else if (align === 'center') {
    const restWidth = (measureWidth - content.length) / 2
    res += SPACE.repeat(Math.ceil(restWidth)) + content + SPACE.repeat(Math.floor(restWidth))
  }
  else {
    res = res + content.padStart(measureWidth - (padding?.[1] || 0), SPACE) + SPACE.repeat((padding?.[1] || 0))
  }

  res += NEWLINE

  if (padding?.[2]) {
    res += line.repeat(padding[2])
  }

  return {
    content: res,
    width: measureWidth,
    height: (padding?.[0] || 0) + content ? 1 : 0 + (padding?.[2] || 0),
    padding,
  }
}

export function table() {

}

// View({
//   content: 'hello world',
//   //   width: 20,
//   padding: [1, 1, 5, 30],
//   background: '#123456',
//   border: true,
//   borderColor: '#000',
//   borderStyle: 'solid',
//   borderWidth: 1,
//   align: 'left',
// })

Row({
  contents: ['col1', 'col2', 'col3', 'col4'],
  padding: [1, 1, 1, 1],
  background: '#123456',
  gap: 1,
})
