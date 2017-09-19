import React from 'react';
import Philly from '../philly.png';
import Bg from '../bg.png';

function Login(props) {
	return (
		<div className="Login">
			<img className="Bg" alt="" src={Bg} />
			<img className="BackgroundImage" alt="" src={Philly} />
			<div className="LoginContents">
				<h1 style={{fontSize:"50px",marginBottom:"-10px"}}>Spotify Compare</h1>
				<h3 style={{marginBottom:"-5px"}}>Check out your friends' Spotify playlists and compare them to see what musical tastes you have in common!</h3>
				<h3>Login to get started!</h3>
				<br />
				{(props.error !== "") && <h2>An error occurred. Please try again.</h2>}
				<a href="/login"><button className="LoginButton"><b>Login With Spotify</b></button></a>
			</div>
		</div>
	);
}

export default Login;