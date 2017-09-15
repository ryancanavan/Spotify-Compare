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
            foreignPlaylist: false,
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

    getForeignPlaylist(offset) {
        let params = this.props.params;
        fetch('https://api.spotify.com/v1/users/' + this.state.username + '/playlists?offset=' + offset, {
            headers: {
                'Authorization': 'Bearer ' + params.access_token,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            res.json().then((data) => {
                if(data.total > (data.offset + data.limit)) {
                    let newPlaylists = this.state.playlists.concat(data.items);
                    this.setState({
                        playlists: newPlaylists
                    });
                    this.getForeignPlaylist((data.offset + data.limit));
                } else {
                    let newPlaylists = this.state.playlists.concat(data.items);
                    this.setState({
                        playlists: newPlaylists,
                        foreignPlaylist: true
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

    resetUserPlaylists() {
        this.setState({
            playlists: this.props.playlists,
            foreignPlaylist: false
        });
    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            playlists: []
        });
        this.getForeignPlaylist(0);
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
                            { this.state.foreignPlaylist ? (
                                <button className="ResetButton" onClick={() => this.resetUserPlaylists()}><b>Your Playlists</b></button>
                            ) : (
                                <form onSubmit={this.handleSubmit}>
                                    <textarea placeholder="Enter a Username" value={this.state.value} onChange={this.handleChange} />
                                    <input type="submit" value="&#x1F50E;" />
                                </form>
                            )}
                            {this.state.playlists.map((playlist, index) =>
                                <Playlist key={index} data={playlist} onClick={() => this.playlistSelect(playlist.tracks.href, playlist.name, 0)} />
                            )}
                            { this.state.playlists.length === 0 ?
                                <h3>This user has no public playlists</h3> :
                                null
                            }
                        </div>
                    )}
                </div>
			</div>
		)
	}
}

export default Frame;