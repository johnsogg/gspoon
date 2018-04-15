import React, { Component } from 'react';
import Floorplan from './Floorplan';
import Table from './Table';
import { getObject } from './api';
import './App.css';

// App is the top-level component for the Greasy Spoon app.
class App extends Component {
    // -------------------------------------------------------------------------------- Constructor & Render
    constructor() {
        super();

        this._isMounted = false; // placate tests which unload before data arrives
        this.state = {
            topComponent: 'Floorplan',
            currentTable: undefined,
            tables: [],
            menu: []
        }
    }

    render() {
        return (
            <div className="App">
                {this.state.topComponent === 'Floorplan' && <Floorplan tables={this.state.tables} handlePickTable={this.handlePickTable} />}
                {this.state.topComponent === 'Table' && <Table menu={this.state.menu} back={this.handleDismissAll} table={this.state.currentTable} />}
            </div>
        );
    }

    // -------------------------------------------------------------------------------- Lifecycle methods
    componentDidMount() {
        this._isMounted = true;
        this.fetchTables();
        this.fetchMenu();

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // -------------------------------------------------------------------------------- Data methods
    fetchTables = () => {
        getObject("/tables")
            .then((json) => {
                if (this._isMounted) {
                    this.setState(() => {
                        return {
                            tables: json
                        }
                    });
                }
            });
    }

    fetchMenu = () => {
        getObject("/items")
            .then((json) => {
                if (this._isMounted) {
                    this.setState(() => {
                        return {
                            menu: json
                        }
                    });
                }
            });
    }

    // -------------------------------------------------------------------------------- Event handler methods
    handlePickTable = (evt, table) => {
        evt.preventDefault();
        this.setState(() => {
            return {
                topComponent: 'Table',
                currentTable: table
            }
        });
    }

    handleDismissAll = (evt) => {
        evt.preventDefault();
        this.setState(() => {
            return {
                topComponent: 'Floorplan'
            }
        });
    }
}

export default App;