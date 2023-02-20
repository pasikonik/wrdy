import Word from './word'

export default interface List {
  id: string
  name: string
  words?: Word[]
}
