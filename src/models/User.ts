import { Model } from 'pinia-orm'
import { Str, Uid } from 'pinia-orm/dist/decorators'

export default class User extends Model {
  static entity = 'users'

  @Uid() declare id: string
  @Str('') declare username: string
  @Str('') declare email: string
}