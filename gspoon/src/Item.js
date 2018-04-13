import React, { Component } from 'react';


class Item extends Component {

    // -------------------------------------------------------------------------------- Constructor & Render
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            // TODO
        };
    }

    render() {
        const menuItem = this.getItem();
        return (
            <div>
                { this.props.item.voided 
                    ? <del>{menuItem.name}</del>
                    : <button onClick={(evt) => this.props.maybeVoid(evt, this.props.item.id)}>{menuItem.name} ${menuItem.price}</button>
                }
                
            </div>
        );
    }

    // -------------------------------------------------------------------------------- Helpers
    getItem = () => {
        return this.props.menu.find((i) => i.id === this.props.item.itemId);
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

export default Item;