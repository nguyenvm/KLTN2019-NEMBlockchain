import React, { Component } from 'react';

class WaterSellingItem extends Component<any, any> {

    render() {
        var { water, index, openModal } = this.props;
        return (
            <>
                <tr>
                    <td scope="row">{Number(index) + 1}</td>
                    <td>{water.sellerId}</td>
                    <td>{water.amount}</td>
                    <td>{water.total}</td>
                    <td>{water.sellTime}</td>
                    <td>
                        <button className="btn btn-primary waves-effect waves-light" onClick={() => openModal(water)}>Detail</button>
                        {water.isExistedOnNem && <i className="fa fa-check text-success" aria-hidden="true"></i>}
                    </td>
                </tr>
            </>
        );
    }
}

export default WaterSellingItem;