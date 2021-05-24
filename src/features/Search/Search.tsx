import { useCallback, useState } from 'react'
import { SearchField, Item } from '@adobe/react-spectrum'
import { Picker } from '@react-spectrum/picker'
import { updateSearchParams, selectTicketInterface } from '../ticketsSlice'
import sltylingValues from '../../app/sltylingValues'
import styles from './Search.module.css'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

type SearchProps = {
    defaultSelectedKey: number
}

interface Option {
    id: number,
    name: string
}

const Search = ({ defaultSelectedKey }: SearchProps) => {
    const dispatch = useAppDispatch()
    const ticketInterface = useAppSelector(selectTicketInterface)
    const [ searchBy, setSearchBy ] = useState<number>(defaultSelectedKey)
    const options = ticketInterface?.length ? ticketInterface.map((el: string, i: number) => ({id: i +1, name: el})) : []

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
                onSelectionChange={(id: any) => setSearchBy(id)}>
                {(item: Option) => <Item>{item.name}</Item>}
            </Picker>
            <SearchField placeholder="Search" onChange={searchMemoizedCallback}/>
        </>
    )
}

export default Search
