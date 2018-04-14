import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Floorplan extends Component {
    render() {
        return (
            <div>
                <h1>Tables</h1>
                <div className="emptySpace" />
                <form>
                    {   
                        this.renderTableGrid(this.props.tables)
                    }
                </form>
            </div>
        );
    }


    renderTableGrid = (tables) => {
        // given a bunch of tables, make a container with enough rows. each row contains numCols items
        const numCols = 5;
        let rows = [];
        for (let i=0; i < tables.length; i += numCols) {
            const row = (
                <div key={'tablerow' + i} className="row breathe">
                {
                    tables.slice(i, i+numCols).map(table => <div key={table.id} className="col"><Button color="primary" className="btn-block" onClick={(e) => this.props.handlePickTable(e, table)}>{table.number}</Button></div>)
                }
                </div>
            );
            rows.push(row);
        }
        return (
            <div className="container">
            {
                rows
            }
            </div>
        );
    }
}
export default Floorplan;