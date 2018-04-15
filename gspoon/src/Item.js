import React, { Component } from 'react';
import { Button } from 'reactstrap';

// Item represents a single ordered item, which might have been voided.
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
        const activeItem = { // this is a reactstrap thing. Button needs an object to style it.
            border: 0, 
            solid:true, 
            transparent:true,
            color: '#000000',
        }
        const voidedItem = {
            border: 0,
            solid: true,
            transparent: true,
            color: '#a0a0a0',
            textDecoration: 'line-through'
        }
        return (
            <div>
                { this.props.item.voided 
                    ? <Button outline color="danger" style={voidedItem}>{menuItem.name.toLowerCase()} ${menuItem.price}</Button>
                    : <Button outline color="danger" style={activeItem} onClick={(evt) => this.props.maybeVoid(evt, this.props.item.id)}>{menuItem.name.toLowerCase()} ${menuItem.price}</Button>
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
    
}

export default Item;