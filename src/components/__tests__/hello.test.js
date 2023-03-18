import { test, expect } from 'vitest'

function sum(a, b, c) {
  return a + b + c
}

test('1 + 1', () => {
  expect(sum(1, 4)).toEqual(2)
})
