import React, { Component } from 'react';
import Playlist from './Playlist';

class Welcome extends Component {
	constructor() {
		super();
		this.state = {
			playlists: [],
		};
	}

    componentDidMount() {
        this.getUsername();
    }

	getUsername() {
        let params = this.props.params;
        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {
                'Authorization': 'Bearer ' + params.access_token,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            res.json().then((data) => {
                this.setState({
                    playlists: data.items
                });
            });
        });
    }

	render() {
		return (
			<div className="Welcome">
				<h2>Choose a Playlist</h2>
                {this.state.playlists.map((playlist, index) =>
                    <Playlist key={index} info={playlist} />
                )}
			</div>
		)
	}
}

export default Welcome;