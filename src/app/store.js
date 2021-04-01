import { configureStore } from '@reduxjs/toolkit'
import ticketsReducer from '../features/ticketsSlice'
import breadcrumbsSlice from '../features/breadcrumbsSlice'

export default configureStore({
  reducer: {
    tickets: ticketsReducer,
    breadcrumbs: breadcrumbsSlice
  },
})
