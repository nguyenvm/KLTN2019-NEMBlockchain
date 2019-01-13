import React, { Component } from 'react';
import * as _ from 'lodash';
import UserInfo from 'src/models/User/UserInfo';

class UserItem extends Component<any, any> {

    render() {
        var { user, index, openModal } = this.props;

        return (
            <>
                <tr>
                    <td>
                        <fieldset className="form-group">
                            <input
                                type="checkbox"
                                className="filled-in"
                                id={`checkbox${index}`}
                                disabled={user.isExistedOnNem}
                                onChange={() => this.onChecked(event, user)}
                                ref={'ref_' + index}
                            />
                            <label htmlFor={`checkbox${index}`} className={user.isExistedOnNem ? 'disabled' : ''}></label>
                        </fieldset>
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

    unChecked(i: number, isChecked: boolean) {
        let ref = 'ref_' + i;
        (this.refs[ref] as any).checked = !isChecked;
    }

    async onChecked(e: any, user: any) {
        
        if (e.target.checked) {
            let userInfo: UserInfo = new UserInfo(
                user.id,
                user.fullName,
                user.userName,
                user.email,
                user.address
            );

            await this.props.onChangedListUser(userInfo, true);

        } else {
            let userInfo: UserInfo = new UserInfo(
                user.id,
                user.fullName,
                user.userName,
                user.email,
                user.address
            );

            await this.props.onChangedListUser(userInfo, false);
        }
    }
}

export default UserItem;