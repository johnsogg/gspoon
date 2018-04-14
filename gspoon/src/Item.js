import React, { Component } from 'react';
import { Button } from 'reactstrap';

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
        const buttonStyle = {
            border: 0, 
            solid:true, 
            transparent:true,
            color: '#000000',
        }
        return (
            <div>
                { this.props.item.voided 
                    ? <del>{menuItem.name}</del>
                    : <Button outline color="danger" style={buttonStyle} onClick={(evt) => this.props.maybeVoid(evt, this.props.item.id)}>{menuItem.name.toLowerCase()} ${menuItem.price}</Button>
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