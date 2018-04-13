import React, { Component } from 'react';
import { getList, postData } from './api';
import Check from './Check';

class Table extends Component {

    // -------------------------------------------------------------------------------- Constructor & Render    
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            checks: [],
            openCheck: undefined
        };
    }

    render() {
        return (
            <div>
                <button onClick={this.props.back} >&lt; Back</button>
                <h1>Table {this.props.table.number}</h1>
                <p>{this.state.checks.length} checks</p>
                {
                    this.state.openCheck ? <Check menu={this.props.menu} check={this.state.openCheck} /> : <button onClick={this.handlePickTable}>New Check</button>
                }
            </div>
        );
    }

    // -------------------------------------------------------------------------------- Lifecycle methods
    componentDidMount() {
        this._isMounted = true;
        this.fetchChecks();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // -------------------------------------------------------------------------------- Data methods

    fetchCheck = (checks) => {
        const check = checks && checks.find((c) => { return c.closed === false; });
        if (this._isMounted) {
            this.setState(() => {
                return {
                    checks: checks,
                    openCheck: check
                }
            });
        }
    }

    fetchChecks = () => {
        getList("/checks")
            .then((json) => {
                const myChecks = json.filter((c) => { return c.tableId === this.props.table.id; });
                this.fetchCheck(myChecks);
            });
    }

    // -------------------------------------------------------------------------------- Event handler methods
    handlePickTable = (evt) => {
        evt.preventDefault();

        const msg = {
            'tableId': this.props.table.id
        }
        postData('/checks', msg)
            .then((json) => {
                if (this._isMounted) {
                    this.fetchChecks(); // just force a reload, it should do the right thing
                }
            });
    }
}

export default Table;