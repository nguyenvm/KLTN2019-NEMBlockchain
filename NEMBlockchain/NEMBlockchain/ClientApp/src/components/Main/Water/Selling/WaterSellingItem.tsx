import React, { Component } from 'react';
import WaterSelling from 'src/models/Water/WaterSelling';

class WaterSellingItem extends Component<any, any> {

    render() {
        var { water, index, openModal } = this.props;
        return (
            <>
                <tr>
                    <td>
                        <fieldset className="form-group">
                            <input
                                type="checkbox"
                                className="filled-in"
                                id={`checkbox${index}`}
                                disabled={water.isExistedOnNem}
                                onChange={() => this.onChecked(event, water)}
                                ref={'ref_' + index}
                            />
                            <label htmlFor={`checkbox${index}`} className={water.isExistedOnNem ? 'disabled' : ''}></label>
                        </fieldset>
                    </td>
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

    unChecked(i: number, isChecked: boolean) {
        let ref = 'ref_' + i;
        (this.refs[ref] as any).checked = !isChecked;
    }

    async onChecked(e: any, water: any) {

        if (e.target.checked) {
            let waterSelling: WaterSelling = new WaterSelling(
                water.sellerId,
                water.amount,
                water.total,
                water.sellTime
            );

            await this.props.onChangedListSelling(waterSelling, true);

        } else {
            let waterSelling: WaterSelling = new WaterSelling(
                water.sellerId,
                water.amount,
                water.total,
                water.sellTime
            );

            await this.props.onChangedListSelling(waterSelling, false);
        }
    }
}

export default WaterSellingItem;