import React, { Component } from 'react';
import { getObject } from './api';

class Check extends Component {

    // -------------------------------------------------------------------------------- Constructor & Render
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            details: undefined
        };
    }

    render() {
        console.log('Show check:', this.props.check);
        return (
            <div>
                {this.state.details && <p>{this.state.details.dateCreated}</p>}
            </div>
        );
    }

    // -------------------------------------------------------------------------------- Lifecycle methods
    componentDidMount() {
        this._isMounted = true;
        getObject(`/checks/${this.props.check.id}`)
            .then((json) => {
                if (this._isMounted) {
                    this.setState(() => {
                        return {
                            details: json
                        }
                    });
                }
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // -------------------------------------------------------------------------------- Data methods


    // -------------------------------------------------------------------------------- Event handler methods

    
}

export default Check;