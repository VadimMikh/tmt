import { useState } from 'react'
import { Checkbox, Flex } from '@adobe/react-spectrum'
import ChevronDown from '@spectrum-icons/workflow/ChevronDown'
import { v4 } from 'uuid'
import styles from './Table.module.css'
import classNames from 'classnames'
import { IItem } from '../../interfaces/items'

type TableProps = {
    tickets: IItem[],
    isSelectable: boolean,
    selectedItems: number[],
    centerAligned?: number[],
    getSelected: Function,
    sort: Function
}

const Table = (props: TableProps) => {
    const [ descItem, setDescItem ] = useState<string>()
    const { 
        tickets,
        isSelectable,
        selectedItems = [],
        centerAligned = [],
        getSelected = null,
        sort = null 
    } = props

    const ticketsToRender = isSelectable ? tickets.map(el => ({ checked: false, ...el })) : tickets

    const sortingHandler = (name: string) => {
        typeof sort === 'function' && sort(name, descItem === name)
        setDescItem(descItem === name ? undefined : name)
    }

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {
                        Object.keys(ticketsToRender[0]).map((name: string) => 
                            <th 
                                key={name}
                                onClick={() => sortingHandler(name)}
                                className={styles.tableHeadCell}>
                                <Flex alignItems="center" justifyContent="space-between">
                                    { name !== 'checked' ? <> {name} <ChevronDown UNSAFE_className={classNames({ [styles.sorted]: descItem === name })} aria-label="Locked" size="XS" /> </> : <></>}
                                </Flex>
                            </th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    ticketsToRender.map((item, j) => (
                        <tr className={styles.tableRow} key={v4()}>
                            {   
                                Object.keys(item).map((key: string, i) => {
                                    let value = item[key as keyof IItem]

                                    if (isSelectable && key === 'checked') {
                                        return <td 
                                            width="20" 
                                            className={classNames(styles.tableCell, styles.tableCellAlignCenter)} key={v4()}>
                                                <Checkbox 
                                                    UNSAFE_style={{"paddingRight": "0"}}
                                                    isSelected={selectedItems.includes(item.id)}
                                                    onChange={state => typeof getSelected === 'function' && getSelected({ id: item.id, add: state })} /> 
                                            </td> 
                                    } else {
                                        return (
                                            <td 
                                                className={classNames(styles.tableCell, { [styles.tableCellAlignCenter]: centerAligned.includes(i + 1) })} key={v4()}>
                                                { value.toString() }
                                            </td>
                                        )
                                    } 
                                }) 
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Table
