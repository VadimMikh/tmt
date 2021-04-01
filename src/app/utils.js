export function sortArray (array, val, desc) {
    const sorted = array.slice().sort((a, b) => {
        const first = desc ? b : a
        const second = desc ? a : b

        if (typeof first[val] === 'number') {
            return first[val] - second[val]
        } else {
            return ('' + first[val]).localeCompare(second[val])
        }
    })
    return sorted
}
