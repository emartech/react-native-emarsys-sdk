import { CommonActions } from '@react-navigation/native';

let navigator

function setTopLevelNavigator( navigatorRef ) {
	navigator = navigatorRef
}

function navigate(routeName, params) {
	navigator.dispatch(
		CommonActions.navigate({ routeName, params,	})
	)
}

const Navigation = {
	navigate,
	setTopLevelNavigator,
}

export default Navigation
