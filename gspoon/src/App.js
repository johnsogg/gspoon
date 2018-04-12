import React, { Component } from 'react';
import Floorplan from './Floorplan';
import { getList } from './api';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    // methods bound to this
    this.fetchTables        = this.fetchTables.bind(this);
    this.handlePickTable    = this.handlePickTable.bind(this);

    this._isMounted = false; // placate tests which unload before data arrives
    this.state = {
      topComponent: 'NutsFloorplan',
      tables: []
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

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

  handlePickTable(evt) {
    evt.preventDefault();
    console.log("table picked!");
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchTables();

  }
  
  render() {
    return (      
      <div className="App">
        <Floorplan top={this.state.topComponent} tables={this.state.tables} handlePickTable={this.handlePickTable}/>
        
      </div>
    );
  }
}

export default App;
