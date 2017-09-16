import React from 'react';
import LoginButton from '../login.svg';

function Login(props) {
	return (
		<div className="Login">
			{(props.error !== "") ?
				<h2>An error occurred. Please try again.</h2> :
				null
			}
			<a href="/login"><img src={LoginButton} alt="Log in to Spotify" height="150px" width="400px"/></a>
		</div>
	);
}

export default Login;