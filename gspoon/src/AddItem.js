import React, { Component } from 'react';

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
                { this.props.menu.map((menuItem) => this.makeItemButton(menuItem)) }
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
    makeItemButton = (itm) => {
        return (
            <span key={itm.id}>
                <button onClick={(evt) => this.props.handleAddItem(evt, itm)}>{itm.name}</button><br />
            </span>
        );
    }
}

export default AddItem;