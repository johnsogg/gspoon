import React, { Component } from 'react';
import { getList, postData, putData } from './api';
import Check from './Check';
import ReviewCheck from './ReviewCheck';
import { Button } from 'reactstrap';


class Table extends Component {

    // -------------------------------------------------------------------------------- Constructor & Render    
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            checks: [],
            openCheck: undefined,
            oldCheck: undefined,
            review: false,
        };
    }

    render() {
        return (
            <div>
                <button onClick={this.props.back} >&lt; Back</button>
                <h1>Table {this.props.table.number}</h1>
                {
                    // Sorry for this. Clarity can be a casualty of convenience :(
                    this.state.review
                        ? this.getReviewUI()
                        : this.state.oldCheck
                            ? this.getOldCheckUI()
                            : this.getCurrentUI()
                }

            </div>
        );
    }

    getReviewUI = () => {
        return (
            <div>
            {
                this.state.checks
                    .filter( (chk) => { return chk.closed })
                    .map( (chk) => { return <ReviewCheck onOldCheck={this.handleShowOldCheck} menu={this.props.menu} key={chk.id} check={chk}/> } )
            }
            </div>
        );
    }

    getCurrentUI = () => {
        return (
            <div>
                <Button color="light" onClick={this.handleHistory}>Review {this.closedCheckCount()} past checks</Button>
                {
                    this.state.openCheck
                        ? <div><Button color="danger" onClick={this.handleCloseCheck}>Close Check</Button><Check menu={this.props.menu} check={this.state.openCheck} /></div>
                        : <Button color="success" onClick={this.handlePickTable}>New Check</Button>
                }
            </div>
        );
    }

    getOldCheckUI = () => {
        
        return (
            <div>
                <p>Closed Check from the past</p>
                <Check menu={this.props.menu} check={this.state.oldCheck} />
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
                    openCheck: check,
                    oldCheck: undefined
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

    closedCheckCount = () => {
        return this.state.checks.filter((chk) => { return chk.closed }).length
    }

    markCheckClosed = (newVal) => {
        this.setState((prevState) => {
            let myChecks = prevState.checks.filter((c) => { return c.id !== newVal.id });
            myChecks = myChecks.concat(newVal);
            return {
                checks: myChecks,
                openCheck: undefined,
                oldCheck: undefined
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
        this.setState(() => {
            return {
                review: true,
                oldCheck: undefined
            }
        });
    }

    handleShowOldCheck = (evt, check) => {
        evt.preventDefault();
        if (this._isMounted) {
            this.setState(() => { 
                return {
                    review: false,
                    openCheck: undefined,
                    oldCheck: check
                }
            });
        }
    }

}

export default Table;