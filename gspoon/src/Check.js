import React, { Component } from 'react';
import { getObject } from './api';
import AddItem from './AddItem';

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
        console.log('Show check:', this.props.check);
        return (
            <div className="checkData">
                {this.hasAllData() 
                    ? this.state.details.orderedItems.map((itm) => <p key={itm.id}>{itm.id}</p>)
                    : <p>No items yet</p>
                }
                <AddItem menu={this.props.menu} handleAddItem={this.handleAddItem}/>
            </div>
        );
    }

    // -------------------------------------------------------------------------------- Helpers

    hasAllData = () => {
        return this.state.details 
            && this.state.details.orderedItems 
            && this.state.details.orderedItems.length;
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


    // -------------------------------------------------------------------------------- Event handler methods
    handleAddItem = (evt, itm) => {
        evt.preventDefault();
        console.log('add item:', itm);
    }
    
}

export default Check;