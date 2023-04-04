import type Word from './word'

export default interface List {
  id: number
  name: string
  words?: Word[]
}
