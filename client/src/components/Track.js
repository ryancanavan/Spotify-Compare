import React from 'react';
import spotifyLogo from '../Spotify_Icon_Green.png';

function Track(props) {
	var artists = "";
	var common = false;
	props.data.track.artists.map((track) =>
        artists += track.name + ", "
	);
	artists = artists.substring(0, artists.length - 2);
	for(let i = 0; i < props.commonTracks.length; i++){
		if(props.data.track.id === props.commonTracks[i].track.id){
			common = true;
		}
	}
	let style;
	if(common){
		style = { backgroundColor: "#1DB954", };
	}
	return (
		<div className="Track" style={style}>
			<div className="TrackImage">
				{ props.data.track.album.images[0] ?
                        		<img src={props.data.track.album.images[0].url} alt="Track Icon" height="70px" width="70px" /> :
                        		<img src={spotifyLogo} alt="Spotify Logo" height="70px" width="70px" />
                		}
			</div>
			<div className="TrackName">
				<h3>{props.data.track.name}</h3>
				<div className="ArtistName"><h5>{artists}</h5></div>
			</div>
		</div>
	)
}

export default Track;