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
        this.getPlaylists();
    }

	getPlaylists() {
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

    getForeignPlaylists = (dataFromChild) => {
        let user = dataFromChild;
        let params = this.props.params;
        fetch('https://api.spotify.com/v1/users/' + user + '/playlists', {
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

    comparePlaylists() {

    }

	render() {
		return (
			<div className="Welcome">
                <button className="CompareButton" onClick={this.comparePlaylists()}><b>Compare Playlists</b></button>
                <Frame side="Left" playlists={this.state.playlists} params={this.props.params} changeUser={this.getForeignPlaylists} />
                <Frame side="Right" playlists={this.state.playlists} params={this.props.params} changeUser={() => this.getForeignPlaylists} />
			</div>
		)
	}
}

export default Welcome;