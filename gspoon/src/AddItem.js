import React, { Component } from 'react';
// import { getList, postData } from './api';
// import Check from './Check';

class AddItem extends Component {
    // -------------------------------------------------------------------------------- Constructor & Render
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            // TODO
        };
    }

    render() {
        
        return (
            <div>
                <button onClick={this.props.handleAddItem}>Hamburger</button><br />
                <button onClick={this.props.handleAddItem}>Salad</button><br />
                <button onClick={this.props.handleAddItem}>Beer</button><br />
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

export default AddItem;