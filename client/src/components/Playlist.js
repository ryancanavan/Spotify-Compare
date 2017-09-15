import React from 'react';

function Playlist(props) {
	return (
		<div className="Playlist">
			<div className="PlaylistImage">
				<img src={props.info.images[0].url} height="100px" width="100px" />
			</div>
			<div className="PlaylistName">
				<h2>{props.info.name}</h2>
			</div>
		</div>
	)
}

export default Playlist;