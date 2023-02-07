import { Model } from 'pinia-orm'
import { Str, Uid, Num, BelongsTo } from 'pinia-orm/dist/decorators'
import List from './List'

export default class User extends Model {
  static entity = 'users'

  @Uid() declare id: string
  @Str('') declare origin: string
  @Str('') declare translation: string
  @Num(0) declare proficiency: number

  @BelongsTo(() => List, 'listId') declare list: List
}
