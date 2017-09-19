import React, { Component } from 'react';
import Frame from './Frame';

class Welcome extends Component {
	constructor() {
		super();
		this.state = {
            playlists: [],
            leftTracks: [],
            rightTracks: [],
            commonTracks: [],
            info: null,
		};
	}

    componentWillMount() {
        this.getPlaylists(0);
    }

	getPlaylists(offset) {
        let params = this.props.params;
        fetch('https://api.spotify.com/v1/me/playlists?offset=' + offset, {
            headers: {
                'Authorization': 'Bearer ' + params.access_token,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            res.json().then((data) => {
                let newPlaylists = this.state.playlists.concat(data.items);
                this.setState({
                    playlists: newPlaylists
                });
                if(data.total > (data.offset + data.limit)) {
                    this.getPlaylists((data.offset + data.limit));
                }
            });
        });
    }

    leftPlaylistSelect = (playlistTracks) => {
        this.setState({
            leftTracks: playlistTracks,
            info: null
        });
    }

    rightPlaylistSelect = (playlistTracks) => {
        this.setState({
            rightTracks: playlistTracks,
            info: null
        });
    }

    leftPlaylistReset = () => {
        this.setState({
            leftTracks: [],
            commonTracks: [],
            info: null
        });
    }

    rightPlaylistReset = () => {
        this.setState({
            rightTracks: [],
            commonTracks: [],
            info: null
        });
    }

    comparePlaylists() {
        if(this.state.leftTracks.length === 0 || this.state.rightTracks.length === 0){
            this.setState({
                info: "Please select two playlists to compare."
            });
        } else {
            let commonTracks = [];
            for(let i = 0; i < this.state.leftTracks.length; i++){
                for(let j = 0; j < this.state.rightTracks.length; j++){
                    if(this.state.leftTracks[i].track.id === this.state.rightTracks[j].track.id){
                        commonTracks.push(this.state.leftTracks[i]);
                    }
                }
            }
            this.setState({
                commonTracks: commonTracks,
                info: "Playlists Compared!"
            });
        }
    }

	render() {
		return (
			<div className="Welcome">
                <br />
                <button className="CompareButton" onClick={() => this.comparePlaylists()}><b>Compare Playlists</b></button>
                {(this.state.info) && <h3>{this.state.info}</h3>}
                <Frame side="Left" playlists={this.state.playlists} params={this.props.params} playlistSelect={this.leftPlaylistSelect} resetPlaylistSelect={this.leftPlaylistReset} commonTracks={this.state.commonTracks} />
                <Frame side="Right" playlists={this.state.playlists} params={this.props.params} playlistSelect={this.rightPlaylistSelect} resetPlaylistSelect={this.rightPlaylistReset} commonTracks={this.state.commonTracks} />
			</div>
		)
	}
}

export default Welcome;