import { NavigationActions } from 'react-navigation'

let navigator

function setTopLevelNavigator( navigatorRef ) {
	navigator = navigatorRef
}

function navigate(routeName, params) {
	navigator.dispatch(
		NavigationActions.navigate({ routeName, params,	})
	)
}

const Navigation = {
	navigate,
	setTopLevelNavigator,
}

export default Navigation
