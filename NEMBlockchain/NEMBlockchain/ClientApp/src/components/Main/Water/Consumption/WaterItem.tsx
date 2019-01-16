import React, { Component } from 'react';
import * as _ from 'lodash';

class WaterItem extends Component<any, any> {

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
                    <td>{water.userId}</td>
                    <td>{water.totalVolume}</td>
                    <td>{water.logTime}</td>
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
            await this.props.getConsumptionDetail(water.userId, water.logTime);

            await this.props.onChangedListWater(this.props.detail, true);

        } else {
            await this.props.getConsumptionDetail(water.userId, water.logTime);

            await this.props.onChangedListWater(this.props.detail, false);
        }
    }
}

export default WaterItem;