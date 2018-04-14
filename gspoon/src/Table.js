import React, { Component } from 'react';
import { getList, postData, putData } from './api';
import Check from './Check';

class Table extends Component {

    // -------------------------------------------------------------------------------- Constructor & Render    
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            checks: [],
            openCheck: undefined,
            review: false,
        };
    }

    render() {
        return (
            <div>
                <button onClick={this.props.back} >&lt; Back</button>
                <h1>Table {this.props.table.number}</h1>
                {
                    this.state.review
                        ? this.getReviewUI()
                        : this.getCurrentUI()

                }

            </div>
        );
    }

    getReviewUI = () => {
        return (
            <div><p>review</p></div>
        );
    }

    getCurrentUI = () => {
        return (
            <div>
                <button onClick={this.handleHistory}>Review {this.state.checks.length} past checks</button>
                {
                    this.state.openCheck
                        ? <div><button onClick={this.handleCloseCheck}>Close Check</button><Check menu={this.props.menu} check={this.state.openCheck} /></div>
                        : <button onClick={this.handlePickTable}>New Check</button>
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

    closeCheck = () => {
        const checkId = this.state.openCheck.id;
        const msg = {} // empty
        putData(`/checks/${checkId}/close`, msg)
            .then((json) => { this.markCheckClosed(json); });
    }

    // -------------------------------------------------------------------------------- Helpers

    markCheckClosed = (newVal) => {
        this.setState((prevState) => {
            let myChecks = prevState.checks.filter((c) => { return c.id !== newVal.id });
            myChecks = myChecks.concat(newVal);
            return {
                checks: myChecks,
                openCheck: undefined
            };
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

    handleCloseCheck = (evt) => {
        evt.preventDefault();
        this.closeCheck();
    }

    handleHistory = (evt) => {
        evt.preventDefault();
        console.log('history lesson');
        this.setState(() => {
            return {
                review: true
            }
        });
    }

}

export default Table;