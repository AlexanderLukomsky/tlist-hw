//initial state
const initialState: InitialStateType = {
    status: 'idle',
    error: null
}
//reducer
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': return { ...state, status: action.status }
        case 'APP/SET-ERROR': return { ...state, error: action.error }
        default: return state
    }
}
//actions
export const setStatusAC = (status: RequestStatusType) => (
    {
        type: 'APP/SET-STATUS',
        status
    } as const
)
export const setErrorAC = (error: string | null) => (
    {
        type: 'APP/SET-ERROR',
        error
    } as const
)
//types
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}
type RequestStatusType = 'idle' | 'loading' | 'successed' | 'failed'
type ActionsType =
    | SetStatusACType
    | SetErrorACType
export type SetErrorACType = ReturnType<typeof setErrorAC>
export type SetStatusACType = ReturnType<typeof setStatusAC>
