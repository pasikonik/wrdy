import { describe, bench } from 'vitest'

const arr = Array.from(new Array(10000), () => Math.random() * 100)

const map = new Map()
arr.forEach((el, id) => {
  map.set(id, el)
})

describe('filtering list', () => {
  bench('Array', () => {
    arr.filter((el) => el > 50)
  })

  bench('Map', () => {
    Array.from(map, ([_, v]) => v).filter((el) => el > 50)
  })
})
