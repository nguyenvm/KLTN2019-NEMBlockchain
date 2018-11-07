import React, { Component } from 'react';
import ModalCommon from '../../../utils/commons/Modal/ModalCommon';

class UserItem extends Component<any, any> {

    render() {
        var { users, index } = this.props;
        return (
            <>
                <tr>
                    <td scope="row">{Number(index) + 1}</td>
                    <td>{users.fullName}</td>
                    <td>{users.address}</td>
                    <td>{users.waterSupplierId}</td>
                    <td>{users.createDate}</td>
                    <td>{users.latitude}</td>
                    <td>{users.longitude}</td>
                    <td><button className="btn btn-primary waves-effect waves-light" onClick={() => this.props.openModal(users)}>Detail</button></td>
                </tr>
            </>
        );
    }
}

export default UserItem;