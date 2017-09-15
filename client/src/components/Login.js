import React from 'react';
import LoginButton from '../login.svg';

function Login() {
	return (
		<div className="Login">
			<a href="/login"><img src={LoginButton} alt="Log in to Spotify" height="150px" width="400px"/></a>
		</div>
	);
}

export default Login;