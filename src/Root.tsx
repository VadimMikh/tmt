import { useEffect } from 'react' 
import { useLocation } from 'react-router-dom' 
import { useDispatch, useSelector } from 'react-redux'
import App from './App' 
import { updateBreadcrumbs } from './features/breadcrumbsSlice'
import { selectTickets } from './features/ticketsSlice'

const Root = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const tickets = useSelector(selectTickets)
    
    /** Breadcrumbs modifications */ 
    useEffect(() => {
        const breadcrumbsObj = [{id: 1, label: 'cockpit', path: '/', title: 'cockpit'}]
        const locationArray = location.pathname.split('/')
        const IDMarker = parseInt(locationArray[locationArray.length - 1])
        let shouldModify = false
        let modifiedBreadcrumbsObj
        let currentTicket
        
        if (!isNaN(IDMarker)) {
            currentTicket = tickets?.filter((el: {id: number}) => el.id === IDMarker)
        }
        
        locationArray.map((el, i) => {
            if (el === 'event') shouldModify = true
            if (el) {
                breadcrumbsObj.push({
                    id: i + 1,
                    label: el,
                    path: `/${el}`,
                    title: isNaN(+el) ? el : ''
                })
            }
            return el
        })

        if (shouldModify && currentTicket) {
            modifiedBreadcrumbsObj = breadcrumbsObj.filter(item => item.label !== 'event' && isNaN(parseInt(item.label)))
            modifiedBreadcrumbsObj.push({id: 3, label: currentTicket[0]?.title || 'Event Element', path: location.pathname, title: 'Manage Event'})
        }

        dispatch(updateBreadcrumbs(modifiedBreadcrumbsObj || breadcrumbsObj))
    }, [location, dispatch, tickets]) 
    /** END Breadcrumbs modifications */ 

    return ( 
        <App /> 
    ) 
}

export default Root