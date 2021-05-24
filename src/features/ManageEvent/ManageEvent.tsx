import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
// import { useSelector, useDispatch } from 'react-redux'
import MainLoader from '../Loader/MainLoader'
import { selectTickets, getTicketList } from '../ticketsSlice'
import { IItem } from '../../interfaces/items'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

const ManageEvent = () => {
    const tickets = useAppSelector<IItem[]>(selectTickets)
    const dispatch = useAppDispatch()
    const params = useParams<{id?: string}>()
    const [ currentItem, setCurrentItem ] = useState<IItem[]>([])

    useEffect(() => {
        !tickets?.length && dispatch(getTicketList())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setCurrentItem(tickets?.filter((item: IItem) => item.id.toString() === params.id))
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
