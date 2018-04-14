import React, { Component } from 'react';
import AddItem from './AddItem';

class AddItems extends Component {
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
                <p><b>Pick from these items:</b></p>
                <AddItem menu={this.props.menu} handleAddItem={this.props.handleAddItem} />
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

    // -------------------------------------------------------------------------------- Helpers

}

export default AddItems;