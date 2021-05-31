import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { AppDispatch, RootState } from '../app/store'
import { IItem } from '../interfaces/items'
import { ISearchParams } from '../interfaces/searchParams'

export interface TicketsState {
	list: IItem[]
	ticketInterface: string[],
	searchPapams: ISearchParams,
	loading: boolean
}

const initialState: TicketsState = {
	list: [],
	ticketInterface: [],
	searchPapams: {
		searchBy: 1,
		text: ''
	},
	loading: false
}

export const ticketsSlice = createSlice({
	name: 'tickets',
	initialState,
	reducers: {
		getTickets: (state, action: PayloadAction<[]>) => {
			state.list = action.payload
		},
		toggleTicketsLoadingState: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload
		},
		updateSearchParams: (state, action: PayloadAction<object>) => {
			state.searchPapams = {...state.searchPapams, ...action.payload}
		},
		updateTicketInterface: (state, action: PayloadAction<string[]>) => {
			state.ticketInterface = action.payload
		}
	},
})

export const { getTickets, toggleTicketsLoadingState, updateSearchParams, updateTicketInterface } = ticketsSlice.actions

export const getTicketList = () => async (dispatch: AppDispatch) => {
	dispatch(toggleTicketsLoadingState(true))
	try {
		const response= await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10&_delay=2000')
		dispatch(getTickets(response.data))
	} catch (error) {
		alert('Server response error')
	}
	dispatch(toggleTicketsLoadingState(false))
}

export const selectTickets = (state: RootState) => state.tickets.list
export const selectTicketsLoadingState = (state: RootState) => state.tickets.loading
export const selectSearchParams = (state: RootState) => state.tickets.searchPapams
export const selectTicketInterface = (state: RootState) => state.tickets.ticketInterface

export default ticketsSlice.reducer
