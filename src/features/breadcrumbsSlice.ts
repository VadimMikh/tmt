import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { IBreadcrumbsElement } from '../interfaces/breadcrumbs'

const initialState: IBreadcrumbsElement[] = []

export const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    updateBreadcrumbs: (state: any, action: PayloadAction<IBreadcrumbsElement[]>) => {
        while(state.length) {state.pop()}
        state = state.push(...action.payload)
    }
  },
})

export const { updateBreadcrumbs } = breadcrumbsSlice.actions

export const selectBreadcrumbs = (state: RootState) => state.breadcrumbs

export default breadcrumbsSlice.reducer