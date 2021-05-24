import { IItem } from '../interfaces/items'

export function sortArray (array: [] | IItem[], val: string, desc: boolean) {
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
