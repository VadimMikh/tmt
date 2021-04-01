import { useCallback } from 'react'
import { ButtonGroup, Button } from '@adobe/react-spectrum'
import { useDispatch, useSelector } from 'react-redux'
import { useJsonToCsv } from 'react-json-csv'
import { getTicketList, selectTickets, selectTicketInterface } from '../ticketsSlice'
import sltylingValues from '../../app/sltylingValues'

const TopButtons = () => {
    const dispatch = useDispatch()
    const data = useSelector(selectTickets)
    const ticketInterface = useSelector(selectTicketInterface)
    const { saveAsCsv } = useJsonToCsv()
    const filename = 'Tickets-file'

    const saveCsvCallback = useCallback(
        () => {
            const fields = {}
            ticketInterface.map(el => fields[el] = el)
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
