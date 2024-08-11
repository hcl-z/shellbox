import chalk from 'chalk'
import { getBgStr, getColorStr, getPadding, padAround, padArrAround, padArrEnd, padArrStart, padEnd, padStart, repeatArr } from '../src/utils'

// Tests
describe('utils', () => {
  describe('repeatArr', () => {
    it('should repeat string', () => {
      expect(repeatArr('x', 3)).toEqual(['x', 'x', 'x'])
    })
  })

  describe('padStart', () => {
    it('should pad start of string', () => {
      expect(padStart('abc', 6, ' ')).toEqual('   abc')
    })
  })

  describe('padEnd', () => {
    it('should pad end of string', () => {
      expect(padEnd('abc', 6, ' ')).toEqual('abc   ')
    })
  })

  describe('padAround', () => {
    it('should pad around string', () => {
      expect(padAround('abc', 8, ' ')).toEqual('   abc  ')
    })
  })

  describe('padArrStart', () => {
    it('should pad start of array', () => {
      expect(padArrStart(['a', 'b', 'c'], 6, 'x')).toEqual(['x', 'x', 'x', 'a', 'b', 'c'])
    })
  })

  describe('padArrEnd', () => {
    it('should pad end of array', () => {
      expect(padArrEnd(['a', 'b', 'c'], 6, 'x')).toEqual(['a', 'b', 'c', 'x', 'x', 'x'])
    })
  })

  describe('padArrAround', () => {
    it('should pad around array', () => {
      expect(padArrAround(['a', 'b', 'c'], 8, 'x')).toEqual(['x', 'x', 'x', 'a', 'b', 'c', 'x', 'x'])
    })
  })

  describe('getPadding', () => {
    it('should return padding object', () => {
      expect(getPadding([1])).toEqual({ left: 1, right: 1, top: 1, bottom: 1 })
      expect(getPadding([1, 2])).toEqual({ left: 2, right: 2, top: 1, bottom: 1 })
      expect(getPadding([1, 2, 3])).toEqual({ left: 2, right: 2, top: 1, bottom: 3 })
      expect(getPadding([1, 2, 3, 4])).toEqual({ left: 4, right: 2, top: 1, bottom: 3 })
      expect(getPadding([0])).toEqual({ left: 0, right: 0, top: 0, bottom: 0 })
    })
  })

  describe('getBgStr', () => {
    it('should return string with background color', () => {
      expect(getBgStr('text', 'ff0000')).toEqual(chalk.bgHex('#ff0000')('text'))
      expect(getBgStr('text', '00ff00')).toEqual(chalk.bgHex('#00ff00')('text'))
    })
  })

  describe('getColorStr', () => {
    it('should return string with text color', () => {
      expect(getColorStr('text', 'ff0000')).toEqual(chalk.hex('#ff0000')('text'))
      expect(getColorStr('text', '00ff00')).toEqual(chalk.hex('#00ff00')('text'))
    })
  })
})
