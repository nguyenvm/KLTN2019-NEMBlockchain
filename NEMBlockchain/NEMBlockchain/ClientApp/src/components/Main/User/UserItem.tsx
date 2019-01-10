import React, { Component } from 'react';
import * as _ from 'lodash';

class UserItem extends Component<any, any> {

    render() {
        var { user, index, openModal } = this.props;

        return (
            <>
                <tr>
                    <td>
                        <input type="checkbox" className="filled-in" id={`checkbox${index}`} onChange={() => this.onChecked(event)} />
                        <label htmlFor={`checkbox${index}`}></label>
                    </td>
                    <td scope="row">
                        {Number(index) + 1}
                    </td>
                    <td>{user.fullName}</td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    {/* <td>{user.longitude}</td>
                    <td>{user.latitude}</td> */}
                    <td>
                        <button className="btn btn-primary waves-effect waves-light" onClick={() => openModal(user)}>Detail</button>
                        {user.isExistedOnNem && <i className="fa fa-check text-success" aria-hidden="true"></i>}
                    </td>
                </tr>
            </>
        );
    }

    onChecked(e: any) {
        console.log(e.target.checked);
        
    }
}

export default UserItem;