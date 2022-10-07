import { AppRootStoreType } from "../store/store";

export const selectAppStatus = (state: AppRootStoreType) => state.app.status
export const selectIsInitializedApp = (state: AppRootStoreType) => state.app.isInitializedApp