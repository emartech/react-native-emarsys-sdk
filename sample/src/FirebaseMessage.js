import firebase from '@react-native-firebase/app'
import '@react-native-firebase/messaging';

export default async ( remoteMessage ) => {

	console.log("+++ FCM onMessage: ", remoteMessage )
	
	if ( remoteMessage ) {
		console.log( "FCM Offline Message: ", ( remoteMessage.data ) ? remoteMessage.data : "No message" )
	}

	return Promise.resolve()
}
