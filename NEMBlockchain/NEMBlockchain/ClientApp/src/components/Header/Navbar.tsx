import React, { Component, Fragment } from 'react';

class Navbar extends Component {
    render() {
        return (
            <Fragment>
                {/* <!--Navbar--> */}
                <nav className="navbar navbar-fixed-top scrolling-navbar double-nav">
                    {/* <!-- SideNav slide-out button --> */}
                    <div className="float-xs-left">
                        <a href="#" data-activates="slide-out" className="button-collapse"><i className="fa fa-bars"></i></a>
                    </div>
                    {/* <!-- Breadcrumb--> */}
                    <div className="breadcrumb-dn">
                        <p>AUTOFLOW Blockchain</p>
                    </div>
                    <ul className="nav navbar-nav float-xs-right">
                        {/* <li className="nav-item ">
                            <a className="nav-link waves-effect waves-light"> <span className="tag red z-depth-1">2</span> <i className="fa fa-shopping-cart"></i> <span className="hidden-sm-down">Cart</span></a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link waves-effect waves-light"><i className="fa fa-envelope"></i> <span className="hidden-sm-down">Contact</span></a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link waves-effect waves-light"><i className="fa fa-comments-o"></i> <span className="hidden-sm-down">Support</span></a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link waves-effect waves-light"><i className="fa fa-sign-in"></i> <span className="hidden-sm-down">Register</span></a>
                        </li> */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle waves-effect waves-light" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-user"></i> <span className="hidden-sm-down">Profile</span></a>
                            <div className="dropdown-menu dropdown-primary dd-right" aria-labelledby="dropdownMenu1" data-dropdown-in="fadeIn" data-dropdown-out="fadeOut">
                                <a className="dropdown-item waves-effect waves-light" href="#">Logout</a>
                                <a className="dropdown-item waves-effect waves-light" href="#">My account</a>
                            </div>
                        </li>
                    </ul>
                </nav>
                {/* <!--/.Navbar--> */}
            </Fragment>
        );
    }
}

export default Navbar;