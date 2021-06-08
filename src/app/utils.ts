import { IItem } from '../interfaces/items'
import { ISearchParams } from '../interfaces/searchParams'

export function sortArray<T>(array: T[], val: string, desc: boolean) {
    const sorted = array.slice().sort((a, b) => {
        const first: any = desc ? b : a
        const second: any = desc ? a : b

        if (typeof first[val] === 'number') {
            return first[val] - second[val]
        } else {
            return ('' + first[val]).localeCompare(second[val])
        }
    })
    return sorted
}

export function searchUpdate(tickets: IItem[], searchParams: ISearchParams, ticketInterface: string[], stateHandler: Function): void {
    if (tickets.length && searchParams.searchBy && ticketInterface.length) {
        stateHandler(tickets.filter(el => {
            return el[ticketInterface[searchParams.searchBy - 1] as keyof IItem].toString().indexOf(searchParams.text) !== -1
        }))
    }
}