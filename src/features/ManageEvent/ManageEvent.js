import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import MainLoader from '../Loader/MainLoader'
import { selectTickets, getTicketList } from '../ticketsSlice'

const ManageEvent = () => {
    const tickets = useSelector(selectTickets)
    const dispatch = useDispatch()
    const params = useParams()
    const [ currentItem, setCurrentItem ] = useState(null)

    useEffect(() => {
        !tickets?.length && dispatch(getTicketList())
    }, [])

    useEffect(() => {
        setCurrentItem(tickets?.filter(item => item.id.toString() === params.id))
    }, [tickets, params])

    return (
        <>
            { tickets?.length ?
            <div>
                <span>ManageEvent Component</span>
                <pre>{ JSON.stringify(currentItem, null, 2) }</pre>
            </div> :
            <MainLoader/ > }
        </>
    )
}

export default ManageEvent
