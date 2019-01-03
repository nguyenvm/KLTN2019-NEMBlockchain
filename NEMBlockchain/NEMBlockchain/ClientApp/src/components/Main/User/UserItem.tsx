import React, { Component } from 'react';
import * as _ from 'lodash';
import callApi from 'src/utils/apiCaller';

class UserItem extends Component<any, any> {

    render() {
        var { user, index, openModal } = this.props;

        return (
            <>
                <tr>
                    <td scope="row">{Number(index) + 1}</td>
                    <td>{user.fullName}</td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    {/* <td>{user.longitude}</td>
                    <td>{user.latitude}</td> */}
                    <td>
                        <button className="btn btn-primary waves-effect waves-light" onClick={() => openModal(user)}>Detail</button>
                        {this.showChecked()}
                    </td>
                </tr>
            </>
        );
    }

    showChecked() {
        callApi(`api/nem/check-exist-user/${this.props.user.id}`, 'GET', null).then((res: any) => {
            if (!_.isNil(res.data.data)) {
                return (
                    <i className="fa fa-check text-success" aria-hidden="true"></i>
                );
            } else {
                return '';
            }
        });
    }
}

export default UserItem;