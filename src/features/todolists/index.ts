import * as todolistAsyncActions from './todolist-actions'
import { actions } from './todolist-reducer'
const todolistActions = {
   ...todolistAsyncActions,
   ...actions
}
export {
   todolistActions
}