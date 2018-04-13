import React, { Component } from 'react';
import { getObject, putData } from './api';
import AddItem from './AddItem';
import Item from './Item';

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
        return (
            <div className="checkData">
                {this.hasAllData()
                    ? this.state.details.orderedItems.map((itm) => <Item maybeVoid={this.maybeVoid} check={this.props.check.id} key={itm.id} menu={this.props.menu} item={itm} />)
                    : <p>No items yet</p>
                }
                <p><b>Pick from these items:</b></p>
                <AddItem menu={this.props.menu} handleAddItem={this.handleAddItem} />
            </div>
        );
    }

    // -------------------------------------------------------------------------------- Helpers

    hasAllData = () => {
        return this.state.details
            && this.state.details.orderedItems
            && this.state.details.orderedItems.length;
    }

    getItemInfo = (itm) => {
        const menuItem = this.props.menu.find((i) => i.id === itm.itemId);
        return menuItem ? menuItem.name : 'Lost Item';
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
    addItemToCheck = (itm) => {
        const msg = {
            'itemId': itm.id
        }
        putData(`/checks/${this.props.check.id}/addItem`, msg)
            .then((json) => {
                if (this._isMounted) {
                    this.setState((prevState) => {
                        const prevDetails = prevState.details;
                        prevDetails.orderedItems = prevDetails.orderedItems.concat(json);
                        return {
                            details: prevDetails
                        }
                    });
                }
            });
    }

    voidItemFromCheck = (itm) => {
        if (this._isMounted) {
            this.setState((prevState) => {
                const prevDetails = prevState.details;
                // rm current version from list
                prevDetails.orderedItems = prevDetails.orderedItems.filter((oi) => oi.id !== itm.id);
                // add itm back in, as it is voided
                prevDetails.orderedItems = prevDetails.orderedItems.concat(itm);
                return {
                    details: prevDetails
                }
            });
        }
    }

    // -------------------------------------------------------------------------------- Event handler methods
    handleAddItem = (evt, itm) => {
        evt.preventDefault();
        this.addItemToCheck(itm);
    }

    maybeVoid = (evt, orderedItemId) => {
        evt.preventDefault();

        const msg = {
            'orderedItemId': orderedItemId
        }
        putData(`/checks/${this.props.check.id}/voidItem`, msg)
            .then((json) => {
                this.voidItemFromCheck(json);
            });
    }

}

export default Check;