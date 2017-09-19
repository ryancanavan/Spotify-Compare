import React from 'react';

function Login(props) {
	return (
		<div className="Login">
			{(props.error !== "") &&
				<h2>An error occurred. Please try again.</h2>
			}
			<br />
			<a href="/login"><button className="LoginButton"><b>Login With Spotify</b></button></a>
		</div>
	);
}

export default Login;