import React, { Component } from 'react';

class UserComponent extends Component<any, any> {
    render() {
        return (
            <div className="container-fluid">
                <div className="tab-content">
                    <div className="col-lg-12 col-md-12">
                        {/* <!--Card--> */}
                        <div className="card">
                            {/* <!--Header--> */}
                            <div className="card-header danger-color-dark white-text text-sm-center">
                                User Management
                            </div>
                            {/* <!--/Header--> */}
                            {/* <!--Content--> */}
                            <div className="card-block">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Full Name</th>
                                            <th>Address</th>
                                            <th>Water SupplierId</th>
                                            <th>Create Date</th>
                                            <th>Latitude</th>
                                            <th>Longitude</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.props.children}
                                    </tbody>
                                </table>
                            </div>
                            {/* <!--/Content--> */}
                        </div>
                        {/* <!--/Card--> */}
                        <br />
                        <hr />
                        <br />
                    </div>
                </div>
            </div>
        );
    }


}

export default UserComponent;