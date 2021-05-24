import { useEffect, useState } from 'react'
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
import { IItem } from '../../interfaces/items'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

interface ISelected {
    id: number,
    add: boolean
}

const Overview = () => {
	const dispatch = useAppDispatch()
	const tickets = useAppSelector<IItem[]>(selectTickets)
	const loading = useAppSelector(selectTicketsLoadingState)
	const searchParams = useAppSelector(selectSearchParams)
    const [ selectedItems, setSelectedItems ] = useState<number[]>([])
    const ticketInterface = tickets.length ? Object.keys(tickets[0]) : []
    const [ ticketsToDisplay, setTicketsToDisplay ] = useState<IItem[]>([])

    const getSelectedHahdler = (val: ISelected) => {
        val.add 
            ? setSelectedItems((prev) => !prev.includes(val.id) ? [...prev, val.id] : prev)
            : setSelectedItems((prev) => prev.filter((el) => val.id !== el))
    }

    const sortHandler = (val: string, desc: boolean) => {
        setTicketsToDisplay(sortArray(ticketsToDisplay, val, desc))
    }

    const inquiryHandler = (close: Function) => {
        close()
    }

    const resetSeletion = () => {
        setSelectedItems([])
    }

    useEffect(() => {
        if (tickets.length && searchParams.searchBy) {
            setTicketsToDisplay(tickets.filter((el: any) => {
                return el[ticketInterface[searchParams.searchBy - 1]].toString().indexOf(searchParams.text) !== -1
            }))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    useEffect(() => {
        setTicketsToDisplay(tickets)
        ticketInterface && dispatch(updateTicketInterface(ticketInterface))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tickets])
    
    useEffect(() => {
        dispatch(getTicketList())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
	return (
        <>
            <Flex marginBottom={sltylingValues.mainBottomSpacing} justifyContent="end" alignItems="end" position="relative">
                { !!selectedItems.length ?
                    <ActionBlock resetHandler={resetSeletion} selectedItems={selectedItems}>
                        { selectedItems.length === 1 ?
                            <ActionButton 
                                isQuiet 
                                marginEnd={sltylingValues.searchElementsSpacing}>
                                <Link>
                                    <RouterLink to={`/overview/event/${selectedItems[0]}`}>
                                        Manage Event Ticket Data
                                    </RouterLink>
                                </Link>
                            </ActionButton> : <></>
                        }
                        <DialogTrigger>
                            <ActionButton isQuiet><Link UNSAFE_className={AppStyles.colorGreen}>Start Need Inquiry</Link></ActionButton>
                            {(close) => (
                                <Dialog>
                                <Heading>Start Need Inquiry</Heading>
                                <Divider />
                                <Content>
                                    <p>
                                        { `You are going to start inquiry for ${selectedItems.length} ${selectedItems.length > 1 ? 'Events' : 'Event'}:` }
                                    </p>
                                    {
                                        selectedItems?.map((el) => <p key={v4()}><b>{ tickets[el].title }</b></p>)
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
                    </ActionBlock> : <></>
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
