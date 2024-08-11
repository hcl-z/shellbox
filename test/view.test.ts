import type { ViewOpt } from '../src/ui/view'
import { View } from '../src/ui/view'

describe('view function', () => {
  const consoleSpy = vi.spyOn(console, 'log')

  afterAll(() => {
    consoleSpy.mockReset()
  })

  it('should return default options', () => {
    const opt: ViewOpt = {}
    const result = View(opt)
    expect(result.width).toBe(1)
    expect(result.height).toBe(1)
    expect(result.border).toBe(false)
    expect(result.rows).toEqual([' '])
    result.render()
    expect(consoleSpy).toBeCalledWith(' ')
  })

  it('should return custom width', () => {
    const opt: ViewOpt = { width: 10 }
    const result = View(opt)
    expect(result.width).toBe(10)
  })

  it('should return custom padding', () => {
    const opt: ViewOpt = { padding: [1, 2, 3, 4] }
    const result = View(opt)
    expect(result.width).toEqual(7)
    expect(result.height).toEqual(5)
  })

  it('should align text to the left', () => {
    const opt: ViewOpt = { content: 'Hello World', textAlign: 'left', width: 20 }
    const result = View(opt)
    expect(result.rows[0].startsWith('Hello World')).toBe(true)
  })

  it('should align text to the center', () => {
    const opt: ViewOpt = { content: 'Hello World', textAlign: 'center', width: 15 }
    const result = View(opt)
    expect(result.rows[0]).toContain('  Hello World  ')
  })

  it('should align text to the right', () => {
    const opt: ViewOpt = { content: 'Hello World', textAlign: 'right', width: 20 }
    const result = View(opt)
    expect(result.rows[0].endsWith('Hello World')).toBe(true)
  })

  it('should render border', () => {
    const expectRes = ['┌─┐', '│ │', '└─┘']
    const opt: ViewOpt = { border: true, borderColor: '#223455' }
    const result = View(opt)
    result.render()
    expect(consoleSpy).toBeCalledWith(expectRes.join('\n'))
  })

  it('should render border style', () => {
    const expectRes = ['↘↓↙', '→ ←', '↗↑↖']
    const opt: ViewOpt = { border: true, borderStyle: 'arrow' }
    const result = View(opt)
    result.render()
    expect(consoleSpy).toBeCalledWith(expectRes.join('\n'))
  })

  it('should wrap content', () => {
    const opt: ViewOpt = { content: 'This is a very long content that should be wrapped', width: 10 }
    const result = View(opt)
    expect(result.rows.length).toBeGreaterThan(1)
  })
})
