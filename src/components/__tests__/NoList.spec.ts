import { render } from '@testing-library/vue'
import NoList from '../NoList.vue'
import { test, expect } from 'vitest'

test('Check displaying text', () => {
  const { getByText } = render(NoList)

  getByText("You don't have any list")
  getByText('Create new one to add some words')
})

test('Test snapshot', () => {
  const result = render(NoList)
  expect(result).toMatchSnapshot()
})
