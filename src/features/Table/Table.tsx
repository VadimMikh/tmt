import { useState } from 'react'
import { Checkbox, Flex } from '@adobe/react-spectrum'
import { v4 } from 'uuid'
import classNames from 'classnames'
import { IItem } from '../../interfaces/items'
import ChevronDown from '@spectrum-icons/workflow/ChevronDown'
import styles from './Table.module.css'

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
        selectedItems,
        centerAligned = [],
        getSelected,
        sort = null 
    } = props

    const ticketsToRender = isSelectable ? tickets.map(el => ({ checked: false, ...el })) : tickets

    const sortingHandler = (name: string) => {
        null !== sort && sort(name, descItem === name)
        setDescItem(descItem === name ? undefined : name)
    }

    return (
        <table className={styles.root}>
            <thead>
                <tr>
                    {
                        Object.keys(ticketsToRender[0]).map((name: string) => 
                            <th 
                                key={name}
                                onClick={() => sortingHandler(name)}
                                className={styles.headCell}>
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
                        <tr className={styles.row} key={v4()}>
                            {   
                                Object.keys(item).map((key, i) => {
                                    let value = item[key as keyof IItem].toString()

                                    if (isSelectable && key === 'checked') {
                                        return <td 
                                            width="20" 
                                            className={classNames(styles.cell, styles.cellAlignCenter)} key={v4()}>
                                                <Checkbox 
                                                    UNSAFE_className={styles.checkbox}
                                                    isSelected={selectedItems.includes(item.id)}
                                                    onChange={state => undefined !== getSelected && getSelected({ id: item.id, add: state })} /> 
                                            </td> 
                                    } else {
                                        return (
                                            <td 
                                                className={classNames(styles.cell, { [styles.cellAlignCenter]: centerAligned.includes(i + 1) })} key={v4()}>
                                                { value }
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
