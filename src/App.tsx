import { Key } from 'react'
import { Switch, Route, Redirect, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Provider, defaultTheme, Breadcrumbs, Item, View, Flex } from '@adobe/react-spectrum'
import { selectBreadcrumbs } from './features/breadcrumbsSlice'
import Cockpit from './features/Cockpit/Cockpit'
import Overview from './features/Overview/Overview'
import User from '@spectrum-icons/workflow/User'
import Allocation from './features/Allocation/Allocation'
import ManageEvent from './features/ManageEvent/ManageEvent'
import styles from './App.module.css'

const App = () => {
	const breadcrumbs = useSelector(selectBreadcrumbs)
	const history = useHistory()

	const breadcrumpHandler = (a: Key) => {
		history.push(breadcrumbs[+a - 1].path)
	}

	return (
		<Provider theme={defaultTheme} colorScheme="light">
			<div className={styles.root}>
				<header className={styles.header}>
					<Flex direction="row" gap="size-1000" justifyContent="space-between" alignItems="center" >
						<h1 className={styles.title}>{ breadcrumbs[breadcrumbs.length - 1]?.title || '' }</h1>
						{ breadcrumbs.length > 1 ?
							<View overflow="hidden" width="300px">
								<Breadcrumbs 
									showRoot
									UNSAFE_className={styles.breadcrumbs} 
									onAction={(a: Key) => breadcrumpHandler(a)}
									size="S">
									{ breadcrumbs.map((breadcrumb: {id: number, label: string}) => <Item key={breadcrumb.id}>{breadcrumb.label}</Item>) }
								</Breadcrumbs>
							</View> : <></>
						}
						<Flex alignItems="center" gap="size-200">
							<span>Username</span>
							<div className={styles.userIconWrapper}>
								<User aria-label="User" size="L" />
							</div>
						</Flex>
					</Flex>
				</header>
				<div className={styles.container}>
					<Switch>
						<Route exact path="/" component={Cockpit} />
						<Route exact path="/overview" component={Overview} />
						<Route exact path="/overview/event/:id" component={ManageEvent} />
						<Route exact path="/allocation" component={Allocation} />
						<Redirect from='*' to='/' />
					</Switch>
				</div>
			</div>
		</Provider>
	)
}

export default App
