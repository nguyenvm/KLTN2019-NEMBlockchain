import React, { Component } from 'react';
import * as Constants from 'src/contants';

class WaterComponent extends Component<any, any> {

    render() {
        return (
            <div className="container-fluid">
                <div className="tab-content">
                    <div className="col-lg-12 col-md-12">
                        {/* <!--Card--> */}
                        <div className="card">
                            {/* <!--Header--> */}
                            <div className="card-header danger-color-dark white-text text-sm-center">
                                Water Consumption Management
                            </div>
                            {/* <!--/Header--> */}
                            {/* <!--Content--> */}
                            <div className="card-block">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>User ID</th>
                                            <th>Total Volume (L)</th>
                                            <th>Log Time</th>
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
                        {this.props.paginationResult.totalCount > Constants.DEFAULT_ITEMS_PER_PAGE &&
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
                        }
                        {/* <!--/Pagination--> */}
                        <hr />
                    </div>
                </div>
            </div>
        );
    }


}

export default WaterComponent;