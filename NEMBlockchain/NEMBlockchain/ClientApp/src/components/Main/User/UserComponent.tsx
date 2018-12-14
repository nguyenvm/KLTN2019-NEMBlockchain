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
                                            <th>User Name</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            <th>Longitude</th>
                                            <th>Latitude</th>
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
                        {/* <!--/Pagination--> */}
                        <nav>
                            <ul className="pagination pg-primary">
                                <li className="page-item">
                                    <a className="page-link" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </li>
                                {this.props.showPageIndex(this.props.paginationResult.totalCount)}
                                <li className="page-item">
                                    <a className="page-link" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        {/* <!--/Pagination--> */}
                        <hr />
                    </div>
                </div>
            </div>
        );
    }


}

export default UserComponent;