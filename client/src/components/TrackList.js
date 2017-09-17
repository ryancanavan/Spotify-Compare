import React, { Component } from 'react';
import Track from './Track';

class TrackList extends Component {
	constructor(props){
		super(props);
		this.state = {
			sort: "oldest",
			filter: false,
			playlist: props.data,
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			playlist: nextProps.data
		})
	}

	filterChange() {
		const newFilter = this.state.filter ? false : true;
		this.setState({
			filter: newFilter
		});
	}

	orderChange(event) {
		switch(event.target.value) {
			case "oldest":
				let oldestPlaylist = this.state.playlist.sort(function(a, b){
					var dateA = new Date(a.added_at);
					var dateB = new Date(b.added_at);
					return dateA - dateB;
				});
				this.setState({
					playlist: oldestPlaylist
				});
				break;
			case "newest":
				let newestPlaylist = this.state.playlist.sort(function(a, b){
					var dateA = new Date(a.added_at);
					var dateB = new Date(b.added_at);
					return dateA - dateB;
				});
				newestPlaylist.reverse();
				this.setState({
					playlist: newestPlaylist
				});
				break;
			case "alphabetical":
				let alphabeticalPlaylist = this.state.playlist.sort(function(a, b){
					var nameA = a.track.name.toUpperCase();
					var nameB = b.track.name.toUpperCase();
					if(nameA < nameB)
						return -1;
					if(nameB < nameA)
						return 1;
					return 0;
				});
				this.setState({
					playlist: alphabeticalPlaylist
				});
				break;
			case "reverseAlphabetical":
				let reverseAlphabeticalPlaylist = this.state.playlist.sort(function(a, b){
					var nameA = a.track.name.toUpperCase();
					var nameB = b.track.name.toUpperCase();
					if(nameA < nameB)
						return -1;
					if(nameB < nameA)
						return 1;
					return 0;
				});
				reverseAlphabeticalPlaylist.reverse();
				this.setState({
					playlist: reverseAlphabeticalPlaylist
				});
				break;
			default:
				break;
		}
	}

	render() {
		var tracks = this.state.playlist;
		if(this.props.commonTracks.length !== 0 && this.state.filter){
			tracks = this.props.commonTracks;
		}
		return (
			<div className="TrackList">
				<button className="ResetButton" onClick={this.props.onClick}><b>Choose Different Playlist</b></button>
				<h2>{this.props.playlistName}</h2>
				<div className="Sort">
					<form>
						<label>Sort By: </label>
						<select defaultValue={this.state.sort} onChange={this.orderChange.bind(this)}>
							<option value="oldest">Oldest First</option>
							<option value="newest">Newest First</option>
							<option value="alphabetical">A-Z</option>
							<option value="reverseAlphabetical">Z-A</option>
						</select>
					</form>
				</div>
				<div className="Filter">
					<form>
						<label style={{float: "left"}}>Filter : </label>
						<label className="switch">
							<input type="checkbox" checked={this.state.filter} onChange={this.filterChange.bind(this)} />
							<span className="slider round"></span>
						</label>
					</form>
				</div>
				{tracks.map((track, index) =>
					<Track key={index} data={track} commonTracks={this.props.commonTracks} />
				)}
			</div>
		)
	}
}

export default TrackList;