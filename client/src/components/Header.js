import React from 'react';
import spotifyLogo from '../Spotify_Icon_Green.png';

function Header() {
	return (
		<div className="Header">
			<img className="Logo" src={spotifyLogo} alt="Spotify Logo" height="100" width="100" /> 
			<h1 className="Title">Spotify Compare</h1>
		</div>
	);
}

export default Header;