import React, { Component } from 'react';

class UserItem extends Component<any, any> {

    render() {
        var { user, index } = this.props;
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
                    <td><button className="btn btn-primary waves-effect waves-light" onClick={() => this.props.openModal(user)}>Detail</button></td>
                </tr>
            </>
        );
    }
}

export default UserItem;