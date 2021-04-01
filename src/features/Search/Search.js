import { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { SearchField, Item } from '@adobe/react-spectrum'
import { Picker } from '@react-spectrum/picker'
import { updateSearchParams, selectTicketInterface } from '../ticketsSlice'
import sltylingValues from '../../app/sltylingValues'
import styles from './Search.module.css'

const Search = ({ defaultSelectedKey }) => {
    const dispatch = useDispatch()
    const ticketInterface = useSelector(selectTicketInterface)
    const [ searchBy, setSearchBy ] = useState(defaultSelectedKey)
    const options = ticketInterface?.length ? ticketInterface.map((el, i) => ({id: i +1, name: el})) : []

    const searchMemoizedCallback = useCallback(
        text => {
            dispatch(updateSearchParams({ text, searchBy }))
        },
        [searchBy, dispatch]
    )

    return (
        <>
            <Picker
                UNSAFE_className={styles.picker}
                label="Search by"
                marginEnd={sltylingValues.searchElementsSpacing}
                placeholder="Event name"
                defaultSelectedKey={defaultSelectedKey}
                selectedKey={searchBy}
                items={options}
                onSelectionChange={(id) => setSearchBy(id)}>
                {(item) => <Item>{item.name}</Item>}
            </Picker>
            <SearchField placeholder="Search" onChange={searchMemoizedCallback}/>
        </>
    )
}

export default Search
