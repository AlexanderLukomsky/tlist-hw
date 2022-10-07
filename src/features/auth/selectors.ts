import { AppRootStoreType } from "../../store/store";

export const selectIsLoggedIn = (state: AppRootStoreType) => state.auth.isLoggedIn