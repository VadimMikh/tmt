import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const ticketsSlice = createSlice({
	name: 'tickets',
	initialState: {
		ticketInterface: [],
		searchPapams: {},
		loading: false
	},
	reducers: {
		getTickets: (state, action) => {
			state.list = action.payload
		},
		toggleTicketsLoadingState: (state, action) => {
			state.loading = action.payload
		},
		updateSearchParams: (state, action) => {
			state.searchPapams = {...state.searchPapams, ...action.payload}
		},
		updateTicketInterface: (state, action) => {
			state.ticketInterface = action.payload
		}
	},
})

export const { getTickets, toggleTicketsLoadingState, updateSearchParams, updateTicketInterface } = ticketsSlice.actions

export const getTicketList = () => async dispatch => {
	dispatch(toggleTicketsLoadingState(true))
	try {
		const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10&_delay=2000')
		dispatch(getTickets(response.data))
	} catch (error) {
		alert('Server response error')
	}
	dispatch(toggleTicketsLoadingState(false))
}

export const selectTickets = state => state.tickets.list
export const selectTicketsLoadingState = state => state.tickets.loading
export const selectSearchParams = state => state.tickets.searchPapams
export const selectTicketInterface = state => state.tickets.ticketInterface

export default ticketsSlice.reducer
