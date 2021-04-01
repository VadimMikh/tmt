import { useState } from 'react'
import { Checkbox, Flex } from '@adobe/react-spectrum'
import ChevronDown from '@spectrum-icons/workflow/ChevronDown'
import { v4 } from 'uuid'
import styles from './Table.module.css'

const Table = props => {
    const [ descItem, setDescItem ] = useState()
    const { 
        tickets,
        isSelectable,
        selectedItems = [],
        centerAligned = [],
        getSelected = null,
        sort = null 
    } = props

    const ticketsToRender = isSelectable ? tickets.map(el => ({checked: false, ...el})) : tickets

    const sortingHandler = (name) => {
        typeof sort === 'function' && sort(name, descItem === name)
        setDescItem(descItem === name ? undefined : name)
    }

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {
                        Object.keys(ticketsToRender[0]).map(name => 
                            <th 
                                key={name}
                                onClick={() => sortingHandler(name)}
                                className={styles.tableHeadCell}>
                                <Flex alignItems="center" justifyContent="space-between">
                                    {
                                        name !== 'checked' 
                                            ? <> {name} <ChevronDown UNSAFE_className={`${descItem === name ? styles.sorted : ''}`} aria-label="Locked" size="XS" /> </>
                                            : ''
                                    }
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
                                Object.keys(item).map((key, i) => {
                                    let value = item[key].toString()
                                    if (isSelectable && key === 'checked') {
                                        return <td 
                                            width="20" 
                                            className={`${styles.tableCell} ${styles.tableCellAlignCenter}`} key={v4()}>
                                                <Checkbox 
                                                    UNSAFE_style={{"paddingRight": "0"}}
                                                    isSelected={selectedItems.includes(item.id)}
                                                    onChange={(state) => typeof getSelected === 'function' && getSelected({id: item.id, add: state})} /> 
                                            </td> 
                                    } else {
                                        return <td 
                                            className={`${styles.tableCell} ${centerAligned.includes(i + 1) && styles.tableCellAlignCenter}`} key={v4()}>
                                            { value === '[object Object]' ? <pre>JSON.stringify(item[key], null, 2)</pre> : value }
                                        </td>
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
