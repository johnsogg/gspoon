import React, { Component } from 'react';
import { getOrderSubtotal } from './helpers';
import { getObject } from './api';
import moment from 'moment'
import { Button } from 'reactstrap';

// ReviewCheck is a component that shows the date and total for a 
// closed out check. If activated it will trigger an action that 
// should bring up details.
class ReviewCheck extends Component {

    // -------------------------------------------------------------------------------- Constructor & Render    
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            details: undefined
        };
    }

    render() {
        let total = 0.0;
        let updated = "";
        if (this.state.details && this.state.details.orderedItems) {
            const sub = getOrderSubtotal(this.state.details.orderedItems, this.props.menu);
            total = sub + this.state.details.tax + this.state.details.tip;
            updated = moment(this.state.details.dateUpdated).format("MM/DD HH:mm");
        }
        return (
            <div>
                <Button color="secondary" className="wideBtn" onClick={(evt) => this.props.onOldCheck(evt, this.props.check)}>{updated} ${total.toFixed(2)}</Button>
            </div>
        );
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

}

export default ReviewCheck;