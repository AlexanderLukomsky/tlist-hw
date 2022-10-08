import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const initialState = 'all' as FilterType
const slice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      changeFilter: (_, action: PayloadAction<{ filterValue: FilterType }>) => action.payload.filterValue
   }
})
export const filterReducer = slice.reducer
export const { changeFilter } = slice.actions
export type FilterType = 'all' | 'active' | 'completed'
export type FilterReducerType = ReturnType<typeof changeFilter>