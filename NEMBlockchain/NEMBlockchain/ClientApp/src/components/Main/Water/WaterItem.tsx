import React, { Component } from 'react';

class WaterItem extends Component<any, any> {

    render() {
        var { water, index, openModal } = this.props;
        return (
            <>
                <tr>
                    <td scope="row">{Number(index) + 1}</td>
                    <td>{water.userId}</td>
                    <td>{water.totalVolume}</td>
                    <td>{water.logTime}</td>
                    <td><button className="btn btn-primary waves-effect waves-light" onClick={() => openModal(water)}>Detail</button></td>
                </tr>
            </>
        );
    }
}

export default WaterItem;