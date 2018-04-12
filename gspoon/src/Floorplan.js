import React, { Component } from 'react';

class Floorplan extends Component {
    render() {
        console.log("floorplan props:", this.props);
        return (
            <div className={this.props.top === 'Floorplan' ? "" : "hidden"}>
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