import React, { Component } from 'react';
import Floorplan from './Floorplan';
import { getList } from './api';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.fetchTables = this.fetchTables.bind(this);
    this._isMounted = false; // placate tests which unload before data arrives
    this.state = {
      tables: undefined
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

  componentDidMount() {
    this._isMounted = true;
    this.fetchTables();

  }
  
  render() {
    console.log("state:", this.state);
    return (      
      <div className="App">
        <Floorplan />
        
      </div>
    );
  }
}

export default App;
