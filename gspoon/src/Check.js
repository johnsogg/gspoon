import React, { Component } from 'react';
import { getObject, putData } from './api';
import AddItems from './AddItems';
import Item from './Item';
import { getOrderSubtotal } from './helpers';

// Check is a component that shows the order subtotal (or total for 
// closed checks), a list of ordered items, and (if the check is 
// open) a UI for adding more items.
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
            <div className={this.checkStyle()}>
                {this.renderOrderSubtotal()}
                {this.hasAllData()
                    ? this.renderItems(this.state.details.orderedItems)
                    : <div id="orderedItems" className="orderList"><p>No items yet</p></div>
                }
                {
                    this.state.details && !this.state.details.closed && <AddItems menu={this.props.menu} handleAddItem={this.handleAddItem} />
                }

            </div>
        );
    }

    renderOrderSubtotal = () => {
        let totPrice = 0.0;
        let title = "Subtotal";
        if (this.state.details) {
            totPrice = getOrderSubtotal(this.state.details.orderedItems, this.props.menu);
            if (this.state.details.closed) {
                totPrice = totPrice + this.state.details.tax + this.state.details.tip;
                title = "Total";
            }
        }
        return <p>{title}: ${totPrice.toFixed(2)}</p>; // make nicer
    }

    renderItems = (orderedItems) => {
        const items = orderedItems.map((itm) => {
            return <Item 
                maybeVoid={this.maybeVoid} 
                check={this.props.check.id} 
                key={itm.id} 
                menu={this.props.menu} 
                item={itm} />;
            });

        return (
            <div id="orderedItems" className="orderList">
                {items}
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

    getItem = (mid) => {
        return this.props.menu.find(i => i.id === mid);
    }

    checkStyle = () => {
        return (this.state.details && this.state.details.closed
            ? "checkClosed"
            : "");
    }

    scrollItemListToBottom = () => {
        const objDiv = document.getElementById("orderedItems");
        objDiv.scrollTop = objDiv.scrollHeight;
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
                    }, this.scrollItemListToBottom);
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
        if (this.props.check.closed) {
            return; // can't void items on closed checks, yo.
        }

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