import React, { Component } from 'react';
import Track from './Track';

class TrackList extends Component {
	constructor(){
		super();
		this.state = {
			sort: "oldest",
			filter: false,
		};
	}

	filterChange() {
		const newFilter = this.state.filter ? false : true;
		this.setState({
			filter: newFilter
		});
	}

	render() {
		var tracks = this.props.data;
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
						<select defaultValue={this.state.sort} onChange={this.orderChange}>
							<option value="oldest">Oldest First</option>
							<option value="newest">Newest First</option>
							<option value="alphabetical">A-Z</option>
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