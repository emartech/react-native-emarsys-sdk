import { action, observable } from "mobx"

class Auth {
	@observable token = false
	@observable deepLink = ""
	@observable isPaused = false
	@observable init = false

	@action reset() {
		this.token = false
		this.deepLink = ""
		this.isPaused = false
		this.init = false
	}
	
	@action login( callback ) {
		this.token = true

		Boolean( callback ) && callback()
	}

	@action logout( callback ) {
		this.reset()

		Boolean( callback ) && callback()
	}	
}

export default new Auth()
