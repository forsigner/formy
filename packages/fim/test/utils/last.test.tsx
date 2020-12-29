import { last } from '../../src/utils/last'

describe('last()', () => {
  it('last(arr) should equal to last array item', () => {
    const arr = [1, 2, 3]
    expect(last(arr)).toEqual(3)
    expect(last(arr)).toEqual(arr[arr.length - 1])
  })
})
