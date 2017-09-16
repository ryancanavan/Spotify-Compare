import React, { Component } from 'react';
import Login from './Login';
import Welcome from './Welcome';

class Body extends Component {
	constructor() {
		super();
		this.state = {
			loggedIn: false,
		};
	}

	getHashParams() {
		var hashParams = {};
		var e, r = /([^&;=]+)=?([^&;]*)/g,
			q = window.location.hash.substring(1);
		// eslint-disable-next-line
		while ( e = r.exec(q)) {
			hashParams[e[1]] = decodeURIComponent(e[2]);
		}
		return hashParams;
	}

	loggedInCheck(params) {
        if(!this.isEmpty(params)){
            this.setState({
                loggedIn: true,
            });
        }
	}
	
	isEmpty(obj) {
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop))
				return false;
		}
		return JSON.stringify(obj) === JSON.stringify({});
	}

	render() {
		let params = this.getHashParams();
		if(params.error){
			return <Login error={params.error} />
		}
		let loggedIn = this.state.loggedIn;
        if(loggedIn === false)
			this.loggedInCheck(params);
		if(loggedIn){
			return <Welcome params={params} />;
		}
		return <Login error="" />;
	}
}

export default Body;