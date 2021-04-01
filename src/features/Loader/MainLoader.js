import { ProgressCircle, Flex } from '@adobe/react-spectrum'
import styles from './Loader.module.css'

const MainLoader = () => (
    <Flex UNSAFE_className={styles.loaderContainer}>
        <ProgressCircle aria-label="Loading…" UNSAFE_className={styles.loaderCenterAlign} isIndeterminate />
    </Flex>
)

export default MainLoader
