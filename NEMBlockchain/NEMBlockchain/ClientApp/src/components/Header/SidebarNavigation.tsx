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
                            <li><a className="collapsible-header waves-effect arrow-r"><i className="fa fa-heart"></i> New Arrivals<i className="fa fa-angle-down rotate-icon"></i></a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li><a href="#" className="waves-effect">Handbags</a>
                                        </li>
                                        <li><a href="#" className="waves-effect">Shoes</a>
                                        </li>
                                        <li><a href="#" className="waves-effect">Dresses</a>
                                        </li>
                                        <li><a href="#" className="waves-effect">Skirts</a>
                                        </li>
                                        <li><a href="#" className="waves-effect">Jeans</a>
                                        </li>
                                        <li><a href="#" className="waves-effect">Outerwear</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li><a className="collapsible-header waves-effect arrow-r"><i className="fa fa-diamond"></i> Accessories<i className="fa fa-angle-down rotate-icon"></i></a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li><a href="#" className="waves-effect">Jewelry</a>
                                        </li>
                                        <li><a href="#" className="waves-effect">Wallets & Purses</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li><a className="collapsible-header waves-effect arrow-r"><i className="fa fa-gitlab"></i> For kids<i className="fa fa-angle-down rotate-icon"></i></a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li><a href="#" className="waves-effect">Girls</a>
                                        </li>
                                        <li><a href="#" className="waves-effect">Boys</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li><a className="collapsible-header waves-effect arrow-r"><i className="fa fa-sun-o"></i> Summer<i className="fa fa-angle-down rotate-icon"></i></a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li><a href="#" className="waves-effect">Swimsuits</a>
                                        </li>
                                        <li><a href="#" className="waves-effect">Sandals</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li><a className="collapsible-header waves-effect arrow-r"><i className="fa fa-briefcase"></i> Fall / Winter<i className="fa fa-angle-down rotate-icon"></i></a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li><a href="#" className="waves-effect">Coats</a>
                                        </li>
                                        <li><a href="#" className="waves-effect">Boots</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li><a className="collapsible-header waves-effect arrow-r"><i className="fa fa-coffee "></i> Spring<i className="fa fa-angle-down rotate-icon"></i></a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li><a href="#" className="waves-effect">Denim jackets</a>
                                        </li>
                                        <li><a href="#" className="waves-effect">Sneakers</a>
                                        </li>
                                    </ul>
                                </div>
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