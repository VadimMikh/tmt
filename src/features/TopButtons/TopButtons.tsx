import { useCallback } from 'react'
import { ButtonGroup, Button } from '@adobe/react-spectrum'
import { useJsonToCsv } from 'react-json-csv'
import { getTicketList, selectTickets, selectTicketInterface } from '../ticketsSlice'
import sltylingValues from '../../app/sltylingValues'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

interface Field {
    [key: string]: string;
}

const TopButtons = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector(selectTickets)
    const ticketInterface = useAppSelector(selectTicketInterface)
    const { saveAsCsv } = useJsonToCsv()
    const filename = 'Tickets-file'

    const saveCsvCallback = useCallback(
        () => {
            let fields: Field = {}
            ticketInterface.map((el: string) => fields[el] = el)
            saveAsCsv({ data, fields, filename })
        },
        [data, saveAsCsv, ticketInterface]
    )
    
    return (
        <ButtonGroup marginStart={sltylingValues.searchElementsSpacing}>
            <Button variant="negative" onPress={saveCsvCallback}>Export</Button>
            <Button variant="cta" onPress={() => dispatch(getTicketList())}>Syncronise</Button>
        </ButtonGroup>
    )
}

export default TopButtons
