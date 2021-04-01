import { createSlice } from '@reduxjs/toolkit'

export const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState: [],
  reducers: {
    updateBreadcrumbs: (state, action) => {
        while(state.length) {state.pop()}
        state.push(...action.payload)
    }
  },
})

export const { updateBreadcrumbs } = breadcrumbsSlice.actions

export const selectBreadcrumbs = state => state.breadcrumbs

export default breadcrumbsSlice.reducer