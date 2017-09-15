import React, { Component } from 'react';
import Playlist from './Playlist';
import TrackList from './TrackList';

class Frame extends Component {
	constructor(props) {
		super(props);
		this.state = {
            username: null,
            playlists: props.playlists,
            playlistSelect: false,
            playlistTracks: [],
            playlistName: null,
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			playlists: nextProps.playlists
		})
	}

	playlistSelect(tracksUrl, playlistName, offset) {
        let params = this.props.params;
        fetch(tracksUrl + '?offset=' + offset, {
            headers: {
                'Authorization': 'Bearer ' + params.access_token,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            res.json().then((data) => {
                if(data.total > (data.offset + data.limit)) {
                    let newTracks = this.state.playlistTracks.concat(data.items);
                    this.setState({
                        playlistTracks: newTracks
                    });
                    this.playlistSelect(tracksUrl, playlistName, (data.offset + data.limit));
                } else {
                    let newTracks = this.state.playlistTracks.concat(data.items);
                    this.setState({
                        playlistSelect: true,
                        playlistTracks: newTracks,
                        playlistName: playlistName
                    });
                }
            });
        });
    }
    
    resetPlaylistSelect() {
        this.setState({
            playlistSelect: false,
            playlistTracks: [],
            playlistName: null,
        });
    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }

    handleSubmit(event) {
        this.props.changeUser(this.state.username);
        event.preventDefault();        
    }

	render() {
        const side = this.props.side + "Frame";
		return (
			<div className="Frame">
                <div className={side}>
                    { this.state.playlistSelect ? (
                        <TrackList data={this.state.playlistTracks} playlistName={this.state.playlistName} onClick={() => this.resetPlaylistSelect()} />
                    ) : (
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <textarea value={this.state.value} onChange={this.handleChange} />
                                <input type="submit" value="&#x1F50E;" />
                            </form>
                            {this.state.playlists.map((playlist, index) =>
                                <Playlist key={index} data={playlist} onClick={() => this.playlistSelect(playlist.tracks.href, playlist.name, 0)} />
                            )}
                        </div>
                    )}
                </div>
			</div>
		)
	}
}

export default Frame;