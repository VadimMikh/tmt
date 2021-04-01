import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Money from '@spectrum-icons/workflow/Money'
import MainLink from '../MainLink/MainLink'
import Hand2 from '@spectrum-icons/workflow/Hand2'
import ArrowUp from '@spectrum-icons/workflow/ArrowUp'
import ArrowDown from '@spectrum-icons/workflow/ArrowDown'
import Report from '@spectrum-icons/workflow/Report'
import Settings from '@spectrum-icons/workflow/Settings'
import UserGroup from '@spectrum-icons/workflow/UserGroup'
import sltylingValues from '../../app/sltylingValues'

const Cockpit = () => (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 550: 2, 750: 3, 1150: 5, 1500: 7 }}>
        <Masonry className="masonry" gutter={sltylingValues.mainBottomSpacing}>
            <MainLink link="/overview" text="Overview">
                <Money aria-label="Money" size="XXL" />
            </MainLink>
            <MainLink link="/allocation" text="Allocation">
                <Hand2 aria-label="HAnd" size="XXL" />
            </MainLink>
            <MainLink link="/" text="Offers" disabled={true}>
                <ArrowUp aria-label="ArrowUp" size="XXL" />
            </MainLink>
            <MainLink link="/" text="Requests" disabled={true}>
                <ArrowDown aria-label="ArrowDown" size="XXL" />
            </MainLink>
            <MainLink link="/" text="Reports" disabled={true}>
                <Report aria-label="Report" size="XXL" />
            </MainLink>
            <MainLink link="/" text="Administration" disabled={true}>
                <Settings aria-label="Settings" size="XXL" />
            </MainLink>
            <MainLink link="/" text="Users" disabled={true}>
                <UserGroup aria-label="UserGroup" size="XXL" />
            </MainLink>
        </Masonry>
    </ResponsiveMasonry>
)

export default Cockpit
