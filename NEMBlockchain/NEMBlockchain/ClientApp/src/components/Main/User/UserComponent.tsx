import React, { Component } from 'react';
import * as Messages from 'src/contants/Messages';

class UserComponent extends Component<any, any> {

    render() {
        return (
            <div className="container-fluid">
                <div className="tab-content">
                    <div className="col-lg-12 col-md-12">
                        <div className="d-flex mt-2 mb-1 align-items-center">
                            <button
                                className="btn btn-primary waves-effect waves-light m-0"
                                onClick={() => this.props.sendMultiToBlockchain(this.props.listUser)}
                            >
                                Send Multiple To Blockchain
                            </button>
                            {this.props.message === Messages.INSERT_TRANSACTION_HASH_SUCCESS &&
                                <div className="text-success ml-2">Data has sent to block</div>
                            }
                            {this.props.message === Messages.INSERT_TRANSACTION_HASH_FAILURE &&
                                <div className="text-warning ml-2">Insert failure</div>
                            }
                            {this.props.message === Messages.EMPTY_LIST &&
                                <div className="text-warning ml-2">Please select available checkbox</div>
                            }
                        </div>
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
                                            <th className="d-flex align-items-center">
                                                <fieldset className="form-group">
                                                    <input
                                                        type="checkbox"
                                                        className="filled-in"
                                                        id="checkboxAll"
                                                        ref="checkboxAll"
                                                        onChange={() => this.props.checkedAll(event)}
                                                    />
                                                    <label htmlFor="checkboxAll">Checking Available</label>
                                                </fieldset>
                                                {/* <div className="cursor-pointer" onClick={() => this.onChecked()}>Check All</div> */}
                                            </th>
                                            <th>#</th>
                                            <th>Full Name</th>
                                            <th>User Name</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            {/* <th>Longitude</th>
                                            <th>Latitude</th> */}
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