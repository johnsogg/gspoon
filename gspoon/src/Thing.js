import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

class Thing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: undefined
        };
        this._isMounted = false; // placate tests which unload before data arrives
    }
    render() {
        return (
            <div>
                <p>This is a Thing.</p>
                {this.state.post && <p>{this.state.post.title}</p>}
            </div>
        );
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        console.log("Thing mounted!");
        fetch('https://jsonplaceholder.typicode.com/posts/1')
            .then(response => response.json())
            .then(json => {
                if (this._isMounted) {
                    console.log(json);
                    this.setState(() => {
                        return {
                            post: json
                        }
                    });
                }               
            });
    }
}

export default Thing;