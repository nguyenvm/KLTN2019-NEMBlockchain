import React, { Component, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';

const menus = [
    {
        name: 'User account Blockchain',
        to: '/user',
        exact: true
    },
    {
        name: 'Water-Energy Blockchain',
        exact: true,
        to: '/'
    },
    {
        name: 'Trading activity blockchain',
        to: '/',
        exact: true
    },
    {
        name: 'Checking data modification',
        to: '/checking-data',
        exact: true
    }
]

const MenuLink = ({ label, to, activeOnlyWhenExact }: { label: any, to: any, activeOnlyWhenExact: any }) => {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {
                switch (label) {
                    case 'User account Blockchain':
                        return (
                            <li>
                                <Link
                                    to={to}
                                    className="collapsible-header waves-effect arrow-r">
                                    <i className="fa fa-heart"></i> {label}
                                </Link>
                            </li>
                        );
                    case 'Water-Energy Blockchain':
                        return (
                            <li>
                                <a
                                    className="collapsible-header waves-effect arrow-r">
                                    <i className="fa fa-diamond"></i> {label}
                                    <i className="fa fa-angle-down rotate-icon"></i>
                                </a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <Link
                                                to="/water" className="waves-effect">Water
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/electricity" className="waves-effect">Electricity
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        );
                    case 'Trading activity blockchain':
                        return (
                            <li>
                                <a
                                    className="collapsible-header waves-effect arrow-r">
                                    <i className="fa fa-gitlab"></i> {label}
                                    <i className="fa fa-angle-down rotate-icon"></i>
                                </a>
                                <div className="collapsible-body">
                                    <ul>
                                        <li>
                                            <Link
                                                to="/buying-activity" className="waves-effect">Buying Activity
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/selling-activity" className="waves-effect">Selling Activity
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        );
                    case 'Checking data modification':
                        return (
                            <li>
                                <Link
                                    to={to}
                                    className="collapsible-header waves-effect arrow-r">
                                    <i className="fa fa-sun-o"></i> {label}
                                </Link>
                            </li>
                        );
                    default:
                        return;
                }
            }}
        />
    );
}

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
                            {this.showMenus(menus)}
                        </ul>
                    </li>
                    {/* <!--/. Side navigation links --> */}
                </ul>
                {/* <!--/. Sidebar navigation --> */}
            </Fragment>
        );
    }

    showMenus = (menus: Array<any>) => {
        let result = null;

        if (menus.length > 0) {
            result = menus.map((menu, index) => {
                return (
                    <MenuLink
                        key={index}
                        label={menu.name}
                        to={menu.to}
                        activeOnlyWhenExact={menu.exact}
                    />
                );
            });
        }

        return result;
    }
}
export default Header;