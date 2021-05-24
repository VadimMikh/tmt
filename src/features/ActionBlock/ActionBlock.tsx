import { Well, Flex, Text, ActionButton } from '@adobe/react-spectrum'
import Close from '@spectrum-icons/workflow/Close'
import styles from './ActionBlock.module.css'
import sltylingValues from '../../app/sltylingValues'

type ActionBlockProps = {
    children: JSX.Element[] | JSX.Element,
    resetHandler: any,
    selectedItems: number[]
}

const ActionBlock = ({ children, resetHandler, selectedItems }: ActionBlockProps) => (
    <Well flexGrow={1} position="absolute" right={0} bottom={0} left={0} UNSAFE_className={styles.container}>
        <Flex justifyContent="space-between" alignItems="center" flexBasis='100%'>
            <Flex alignItems="center">
                { children }
            </Flex>
            <Flex alignItems="center">
                <Text marginEnd={sltylingValues.textSpace}>{ selectedItems.length > 1 ? `${selectedItems.length} items` : `${selectedItems.length} item` } selected</Text>
                <ActionButton isQuiet onPress={resetHandler}><Close aria-label="Close" size="S"/></ActionButton>
            </Flex>
        </Flex> 
    </Well>
)

export default ActionBlock
