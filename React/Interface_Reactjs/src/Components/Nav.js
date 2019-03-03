import React, { Component } from 'react';
import {
    NavLink
} from "react-router-dom";

class Nav extends Component {
    render() {
        return (
            <div>
                {/* begin nav */}
                <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                    <div className="container">
                        <NavLink className="navbar-brand js-scroll-trigger" to="/home">React Router - News</NavLink>
                        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            Menu<i className="fas fa-bars" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li>
                                    <NavLink to="/home" activeClassName="border-bottom">Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/new">News</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact">Contact</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* end nav */}
            </div >
        );
    }
}

export default Nav;