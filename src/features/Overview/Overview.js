import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from "react-router-dom"
import { 
    Flex,
    Well,
    Link,
    ActionButton,
    Dialog,
    Heading,
    Divider,
    Content,
    ButtonGroup,
    Button,
    DialogTrigger 
} from '@adobe/react-spectrum'
import { v4 } from 'uuid'
import { 
    getTicketList,
    selectTickets,
    selectTicketsLoadingState,
    updateTicketInterface,
    selectSearchParams,
} from '../ticketsSlice'
import ActionBlock from '../ActionBlock/ActionBlock'
import MainLoader from '../Loader/MainLoader'
import Search from '../Search/Search'
import Table from '../Table/Table'
import TopButtons from '../TopButtons/TopButtons'
import { sortArray } from '../../app/utils'
import sltylingValues from '../../app/sltylingValues'
import { default as AppStyles } from '../../App.module.css'

const Overview = () => {
	const dispatch = useDispatch()
	const tickets = useSelector(selectTickets)
	const loading = useSelector(selectTicketsLoadingState)
    const [ selectedItems, setSelectedItems ] = useState([])
    const ticketInterface = tickets && Object.keys(tickets[0])
	const searchParams = useSelector(selectSearchParams)
    const [ ticketsToDisplay, setTicketsToDisplay ] = useState([])

    const getSelectedHahdler = val => {
        val.add 
            ? setSelectedItems(prev => !prev.includes(val.id) ? [...prev, val.id] : prev)
            : setSelectedItems(prev => prev.filter((el) => val.id !== el))
    }

    const sortHandler = (val, desc) => {
        setTicketsToDisplay(sortArray(ticketsToDisplay, val, desc))
    }

    const inquiryHandler = close => {
        close()
    }

    const resetSeletion = () => {
        setSelectedItems([])
    }

    useEffect(() => {
        if (tickets && searchParams.searchBy) {
            setTicketsToDisplay(tickets.filter(el => {
                return el[ticketInterface[searchParams.searchBy - 1]].toString().indexOf(searchParams.text) !== -1
            }))
        }
    }, [searchParams])

    useEffect(() => {
        setTicketsToDisplay(tickets)
        ticketInterface && dispatch(updateTicketInterface(ticketInterface))
    }, [tickets])
    
    useEffect(() => {
        dispatch(getTicketList())
    }, [])
    
	return (
        <>
            <Flex marginBottom={sltylingValues.mainBottomSpacing} justifyContent="end" alignItems="end" position="relative">
                { !!selectedItems.length &&
                    <ActionBlock resetHandler={resetSeletion} selectedItems={selectedItems}>
                        { selectedItems.length === 1 && 
                            <ActionButton 
                                isQuiet 
                                marginEnd={sltylingValues.searchElementsSpacing}>
                                <Link>
                                    <RouterLink to={`/overview/event/${selectedItems[0]}`}>
                                        Manage Event Ticket Data
                                    </RouterLink>
                                </Link>
                            </ActionButton> 
                        }
                        <DialogTrigger>
                            <ActionButton isQuiet><Link UNSAFE_className={AppStyles.colorGreen}>Start Need Inquiry</Link></ActionButton>
                            {(close) => (
                                <Dialog>
                                <Heading>Start Need Inquiry</Heading>
                                <Divider />
                                <Content>
                                    <p>{ `You are going to start inquiry for ${selectedItems.length} ${selectedItems.length > 1 ? 'Events' : 'Event'}:` }</p>
                                    {
                                        selectedItems?.map(el => <p key={v4()}><b>{ tickets[el].title }</b></p>)
                                    }
                                </Content>
                                <ButtonGroup>
                                    <Button variant="secondary" onPress={close}>
                                        Cancel
                                    </Button>
                                    <Button variant="cta" onPress={() => inquiryHandler(close)} isDisabled={true}>
                                        Start
                                    </Button>
                                </ButtonGroup>
                                </Dialog>
                            )}
                        </DialogTrigger>
                    </ActionBlock>
                }
                <Search defaultSelectedKey={3} />
                <TopButtons />
            </Flex>
            { loading 
                ? <MainLoader /> 
                : ticketsToDisplay.length 
                    ? <Table
                        tickets={ticketsToDisplay} 
                        selectedItems={selectedItems} 
                        sort={sortHandler} 
                        getSelected={getSelectedHahdler}
                        isSelectable /> 
                    : <Well>No items to show</Well> }
        </>
    )
} 

export default Overview
