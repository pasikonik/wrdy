import { it, expect, describe, vi, test } from 'vitest'

function greeting(name: string) {
  console.log('Hello, ' + name)
}

describe('group', () => {
  it('should check value', () => {
    expect(1).toBe(1)
  })
})

test('should greeting', () => {
  const spy = vi.spyOn(console, 'log')

  greeting('Michael')

  expect(spy).toHaveBeenCalledWith('Hello, Michael')
  expect(spy).toHaveBeenCalledTimes(1)
})
