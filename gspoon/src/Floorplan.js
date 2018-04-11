import React, { Component } from 'react';

class Floorplan extends Component {
    render() {
        return (
            <div>
                <h1>Tables</h1>
                <form>
                {
                    this.props.tables.map(table => <button key={table.id} onClick={this.props.handlePickTable}>{table.number}</button>)
                }
                </form>
            </div>
        );
    }
}

export default Floorplan;