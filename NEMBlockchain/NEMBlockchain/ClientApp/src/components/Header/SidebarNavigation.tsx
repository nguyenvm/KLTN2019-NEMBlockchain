import React, { Component, Fragment } from 'react';
import Navbar from './Navbar';

class Header extends Component {
    render() {
        return (
            <Fragment>
                <ul id="slide-out" className="side-nav fixed custom-scrollbar">
                    {/* <!-- Logo --> */}
                    <li>
                        <div className="logo-wrapper sn-ad-avatar-wrapper">
                            <img src='./images/custom/my-image.jpg' className="img-fluid rounded-circle" />
                            <div className="rgba-stylish-strong">
                                <p className="user white-text">Admin<br />admin@gmail.com</p>
                            </div>
                        </div>
                    </li>
                    {/* <!--/. Logo --> */}
                    {/* <!-- Side navigation links --> */}
                    <li>
                        <ul className="collapsible collapsible-accordion">
                            <li><a className="collapsible-header waves-effect arrow-r"><i className="fa fa-heart"></i> User account Blockchain</a>

                            </li>
                            <li><a className="collapsible-header waves-effect arrow-r"><i className="fa fa-diamond"></i> Water-Energy Blockchain<i className="fa fa-angle-down rotate-icon"></i></a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li><a href="#" className="waves-effect">Water</a>
                                        </li>
                                        <li><a href="#" className="waves-effect">Electricity</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li><a className="collapsible-header waves-effect arrow-r"><i className="fa fa-gitlab"></i>Trading activity blockchain<i className="fa fa-angle-down rotate-icon"></i></a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li><a href="#" className="waves-effect">Buying activity</a>
                                        </li>
                                        <li><a href="#" className="waves-effect">Selling activity</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li><a className="collapsible-header waves-effect arrow-r"><i className="fa fa-sun-o"></i> Checking data modification</a>

                            </li>
                        </ul>
                    </li>
                    {/* <!--/. Side navigation links --> */}
                </ul>
                {/* <!--/. Sidebar navigation --> */}
            </Fragment>
        );
    }
}
export default Header;