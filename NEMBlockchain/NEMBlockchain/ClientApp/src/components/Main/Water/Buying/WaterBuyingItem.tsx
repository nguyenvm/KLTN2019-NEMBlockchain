import React, { Component } from 'react';
import WaterBuying from 'src/models/Water/WaterBuying';

class WaterBuyingItem extends Component<any, any> {

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
                    <td>{water.buyerId}</td>
                    <td>{water.total}</td>
                    <td>{water.buyTime}</td>
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
            let waterBuying: WaterBuying = new WaterBuying(
                water.tradeId,
                water.buyerId,
                water.total,
                water.buyTime
            );

            await this.props.onChangedListBuying(waterBuying, true);

        } else {
            let waterBuying: WaterBuying = new WaterBuying(
                water.tradeId,
                water.buyerId,
                water.total,
                water.buyTime
            );


            await this.props.onChangedListBuying(waterBuying, false);
        }
    }
}

export default WaterBuyingItem;