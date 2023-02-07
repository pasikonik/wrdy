import { Model } from 'pinia-orm'
import { Str, Uid, BelongsTo, HasMany } from 'pinia-orm/dist/decorators'
import User from './User'
import Word from './Word'

export default class List extends Model {
  static entity = 'lists'

  @Uid() declare id: string
  @Str('') declare name: string

  @HasMany(() => Word, 'listId') declare words: Word[] 
  @BelongsTo(() => User, 'userId') declare user: User
}