import React, { Component } from 'react';
import Frame from './Frame';

class Welcome extends Component {
	constructor() {
		super();
		this.state = {
            playlists: [],
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
                if(data.total > (data.offset + data.limit)) {
                    let newPlaylists = this.state.playlists.concat(data.items);
                    this.setState({
                        playlists: newPlaylists
                    });
                    this.getPlaylists((data.offset + data.limit));
                } else {
                    let newPlaylists = this.state.playlists.concat(data.items);
                    this.setState({
                        playlists: newPlaylists
                    });
                }
            });
        });
    }

    comparePlaylists() {

    }

	render() {
		return (
			<div className="Welcome">
                <button className="CompareButton" onClick={this.comparePlaylists()}><b>Compare Playlists</b></button>
                <Frame side="Left" playlists={this.state.playlists} params={this.props.params} />
                <Frame side="Right" playlists={this.state.playlists} params={this.props.params} />
			</div>
		)
	}
}

export default Welcome;