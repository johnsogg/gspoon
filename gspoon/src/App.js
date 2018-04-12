import React, { Component } from 'react';
import Floorplan from './Floorplan';
import Table from './Table';
import { getList } from './api';
import './App.css';

class App extends Component {
  constructor() {
    super();

    // methods bound to this
    this.fetchTables        = this.fetchTables.bind(this);
    this.handlePickTable    = this.handlePickTable.bind(this);

    this._isMounted = false; // placate tests which unload before data arrives
    this.state = {
      topComponent: 'Floorplan',
      currentTable: undefined,
      tables: []
    }
  }
  // -------------------------------------------------------------------------------- Lifecycle methods
  componentDidMount() {
    this._isMounted = true;
    this.fetchTables();

  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // -------------------------------------------------------------------------------- Data methods
  fetchTables() {
    getList("/tables")
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

    // -------------------------------------------------------------------------------- Event handler methods
  handlePickTable(evt, table) {
    evt.preventDefault();
    console.log("table picked!", table);
    this.setState(() => {
      return {
        topComponent: 'Table',
        currentTable: table
      }
    });
  }

  
  render() {
    return (      
      <div className="App">
        {this.state.topComponent === 'Floorplan' && <Floorplan tables={this.state.tables} handlePickTable={this.handlePickTable}/>}
        {this.state.topComponent === 'Table' && <Table table={this.state.currentTable}/>}
      </div>
    );
  }
}

export default App;
