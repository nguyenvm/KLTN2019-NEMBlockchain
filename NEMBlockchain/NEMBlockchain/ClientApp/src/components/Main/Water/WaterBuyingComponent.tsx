import React, { Component } from 'react';
import * as Constants from 'src/contants';
import PaginationInput from 'src/models/PaginationInput';

class WaterBuyingComponent extends Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            txtDate: ''
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="md-form mt-3 mr-2">
                    <input placeholder="yyyy-MM-dd" type="date" id="form5" className="form-control" ref="txtDate" />
                    <label htmlFor="form5">Select Date</label>
                    <button className="btn btn-primary waves-effect waves-light" onClick={this.onFound.bind(this)}><i className="fa fa-search" aria-hidden="true"></i></button>
                </div>
                <div className="tab-content">
                    <div className="col-lg-12 col-md-12">
                        {/* <!--Card--> */}
                        <div className="card">
                            {/* <!--Header--> */}
                            <div className="card-header danger-color-dark white-text text-sm-center">
                                Water Buying Management
                            </div>
                            {/* <!--/Header--> */}
                            {/* <!--Content--> */}
                            <div className="card-block">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Buyer ID</th>
                                            <th>Total ($SWEG)</th>
                                            <th>Buy Time</th>
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
                                    {this.props.showPageIndex(this.props.paginationResult.totalCount, this.state.txtDate)}
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

    async onFound() {

        let valueDate = await (this.refs.txtDate as any).value;

        await this.setState({ txtDate: valueDate });

        this.props.onSearch(this.state.txtDate);

        const paginationInput = new PaginationInput(
            Constants.DEFAULT_PAGE_INDEX,
            Constants.DEFAULT_ITEMS_PER_PAGE,
            valueDate
        );

        await this.props.fetchWaterBuyingByDate(paginationInput);
    }

}

export default WaterBuyingComponent;