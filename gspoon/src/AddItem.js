import React, { Component } from 'react';
import { Button } from 'reactstrap';

// AddItem is a component used to present a grid of menu items and allow 
// the user to pick one of them to add to the current check.
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
                {this.renderAddItemGrid(this.props.menu)}
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

    // -------------------------------------------------------------------------------- Helpers

    makeItemButton = (itm) => {
        return (
            <Button key={itm.id} outline color="success" className="btn-block" size="sm" onClick={(evt) => this.props.handleAddItem(evt, itm)}>{itm.name.toLowerCase()}</Button>
        );
    }

    renderAddItemGrid = (menu) => {
        // given a list of menu items, make a container with enough rows. each row contains numCols items
        const numCols = 2;
        let rows = [];
        for (let i=0; i < menu.length; i += numCols) {
            const row = (
                <div key={'menuItemRow' + i} className="row">
                {
                    menu
                        .slice(i, i+numCols)
                        .map((menuItem) => {
                            return <div key={menuItem.id} className="col">{this.makeItemButton(menuItem)}</div>
                        })
                }
                </div>
            );
            rows.push(row);
        }
        return (
            <div className="container">{rows}</div>
        );
    }
}

export default AddItem;