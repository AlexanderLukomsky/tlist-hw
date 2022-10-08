import * as  authSelectors from './selectors'
import { Login } from './Login';
import { actions, asyncActions } from './auth-reducer';
const authActions = {
   ...asyncActions,
   ...actions
}
export {
   authSelectors,
   authActions,
   Login
}