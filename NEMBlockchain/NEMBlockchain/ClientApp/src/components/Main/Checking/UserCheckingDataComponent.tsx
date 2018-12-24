import React, { Component } from 'react';
import UserInfo from 'src/models/User/UserInfo';
import * as _ from 'lodash';
import * as Commons from 'src/utils/commons';

class UserCheckingDataComponent extends Component<any, any> {

    constructor(props: any) {
        super(props);

        this.state = {
            txtFullName: '',
            txtUserName: '',
            txtEmail: '',
            txtAddress: ''
        }
    }

    render() {
        return (
            <div className="container">
                <div className="tab-content">
                    <div className="col-lg-12 col-md-12">
                        {/* <!--Card--> */}
                        <div className="card">
                            {/* <!--Header--> */}
                            <div className="card-header danger-color-dark white-text text-sm-center">
                                Checking User Data
                            </div>
                            {/* <!--/Header--> */}
                            {/* <!--Content--> */}
                            <div className="card-block">
                                <div className="md-form mb-3">
                                    <input
                                        type="text"
                                        name="txtFullName"
                                        id="form1"
                                        className="form-control"
                                        onChange={() => this.onChange(event)}
                                    />
                                    <label htmlFor="form1" data-error="wrong" data-success="right">Type your fullname</label>
                                </div>
                                <div className="md-form mb-3">
                                    <input
                                        type="text"
                                        name="txtUserName"
                                        id="form2"
                                        className="form-control"
                                        onChange={() => this.onChange(event)}
                                    />
                                    <label htmlFor="form2" data-error="wrong" data-success="right">Type your username</label>
                                </div>
                                <div className="md-form mb-3">
                                    <input
                                        type="email"
                                        name="txtEmail"
                                        id="form3"
                                        className="form-control validate"
                                        onChange={() => this.onChange(event)}
                                    />
                                    <label htmlFor="form3" data-error="wrong" data-success="right">Type your email</label>
                                </div>
                                <div className="md-form mb-3">
                                    <input
                                        type="text"
                                        name="txtAddress"
                                        id="form4"
                                        className="form-control"
                                        onChange={() => this.onChange(event)}
                                    />
                                    <label htmlFor="form4" data-error="wrong" data-success="right">Type your address</label>
                                </div>
                                <div className="text-right">
                                    {/* <p className="text-primary">Data valid</p>
                                    <p className="text-warning">Data has changed</p>
                                    <p className="text-warning">Transaction hash not exist on blockchain</p> */}
                                    <button
                                        className="btn btn-primary waves-effect waves-light"
                                        onClick={this.checkingData.bind(this)}
                                    >
                                        Checking
                                    </button>
                                </div>
                            </div>
                            {/* <!--/Content--> */}
                        </div>
                        {/* <!--/Card--> */}
                        <hr />
                    </div>
                </div>
            </div>
        );
    }

    onChange(e: any) {
        let target = e.target;
        let name = target.name;
        let value = target.value;

        this.setState({
            [name]: value
        });
    }

    async checkingData() {
        let userInfo: UserInfo = new UserInfo(
            '',
            this.state.txtFullName,
            this.state.txtUserName,
            this.state.txtEmail,
            this.state.txtAddress
        );
        
        await this.props.findUserByInfomation(userInfo);

        if (!_.isNil(this.props.users.paginationResult)) {
            await this.props.findUserBlockchainById(this.props.users.paginationResult.id);

            userInfo = new UserInfo(
                this.props.users.paginationResult.id,
                this.state.txtFullName,
                this.state.txtUserName,
                this.state.txtEmail,
                this.state.txtAddress
            );
            Commons.hashData(userInfo);
            // Commons.checkDataHasChanged(this.props.userBlockchain.data.TransactionHash, Commons.hashData(userInfo))
        }
    }
}

export default UserCheckingDataComponent;