import { configureStore } from '@reduxjs/toolkit'
import ticketsReducer from '../features/ticketsSlice'
import breadcrumbsSlice from '../features/breadcrumbsSlice'

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    breadcrumbs: breadcrumbsSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch