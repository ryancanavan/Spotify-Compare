import React from 'react';

function Playlist(props) {
	return (
		<div>
			<a onClick={props.onClick}>
				<div className="Playlist">
						<div className="PlaylistImage">
							<img src={props.data.images[0].url} alt="Playlist Icon" height="100px" width="100px" />
						</div>
						<div className="PlaylistName">
							<h2>{props.data.name}</h2>
						</div>
				</div>
			</a>
		</div>
	)
}

export default Playlist;