import React, { Component } from 'react';
import { getList, postData } from './api';

class Check extends Component {

    // -------------------------------------------------------------------------------- Constructor & Render
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            // TODO
        };
    }

    render() {
        console.log('check:', this.props.check);
        return (
            <div>
                <p>My check:</p>
            </div>
        );
    }

    // -------------------------------------------------------------------------------- Lifecycle methods
    componentDidMount() {
        this._isMounted = true;

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // -------------------------------------------------------------------------------- Data methods


    // -------------------------------------------------------------------------------- Event handler methods

    
}

export default Check;