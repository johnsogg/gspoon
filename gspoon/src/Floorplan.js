import React, { Component } from 'react';

class Floorplan extends Component {
    render() {
        return (
            <div>
                <h1>Tables</h1>
                <form>
                {
                    this.props.tables.map(table => <button key={table.id} onClick={(e) => this.props.handlePickTable(e, table)}>{table.number}</button>)
                }
                </form>
            </div>
        );
    }
}

export default Floorplan;