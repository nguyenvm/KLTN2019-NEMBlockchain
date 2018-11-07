import React, { Component, Fragment } from 'react';
import SidebarNavigation from './SidebarNavigation';
import Navbar from './Navbar';

class Header extends Component {
    render() {
        return (
            <Fragment>
                <header>
                    <SidebarNavigation />
                    <Navbar />
                </header>
            </Fragment>
        );
    }
}

export default Header;