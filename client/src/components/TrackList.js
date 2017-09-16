import React from 'react';
import Track from './Track';

function TrackList(props) {
	return (
		<div className="TrackList">
			<h2>{props.playlistName}</h2>
			<button className="ResetButton" onClick={props.onClick}><b>Choose Different Playlist</b></button>
			{props.data.map((track, index) =>
				<Track key={index} data={track} commonTracks={props.commonTracks} />
			)}
		</div>
	)
}

export default TrackList;